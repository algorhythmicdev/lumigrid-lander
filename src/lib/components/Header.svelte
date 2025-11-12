<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { lang, t } from '$lib/i18n';

  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  let currentLang = $lang;
  let currentTheme = 'dark'; // 'dark', 'light', or 'high-contrast'
  let mobileMenuOpen = false;

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
      } else if (theme === 'dark' || theme === 'high-contrast') {
        // High contrast theme uses same settings as dark theme
        document.documentElement.style.setProperty('--bg-0', '#000000');
        document.documentElement.style.setProperty('--bg-1', '#0a0a0a');
        document.documentElement.style.setProperty('--bg', '#050505');
        document.documentElement.style.setProperty('--ink', '#ffffff');
        document.documentElement.style.setProperty('--muted', '#b0b0b0');
      }
    }
  };

  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

</script>

<header class="header">
  <!-- Mobile backdrop -->
  <div 
    class="mobile-backdrop" 
    class:visible={mobileMenuOpen} 
    on:click={toggleMobileMenu}
    aria-hidden="true"
  ></div>

  <nav aria-label="Primary">
    <a href={`${base}/`} class="brand" aria-label="Reclame Fabriek — LUMIGRID LED Node">
      <img src={toAssetPath('Asset-2.png')} alt="Reclame Fabriek" class="brand-logo" />
      LUMIGRID LED Node
    </a>

    <button 
      class="hamburger" 
      class:active={mobileMenuOpen}
      on:click={toggleMobileMenu}
      aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={mobileMenuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul id="menu" class:open={mobileMenuOpen}>
      <li><a href={`${base}/#stories`} on:click={() => mobileMenuOpen = false}>{$t('nav_stories')}</a></li>
      <li><a href={`${base}/#gallery`} on:click={() => mobileMenuOpen = false}>{$t('nav_cases')}</a></li>
      <li><a href={`${base}/#contact`} on:click={() => mobileMenuOpen = false}>{$t('nav_contact')}</a></li>
      <li class="controls-group">
        <div class="lang-selector">
          {#each ['en','lv','ru','nl','de'] as code}
            <button 
              class="lang-btn" 
              class:active={currentLang===code} 
              on:click={()=> currentLang = code}
              aria-label={$t('aria_switch_language').replace('{lang}', code.toUpperCase())}
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
            aria-label={$t('theme_light')}
            title={$t('theme_light')}
          >
            ☀️
          </button>
          <button 
            class="theme-btn" 
            class:active={currentTheme==='dark'} 
            on:click={()=> applyTheme('dark')}
            aria-label={$t('theme_dark')}
            title={$t('theme_dark')}
          >
            🌙
          </button>
          <button 
            class="theme-btn" 
            class:active={currentTheme==='high-contrast'} 
            on:click={()=> applyTheme('high-contrast')}
            aria-label={$t('theme_high_contrast')}
            title={$t('theme_high_contrast')}
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
    background: var(--bg-0) !important;
    background-color: var(--bg-0) !important;
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

  /* Mobile backdrop */
  .mobile-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 39;
  }
  
  .mobile-backdrop.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
    z-index: 50;
  }

  .hamburger span {
    width: 2rem;
    height: 0.2rem;
    background: var(--ink);
    border-radius: 10px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.active span:nth-child(1) {
    transform: translateY(0.6rem) rotate(45deg);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: translateY(-0.6rem) rotate(-45deg);
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
    background: var(--accent-primary);
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
    background: var(--accent-primary);
    color: #ffffff;
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
    background: var(--accent-primary);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 113, 227, 0.3);
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

    nav {
      padding: var(--spacing-mobile-sm, 1rem) clamp(1rem, 4vw, 1.5rem);
      flex-wrap: nowrap;
      position: relative;
    }

    .brand {
      font-size: clamp(0.9rem, 3.5vw, 1.1rem);
    }

    .brand-logo {
      height: 1.75rem;
    }

    ul {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 70%;
      max-width: 300px;
      flex-direction: column;
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border-left: 1px solid var(--glass-border);
      padding: 5rem 2rem 2rem;
      margin: 0;
      gap: 1.5rem;
      align-items: flex-start;
      transform: translateX(100%);
      transition: transform 0.4s var(--ease-default);
      box-shadow: -2px 0 20px rgba(0, 0, 0, 0.5);
      z-index: 40;
    }

    ul.open {
      transform: translateX(0);
    }

    li {
      width: 100%;
    }

    li a {
      padding: 0.6rem 0.8rem;
      font-size: 1rem;
      width: 100%;
      justify-content: flex-start;
    }

    .controls-group {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      width: 100%;
    }

    .lang-selector,
    .theme-selector {
      padding: 0.4rem;
      width: 100%;
      justify-content: center;
    }

    .lang-btn {
      padding: 0.5rem 0.7rem;
      font-size: 0.9rem;
    }

    .theme-btn {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.2rem;
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
      width: 80%;
    }
  }
</style>
