import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { server } from '../src/mocks/server';
import { http, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Example: override a single operation to return 404
// You can also pass a per-request header `x-mock-mode: error:404` or query `?mock=error:404`.
test('overrides /health to 404', async () => {
  server.use(
    http.get('http://localhost:3000/health', () => HttpResponse.json({ error: 'not found' }, { status: 404 }))
  );

  const res = await fetch('http://localhost:3000/health');
  expect(res.status).toBe(404);
});
