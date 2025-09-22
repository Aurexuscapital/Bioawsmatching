"use client";
import { AppShell } from '@/components/shell/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as api from '@/services/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MarketplacePage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => { api.marketplace.list().then(setItems); }, []);

  return (
    <AppShell>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(m => (
          <Card key={m.id} title={m.headline} subtitle={m.termsSummary} actions={<Badge variant="primary">{m.type}</Badge>}>
            <div className="mt-3"><Badge variant={m.status==='active'?'success':'neutral'}>{m.status}</Badge></div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={async()=>{ const r = await api.marketplace.create({ type: 'service', headline: 'Custom Assay', termsSummary: 'Research use' }); setItems([r, ...items]); toast.success('Listing created'); }}>List Asset</Button>
      </div>
    </AppShell>
  );
}
