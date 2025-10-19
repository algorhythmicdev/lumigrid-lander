<script>
  import { onMount, onDestroy } from 'svelte';

  const nodes = [
    { id: 'alpha', label: 'Node A', role: 'Clock capable', x: 12, y: 18 },
    { id: 'beta', label: 'Node B', role: 'Timeline peer', x: 42, y: 8 },
    { id: 'gamma', label: 'Node C', role: 'Edge driver', x: 72, y: 18 },
    { id: 'delta', label: 'Node D', role: 'PWM focus', x: 18, y: 52 },
    { id: 'epsilon', label: 'Node E', role: 'Pixel focus', x: 50, y: 58 },
    { id: 'zeta', label: 'Node F', role: 'Kinetic outpost', x: 80, y: 50 }
  ];

  const links = [
    ['alpha', 'beta'],
    ['beta', 'gamma'],
    ['alpha', 'delta'],
    ['beta', 'epsilon'],
    ['gamma', 'zeta'],
    ['delta', 'epsilon'],
    ['epsilon', 'zeta']
  ];

  const tempos = [
    { label: 'Downbeat', offset: 0 },
    { label: 'Beat 2', offset: 0.25 },
    { label: 'Beat 3', offset: 0.5 },
    { label: 'Beat 4', offset: 0.75 }
  ];

  let mode = 'mesh';
  let hovered = null;
  let depth = 0;
  let container;
  let raf;
  let reduceMotion = false;
  let motionQuery;
  let removeMotionListener = () => {};

  const modeCopy = {
    mesh: {
      title: 'Mesh of equal peers',
      body: 'Every node can take the baton. Tap a node to see how roles fan out when a master hands over.'
    },
    tempo: {
      title: 'Tempo-locked timelines',
      body: 'Multicast ticks keep PWM fades and pixel chases perfectly phase-aligned — the timeline pulses below show the shared beat.'
    }
  };

  function handleScroll() {
    if (reduceMotion) {
      depth = 0;
      return;
    }
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewport = window.innerHeight;
      const centre = rect.top + rect.height / 2;
      const distance = Math.abs(centre - viewport / 2);
      const ratio = Math.max(0, Math.min(1, 1 - distance / (viewport * 0.8)));
      depth = Number(ratio.toFixed(3));
    });
  }

  const isBrowser = typeof window !== 'undefined';

  function enableDepthTracking() {
    if (!isBrowser) return;
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
  }

  function disableDepthTracking() {
    if (!isBrowser) return;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
    depth = 0;
  }

  function handleMotionPreference(event) {
    reduceMotion = event.matches;
    if (reduceMotion) {
      disableDepthTracking();
    } else {
      enableDepthTracking();
    }
  }

  onMount(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotion = motionQuery.matches;

    if (!reduceMotion) {
      enableDepthTracking();
    } else {
      depth = 0;
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionPreference);
      removeMotionListener = () => motionQuery.removeEventListener('change', handleMotionPreference);
    } else {
      motionQuery.addListener(handleMotionPreference);
      removeMotionListener = () => motionQuery.removeListener(handleMotionPreference);
    }
  });

  onDestroy(() => {
    if (!isBrowser) return;
    disableDepthTracking();
    removeMotionListener();
  });

  const getNode = id => nodes.find(n => n.id === id);

  function linkStyle(fromId, toId) {
    const from = getNode(fromId);
    const to = getNode(toId);
    if (!from || !to) return '';
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy).toFixed(2);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return `--x:${from.x}%;--y:${from.y}%;--length:${length}%;--angle:${angle}deg;`;
  }
</script>

<div class="mesh-navigator glass" bind:this={container} style={`--depth:${depth}`}> 
  <div class="mesh-header">
    <div class="toggle-group" role="tablist" aria-label="Mesh navigation modes">
      <button
        class="btn ghost"
        role="tab"
        aria-selected={mode === 'mesh'}
        on:click={() => (mode = 'mesh')}
      >
        Mesh view
      </button>
      <button
        class="btn ghost"
        role="tab"
        aria-selected={mode === 'tempo'}
        on:click={() => (mode = 'tempo')}
      >
        Timeline view
      </button>
    </div>
    <div class="mode-copy">
      <h3>{modeCopy[mode].title}</h3>
      <p>{modeCopy[mode].body}</p>
    </div>
  </div>

  <div class="mesh-stage" data-mode={mode}>
    <div class="mesh-plane" style={`transform: rotateX(${18 + depth * 12}deg) rotateZ(-6deg);`}>
      {#if mode === 'mesh'}
        {#each links as [from, to]}
          <span class="mesh-link" style={linkStyle(from, to)} aria-hidden="true"></span>
        {/each}
      {/if}

      {#each nodes as node}
        <button
          type="button"
          class="mesh-node"
          style={`--x:${node.x}%;--y:${node.y}%;`}
          aria-pressed={hovered === node.id}
          on:focus={() => (hovered = node.id)}
          on:mouseenter={() => (hovered = node.id)}
          on:mouseleave={() => (hovered = null)}
          on:blur={() => (hovered = null)}
        >
          <span class="node-label">{node.label}</span>
          <span class="node-role">{node.role}</span>
        </button>
      {/each}
    </div>

    {#if mode === 'tempo'}
      <div class="mesh-tempo" aria-hidden="true">
        {#each tempos as tempo}
          <div class="tempo-row" style={`--offset:${tempo.offset};`}>
            <div class="tempo-label">{tempo.label}</div>
            <div class="tempo-track">
              <span class="tempo-pulse"></span>
              <span class="tempo-pulse"></span>
              <span class="tempo-pulse"></span>
              <span class="tempo-pulse"></span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="mesh-footer" aria-live="polite">
    {#if hovered}
      {#if mode === 'mesh'}
        <p><strong>{getNode(hovered).label}</strong> is ready to assume master duties or sync from peers instantly.</p>
      {:else}
        <p><strong>{getNode(hovered).label}</strong> listens to the same beat map, so fades land on the exact subdivision.</p>
      {/if}
    {:else}
      {#if mode === 'mesh'}
        <p>Hover a node to see how responsibilities spread when the mesh reshapes.</p>
      {:else}
        <p>Watch the timeline pulses travel in phase — every row represents a node staying on beat.</p>
      {/if}
    {/if}
  </div>
</div>

<style>
  .mesh-navigator {
    margin-top: clamp(2rem, 5vw, 3.5rem);
    padding: clamp(1.4rem, 3vw, 2rem);
    display: grid;
    gap: clamp(1rem, 2.2vw, 1.6rem);
    position: relative;
    overflow: hidden;
    max-width: 980px;
    margin-inline: auto;
  }

  .mesh-header {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .toggle-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .toggle-group .btn[aria-selected='true'] {
    border-color: color-mix(in oklab, var(--b) 60%, transparent);
    background: color-mix(in oklab, var(--b) 18%, transparent);
  }

  .mode-copy h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .mode-copy p {
    margin: 0;
    color: var(--muted);
  }

  .mesh-stage {
    position: relative;
    display: grid;
    gap: 1.25rem;
    perspective: 900px;
    justify-items: center;
  }

  .mesh-plane {
    position: relative;
    width: min(100%, clamp(420px, 48vw, 560px));
    aspect-ratio: 4 / 3;
    background: radial-gradient(circle at 50% 50%, rgba(108, 43, 217, 0.15), rgba(7, 9, 18, 0.8));
    border-radius: clamp(1rem, 2.4vw, 1.6rem);
    border: 1px solid color-mix(in oklab, var(--card-border) 80%, transparent);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    transform-style: preserve-3d;
    overflow: hidden;
    transition: transform 0.6s ease;
  }

  .mesh-plane::after {
    content: '';
    position: absolute;
    inset: 12% 10% auto;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0));
    opacity: 0.4;
  }

  .mesh-link {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--length);
    height: 2px;
    transform-origin: 0 50%;
    transform: translate(-50%, -50%) rotate(var(--angle));
    background: linear-gradient(90deg, rgba(28, 197, 220, 0.75), rgba(108, 43, 217, 0.75));
    box-shadow: 0 0 16px rgba(28, 197, 220, 0.35);
  }

  .mesh-node {
    position: absolute;
    left: var(--x);
    top: var(--y);
    transform: translate(-50%, -50%) translateZ(calc(var(--depth) * 60px));
    display: grid;
    gap: 0.2rem;
    padding: 0.6rem 0.8rem;
    border-radius: 0.95rem;
    border: 1px solid color-mix(in oklab, var(--card-border) 65%, transparent);
    background: color-mix(in oklab, var(--glass) 75%, transparent);
    color: inherit;
    cursor: pointer;
    box-shadow: 0 10px 32px rgba(8, 12, 26, 0.35);
    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  }

  .mesh-node:hover,
  .mesh-node[aria-pressed='true'] {
    border-color: color-mix(in oklab, var(--a) 55%, transparent);
    background: color-mix(in oklab, var(--a) 18%, var(--glass));
    transform: translate(-50%, -50%) translateZ(calc(80px + var(--depth) * 40px));
  }

  .node-label {
    font-weight: 700;
  }

  .node-role {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .mesh-tempo {
    display: grid;
    gap: 0.6rem;
    width: min(100%, clamp(360px, 44vw, 520px));
    margin-inline: auto;
  }

  .tempo-row {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    gap: 0.8rem;
    align-items: center;
  }

  .tempo-label {
    font-size: 0.85rem;
    color: var(--muted);
  }

  .tempo-track {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    overflow: hidden;
  }

  .tempo-track::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(28, 197, 220, 0.2), rgba(108, 43, 217, 0.25));
    opacity: 0.4;
  }

  .tempo-pulse {
    position: relative;
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(120deg, var(--c), var(--a));
    box-shadow: 0 0 16px rgba(28, 197, 220, 0.45);
    animation: tempo-pulse 1.6s ease-in-out infinite;
    animation-delay: calc(var(--offset) * -1s);
  }

  .tempo-pulse:nth-of-type(2) { animation-delay: calc(var(--offset) * -1s + 0.4s); }
  .tempo-pulse:nth-of-type(3) { animation-delay: calc(var(--offset) * -1s + 0.8s); }
  .tempo-pulse:nth-of-type(4) { animation-delay: calc(var(--offset) * -1s + 1.2s); }

  .mesh-footer {
    font-size: 0.95rem;
    color: var(--muted);
  }

  @keyframes tempo-pulse {
    0%, 100% {
      transform: scale(0.85);
      opacity: 0.6;
    }
    40% {
      transform: scale(1.15);
      opacity: 1;
    }
  }

  @media (min-width: 880px) {
    .mesh-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: clamp(1.1rem, 3vw, 2rem);
    }

    .mode-copy {
      max-width: clamp(260px, 32vw, 360px);
    }

    .mesh-stage {
      margin-inline: auto;
    }
  }

  @media (max-width: 720px) {
    .mesh-plane {
      aspect-ratio: 1 / 1;
    }
    .tempo-row {
      grid-template-columns: 90px minmax(0, 1fr);
    }
  }

  @media (max-width: 640px) {
    .mesh-header {
      gap: 0.65rem;
    }

    .mode-copy h3 {
      font-size: 1.05rem;
    }

    .mode-copy p {
      font-size: 0.95rem;
    }

    .mesh-stage {
      gap: 1rem;
    }

    .mesh-plane {
      border-radius: 1rem;
    }

    .mesh-node {
      padding: 0.5rem 0.6rem;
      box-shadow: 0 8px 24px rgba(8, 12, 26, 0.35);
    }

    .mesh-node:hover,
    .mesh-node[aria-pressed='true'] {
      transform: translate(-50%, -50%) translateZ(calc(60px + var(--depth) * 30px));
    }

    .node-role {
      font-size: 0.75rem;
    }

    .mesh-tempo {
      gap: 0.5rem;
    }

    .tempo-row {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.4rem;
    }

    .tempo-label {
      font-size: 0.8rem;
    }

    .tempo-track {
      padding: 0.4rem 0.6rem;
      gap: 0.75rem;
    }

    .mesh-footer {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .mesh-plane {
      width: min(100%, 360px);
    }

    .mesh-node {
      padding: 0.45rem 0.55rem;
    }

    .node-label {
      font-size: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mesh-plane,
    .mesh-node,
    .mesh-node:hover,
    .mesh-node[aria-pressed='true'] {
      transition: none;
      transform: translate(-50%, -50%);
    }

    .mesh-plane {
      transform: none !important;
    }

    .mesh-tempo .tempo-pulse {
      animation: none;
    }
  }
</style>
