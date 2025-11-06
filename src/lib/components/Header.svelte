<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { lang, t } from '$lib/i18n';

  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

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


</script>

<header class="header">
  <nav aria-label="Primary">
    <a href={`${base}/`} class="brand" aria-label="Reclame Fabriek — LUMIGRID LED Node">
      <img src={toAssetPath('Asset-2.png')} alt="Reclame Fabriek" class="brand-logo" />
      LUMIGRID LED Node
    </a>

    <ul id="menu">
      <li><a href={`${base}/#stories`}>{$t('nav_stories')}</a></li>
      <li><a href={`${base}/#gallery`}>{$t('nav_cases')}</a></li>
      <li><a href={`${base}/#contact`}>{$t('nav_contact')}</a></li>
      <li class="controls-group">
        <div class="lang-selector">
          {#each ['en','lv','ru','nl','de'] as code}
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
    nav {
      padding: var(--spacing-mobile-sm, 1rem) clamp(1rem, 4vw, 1.5rem);
      flex-wrap: wrap;
    }

    .brand {
      font-size: clamp(0.9rem, 3.5vw, 1.1rem);
    }

    .brand-logo {
      height: 1.75rem;
    }

    ul {
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    li a {
      padding: 0.35rem 0.6rem;
      font-size: 0.9rem;
    }

    .controls-group {
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .lang-selector,
    .theme-selector {
      padding: 0.25rem;
    }

    .lang-btn {
      padding: 0.4rem 0.5rem;
      font-size: 0.85rem;
    }

    .theme-btn {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
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

    li a {
      font-size: 0.8rem;
      padding: 0.3rem 0.5rem;
    }
  }
</style>
