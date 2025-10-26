<script>
  import { onMount } from 'svelte';
  export let density = 28;
  export let parallax = 0.05;

  let canvas, mouse = { x: 0.5, y: 0.5 };
  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = (e.clientY - r.top) / r.height;
  }

  onMount(() => {
    const c = canvas;
    const ctx = c.getContext('2d', { alpha: true });
    const DPR = Math.max(1, devicePixelRatio || 1);
    const resize = () => {
      c.width = innerWidth * DPR;
      c.height = innerHeight * DPR;
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const start = () => {
      if (!raf && !reduce.matches) {
        raf = requestAnimationFrame(frame);
      }
    };
    const frame = (t) => {
      ctx.clearRect(0, 0, c.width, c.height);
      const d = density * DPR;
      const r = 0.6 * DPR;
      const phase = t * 0.00025;
      ctx.globalCompositeOperation = 'source-over';
      for (let y = r; y < c.height; y += d) {
        for (let x = r; x < c.width; x += d) {
          const hue = 200 + 60 * Math.sin((x + y) * 0.0009 + phase);
          ctx.fillStyle = `oklch(85% .08 ${hue} / 0.22)`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = 'lighter';
      const tiltX = (mouse.x - 0.5) * parallax;
      const tiltY = (mouse.y - 0.5) * parallax;
      const orbs = [
        { h: 318, s: 0.16, rx: 0.35 + tiltX, ry: 0.4 + tiltY, r: 0.55 },
        { h: 260, s: 0.16, rx: 0.62 - tiltX, ry: 0.58 - tiltY, r: 0.75 },
        { h: 200, s: 0.16, rx: 0.48 - tiltX * 0.5, ry: 0.72 + tiltY * 0.5, r: 0.65 }
      ];
      const Rmax = Math.max(c.width, c.height);
      orbs.forEach((o, i) => {
        const a = phase + i * 1.3;
        const cx = c.width * (o.rx + 0.05 * Math.cos(a + i));
        const cy = c.height * (o.ry + 0.07 * Math.sin(a * 0.9 + i));
        const R = Rmax * o.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, `oklch(70% ${o.s} ${o.h} / 0.16)`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, c.width, c.height);
      });
      const v = ctx.createRadialGradient(
        c.width / 2,
        c.height / 2,
        Rmax * 0.2,
        c.width / 2,
        c.height / 2,
        Rmax * 0.9
      );
      v.addColorStop(0, 'transparent');
      v.addColorStop(1, 'rgba(0,0,0,.22)');
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, c.width, c.height);

      if (!reduce.matches) {
        raf = requestAnimationFrame(frame);
      } else {
        stop();
      }
    };
    start();

    const handleReduce = () => {
      if (reduce.matches) {
        stop();
      } else {
        start();
      }
    };
    if ('addEventListener' in reduce) {
      reduce.addEventListener('change', handleReduce);
    } else if ('addListener' in reduce) {
      reduce.addListener(handleReduce);
    }

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      if ('removeEventListener' in reduce) {
        reduce.removeEventListener('change', handleReduce);
      } else if ('removeListener' in reduce) {
        reduce.removeListener(handleReduce);
      }
    };
  });
</script>

<canvas
  bind:this={canvas}
  aria-hidden="true"
  style="position:fixed;inset:0;z-index:-1;pointer-events:none"
></canvas>
