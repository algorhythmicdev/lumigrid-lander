export const save = (k: string, v: unknown) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};
export const load = <T>(k: string, d: T): T => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : d; } catch { return d; }
};
