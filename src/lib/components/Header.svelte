<script>
  import { base } from '$app/paths';
  import { onMount, tick } from 'svelte';
  import { runtimeBase } from '$lib/utils/basepath';
  import { bindTTS, bindThemeToggle } from '$lib/fx.js';

  let showNav = false;
  let theme = 'dark';
  let themeLabel = 'Use light theme';
  let resolvedBase = base;
  let themeButton;
  let readButton;
  let menuButton;
  let transparencyButton;
  let navEl;
  let menuLabel = 'Open navigation menu';
  let cleanupTheme = () => {};
  let cleanupTTS = () => {};
  let cleanupDocumentHandlers = () => {};
  let cleanupTransparencyPreference = () => {};
  let ttsSupported = false;
  let lowTransparency = false;

  const setLowTransparency = (value) => {
    if (lowTransparency === value) return;
    lowTransparency = value;
    if (typeof document !== 'undefined') {
      document.documentElement.toggleAttribute('data-lowtrans', value);
    }
  };

  const toggleTransparency = () => {
    setLowTransparency(!lowTransparency);
  };

  onMount(() => {
    resolvedBase = base || runtimeBase();
    if (themeButton) {
      cleanupTheme = bindThemeToggle(themeButton, (value) => {
        theme = value;
      });
    }
    const supportsTTS =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof window.SpeechSynthesisUtterance === 'function';

    if (supportsTTS) {
      ttsSupported = true;
      tick().then(() => {
        if (readButton) {
          cleanupTTS = bindTTS(readButton);
        }
      });
    }
    const handleClick = (event) => {
      if (!showNav) return;
      const target = event.target;
      const element = target instanceof Element ? target : target?.parentElement;

      if (element && navEl?.contains(element)) {
        if (element.closest('a')) {
          showNav = false;
          tick().then(() => menuButton?.focus());
        }
        return;
      }
      if (!menuButton?.contains(target instanceof Node ? target : null)) {
        showNav = false;
      }
    };

    const handleFocusIn = (event) => {
      if (!showNav) return;
      const target = event.target;
      if (!navEl?.contains(target) && !menuButton?.contains(target)) {
        showNav = false;
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape' && showNav) {
        showNav = false;
        tick().then(() => menuButton?.focus());
      }
    };

    if (typeof matchMedia === 'function') {
      const reduceTransparencyQuery = matchMedia('(prefers-reduced-transparency: reduce)');
      setLowTransparency(
        document.documentElement.hasAttribute('data-lowtrans') || reduceTransparencyQuery.matches
      );
      const handleTransparencyChange = (event) => {
        setLowTransparency(event.matches);
      };
      reduceTransparencyQuery.addEventListener('change', handleTransparencyChange);
      cleanupTransparencyPreference = () => {
        reduceTransparencyQuery.removeEventListener('change', handleTransparencyChange);
      };
    } else if (typeof document !== 'undefined') {
      setLowTransparency(document.documentElement.hasAttribute('data-lowtrans'));
    }

    document.addEventListener('click', handleClick, true);
    document.addEventListener('focusin', handleFocusIn, true);
    document.addEventListener('keydown', handleKeydown);
    cleanupDocumentHandlers = () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('focusin', handleFocusIn, true);
      document.removeEventListener('keydown', handleKeydown);
    };
    return () => {
      cleanupTheme?.();
      cleanupTTS?.();
      cleanupDocumentHandlers?.();
      cleanupTransparencyPreference?.();
    };
  });

  $: if (themeButton) {
    themeButton.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  $: themeLabel = theme === 'dark' ? 'Use light theme' : 'Use dark theme';
  $: menuLabel = showNav ? 'Close navigation menu' : 'Open navigation menu';
</script>

<a href="#main" class="skip-link">Skip to main content</a>

<div class="util">
  <div class="util-inner container">
    <a href={`${resolvedBase}/`} class="btn" aria-label="Home">LumiGrid</a>
    <div class="spacer"></div>
    <button
      class="btn"
      type="button"
      bind:this={themeButton}
      data-theme={theme}
      aria-pressed={theme === 'dark'}
    >
      <span class="dot" aria-hidden="true"></span>
      <span class="btn-label">{themeLabel}</span>
    </button>
    <button
      class="btn"
      type="button"
      bind:this={transparencyButton}
      aria-pressed={lowTransparency}
      on:click={toggleTransparency}
    >
      <span class="btn-label">Transparency</span>
    </button>
    {#if ttsSupported}
      <button
        class="btn"
        type="button"
        bind:this={readButton}
        data-label-on="Reading"
        data-label-off="Read"
        aria-pressed="false"
      >
        <span class="dot" data-tts-indicator aria-hidden="true" hidden></span>
        <span class="btn-label" data-tts-label>Read</span>
      </button>
    {/if}
    <button
      class="btn"
      type="button"
      bind:this={menuButton}
      aria-label={menuLabel}
      aria-haspopup="true"
      aria-controls="site-nav"
      aria-expanded={showNav}
      on:click={() => (showNav = !showNav)}
      on:keydown={(event) => {
        if (event.key === 'Escape' && showNav) {
          showNav = false;
        }
      }}
    >
      Menu
    </button>
  </div>
  <nav
    id="site-nav"
    hidden={!showNav}
    class="container"
    aria-label="Primary"
    style="padding:.5rem .75rem;"
    bind:this={navEl}
  >
    <div class="chips" role="navigation" aria-label="Sections">
      <a class="chip" href="#what">What</a>
      <a class="chip" href="#editor">Editor</a>
      <a class="chip" href="#demo">LED Demo</a>
      <a class="chip" href="#mesh">Nodes</a>
      <a class="chip" href="#contact">Contact</a>
    </div>
  </nav>
</div>
