export function runtimeBase(): string {
  const provided = (import.meta as any).env?.BASE_URL || '';
  if (provided) return provided;
  if (typeof location === 'undefined') return '';
  const path = location.pathname;
  const match = path.match(/^\/[^/]+\/[^/]+\//);
  return match ? match[0].slice(0, -1) : '';
}
