export function Progress({ percent, status }: { percent: number; status: 'running' | 'success' | 'failed' | 'queued' }) {
  const color = status === 'running' ? 'bg-blue-600' : status === 'success' ? 'bg-emerald-600' : status === 'failed' ? 'bg-red-600' : 'bg-slate-400';
  return (
    <div>
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-1 text-xs text-slate-500">{percent}%</div>
    </div>
  );
}
