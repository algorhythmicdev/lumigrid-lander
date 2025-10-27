<script>
  import { onDestroy, onMount } from 'svelte';

  export let map = [
    { id: 'hero', hue: 300 },
    { id: 'letters', hue: 305 },
    { id: 'what', hue: 320 },
    { id: 'examples', hue: 200 },
    { id: 'beforeafter', hue: 260 },
    { id: 'brands', hue: 305 },
    { id: 'nodes', hue: 285 },
    { id: 'gallery', hue: 240 },
    { id: 'contact', hue: 60 }
  ];

  let observer;
  let cleanupFallback;

  const pickActive = () => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return null;
    const midpoint = window.innerHeight / 2;
    let closest = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const entry of map) {
      const el = document.getElementById(entry.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.height === 0 && rect.top === 0 && rect.bottom === 0) continue;
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - midpoint);
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!closest || (isVisible && distance < closestDistance)) {
        closest = entry;
        closestDistance = distance;
      }
    }

    return closest ?? map[0] ?? null;
  };

  const setHue = (value) => {
    if (typeof document === 'undefined') return;
    const hueValue = String(value);
    const root = document.documentElement;
    root.style.setProperty('--ambient-hue', hueValue);
    root.style.setProperty('--glow-hue', hueValue);
  };

  onMount(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const initial = pickActive();
    if (initial) setHue(initial.hue);

    if (typeof IntersectionObserver === 'undefined') {
      const update = () => {
        const active = pickActive();
        if (active) setHue(active.hue);
      };
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      cleanupFallback = () => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      };
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = map.find((item) => item.id === entry.target.id);
          if (target) {
            setHue(target.hue);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    map.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
  });

  onDestroy(() => {
    observer?.disconnect();
    cleanupFallback?.();
  });
</script>
