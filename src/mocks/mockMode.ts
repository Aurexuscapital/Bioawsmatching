export type MockMode = 'normal' | `error:${number}` | `delay:${number}`;

let mode: MockMode = 'normal';
const listeners = new Set<(m: MockMode) => void>();

export function getMockMode(): MockMode { return mode; }
export function setMockMode(next: MockMode) {
  mode = next;
  try { localStorage.setItem('mockMode', next); } catch {}
  listeners.forEach((l) => l(mode));
}
export function subscribe(listener: (m: MockMode) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export function initMockModeFromEnv() {
  if (typeof window !== 'undefined') {
    const q = new URLSearchParams(window.location.search);
    const qMock = q.get('mock') as MockMode | null;
    const stored = (localStorage.getItem('mockMode') as MockMode | null) ?? null;
    const initial = (qMock || stored || 'normal') as MockMode;
    setMockMode(initial);
    (window as any).setMockMode = setMockMode;
  }
}
