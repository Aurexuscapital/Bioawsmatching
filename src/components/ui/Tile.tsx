import { ReactNode } from 'react';

export function Tile({ title, value, hint, cta }: { title: string; value: ReactNode; hint?: string; cta?: ReactNode }) {
  return (
    <div className="card-surface">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
      {cta && <div className="mt-3">{cta}</div>}
    </div>
  );
}
