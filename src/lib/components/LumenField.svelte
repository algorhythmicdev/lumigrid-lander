<script>
  import { onMount } from 'svelte';

  export let density = 28;
  export let intensity = 1.0;
  export let parallax = 0.05;
  export let hue = 285;

  let dots;
  let glows;
  let wires;
  let DPR = 1;
  let Rmax = 0;
  let raf;
  let reduce;
  let currentHue = hue;
  let styleObserver;
  const mouse = { x: 0.5, y: 0.5 };
  const WIRE_COUNT = 7;
  let wireSeeds = [];

  const fract = (value) => value - Math.floor(value);

  function seeded(index, offset) {
    return fract(Math.sin(index * 134.97 + offset * 31.33) * 43758.5453);
  }

  function size(canvas) {
    if (!canvas) return;
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    DPR = Math.max(1, devicePixelRatio || 1);
    canvas.width = innerWidth * DPR;
    canvas.height = innerHeight * DPR;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
  }

  function drawDots(ctx, time, baseHue) {
    if (!ctx) return;
    const d = density * DPR;
    const r = 0.6 * DPR;
    const phase = (reduce?.matches ? 0 : time) * 0.00025;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    for (let y = r; y < ctx.canvas.height; y += d) {
      for (let x = r; x < ctx.canvas.width; x += d) {
        const h = baseHue + 40 * Math.sin((x + y) * 0.0009 + phase);
        ctx.fillStyle = `oklch(85% .08 ${h} / ${0.16 * intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawGlows(ctx, time, baseHue) {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    const phase = (reduce?.matches ? 0 : time) * 0.00012;
    const tiltX = (mouse.x - 0.5) * parallax;
    const tiltY = (mouse.y - 0.5) * parallax;

    const orbs = [
      { h: baseHue + 35, s: 0.16, rx: 0.32 + tiltX, ry: 0.4 + tiltY, r: 0.52 },
      { h: baseHue - 25, s: 0.16, rx: 0.68 - tiltX, ry: 0.6 - tiltY, r: 0.78 },
      { h: baseHue - 80, s: 0.16, rx: 0.5 - tiltX * 0.5, ry: 0.78 + tiltY * 0.5, r: 0.62 }
    ];

    for (let i = 0; i < orbs.length; i += 1) {
      const orb = orbs[i];
      const a = phase + i * 1.33;
      const cx = ctx.canvas.width * (orb.rx + 0.05 * Math.cos(a + i));
      const cy = ctx.canvas.height * (orb.ry + 0.07 * Math.sin(a * 0.9 + i));
      const radius = Rmax * orb.r;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `oklch(70% ${orb.s} ${orb.h} / ${0.18 * intensity})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    const v = ctx.createRadialGradient(
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      Rmax * 0.2,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      Rmax * 0.9
    );
    v.addColorStop(0, 'transparent');
    v.addColorStop(1, `rgba(0,0,0,${0.22 * intensity})`);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawWires(ctx, time, baseHue) {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = Math.max(1, 1.2 * DPR);
    const phase = (reduce?.matches ? 0 : time) * 0.0002;

    for (let i = 0; i < WIRE_COUNT; i += 1) {
      const p = (i + 1) / WIRE_COUNT;
      const hueShift = Math.sin(phase + i * 1.1) * 30;
      const colour = `oklch(86% .12 ${baseHue + hueShift} / ${0.14 * intensity})`;
      const seed = wireSeeds[i] ?? { x1: seeded(i + 1, 0.37), x2: seeded(i + 1, 0.71) };
      wireSeeds[i] = seed;
      const x1 = ctx.canvas.width * (0.2 + 0.6 * seed.x1);
      const x2 = ctx.canvas.width * (0.2 + 0.6 * seed.x2);
      const y1 = ctx.canvas.height * (p * 0.9);
      const y2 = ctx.canvas.height * ((1 - p) * 0.9);
      const c1x = (x1 + x2) / 2 + Math.sin(phase * 3 + i) * 120 * DPR;
      const c1y = (y1 + y2) / 2 + Math.cos(phase * 2.5 + i) * 80 * DPR;

      ctx.strokeStyle = colour;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(c1x, c1y, c1x, c1y, x2, y2);
      ctx.stroke();
    }
  }

  function render(time) {
    const root = typeof document !== 'undefined' ? document.documentElement : null;
    const cssHue = root
      ? parseFloat(getComputedStyle(root).getPropertyValue('--ambient-hue')) || hue
      : hue;
    currentHue += (cssHue - currentHue) * 0.08;

    drawDots(dots?.getContext('2d'), time, currentHue);
    drawGlows(glows?.getContext('2d'), time, currentHue);
    drawWires(wires?.getContext('2d'), time, currentHue);
  }

  function loop(time) {
    render(time);
    if (reduce?.matches) {
      raf = undefined;
      return;
    }
    raf = requestAnimationFrame(loop);
  }

  onMount(() => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const resize = () => {
      [dots, glows, wires].forEach(size);
      Rmax = Math.max(dots?.width ?? 0, dots?.height ?? 0);
      render(performance.now());
    };

    wireSeeds = Array.from({ length: WIRE_COUNT }, (_, i) => ({
      x1: seeded(i + 1, 0.37),
      x2: seeded(i + 1, 0.71)
    }));

    reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (typeof MutationObserver !== 'undefined') {
      styleObserver = new MutationObserver(() => {
        if (reduce?.matches) {
          render(performance.now());
        }
      });
      styleObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    resize();
    render(performance.now());

    const handlePointer = (event) => {
      const rect = glows?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = (event.clientX - rect.left) / rect.width;
      mouse.y = (event.clientY - rect.top) / rect.height;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });

    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      if (reduce?.matches) {
        raf = undefined;
        render(performance.now());
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    start();

    const handleReduce = (event) => {
      if (event.matches) {
        if (raf) cancelAnimationFrame(raf);
        raf = undefined;
        render(performance.now());
      } else {
        start();
      }
    };

    if (reduce?.addEventListener) {
      reduce.addEventListener('change', handleReduce);
    } else if (reduce?.addListener) {
      reduce.addListener(handleReduce);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      styleObserver?.disconnect();
      styleObserver = undefined;
      if (reduce?.removeEventListener) {
        reduce.removeEventListener('change', handleReduce);
      } else if (reduce?.removeListener) {
        reduce.removeListener(handleReduce);
      }
    };
  });
</script>

<canvas bind:this={dots} aria-hidden="true" style="position:fixed;inset:0;z-index:-3;pointer-events:none"></canvas>
<canvas bind:this={glows} aria-hidden="true" style="position:fixed;inset:0;z-index:-2;pointer-events:none"></canvas>
<canvas bind:this={wires} aria-hidden="true" style="position:fixed;inset:0;z-index:-1;pointer-events:none"></canvas>
