<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { lang } from '$lib/i18n';

  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  let open = false;
  let isMobile = false;
  let menu;
  let currentLang = $lang;
  let currentTheme = 355; // default hue (cherry red)
  let lightMode = false; // light/dark theme toggle

  $: lang.set(currentLang);

  const applyTheme = (hue) => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ambient-hue', String(hue));
      currentTheme = hue;
    }
  };

  const toggleLightMode = () => {
    lightMode = !lightMode;
    if (typeof document !== 'undefined') {
      if (lightMode) {
        document.documentElement.style.setProperty('--bg-0', '#ffffff');
        document.documentElement.style.setProperty('--bg-1', '#ffffff');
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--ink', '#0b1020');
        document.documentElement.style.setProperty('--muted', '#475569');
      } else {
        document.documentElement.style.setProperty('--bg-0', '#0a0b12');
        document.documentElement.style.setProperty('--bg-1', '#0e1220');
        document.documentElement.style.setProperty('--bg', '#0b1120');
        document.documentElement.style.setProperty('--ink', '#fafafa');
        document.documentElement.style.setProperty('--muted', '#c7cfdd');
      }
    }
  };

  const toggle = () => {
    open = !open;
  };

  const close = () => {
    open = false;
  };

  const handleLinkClick = () => {
    if (isMobile) {
      close();
    }
  };

  onMount(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    const apply = (event) => {
      isMobile = event.matches;
      if (!isMobile) {
        close();
      }
    };

    apply(mq);
    mq.addEventListener('change', apply);
    window.addEventListener('keydown', handleEscape);

    return () => {
      mq.removeEventListener('change', apply);
      window.removeEventListener('keydown', handleEscape);
    };
  });

  $: menu?.toggleAttribute('inert', isMobile && !open);
</script>

<header class="header">
  <nav aria-label="Primary">
    <a href={`${base}/`} class="brand" aria-label="Reclame Fabriek — LUMIGRID LED Node">
      <img src={toAssetPath('Asset-2.png')} alt="Reclame Fabriek" class="brand-logo" />
      LUMIGRID LED Node
    </a>

    <button
      class="nav-btn"
      aria-expanded={open}
      aria-controls="menu"
      type="button"
      on:click={toggle}
    >
      Menu
    </button>

    <ul
      id="menu"
      class:open={open}
      bind:this={menu}
      data-open={open}
    >
      <li><a href={`${base}/#stories`} on:click={handleLinkClick}>Stories</a></li>
      <li><a href={`${base}/cases`} on:click={handleLinkClick}>Cases</a></li>
      <li><a href={`${base}/#press`} on:click={handleLinkClick}>Press</a></li>
      <li><a href={`${base}/contact`} on:click={handleLinkClick}>Contact</a></li>
      <li class="controls-group">
        <div class="lang-selector">
          {#each ['en','lv','ru'] as code}
            <button 
              class="lang-btn" 
              class:active={currentLang===code} 
              on:click={()=> currentLang = code}
              aria-label="Switch to {code.toUpperCase()}"
            >
              {code.toUpperCase()}
            </button>
          {/each}
        </div>
        <div class="theme-selector">
          <button 
            class="theme-btn" 
            class:active={currentTheme===355} 
            on:click={()=> applyTheme(355)}
            aria-label="Cherry red theme"
            style="--theme-color: hsl(355, 70%, 55%)"
          ></button>
          <button 
            class="theme-btn" 
            class:active={currentTheme===200} 
            on:click={()=> applyTheme(200)}
            aria-label="Cyan theme"
            style="--theme-color: hsl(200, 70%, 70%)"
          ></button>
          <button 
            class="theme-btn" 
            class:active={currentTheme===340} 
            on:click={()=> applyTheme(340)}
            aria-label="Magenta theme"
            style="--theme-color: hsl(340, 70%, 70%)"
          ></button>
        </div>
        <button 
          class="light-mode-btn" 
          class:active={lightMode}
          on:click={toggleLightMode}
          aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
          title={lightMode ? "Dark mode" : "Light mode"}
        >
          {#if lightMode}🌙{:else}☀️{/if}
        </button>
      </li>
    </ul>
  </nav>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 40;
    background: transparent;
    backdrop-filter: none;
  }

  .header::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.02),
      rgba(255, 255, 255, 0.18)
    );
    opacity: 0.5;
    pointer-events: none;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem clamp(1rem, 4vw, 2rem);
  }

  .brand {
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--ink);
    text-decoration: none;
    font-size: clamp(1rem, 2vw, 1.2rem);
    transition: opacity var(--dur-fast) var(--ease-out);
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .brand:hover {
    opacity: 0.84;
  }

  .brand-logo {
    height: 2rem;
    width: auto;
  }

  .nav-btn {
    margin-left: auto;
    display: none;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 0.6rem;
    padding: 0.35rem 0.75rem;
    color: var(--ink);
    font-size: 0.95rem;
  }

  ul {
    display: flex;
    gap: 0.8rem;
    margin: 0 0 0 auto;
    padding: 0;
    list-style: none;
    align-items: center;
  }

  li {
    margin: 0;
  }

  a {
    color: var(--ink);
    text-decoration: none;
    padding: 0.45rem 0.75rem;
    border-radius: 0.6rem;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0.3rem;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--rf-cyan), var(--rf-magenta));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--dur-fast) var(--ease-out);
  }

  a:hover::after,
  a:focus-visible::after {
    transform: scaleX(1);
  }

  .brand::after {
    display: none;
  }

  .controls-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .lang-selector,
  .theme-selector {
    display: flex;
    gap: 0.3rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 0.6rem;
    padding: 0.3rem;
  }

  .lang-btn,
  .theme-btn {
    background: transparent;
    border: none;
    color: var(--ink);
    padding: 0.35rem 0.6rem;
    border-radius: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--dur-fast) var(--ease-out);
  }

  .lang-btn:hover,
  .theme-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .lang-btn.active {
    background: var(--grad-rf);
    color: #071117;
  }

  .theme-btn {
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .theme-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--theme-color);
    opacity: 0.6;
    transition: opacity var(--dur-fast) var(--ease-out);
  }

  .theme-btn.active::before {
    opacity: 1;
  }

  .theme-btn.active::after {
    content: "✓";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .light-mode-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 0.6rem;
    padding: 0.35rem 0.75rem;
    color: var(--ink);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all var(--dur-fast) var(--ease-out);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .light-mode-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .light-mode-btn.active {
    background: var(--grad-rf);
    border-color: transparent;
  }

  @media (max-width: 720px) {
    .nav-btn {
      display: inline-flex;
    }

    ul {
      position: fixed;
      inset: auto 0 0 0;
      background: rgba(12, 18, 33, 0.72);
      backdrop-filter: blur(10px);
      transform: translateY(100%);
      transition: transform 0.25s var(--ease-out);
      flex-direction: column;
      padding: 1.25rem clamp(1rem, 6vw, 2rem) clamp(2.5rem, 10vh, 3.5rem);
      align-items: stretch;
      gap: 0.6rem;
      pointer-events: none;
    }

    ul[data-open="true"] {
      transform: none;
      pointer-events: auto;
    }

    li a {
      justify-content: flex-start;
    }

    .controls-group {
      flex-direction: column;
      align-items: stretch;
      gap: 0.6rem;
      padding-top: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .lang-selector,
    .theme-selector {
      justify-content: center;
    }
  }
</style>
