import type { ProjectSummary, JobSummary, EscrowInfo, MarketplaceItem } from '@/types/api';

function delay<T>(data: T, ms = 300): Promise<T> { return new Promise((res) => setTimeout(() => res(data), ms)); }
function id(prefix: string) { return `${prefix}_${Math.random().toString(36).slice(2, 8)}`; }

export const system = {
  async health() { return delay({ ok: true }); }
};

export const auth = {
  async login({ email, password }: { email: string; password: string }) {
    if (!email || password.length < 6) throw new Error('Invalid credentials');
    return delay({ accessToken: id('tok') });
  },
  async signup({ email, password, orgName }: { email: string; password: string; orgName: string }) {
    if (!orgName) throw new Error('Organization required');
    return delay({ accessToken: id('tok') });
  },
};

export const projects = {
  async list(): Promise<ProjectSummary[]> {
    return delay([
      { id: 'p1', name: 'CRISPR Screen A', stage: 'in_progress' },
      { id: 'p2', name: 'Proteomics B', stage: 'ready' },
    ]);
  },
  async create({ orgId, name }: { orgId: string; name: string }): Promise<ProjectSummary> {
    return delay({ id: id('p'), name, stage: 'idea' });
  },
};

export const jobs = {
  async list(projectId: string): Promise<JobSummary[]> {
    return delay([
      { id: 'j1', projectId, status: 'running', progressPct: 42, startedAt: new Date().toISOString() },
      { id: 'j2', projectId, status: 'success', progressPct: 100, startedAt: new Date(Date.now() - 86400000).toISOString(), finishedAt: new Date().toISOString() },
    ]);
  },
  async launch({ projectId, protocolId, simulated }: { projectId: string; protocolId: string; simulated: boolean }) {
    return delay({ id: id('job'), projectId, protocolId, simulated });
  },
  async milestones(jobId: string) {
    return delay([
      { id: id('m'), name: 'accepted', at: new Date().toISOString() },
      { id: id('m'), name: 'prep', at: new Date().toISOString() },
    ]);
  },
};

export const escrow = {
  async get(projectId: string): Promise<EscrowInfo> {
    return delay({ amountCents: 150000, status: 'funded' });
  },
  async topup(projectId: string, { amountCents }: { amountCents: number }) {
    return delay({ amountCents, status: 'funded' as const });
  },
};

export const marketplace = {
  async list(): Promise<MarketplaceItem[]> {
    return delay([
      { id: 'm1', type: 'assay', headline: 'High-throughput CRISPR', termsSummary: 'Net 30, volume discount', status: 'active' },
      { id: 'm2', type: 'service', headline: 'Sequencing bundle', termsSummary: 'All-in pricing', status: 'active' },
      { id: 'm3', type: 'data', headline: 'Reference dataset', termsSummary: 'Non-exclusive, research use', status: 'paused' },
    ]);
  },
  async create(body: { type: MarketplaceItem['type']; headline: string; termsSummary: string }) {
    return delay({ id: id('mk'), ...body, status: 'active' as const });
  },
};

// Stubs for many endpoints referenced by pages
export const design = { async plan({ idea }: { idea: string }) { return delay({ title: 'Generated Protocol', steps: ['Step 1', 'Step 2', 'Step 3'] }); } };
export const protocols = {
  async list(projectId: string) { return delay([{ id: 'prot1', title: 'Example Protocol' }]); },
  async create(body: any) { return delay({ id: id('prot'), ...body }); },
};
export const uploads = { async presign({ key, contentType }: { key: string; contentType: string }) { return delay({ url: 'https://upload.example.com', fields: {} }); } };
export const search = { async protocols({ query, limit }: { query: string; limit: number }) { return delay([{ id: 's1', title: 'Similar Protocol', snippet: '…', score: 0.83 }]); } };
export const pools = { async list() { return delay([{ id: 'pool1', name: 'Monthly Pool', assayType: 'CRISPR', closesAt: new Date(Date.now()+86400000).toISOString(), discountPct: 20, capacityPct: 60 }]); }, async estimate({ samples }: { samples: number }) { return delay({ priceSolo: samples*50000, pricePool: samples*40000, savingsPct: 20 }); } };
export const quotes = { async create(body: any) { return delay({ id: id('q'), ...body }); } };
export const legal = { async get(projectId: string) { return delay({ ndaOk: true, msaOk: true, ipMode: 'shared', dataUseOk: true }); }, async sign(signature: any) { return delay({ ok: true }); } };
export const labs = { async list() { return delay([{ id: 'lab1', name: 'Aurexus Lab', region: 'US', assays: ['CRISPR'], reliabilityPct: 97, slaDays: 7, status: 'ready' }]); } };
export const matching = { async decompose({ projectId, protocolId }: any) { return delay({ tasks: [{ id: id('t'), name: 'Cell culture' }] }); }, async find({ tasks }: any) { return delay([{ labId: 'lab1', fitScore: 0.92, estPriceCents: 120000, tatDays: 10, reasons: ['Expertise match'] }]); } };
export const rfp = { async create() { return delay({ id: id('rfp') }); }, async list(projectId: string) { return delay([{ id: 'rfp1', deadline: new Date().toISOString() }]); }, async get(id: string) { return delay({ id, offers: [{ priceCents: 100000, tatDays: 12, qc: 'High', validUntil: new Date().toISOString() }] }); }, async counter(id: string, offerIndex: number, body: any) { return delay({ id, offerIndex, ...body }); } };
export const negotiation = { async preview({ priceCents, tatDays }: any) { return delay({ withinPolicy: priceCents >= 50000 && tatDays <= 20 }); } };
export const awards = { async approve({ rfpId, offerIndex }: any) { return delay({ poNumber: id('PO') }); } };
export const runs = { async preflight(projectId: string) { return delay({ ok: true, checks: { legal: true, escrow: true, tasks: true, shipping: true, compliance: true } }); } };
export const logistics = { async listShipments(projectId: string) { return delay([{ id: 's1', toLabId: 'lab1', contents: { tubes: 10 }, carrier: 'UPS', status: 'in_transit' }]); }, async createShipment(body: any) { return delay({ id: id('ship'), ...body }); }, async markReceived({ shipmentId }: any) { return delay({ shipmentId, status: 'received' }); } };
export const results = { async summary(projectId: string) { return delay({ successRate: 0.82, qcPassRate: 0.9, avgEffectSize: 1.3 }); }, async list(projectId: string) { return delay([{ jobId: 'j2', artifacts: [{ type: 'csv', uri: 'https://example.com/a.csv' }], qc: [{ name: 'Reads', value: 1_000_000 }] }]); } };
export const insights = { async get(projectId: string, provider: 'OpenAI'|'Claude'|'None') { return delay({ recommendations: [{ text: 'Increase replicates', confidence: 0.76 }], anomalies: ['Batch effect suspected'], benchmarks: ['Top quartile TAT'] }); } };
export const ip = { async provisional(projectId: string, provider?: string) { return delay({ link: 'https://example.com/provisional.pdf', title: 'Provisional Patent Draft' }); } };

export type { ProjectSummary };
