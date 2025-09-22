"use client";
import { ThemeToggle } from './ThemeToggle';
import { OrgProjectSwitcher } from './OrgProjectSwitcher';
import { CommandPalette } from './CommandPalette';
import { useAuthActions } from '@/hooks/useAuth';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function Topbar() {
  const { logout, userEmail } = useAuthActions();
  const [q, setQ] = useState('');

  return (
    <header className="h-14 border-b dark:border-brd-dark border-brd-light bg-surface-light dark:bg-surface-dark flex items-center gap-3 px-4">
      <OrgProjectSwitcher />
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
        <input aria-label="Search" className="input-base pl-8" value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" />
      </div>
      <CommandPalette />
      <ThemeToggle />
      <div className="flex items-center gap-2 text-sm">
        <span className="hidden sm:inline text-slate-500">{userEmail}</span>
        <button className="btn-base border bg-white dark:bg-slate-900" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
