import { ReactNode } from 'react';

export function Card({ title, subtitle, actions, children }: { title?: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="card-surface">
      {(title || actions) && (
        <div className="flex items-start justify-between mb-3">
          <div>
            {title && <h3 className="text-base font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
