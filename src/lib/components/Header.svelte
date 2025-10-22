<script>
  import { bindBrandSelect, bindThemeToggle, bindTTS } from '$lib/fx.js';
  import { onDestroy, onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  let brandSel;
  let themeBtn;
  let ttsBtn;
  let navControls;
  let navTools;
  let themeMode = 'dark';
  let cleanupTheme;
  let mediaCleanup;
  let resizeObservers = [];
  let releaseResize;
  let releaseTTS;
  let menuOpen = false;
  let isViewportCompact = false;
  let isOverflowCompact = false;
  let isCompact = false;
  let releaseScroll;
  let supportsTTS = false;
  let media;
  let releaseFonts;

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

  const updateCompact = (value) => {
    if (isCompact === value) return;
    isCompact = value;
    if (!value) {
      closeMenu();
    }
  };

  const hasWrappedChildren = (node) => {
    if (!node) return false;
    const children = Array.from(node.children);
    if (children.length < 2) return false;
    const firstTop = children[0]?.offsetTop ?? 0;
    return children.some((child) => Math.abs(child.offsetTop - firstTop) > 1);
  };

  const evaluateOverflowCompact = () => {
    if (!navControls || !media) {
      isOverflowCompact = false;
      updateCompact(isViewportCompact);
      return;
    }
    if (!media.matches) {
      isOverflowCompact = false;
      updateCompact(true);
      return;
    }
    const { scrollWidth, clientWidth } = navControls;
    const wrappedControls = hasWrappedChildren(navControls);
    const wrappedTools = hasWrappedChildren(navTools);
    isOverflowCompact = scrollWidth - clientWidth > 1 || wrappedControls || wrappedTools;
    updateCompact(isViewportCompact || isOverflowCompact);
  };

  const syncViewportCompact = () => {
    isViewportCompact = !media?.matches;
    updateCompact(isViewportCompact || isOverflowCompact);
  };

  const disconnectResizeObservers = () => {
    resizeObservers.forEach((observer) => observer.disconnect());
    resizeObservers = [];
  };

  const handleResize = () => evaluateOverflowCompact();

  onMount(async () => {
    bindBrandSelect(brandSel);
    cleanupTheme = bindThemeToggle(themeBtn, (mode) => (themeMode = mode));
    window.addEventListener('keydown', handleKeydown);
    media = window.matchMedia('(min-width: 900px)');
    syncViewportCompact();
    const handleMediaChange = (event) => {
      syncViewportCompact();
      if (event.matches) {
        evaluateOverflowCompact();
      }
    };
    media.addEventListener('change', handleMediaChange);
    mediaCleanup = () => media.removeEventListener('change', handleMediaChange);
    const hasTTS = 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';
    supportsTTS = hasTTS;
    await tick();
    if (hasTTS) {
      releaseTTS = bindTTS(ttsBtn);
    } else if (ttsBtn) {
      ttsBtn.dataset.tts = 'unavailable';
      ttsBtn.setAttribute('aria-pressed', 'false');
    }
    evaluateOverflowCompact();
    if (typeof ResizeObserver === 'function') {
      disconnectResizeObservers();
      const observe = (node) => {
        if (!node) return;
        const observer = new ResizeObserver(handleResize);
        observer.observe(node);
        resizeObservers.push(observer);
      };
      observe(navControls);
      observe(navTools);
    } else {
      window.addEventListener('resize', handleResize);
      releaseResize = () => window.removeEventListener('resize', handleResize);
    }
    const fonts = typeof document !== 'undefined' ? document.fonts : undefined;
    if (fonts) {
      const handleFontEvent = () => evaluateOverflowCompact();
      const ready = fonts.ready;
      if (ready && typeof ready.then === 'function') {
        ready.then(handleFontEvent).catch(() => {});
      }
      if (typeof fonts.addEventListener === 'function') {
        fonts.addEventListener('loadingdone', handleFontEvent);
        fonts.addEventListener('loadingerror', handleFontEvent);
        releaseFonts = () => {
          fonts.removeEventListener('loadingdone', handleFontEvent);
          fonts.removeEventListener('loadingerror', handleFontEvent);
        };
      }
    }
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
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeydown);
    }
    mediaCleanup?.();
    disconnectResizeObservers();
    releaseResize?.();
    releaseResize = undefined;
    releaseTTS?.();
    releaseFonts?.();
    releaseFonts = undefined;
    if (typeof document !== 'undefined') {
      delete document.documentElement.dataset.navOpen;
    }
    releaseScroll?.();
    releaseScroll = undefined;
  });
</script>
<nav class="glass top-nav" data-open={menuOpen} data-compact={isCompact}>
  <span class="nav-halo" aria-hidden="true"></span>
  <a href="/" class="h2 text-gradient brand" on:click={closeMenu}>LumiGrid</a>
  <div
    id="header-menu"
    class="nav-controls"
    bind:this={navControls}
    aria-hidden={isCompact && !menuOpen}
    inert={isCompact && !menuOpen}
  >
    <div class="nav-tools" bind:this={navTools}>
      <label class="sr-only" for="brandTheme">Brand theme</label>
      <select id="brandTheme" bind:this={brandSel}>
        <option value="rf">RF Default</option>
        <option value="contrast">High-Contrast Cyan</option>
        <option value="warm">Warm Magenta</option>
      </select>
      <button
        class="btn ghost tts-toggle"
        type="button"
        bind:this={ttsBtn}
        aria-pressed="false"
        aria-disabled={!supportsTTS}
        data-tts={supportsTTS ? 'off' : 'unavailable'}
        data-label-off="Read aloud"
        data-label-on="Reading"
        disabled={!supportsTTS}
        title={
          supportsTTS
            ? 'Toggle read-aloud mode. When enabled, double-click text to hear it.'
            : 'Read-aloud mode is unavailable in this browser.'
        }
      >
        <span class="btn-icon" aria-hidden="true">🔊</span>
        <span class="btn-label" data-tts-label>Read aloud</span>
        <span class="btn-indicator" data-tts-indicator aria-hidden="true"></span>
        {#if !supportsTTS}
          <span class="btn-hint" aria-hidden="true">Unavailable</span>
          <span class="sr-only">Speech synthesis is not supported in this browser.</span>
        {/if}
      </button>
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
    <a class="btn primary cta" href="#vision" on:click={closeMenu}>Vision</a>
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
{#if isCompact && menuOpen}
  <div
    class="nav-overlay"
    aria-hidden="true"
    on:click={closeMenu}
    transition:fade={{ duration: 200 }}
  ></div>
{/if}
