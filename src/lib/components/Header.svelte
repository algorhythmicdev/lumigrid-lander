<script>
  import { bindBrandSelect, bindThemeToggle } from '$lib/fx.js';
  import { onDestroy, onMount } from 'svelte';
  let brandSel;
  let themeBtn;
  let themeMode = 'dark';
  let cleanupTheme;
  onMount(() => {
    bindBrandSelect(brandSel);
    cleanupTheme = bindThemeToggle(themeBtn, (mode) => (themeMode = mode));
  });
  onDestroy(() => {
    cleanupTheme?.();
  });
</script>
<nav class="glass top-nav">
  <a href="/" class="h2 text-gradient brand">LumiGrid</a>
  <div class="nav-controls">
    <label class="sr-only" for="brandTheme">Brand theme</label>
    <select id="brandTheme" bind:this={brandSel}>
      <option value="rf">RF Default</option>
      <option value="contrast">High-Contrast Cyan</option>
      <option value="warm">Warm Magenta</option>
    </select>
    <button
      id="themeToggle"
      bind:this={themeBtn}
      class="btn ghost theme-toggle"
      type="button"
      aria-pressed={themeMode === 'dark'}
      aria-label="Toggle dark or light theme"
      data-theme={themeMode}
    >
      <span class="btn-icon" aria-hidden="true">{themeMode === 'dark' ? '🌙' : '☀️'}</span>
      <span class="btn-label">{themeMode === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  </div>
  <a class="btn primary cta" href="#contact">Contact</a>
</nav>
