<script>
  import { onMount } from 'svelte';
  
  let canvas;
  let w, h, t = 0;
  let targetX = 0.5, targetY = 0.4, hx = 0.5, hy = 0.4;
  const reduced = typeof window !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  onMount(() => {
    const c = canvas;
    const ctx = c.getContext('2d', { alpha: true });

    function size() {
      w = c.width = window.innerWidth;
      h = c.height = Math.max(window.innerHeight * 0.76, 460);
    }
    size();
    window.addEventListener('resize', size);

    function toLocal(e) {
      const r = c.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height
      };
    }

    function onPointerMove(e) {
      const p = toLocal(e);
      targetX = p.x;
      targetY = p.y;
    }

    function onTouchMove(e) {
      const t0 = e.touches[0];
      if (!t0) return;
      const r = c.getBoundingClientRect();
      targetX = (t0.clientX - r.left) / r.width;
      targetY = (t0.clientY - r.top) / r.height;
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    function halo(time) {
      t = time * 0.001;
      // ease toward pointer
      hx += (targetX - hx) * 0.06;
      hy += (targetY - hy) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const auras = [
        {
          x: w * hx + 24 * Math.sin(t * 0.6),
          y: h * hy + 18 * Math.cos(t * 0.5),
          r: Math.min(w, h) * 0.85,
          c1: 'rgba(231,59,163,0.30)',
          c2: 'rgba(108,43,217,0.24)',
          c3: 'rgba(28,197,220,0.18)'
        },
        {
          x: w * (0.15 + 0.7 * hx),
          y: h * (0.2 + 0.5 * hy),
          r: Math.min(w, h) * 0.65,
          c1: 'rgba(28,197,220,0.20)',
          c2: 'rgba(231,59,163,0.18)',
          c3: 'rgba(0,0,0,0)'
        },
        {
          x: w * (0.85 - 0.6 * hx),
          y: h * (0.9 - 0.5 * hy),
          r: Math.min(w, h) * 0.75,
          c1: 'rgba(108,43,217,0.16)',
          c2: 'rgba(255,209,102,0.14)',
          c3: 'rgba(0,0,0,0)'
        }
      ];

      ctx.globalCompositeOperation = 'lighter';
      for (const p of auras) {
        const g = ctx.createRadialGradient(p.x, p.y, p.r * 0.05, p.x, p.y, p.r);
        g.addColorStop(0, p.c1);
        g.addColorStop(0.55, p.c2);
        g.addColorStop(1, p.c3);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // twinkles with slow drift
      for (let i = 0; i < 50; i++) {
        const x = (i * 41 + ((t * 30) % w)) % w;
        const y = (i * 57 + ((t * 22) % h)) % h;
        const a = 0.15 + 0.15 * Math.sin(t + i * 0.7);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.35})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + 0.6 * Math.sin(t * 2 + i), 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) requestAnimationFrame(halo);
    }

    if (!reduced) requestAnimationFrame(halo);

    return () => {
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  });
</script>

<canvas
  bind:this={canvas}
  id="halo"
  aria-hidden="true"
  style="position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none;"
></canvas>
