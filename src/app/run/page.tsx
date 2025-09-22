"use client";
import { AppShell } from '@/components/shell/AppShell';
import { Tabs } from '@/components/ui/Tabs';
import * as api from '@/services/api';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Progress } from '@/components/ui/Progress';
import { Timeline } from '@/components/ui/Timeline';
import { Badge } from '@/components/ui/Badge';
import toast from 'react-hot-toast';

export default function RunPage() {
  const projectId = useMemo(() => (typeof window !== 'undefined' ? localStorage.getItem('currentProjectId') || 'p1' : 'p1'), []);
  const [jobs, setJobs] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);

  useEffect(() => { api.jobs.list(projectId).then(setJobs); }, [projectId]);

  const labsTab = (
    <div className="card-surface">
      <Button onClick={async()=>{ const d = await api.matching.decompose({ projectId, protocolId: 'prot1' }); toast.success('Decomposed 1 task'); }}>{'Decompose'}</Button>
    </div>
  );

  const rfpTab = (
    <div className="card-surface">
      <Button onClick={async()=>{ const r = await api.rfp.create(); toast.success('RFP created'); }}>{'Create RFP'}</Button>
    </div>
  );

  const liveTab = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card-surface">
        <div className="flex gap-2">
          <Button onClick={async()=>{ const r = await api.jobs.launch({ projectId, protocolId: 'prot1', simulated: true }); toast.success('Simulated run launched'); }}>{'Simulated Run'}</Button>
          <Button variant="secondary" disabled>Lab Run</Button>
        </div>
      </div>
      <div className="card-surface">
        <Table columns={[{ key: 'id', label: 'Job' }, { key: 'status', label: 'Status', render: (v: any)=> <Badge variant={v==='success'?'success':v==='failed'?'danger':'primary'}>{v}</Badge> }, { key: 'progressPct', label: 'Progress', render: (v:any, r:any)=> <Progress percent={v} status={r.status} /> }]} rows={jobs} empty={'No jobs'} />
        <div className="mt-3">
          <Button variant="secondary" onClick={async()=>{ const ms = await api.jobs.milestones(jobs[0]?.id || 'j1'); setMilestones(ms); }}>View Milestones</Button>
          {milestones.length ? <div className="mt-3"><Timeline items={milestones} /></div> : null}
        </div>
      </div>
    </div>
  );

  const logisticsTab = (
    <div className="card-surface">
      <Button onClick={async()=>{ const r = await api.logistics.createShipment({ toLabId: 'lab1', contents: { tubes: 5 }, carrier: 'UPS' }); toast.success('Shipment created'); }}>{'Create Shipment'}</Button>
    </div>
  );

  const resultsTab = (
    <div className="card-surface">
      <Button onClick={async()=>{ const s = await api.results.summary(projectId); toast.success(`Success rate ${(s.successRate*100).toFixed(0)}%`); }}>{'View KPIs'}</Button>
    </div>
  );

  const insightsTab = (
    <div className="card-surface">
      <Button onClick={async()=>{ const i = await api.insights.get(projectId, 'OpenAI'); toast.success(i.recommendations[0].text); }}>{'Fetch Insights'}</Button>
    </div>
  );

  const ipTab = (
    <div className="card-surface">
      <Button onClick={async()=>{ const r = await api.ip.provisional(projectId); window.open(r.link, '_blank'); }}>{'Draft Provisional'}</Button>
    </div>
  );

  return (
    <AppShell>
      <Tabs tabs={[
        { id: 'labs', label: 'Labs', content: labsTab },
        { id: 'rfp', label: 'RFP', content: rfpTab },
        { id: 'live', label: 'Live', content: liveTab },
        { id: 'logistics', label: 'Logistics', content: logisticsTab },
        { id: 'results', label: 'Results', content: resultsTab },
        { id: 'insights', label: 'Insights', content: insightsTab },
        { id: 'ip', label: 'IP', content: ipTab },
      ]} />
    </AppShell>
  );
}
