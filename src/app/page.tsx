"use client";
import { AppShell } from '@/components/shell/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tile } from '@/components/ui/Tile';
import * as api from '@/services/api';
import { useEffect, useMemo, useState } from 'react';
import { Progress } from '@/components/ui/Progress';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/lib/format';

export default function HomePage() {
  const [projects, setProjects] = useState<api.ProjectSummary[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [escrow, setEscrow] = useState<any | null>(null);
  const [market, setMarket] = useState<any[]>([]);

  const projectId = useMemo(() => (typeof window !== 'undefined' ? localStorage.getItem('currentProjectId') || 'p1' : 'p1'), []);

  useEffect(() => {
    api.projects.list().then(setProjects);
    api.jobs.list(projectId).then(setJobs);
    api.escrow.get(projectId).then(setEscrow);
    api.marketplace.list().then((items) => setMarket(items.slice(0, 3)));
  }, [projectId]);

  return (
    <AppShell>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile title="Projects" value={projects.length} hint="Total projects" cta={<Button onClick={async() => { const p = await api.projects.create({ orgId: 'org1', name: 'New Project' }); toast.success('Project created'); setProjects([p, ...projects]); }}>+ New Project</Button>} />
        <Tile title="Current Runs" value={jobs.length} hint="Recent jobs" />
        <Tile title="Wallet" value={escrow ? formatCurrency(escrow.amountCents) : '—'} hint={escrow?.status} cta={<Button variant="secondary" onClick={async()=>{ const r = await api.escrow.topup(projectId, { amountCents: 50000 }); setEscrow(r); toast.success('Escrow funded: ' + formatCurrency(r.amountCents)); }}>Top Up</Button>} />
        <Tile title="Marketplace" value={market.length} hint="Featured" cta={<Button variant="secondary" onClick={()=>location.assign('/marketplace')}>Open</Button>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Projects">
          <ul className="divide-y divide-brd-light dark:divide-brd-dark">
            {projects.map(p => (
              <li key={p.id} className="py-2 flex items-center justify-between">
                <div className="font-medium">{p.name}</div>
                <Badge variant={p.stage === 'ready' ? 'success' : p.stage === 'in_progress' ? 'primary' : 'neutral'}>{p.stage}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Current Runs">
          <ul className="divide-y divide-brd-light dark:divide-brd-dark">
            {jobs.slice(0,3).map(j => (
              <li key={j.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Job {j.id}</div>
                  <Badge variant={j.status === 'success' ? 'success' : j.status === 'failed' ? 'danger' : 'primary'}>{j.status}</Badge>
                </div>
                <div className="mt-2"><Progress percent={j.progressPct} status={j.status} /></div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Wallet / Escrow">
          {escrow && (
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold">{formatCurrency(escrow.amountCents)}</div>
              <Badge variant={escrow.status === 'funded' ? 'success' : escrow.status === 'low' ? 'warn' : 'neutral'}>{escrow.status}</Badge>
            </div>
          )}
        </Card>
        <Card title="Marketplace Preview" actions={<Button variant="secondary" onClick={()=>location.assign('/marketplace')}>Open Marketplace</Button>}>
          <ul className="divide-y divide-brd-light dark:divide-brd-dark">
            {market.map(m => (
              <li key={m.id} className="py-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{m.headline}</div>
                  <Badge variant="primary">{m.type}</Badge>
                </div>
                <div className="text-sm text-slate-500">{m.termsSummary}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
