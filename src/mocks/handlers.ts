import { http, HttpResponse } from 'msw';
import YAML from 'yaml';

// Lazy-load and cache the OpenAPI spec from /openapi.yaml (served from public/)
let specPromise: Promise<any> | null = null;
async function loadSpec(): Promise<any> {
  if (!specPromise) {
    specPromise = fetch('/openapi.yaml')
      .then((r) => r.text())
      .then((t) => YAML.parse(t));
  }
  return specPromise;
}

function oapiPathToMsw(path: string): string {
  return path.replace(/\{([^}]+)\}/g, ':$1');
}

function pathToRegex(pathPattern: string): RegExp {
  // Convert "/rfp/:id/counter" to regex ^/rfp/([^/]+)/counter$
  const escaped = pathPattern.replace(/[-/\\^$+?.()|[\]{}]/g, (m) => `\\${m}`);
  const withParams = escaped.replace(/:([^/]+)\\/g, '[^/]+/').replace(/:([^/]+)$/, '[^/]+');
  return new RegExp(`^${withParams}$`);
}

function deref(schema: any, spec: any, seen: Set<string> = new Set()): any {
  if (!schema) return schema;
  if (schema.$ref) {
    const ref = schema.$ref as string;
    const parts = ref.replace(/^#\//, '').split('/');
    let current: any = spec;
    for (const p of parts) current = current?.[p];
    const key = parts.join('/');
    if (seen.has(key)) return {}; // avoid cycles
    seen.add(key);
    return deref(current, spec, seen);
  }
  if (schema.allOf) return schema.allOf.map((s: any) => deref(s, spec, seen)).reduce((acc: any, s: any) => ({ ...acc, ...s }), {});
  if (schema.oneOf) return deref(schema.oneOf[0], spec, seen);
  if (schema.anyOf) return deref(schema.anyOf[0], spec, seen);
  if (schema.items) return { ...schema, items: deref(schema.items, spec, seen) };
  if (schema.properties) {
    const props: Record<string, any> = {};
    for (const [k, v] of Object.entries<any>(schema.properties)) props[k] = deref(v, spec, seen);
    return { ...schema, properties: props };
  }
  return schema;
}

function mockPrimitive(schema: any): any {
  const fmt = schema.format;
  switch (schema.type) {
    case 'string':
      if (schema.enum?.length) return schema.enum[0];
      if (fmt === 'date-time') return new Date().toISOString();
      if (fmt === 'email') return 'user@example.com';
      if (fmt === 'uuid') return '00000000-0000-4000-8000-000000000000';
      return 'string';
    case 'integer':
    case 'number':
      if (schema.minimum != null) return schema.minimum;
      return 1;
    case 'boolean':
      return true;
    default:
      return null;
  }
}

function mockFromSchema(schema: any, spec: any, depth = 0): any {
  if (!schema) return null;
  const s = deref(schema, spec);
  if (s.enum?.length) return s.enum[0];
  if (s.type === 'array') {
    const item = mockFromSchema(s.items ?? {}, spec, depth + 1);
    return [item, item];
  }
  if (s.type === 'object' || (s.properties || s.additionalProperties)) {
    const out: Record<string, any> = {};
    const props = s.properties ?? {};
    const required: string[] = Array.isArray(s.required) ? s.required : Object.keys(props);
    for (const key of Object.keys(props)) {
      if (required.includes(key)) out[key] = mockFromSchema((props as any)[key], spec, depth + 1);
    }
    // If additionalProperties is a schema, add one example key
    if (s.additionalProperties && typeof s.additionalProperties === 'object') {
      out['key'] = mockFromSchema(s.additionalProperties, spec, depth + 1);
    }
    return out;
  }
  return mockPrimitive(s);
}

function pickSuccessResponse(op: any): { status: number; schema: any | null } | null {
  if (!op?.responses) return null;
  const codes = Object.keys(op.responses).filter((c) => /^2\d\d$/.test(c)).sort();
  if (!codes.length) return null;
  // Prefer 200, else first available
  const status = codes.includes('200') ? 200 : parseInt(codes[0], 10);
  const r = op.responses[String(status)];
  const schema = r?.content?.['application/json']?.schema ?? null;
  return { status, schema };
}

async function resolveOperation(spec: any, method: string, pathname: string): Promise<{ op: any; pathKey: string } | null> {
  const lower = method.toLowerCase();
  for (const rawPath of Object.keys(spec.paths || {})) {
    const pattern = oapiPathToMsw(rawPath);
    const re = pathToRegex(pattern);
    if (re.test(pathname)) {
      const entry = spec.paths[rawPath];
      const op = entry?.[lower];
      if (op) return { op, pathKey: rawPath };
    }
  }
  return null;
}

export const handlers = [
  http.all('*', async ({ request }) => {
    try {
      const spec = await loadSpec();
      const url = new URL(request.url);
      const found = await resolveOperation(spec, request.method, url.pathname);
      if (!found) return HttpResponse.passthrough();
      const picked = pickSuccessResponse(found.op);
      if (!picked) return HttpResponse.passthrough();
      const body = mockFromSchema(picked.schema, spec);
      return HttpResponse.json(body ?? null, { status: picked.status });
    } catch (e) {
      return HttpResponse.passthrough();
    }
  }),
];
