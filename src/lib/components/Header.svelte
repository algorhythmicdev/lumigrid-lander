<script>
  import { bindBrandSelect, bindThemeToggle } from '$lib/fx.js';
  import { onDestroy, onMount } from 'svelte';
  let brandSel;
  let themeBtn;
  let themeMode = 'dark';
  let cleanupTheme;
  let mediaCleanup;
  let menuOpen = false;
  let isCompact = false;
  let releaseScroll;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  const closeMenu = () => {
    menuOpen = false;
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };
  onMount(() => {
    bindBrandSelect(brandSel);
    cleanupTheme = bindThemeToggle(themeBtn, (mode) => (themeMode = mode));
    window.addEventListener('keydown', handleKeydown);
    const media = window.matchMedia('(min-width: 900px)');
    isCompact = !media.matches;
    const handleMediaChange = (event) => {
      isCompact = !event.matches;
      if (event.matches) closeMenu();
    };
    media.addEventListener('change', handleMediaChange);
    mediaCleanup = () => media.removeEventListener('change', handleMediaChange);
  });
  $: {
    if (typeof document !== 'undefined') {
      if (menuOpen && isCompact) {
        document.documentElement.dataset.navOpen = 'true';
        if (!releaseScroll) {
          const previousOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          releaseScroll = () => {
            document.body.style.overflow = previousOverflow;
          };
        }
      } else {
        delete document.documentElement.dataset.navOpen;
        releaseScroll?.();
        releaseScroll = undefined;
      }
    }
  }

  onDestroy(() => {
    cleanupTheme?.();
    window.removeEventListener('keydown', handleKeydown);
    mediaCleanup?.();
    if (typeof document !== 'undefined') {
      delete document.documentElement.dataset.navOpen;
    }
    releaseScroll?.();
    releaseScroll = undefined;
  });
</script>
<nav class="glass top-nav" data-open={menuOpen}>
  <a href="/" class="h2 text-gradient brand" on:click={closeMenu}>LumiGrid</a>
  <div
    id="header-menu"
    class="nav-controls"
    aria-hidden={isCompact && !menuOpen}
    inert={isCompact && !menuOpen}
  >
    <div class="nav-tools">
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
    <a class="btn primary cta" href="#contact" on:click={closeMenu}>Contact</a>
  </div>
  <button
    class="menu-toggle"
    type="button"
    aria-expanded={menuOpen}
    aria-controls="header-menu"
    on:click={toggleMenu}
  >
    <span class="sr-only">Toggle navigation</span>
    <span class="menu-icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  </button>
</nav>
{#if isCompact}
  <div class="nav-overlay" data-open={menuOpen} aria-hidden="true" on:click={closeMenu}></div>
{/if}
