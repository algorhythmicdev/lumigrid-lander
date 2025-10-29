<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  onMount(() => {
    // Button ripple position (for a bit of delight)
    function handlePointerMove(e: PointerEvent) {
      const t = (e.target as HTMLElement).closest('.btn');
      if (!t) return;
      const r = t.getBoundingClientRect();
      (t as HTMLElement).style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      (t as HTMLElement).style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    }

    document.addEventListener('pointermove', handlePointerMove);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  });
</script>

<nav
  class="header"
  aria-label="Primary"
  style="position:sticky;top:0;z-index:10;padding:.6rem 0"
>
  <div class="container" style="display:grid;grid-template-columns:1fr auto;gap:.75rem;align-items:center;">
    <a href="#hero" class="btn brand" aria-label="LumiGrid Home">
      <img src={`${base}/icons/icon.svg`} alt="" class="brand-mark" aria-hidden="true" />
      <span class="brand-label">LumiGrid</span>
    </a>
    <div style="display:flex;gap:.5rem;align-items:center;">
      <a class="btn ghost" href="#what">What it is</a>
      <a class="btn ghost" href="#cases">Cases</a>
      <a class="btn ghost" href="#press">Press</a>
      <a class="btn primary" href="#contact">Contact</a>
    </div>
  </div>
</nav>
