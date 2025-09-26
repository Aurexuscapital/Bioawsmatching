"use client";
import { useEffect } from 'react';
import { initMockModeFromEnv } from './mockMode';
import DevMockPanel from './DevMockPanel';

export default function MswProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initMockModeFromEnv();
      import('./browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'warn' });
      });
    }
  }, []);
  if (process.env.NODE_ENV !== 'development') return null;
  return <DevMockPanel />;
}
