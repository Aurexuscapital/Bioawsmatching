"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/hooks/useAuth';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.replace('/login');
      return;
    }
    setOk(true);
  }, [router]);

  if (!ok) return null;
  return <>{children}</>;
}
