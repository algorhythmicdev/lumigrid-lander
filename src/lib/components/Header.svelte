<script>
  import { bindBrandSelect, bindThemeToggle, bindTTS } from '$lib/fx.js';
  import { onMount } from 'svelte';
  let brandSel; let themeBtn; let ttsBtn;
  onMount(()=>{ bindBrandSelect(brandSel); bindThemeToggle(themeBtn); bindTTS(ttsBtn); });
</script>
<nav class="glass" style="position:sticky;top:.75rem;display:grid;grid-template-columns:1fr auto auto;gap:.75rem;padding:.75rem;border-radius:1rem;">
  <a href="/" class="h2 text-gradient" style="text-decoration:none;font-weight:800;">LumiGrid</a>
  <div style="display:flex;gap:.5rem;align-items:center;">
    <label class="sr-only" for="brandTheme">Brand theme</label>
    <select id="brandTheme" bind:this={brandSel} style="max-width:180px">
      <option value="rf">RF Default</option>
      <option value="contrast">High-Contrast Cyan</option>
      <option value="warm">Warm Magenta</option>
    </select>
    <button id="ttsToggle" bind:this={ttsBtn} class="btn ghost" aria-pressed="false" aria-label="Read text aloud">Read</button>
    <button id="themeToggle" bind:this={themeBtn} class="btn ghost" aria-pressed="false" aria-label="Toggle dark/light">Theme</button>
  </div>
  <a class="btn primary" href="#contact">Contact</a>
</nav>
