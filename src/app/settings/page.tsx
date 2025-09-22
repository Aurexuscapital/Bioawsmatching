"use client";
import { AppShell } from '@/components/shell/AppShell';
import { Select } from '@/components/ui/Select';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="card-surface max-w-md">
        <Select label="Preferred Provider" defaultValue={typeof window !== 'undefined' ? localStorage.getItem('preferredProvider') || 'None' : 'None'} onChange={(e)=>localStorage.setItem('preferredProvider', e.target.value)}>
          <option>OpenAI</option>
          <option>Claude</option>
          <option>None</option>
        </Select>
        <p className="mt-2 text-sm text-slate-500">API key stored elsewhere (read-only).</p>
      </div>
    </AppShell>
  );
}
