"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/format';
import { Home, Beaker, Play, Store, Settings, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useState } from 'react';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plan', label: 'Plan', icon: Beaker },
  { href: '/run', label: 'Run', icon: Play },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn('h-screen border-r dark:border-brd-dark border-brd-light bg-surface-light dark:bg-surface-dark flex flex-col', collapsed ? 'sidebar-width-collapsed' : 'sidebar-width')}
      aria-label="Primary">
      <div className="flex items-center justify-between px-3 py-3">
        <span className={cn('text-sm font-semibold', collapsed && 'sr-only')}>Aurexus Bio</span>
        <button className="btn-base p-2" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(v => !v)}>
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={cn('group flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800', active && 'bg-slate-100 dark:bg-slate-800')}>
              <Icon className="h-4 w-4" />
              <span className={cn('truncate', collapsed && 'sr-only')}>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 text-xs text-slate-500">{collapsed ? '' : 'v0.1.0'}</div>
    </aside>
  );
}
