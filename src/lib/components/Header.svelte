<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { lang } from '$lib/i18n';

  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  let open = false;
  let isMobile = false;
  let menu;
  let currentLang = $lang;
  let currentTheme = 'dark'; // 'dark', 'light', or 'high-contrast'

  $: lang.set(currentLang);

  const applyTheme = (theme) => {
    if (typeof document !== 'undefined') {
      currentTheme = theme;
      
      if (theme === 'light') {
        document.documentElement.style.setProperty('--bg-0', '#ffffff');
        document.documentElement.style.setProperty('--bg-1', '#f8f8f8');
        document.documentElement.style.setProperty('--bg', '#fafafa');
        document.documentElement.style.setProperty('--ink', '#000000');
        document.documentElement.style.setProperty('--muted', '#505050');
      } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--bg-0', '#000000');
        document.documentElement.style.setProperty('--bg-1', '#0a0a0a');
        document.documentElement.style.setProperty('--bg', '#050505');
        document.documentElement.style.setProperty('--ink', '#ffffff');
        document.documentElement.style.setProperty('--muted', '#b0b0b0');
      } else if (theme === 'high-contrast') {
        document.documentElement.style.setProperty('--bg-0', '#000000');
        document.documentElement.style.setProperty('--bg-1', '#000000');
        document.documentElement.style.setProperty('--bg', '#000000');
        document.documentElement.style.setProperty('--ink', '#ffffff');
        document.documentElement.style.setProperty('--muted', '#ffffff');
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
      class="nav-btn hamburger"
      class:open={open}
      aria-expanded={open}
      aria-controls="menu"
      aria-label={open ? "Close menu" : "Open menu"}
      type="button"
      on:click={toggle}
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
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
            class:active={currentTheme==='light'} 
            on:click={()=> applyTheme('light')}
            aria-label="Light theme"
            title="Light theme"
          >
            ☀️
          </button>
          <button 
            class="theme-btn" 
            class:active={currentTheme==='dark'} 
            on:click={()=> applyTheme('dark')}
            aria-label="Dark theme"
            title="Dark theme"
          >
            🌙
          </button>
          <button 
            class="theme-btn" 
            class:active={currentTheme==='high-contrast'} 
            on:click={()=> applyTheme('high-contrast')}
            aria-label="High contrast theme"
            title="High contrast theme"
          >
            ⚡
          </button>
        </div>
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
    padding: 0.5rem;
    color: var(--ink);
    cursor: pointer;
    min-width: var(--touch-target-min, 44px);
    min-height: var(--touch-target-min, 44px);
    position: relative;
    z-index: 50;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    padding: 0.6rem 0.7rem;
  }

  .hamburger-line {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--ink);
    border-radius: 2px;
    transition: all var(--dur-fast) var(--ease-out);
  }

  .hamburger.open .hamburger-line:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .hamburger.open .hamburger-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger.open .hamburger-line:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
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
    background: linear-gradient(90deg, #ffffff, #d0d0d0);
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
    background: linear-gradient(135deg, #ffffff, #e0e0e0);
    color: #000000;
  }

  .theme-btn {
    width: 2.2rem;
    height: 2.2rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  .theme-btn.active {
    background: linear-gradient(135deg, #ffffff, #e0e0e0);
    color: #000000;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    .nav-btn {
      display: flex;
    }

    nav {
      padding: var(--spacing-mobile-sm, 1rem) clamp(1rem, 4vw, 1.5rem);
    }

    .brand {
      font-size: clamp(0.9rem, 3.5vw, 1.1rem);
    }

    .brand-logo {
      height: 1.75rem;
    }

    ul {
      position: fixed;
      inset: 0 0 0 0;
      top: var(--nav-height-mobile, 64px);
      background: rgba(0, 0, 0, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transform: translateY(-100%);
      opacity: 0;
      transition: transform var(--dur-med) var(--ease-out), opacity var(--dur-med) var(--ease-out);
      flex-direction: column;
      padding: var(--spacing-mobile-lg, 2rem) clamp(1rem, 6vw, 2rem);
      align-items: stretch;
      gap: var(--spacing-mobile-xs, 0.5rem);
      pointer-events: none;
      overflow-y: auto;
      z-index: 40;
    }

    ul[data-open="true"] {
      transform: none;
      opacity: 1;
      pointer-events: auto;
    }

    li a {
      justify-content: flex-start;
      padding: var(--spacing-mobile-sm, 1rem);
      font-size: 1.1rem;
      min-height: var(--touch-target-min, 44px);
    }

    .controls-group {
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-mobile-sm, 1rem);
      padding-top: var(--spacing-mobile-md, 1.5rem);
      margin-top: var(--spacing-mobile-sm, 1rem);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .lang-selector,
    .theme-selector {
      justify-content: center;
      padding: var(--spacing-mobile-xs, 0.5rem);
    }

    .lang-btn,
    .theme-btn {
      min-height: var(--touch-target-min, 44px);
      min-width: var(--touch-target-min, 44px);
    }

    .lang-btn {
      padding: 0.75rem 1rem;
      font-size: 1rem;
    }

    .theme-btn {
      font-size: 1.3rem;
      width: auto;
      height: auto;
      padding: 0.5rem 0.75rem;
    }
  }

  @media (max-width: 480px) {
    nav {
      padding: 0.75rem 1rem;
    }

    .brand {
      font-size: 0.85rem;
    }

    .brand-logo {
      height: 1.5rem;
    }

    ul {
      padding: 1.5rem 1rem;
    }
  }
</style>
