<script>
  import { onMount } from 'svelte';

  let bar;
  let frame = 0;

  onMount(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const update = () => {
      if (!bar) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollHeight <= clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  });
</script>

<div class="progress-wrap" aria-hidden="true">
  <div class="progress-bar" bind:this={bar}></div>
</div>

<style>
  .progress-wrap {
    position: fixed;
    inset: 0 0 auto 0;
    height: 3px;
    z-index: 100;
    pointer-events: none;
    background: transparent;
  }

  .progress-bar {
    height: 100%;
    width: 100%;
    transform: scaleX(0);
    transform-origin: left center;
    background: linear-gradient(90deg, var(--a), var(--b), var(--c));
    transition: transform 0.12s ease;
  }
</style>
