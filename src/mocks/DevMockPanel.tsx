"use client";
import { useEffect, useState } from 'react';
import { MockMode, getMockMode, setMockMode, subscribe } from './mockMode';

export default function DevMockPanel() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<MockMode>(getMockMode());
  const [delayMs, setDelayMs] = useState(1000);
  const [errorCode, setErrorCode] = useState(500);

  useEffect(() => {
    return subscribe(setMode);
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999, fontSize: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ padding: '6px 10px', background: '#111827', color: 'white', borderRadius: 6 }}>
        Mock: {mode}
      </button>
      {open && (
        <div style={{ marginTop: 8, padding: 12, background: '#fff', color: '#111', border: '1px solid #e5e7eb', borderRadius: 8, width: 260, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button onClick={() => setMockMode('normal')} style={{ padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6 }}>normal</button>
            <button onClick={() => setMockMode(`delay:${delayMs}` as MockMode)} style={{ padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6 }}>delay:{delayMs}</button>
            <button onClick={() => setMockMode(`error:${errorCode}` as MockMode)} style={{ padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6 }}>error:{errorCode}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <label style={{ width: 80 }}>Delay ms</label>
            <input type="number" value={delayMs} onChange={(e) => setDelayMs(parseInt(e.target.value || '0', 10))} style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 8px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ width: 80 }}>Error</label>
            <input type="number" value={errorCode} onChange={(e) => setErrorCode(parseInt(e.target.value || '0', 10))} style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 8px' }} />
          </div>
          <div style={{ marginTop: 8, color: '#6b7280' }}>Tip: add ?mock=error:404 or ?mock=delay:1500 to URL</div>
        </div>
      )}
    </div>
  );
}
