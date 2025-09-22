"use client";
import { AppShell } from '@/components/shell/AppShell';
import { Tabs } from '@/components/ui/Tabs';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import * as api from '@/services/api';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PlanPage() {
  const [idea, setIdea] = useState('CRISPR knockout screen in A549 cells to identify growth dependencies.');
  const [plan, setPlan] = useState<{ title: string; steps: string[] } | null>(null);

  const design = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card-surface">
        <TextArea label="Idea" value={idea} onChange={(e) => setIdea(e.currentTarget.value)} description="Describe your experimental intent." />
        <div className="mt-3 flex gap-2">
          <Button onClick={async()=>{ const r = await api.design.plan({ idea }); setPlan(r); toast.success('Plan generated'); }}>Generate Plan</Button>
        </div>
      </div>
      <div className="card-surface">
        <h3 className="text-base font-semibold">Draft Protocol</h3>
        {plan ? (
          <div className="mt-2">
            <div className="font-medium">{plan.title}</div>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              {plan.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <Button className="mt-3" onClick={async()=>{ const pId = localStorage.getItem('currentProjectId') || 'p1'; const res = await api.protocols.create({ projectId: pId, title: plan.title, sourceType: 'idea', stepsJson: plan.steps }); toast.success('Saved as protocol'); }}>{'Save as Protocol'}</Button>
          </div>
        ) : <div className="text-sm text-slate-500">No plan yet</div>}
      </div>
    </div>
  );

  const upload = (
    <div className="card-surface">
      <input type="file" aria-label="Upload protocol file" onChange={async(e)=>{ const file = e.target.files?.[0]; if(!file) return; await api.uploads.presign({ key: file.name, contentType: file.type }); const pId = localStorage.getItem('currentProjectId') || 'p1'; await api.protocols.create({ projectId: pId, title: file.name, sourceType: 'upload', fileUri: 'uploaded://'+file.name }); toast.success('Protocol uploaded'); }} />
    </div>
  );

  const compare = (
    <div className="card-surface">
      <p className="text-sm text-slate-500">Search similar protocols</p>
    </div>
  );

  const price = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card-surface">
        <h3 className="text-base font-semibold">Pools</h3>
        <p className="text-sm text-slate-500">Monthly pool available with discount</p>
      </div>
      <div className="card-surface">
        <h3 className="text-base font-semibold">Estimator</h3>
        <div className="mt-2 flex gap-2">
          <Button onClick={async()=>{ const r = await api.pools.estimate({ samples: 10 }); toast.success(`Solo ${r.priceSolo/100} vs Pool ${r.pricePool/100}`); }}>Estimate 10 samples</Button>
        </div>
      </div>
    </div>
  );

  const readiness = (
    <div className="card-surface">
      <h3 className="text-base font-semibold">Preflight</h3>
      <Button className="mt-2" onClick={async()=>{ const pId = localStorage.getItem('currentProjectId') || 'p1'; const r = await api.runs.preflight(pId); toast.success(r.ok ? 'All checks passed' : 'Some checks failed'); }}>Run Preflight</Button>
    </div>
  );

  return (
    <AppShell>
      <Tabs tabs={[
        { id: 'design', label: 'Design', content: design },
        { id: 'upload', label: 'Upload', content: upload },
        { id: 'compare', label: 'Compare', content: compare },
        { id: 'price', label: 'Price', content: price },
        { id: 'readiness', label: 'Readiness', content: readiness },
      ]} />
    </AppShell>
  );
}
