"use client";
import { useEffect, useMemo, useState } from 'react';
import { Combobox, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const actions = [
  { id: 'nav-home', label: 'Go to Home', href: '/' },
  { id: 'nav-plan', label: 'Go to Plan', href: '/plan' },
  { id: 'nav-run', label: 'Go to Run', href: '/run' },
  { id: 'nav-market', label: 'Go to Marketplace', href: '/marketplace' },
  { id: 'nav-settings', label: 'Go to Settings', href: '/settings' },
  { id: 'act-new-project', label: 'New Project', href: '/' },
  { id: 'act-generate-plan', label: 'Generate Plan', href: '/plan' },
  { id: 'act-upload-protocol', label: 'Upload Protocol', href: '/plan' },
  { id: 'act-launch-sim', label: 'Launch Simulated Run', href: '/run' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = useMemo(() => {
    if (!q) return actions;
    const s = q.toLowerCase();
    return actions.filter((a) => a.label.toLowerCase().includes(s));
  }, [q]);

  return (
    <>
      <button className="btn-base border bg-white dark:bg-slate-900" onClick={() => setOpen(true)} aria-label="Open Command Palette">
        ⌘K
      </button>
      <Transition show={open}>
        <Dialog onClose={setOpen} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-start justify-center p-4">
            <DialogPanel className="card-surface w-full max-w-xl">
              <DialogTitle className="text-sm mb-2">Command Palette</DialogTitle>
              <Combobox onChange={(item: any) => { setOpen(false); if (item?.href) router.push(item.href); }}>
                <Combobox.Input className="input-base" placeholder="Type a command or search…" value={q} onChange={(e) => setQ(e.target.value)} />
                <div className="mt-3 max-h-64 overflow-auto">
                  {filtered.map((a) => (
                    <Combobox.Option key={a.id} value={a} className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm">
                      {a.label}
                    </Combobox.Option>
                  ))}
                </div>
              </Combobox>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
