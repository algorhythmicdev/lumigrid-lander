<script>
  import { onMount } from 'svelte';

  export let density = 28; // dot pitch in px
  let canvas;

  onMount(() => {
    const c = canvas;
    const ctx = c.getContext('2d', { alpha: true });
    let dpr = Math.max(1, devicePixelRatio || 1);

    const defaults = { hue: 285, glowSoft: 0.16, glowStrong: 0.24 };
    let tokens = { ...defaults };
    const clampAlpha = (value, fallback) => {
      const safe = Number.isFinite(value) ? value : fallback;
      return Math.min(1, Math.max(0, safe));
    };

    let raf;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let lastSample = 0;

    const readTokens = () => {
      const styles = getComputedStyle(root);
      const valueOf = (name, fallback) => {
        const raw = styles.getPropertyValue(name);
        const parsed = Number.parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : fallback;
      };

      tokens = {
        hue: valueOf('--glow-hue', tokens.hue ?? defaults.hue),
        glowSoft: valueOf('--glow-soft', tokens.glowSoft ?? defaults.glowSoft),
        glowStrong: valueOf('--glow-strong', tokens.glowStrong ?? defaults.glowStrong)
      };
    };

    readTokens();

    const drawFrame = (t = 0) => {
      const { hue, glowSoft, glowStrong } = tokens;
      const baseHue = Number.isFinite(hue) ? hue : defaults.hue;
      const haloAlpha = clampAlpha(glowSoft, defaults.glowSoft);
      const dotAlpha = clampAlpha(glowStrong, defaults.glowStrong);

      ctx.clearRect(0, 0, c.width, c.height);

      // LED dot grid
      const d = density * dpr;
      const r = 0.6 * dpr;
      const phase = t * 0.0003;
      ctx.globalCompositeOperation = 'source-over';

      for (let y = r; y < c.height; y += d) {
        for (let x = r; x < c.width; x += d) {
          const hueShift = 40 * Math.sin((x + y) * 0.0008 + phase);
          ctx.fillStyle = `oklch(85% .08 ${baseHue + hueShift} / ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Big halos (lighter)
      ctx.globalCompositeOperation = 'lighter';

      const orbs = [
        { h: 318, s: 0.16, rx: 0.35, ry: 0.4, r: 0.55 },
        { h: 260, s: 0.16, rx: 0.62, ry: 0.58, r: 0.75 },
        { h: 200, s: 0.16, rx: 0.48, ry: 0.72, r: 0.65 }
      ].map((o) => ({
        ...o,
        h: (o.h * 2 + baseHue) / 3
      }));

      orbs.forEach((o, i) => {
        const a = phase + i * 1.2;
        const cx = c.width * (o.rx + 0.05 * Math.cos(a + i));
        const cy = c.height * (o.ry + 0.07 * Math.sin(a * 0.9 + i));
        const R = Math.max(c.width, c.height) * o.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, `oklch(70% ${o.s} ${o.h} / ${haloAlpha})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, c.width, c.height);
      });

    };

    const resize = () => {
      dpr = Math.max(1, devicePixelRatio || 1);
      c.width = innerWidth * dpr;
      c.height = innerHeight * dpr;
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';

      if (reduce.matches) {
        drawFrame();
      }
    };

    resize();
    addEventListener('resize', resize, { passive: true });

    const frame = (t) => {
      if (t - lastSample > 240) {
        readTokens();
        lastSample = t;
      }
      drawFrame(t);

      if (!reduce.matches) {
        raf = requestAnimationFrame(frame);
      }
    };

    const start = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = undefined;
      }

      readTokens();
      if (reduce.matches) {
        drawFrame();
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const handlePreference = () => {
      start();
    };

    const hueObserver = new MutationObserver(() => {
      readTokens();
      if (reduce.matches) {
        drawFrame();
      }
    });
    hueObserver.observe(root, { attributes: true, attributeFilter: ['style'] });

    if (typeof reduce.addEventListener === 'function') {
      reduce.addEventListener('change', handlePreference);
    } else if (typeof reduce.addListener === 'function') {
      reduce.addListener(handlePreference);
    }

    start();

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }

      removeEventListener('resize', resize);

      hueObserver.disconnect();

      if (typeof reduce.removeEventListener === 'function') {
        reduce.removeEventListener('change', handlePreference);
      } else if (typeof reduce.removeListener === 'function') {
        reduce.removeListener(handlePreference);
      }
    };
  });
</script>

<canvas
  bind:this={canvas}
  aria-hidden="true"
  style="position:fixed;inset:0;z-index:-1;pointer-events:none"
></canvas>
