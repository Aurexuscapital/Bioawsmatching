export type AccessToken = string;

export interface ProjectSummary {
  id: string;
  name: string;
  stage: 'idea' | 'in_progress' | 'ready' | 'completed';
}

export interface JobSummary {
  id: string;
  projectId: string;
  status: 'running' | 'success' | 'failed' | 'queued';
  progressPct: number;
  startedAt: string;
  finishedAt?: string;
}

export interface EscrowInfo {
  amountCents: number;
  status: 'unfunded' | 'funded' | 'low';
}

export interface MarketplaceItem {
  id: string;
  type: 'assay' | 'service' | 'data';
  headline: string;
  termsSummary: string;
  status: 'active' | 'paused';
}
