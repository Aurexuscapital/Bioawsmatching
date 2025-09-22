"use client";
import { useState } from 'react';

export function Tabs({ tabs, initial }: { tabs: { id: string; label: string; content: React.ReactNode }[]; initial?: string }) {
  const [active, setActive] = useState(initial || tabs[0]?.id);
  return (
    <div>
      <div role="tablist" className="flex gap-2 border-b border-brd-light dark:border-brd-dark">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)} className={`px-3 py-2 text-sm ${active === t.id ? 'border-b-2 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}
