<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  let open = false;
  let isMobile = false;
  let menu;

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
    <a href={`${base}/`} class="brand" aria-label="Reclame Fabriek — LED Node">LED Node</a>

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
  }

  .brand:hover {
    opacity: 0.84;
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
  }
</style>
