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
    margin-top: clamp(2rem, 5vw, 3.8rem);
    padding: clamp(1.5rem, 3.2vw, 2.4rem);
    display: grid;
    gap: clamp(1.1rem, 2.4vw, 1.8rem);
    position: relative;
    overflow: hidden;
    max-width: 980px;
    margin-inline: auto;
  }

  .mesh-navigator > * {
    position: relative;
    z-index: 1;
  }

  .mesh-navigator::before {
    content: '';
    position: absolute;
    inset: -30% -20% 10% -20%;
    background: var(--aurora-primary), var(--aurora-secondary);
    opacity: 0.55;
    filter: blur(120px);
    pointer-events: none;
    animation: halo-drift var(--halo-speed-alt) linear infinite;
  }

  .mesh-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .toggle-group {
    display: inline-flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0.4rem;
    border-radius: var(--radius-ribbon);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-glow) 40%, transparent);
  }

  .toggle-group .btn {
    padding-inline: 1rem;
  }

  .toggle-group .btn[aria-selected='true'] {
    border-color: color-mix(in oklab, var(--b) 60%, transparent);
    background: color-mix(in oklab, var(--b) 20%, var(--btn-ghost-bg));
    box-shadow: 0 14px 28px color-mix(in oklab, var(--glow-secondary) 35%, transparent);
  }

  .mode-copy h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .mode-copy p {
    margin: 0;
    color: var(--muted);
    max-width: 48ch;
  }

  .mesh-stage {
    position: relative;
    display: grid;
    gap: 1.35rem;
    perspective: 900px;
    justify-items: center;
  }

  .mesh-stage::before {
    content: '';
    position: absolute;
    inset: -20% -40% 10% -40%;
    background: radial-gradient(120% 120% at 50% 50%, color-mix(in oklab, var(--glow-ambient) 35%, transparent), transparent 75%);
    opacity: 0.5;
    filter: blur(90px);
    pointer-events: none;
  }

  .mesh-plane {
    position: relative;
    width: min(100%, clamp(420px, 48vw, 580px));
    aspect-ratio: 4 / 3;
    background: radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--glow-secondary) 40%, transparent), color-mix(in oklab, var(--surface-depth-void) 88%, transparent));
    border-radius: var(--radius-shell);
    border: 1px solid var(--glass-stroke);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--border-track) 70%, transparent);
    transform-style: preserve-3d;
    overflow: hidden;
    transition: transform 0.6s ease;
  }

  .mesh-plane::before {
    content: '';
    position: absolute;
    inset: 12% 10% 10% 10%;
    border-radius: var(--radius-card);
    border: 1px solid color-mix(in oklab, var(--border-track) 65%, transparent);
    opacity: 0.35;
  }

  .mesh-plane::after {
    content: '';
    position: absolute;
    inset: 16% 15% auto;
    height: 1px;
    background: linear-gradient(90deg, var(--border-track), transparent);
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
    background: linear-gradient(90deg, color-mix(in oklab, var(--glow-secondary) 85%, transparent), color-mix(in oklab, var(--halo-glow) 70%, transparent));
    box-shadow: 0 0 22px color-mix(in oklab, var(--glow-secondary) 65%, transparent);
  }

  .mesh-node {
    position: absolute;
    left: var(--x);
    top: var(--y);
    transform: translate(-50%, -50%) translateZ(calc(var(--depth) * 60px));
    display: grid;
    gap: 0.24rem;
    padding: 0.65rem 0.9rem;
    border-radius: var(--radius-control);
    border: 1px solid color-mix(in oklab, var(--glass-stroke) 70%, transparent);
    background: color-mix(in oklab, var(--surface-glass) 95%, transparent);
    color: inherit;
    cursor: pointer;
    box-shadow: 0 12px 36px color-mix(in oklab, var(--shadow-umbra) 45%, transparent);
    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }

  .mesh-node::after {
    content: '';
    position: absolute;
    inset: -60% -50% auto;
    height: 60%;
    background: var(--aurora-tertiary);
    opacity: 0.45;
    filter: blur(48px);
    pointer-events: none;
  }

  .mesh-node:hover,
  .mesh-node[aria-pressed='true'] {
    border-color: color-mix(in oklab, var(--a) 55%, transparent);
    background: color-mix(in oklab, var(--a) 18%, var(--surface-glass));
    box-shadow: 0 20px 48px color-mix(in oklab, var(--glow-primary) 55%, transparent);
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
    gap: 0.65rem;
    width: min(100%, clamp(360px, 44vw, 540px));
    margin-inline: auto;
  }

  .tempo-row {
    display: grid;
    grid-template-columns: 110px minmax(0, 1fr);
    gap: 0.85rem;
    align-items: center;
  }

  .tempo-label {
    font-size: 0.85rem;
    color: color-mix(in oklab, var(--muted) 90%, var(--ink) 10%);
  }

  .tempo-track {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.8rem;
    border-radius: var(--r-pill);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-track) 92%, transparent);
    overflow: hidden;
  }

  .tempo-track::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, color-mix(in oklab, var(--glow-secondary) 45%, transparent), color-mix(in oklab, var(--halo-glow) 50%, transparent));
    opacity: 0.45;
  }

  .tempo-pulse {
    position: relative;
    width: 12px;
    height: 12px;
    border-radius: var(--r-circle);
    background: linear-gradient(120deg, var(--c), var(--a));
    box-shadow: 0 0 16px color-mix(in oklab, var(--glow-secondary) 80%, transparent);
    animation: tempo-pulse 1.6s ease-in-out infinite;
    animation-delay: calc(var(--offset) * -1s);
  }

  .tempo-pulse:nth-of-type(2) { animation-delay: calc(var(--offset) * -1s + 0.4s); }
  .tempo-pulse:nth-of-type(3) { animation-delay: calc(var(--offset) * -1s + 0.8s); }
  .tempo-pulse:nth-of-type(4) { animation-delay: calc(var(--offset) * -1s + 1.2s); }

  .mesh-footer {
    font-size: 0.95rem;
    color: color-mix(in oklab, var(--muted) 85%, var(--ink) 15%);
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

  @keyframes halo-drift {
    0% {
      transform: translate3d(-4%, -4%, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(6%, 6%, 0) rotate(140deg);
    }
    100% {
      transform: translate3d(-4%, -4%, 0) rotate(360deg);
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
      box-shadow: 0 8px 24px var(--shadow-penumbra);
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
