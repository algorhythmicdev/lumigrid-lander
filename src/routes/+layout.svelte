<script>
  import { onMount } from 'svelte';

  function startFX() {
    const cvs = document.getElementById('lg-fx');
    if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: true });

    const DPR = Math.max(1, devicePixelRatio || 1);
    function resize() {
      cvs.width = Math.floor(innerWidth * DPR);
      cvs.height = Math.floor(innerHeight * DPR);
      cvs.style.width = innerWidth + 'px';
      cvs.style.height = innerHeight + 'px';
    }
    resize();
    addEventListener('resize', resize, { passive: true });

    let raf;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    function frame(time) {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = 'lighter';
      const cx = cvs.width * 0.3;
      const cy = cvs.height * 0.35;
      const g = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(cvs.width, cvs.height) * 0.6
      );
      g.addColorStop(0, 'rgba(231,59,163,0.16)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      if (!reduce.matches) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!document.hidden && !raf && !reduce.matches) {
        raf = requestAnimationFrame(frame);
      }
    });
  }

  onMount(startFX);
</script>

<canvas
  id="lg-fx"
  aria-hidden="true"
  style="position:fixed;inset:0;z-index:-1;pointer-events:none"
></canvas>
<slot />
