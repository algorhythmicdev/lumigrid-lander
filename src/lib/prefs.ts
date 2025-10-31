export const save = (k: string, v: unknown) => {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};
export const load = <T>(k: string, d: T): T => {
  if (typeof window === 'undefined') return d;
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : d; } catch { return d; }
};
