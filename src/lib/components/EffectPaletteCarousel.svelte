<script>
  import { onMount, onDestroy } from 'svelte';

  const categories = [
    {
      name: 'Base',
      effects: [
        { id: 'solid', label: 'Solid', description: 'Pin a single hue for signage moments.' },
        { id: 'gradient', label: 'Gradient', description: 'Soft crossfades with power-aware balancing.' },
        { id: 'chase', label: 'Chase', description: 'Classic chaser with tempo subdivisions.' },
        { id: 'twinkle', label: 'Twinkle', description: 'Micro-random sparkles with shared seed.' }
      ],
      notes: 'Foundational looks for any installation'
    },
    {
      name: 'Spectral',
      effects: [
        { id: 'rainbow', label: 'Rainbow', description: 'Palette-aware spectrum sweep with BPM sync.' },
        { id: 'noise-flow', label: 'Noise Flow', description: 'Fractal noise drift with audio-reactive modulation.' }
      ],
      notes: 'Animated colour fields with beat awareness'
    },
    {
      name: 'Organic',
      effects: [
        { id: 'fire', label: 'Fire', description: 'Procedural warmth that breathes with the master tempo.' },
        { id: 'waves', label: 'Waves', description: 'Fluid gradients for architectural surfaces.' }
      ],
      notes: 'Procedural, beat-reactive scenes'
    },
    {
      name: 'Utility',
      effects: [
        { id: 'blackout', label: 'Blackout', description: 'Instant safe state for fails and cues.' },
        { id: 'flash', label: 'Flash', description: 'Crank attention on a single beat.' },
        { id: 'syncpulse', label: 'SyncPulse', description: 'Subtle metronome for technicians.' }
      ],
      notes: 'Precision transitions for cues'
    },
    {
      name: 'PWM FX',
      effects: [
        { id: 'breath', label: 'Breath', description: 'Analog easing for kinetic calm.' },
        { id: 'candle', label: 'Candle', description: 'Randomised flicker with current limits.' },
        { id: 'warm-dim', label: 'Warm-Dim', description: 'Colour temperature shifts tied to dimmer curve.' }
      ],
      notes: 'Smooth analog dimming profiles'
    },
    {
      name: 'Signage',
      effects: [
        { id: 'poster-fade', label: 'Poster Fade', description: 'Timed fades for brand stills and asset placeholders.' },
        { id: 'ticker-glide', label: 'Ticker Glide', description: 'Horizontal motion tuned for accessible text lanes.' },
        { id: 'relay-band', label: 'Relay Band', description: 'District signage baton with calm PWM counterbalance.' }
      ],
      notes: 'Asset-aware looks that keep signage readable'
    }
  ];

  const previewOrder = ['rainbow', 'poster-fade', 'relay-band', 'noise-flow', 'ticker-glide'];
  let activeId = previewOrder[0];
  let userInteracted = false;
  let cycle;
  let reduceMotion = false;
  let motionQuery;
  let removeMotionListener = () => {};
  const CYCLE_INTERVAL = 6000;

  function setActive(id) {
    activeId = id;
    userInteracted = true;
    restartCycle();
  }

  const activeEffect = () => {
    for (const category of categories) {
      const found = category.effects.find(effect => effect.id === activeId);
      if (found) return { ...found, category: category.name, notes: category.notes };
    }
    return { id: 'rainbow', label: 'Rainbow', description: 'Palette-aware spectrum sweep with BPM sync.', category: 'Spectral', notes: 'Animated colour fields with beat awareness' };
  };

  function stopCycle() {
    if (cycle) {
      clearInterval(cycle);
      cycle = undefined;
    }
  }

  function startCycle() {
    if (reduceMotion) return;
    stopCycle();
    cycle = setInterval(() => {
      if (userInteracted) {
        userInteracted = false;
        return;
      }
      const currentIndex = previewOrder.indexOf(activeId);
      const nextIndex = (currentIndex + 1) % previewOrder.length;
      activeId = previewOrder[nextIndex];
    }, CYCLE_INTERVAL);
  }

  function restartCycle() {
    stopCycle();
    startCycle();
  }

  onMount(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotion = motionQuery.matches;

    if (!reduceMotion) {
      startCycle();
    }

    const handleMotionPreference = event => {
      reduceMotion = event.matches;
      if (reduceMotion) {
        stopCycle();
      } else {
        startCycle();
      }
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionPreference);
      removeMotionListener = () => motionQuery.removeEventListener('change', handleMotionPreference);
    } else {
      motionQuery.addListener(handleMotionPreference);
      removeMotionListener = () => motionQuery.removeListener(handleMotionPreference);
    }
  });

  onDestroy(() => {
    stopCycle();
    removeMotionListener();
  });

  function pauseCycle() {
    userInteracted = true;
    stopCycle();
  }

  function resumeCycle(event) {
    const next = event?.relatedTarget;
    if (next && event.currentTarget.contains(next)) {
      return;
    }
    userInteracted = false;
    startCycle();
  }
</script>

<div
  class="effects-wrap"
  role="group"
  on:mouseenter={pauseCycle}
  on:mouseleave={resumeCycle}
  on:focusin={pauseCycle}
  on:focusout={resumeCycle}
>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Example effects</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {#each categories as category}
          <tr>
            <td data-label="Category"><strong>{category.name}</strong></td>
            <td data-label="Example effects">
              <div class="effect-buttons">
                {#each category.effects as effect}
                  <button
                    type="button"
                    class="effect-btn"
                    aria-pressed={activeId === effect.id}
                    on:click={() => setActive(effect.id)}
                  >
                    {effect.label}
                  </button>
                {/each}
              </div>
            </td>
            <td data-label="Notes">{category.notes}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="effect-preview" aria-live="polite">
    <div class={`effect-canvas is-${activeEffect().id}`}>
      <div class="shader-layer"></div>
      <div class="shader-layer"></div>
    </div>
    <div class="effect-caption">
      <h3>{activeEffect().label}</h3>
      <p>{activeEffect().description}</p>
      <small>{activeEffect().category} · {activeEffect().notes}</small>
    </div>
  </div>
</div>

<style>
  .effects-wrap {
    --effects-gap: clamp(var(--card-gap-tight), 4cqw, var(--card-gap-loose));
    display: grid;
    gap: var(--effects-gap);
    position: relative;
    isolation: isolate;
    width: var(--card-shell-wide);
    margin-inline: auto;
    container-type: inline-size;
  }

  .table-wrap {
    position: relative;
    border-radius: var(--radius-panel);
    border: 1px solid var(--border-glass);
    background: color-mix(in oklab, var(--surface-glass-strong) 92%, transparent);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .table-wrap::before {
    content: '';
    position: absolute;
    inset: -120% -80% 40%;
    background: var(--aurora-tertiary);
    opacity: 0.45;
    filter: blur(90px);
    pointer-events: none;
    animation: table-glow var(--halo-speed-alt) linear infinite;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.95rem;
    position: relative;
    z-index: 1;
  }

  thead {
    background: color-mix(in oklab, var(--surface-soft) 95%, transparent);
  }

  th,
  td {
    text-align: left;
    padding: 0.75rem 1rem;
  }

  th {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.75rem;
    color: color-mix(in oklab, var(--muted) 75%, white 25%);
    border-bottom: 1px solid color-mix(in oklab, var(--border-soft) 70%, transparent);
  }

  tbody tr {
    position: relative;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  tbody tr:hover {
    background: color-mix(in oklab, var(--surface-soft) 85%, transparent);
    transform: translateY(-1px);
  }

  tbody tr td {
    border-bottom: 1px solid color-mix(in oklab, var(--border-soft) 60%, transparent);
  }

  tbody tr:last-of-type td {
    border-bottom: 0;
  }

  .effect-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--card-gap-tight);
  }

  .effect-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.85rem;
    border-radius: var(--r-pill);
    border: 1px solid var(--card-border-soft);
    background: var(--card-surface-soft);
    color: inherit;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    box-shadow: var(--card-shadow);
  }

  .effect-btn:hover {
    border-color: color-mix(in oklab, var(--b) 30%, var(--card-border-soft));
  }

  .effect-btn[aria-pressed='true'] {
    background: linear-gradient(135deg, color-mix(in oklab, var(--a) 20%, var(--card-surface-soft)), color-mix(in oklab, var(--b) 38%, transparent));
    border-color: color-mix(in oklab, var(--b) 55%, var(--card-border-soft));
    color: color-mix(in oklab, var(--ink) 85%, white 15%);
    box-shadow: var(--card-shadow-lift);
  }

  .effect-btn:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--b) 60%, white 15%);
    outline-offset: 2px;
  }

  .effect-preview {
    position: relative;
    display: grid;
    gap: var(--panel-gap);
    border-radius: var(--radius-card);
    border: 1px solid var(--card-border);
    background: var(--card-surface);
    padding: var(--panel-pad);
    box-shadow: var(--card-shadow);
    min-width: 0;
    overflow: hidden;
  }

  .effect-preview::before {
    content: '';
    position: absolute;
    inset: -30% -20% auto;
    height: 60%;
    background: var(--aurora-primary);
    opacity: 0.55;
    filter: blur(70px);
    pointer-events: none;
  }

  .effect-canvas {
    position: relative;
    height: clamp(220px, 32vw, 260px);
    border-radius: var(--radius-media);
    overflow: hidden;
    border: 1px solid var(--card-border-track);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--bg-1) 85%, transparent),
      color-mix(in oklab, var(--bg-0) 95%, transparent)
    );
    box-shadow: inset 0 0 0 1px var(--card-outline-soft);
  }

  .shader-layer {
    position: absolute;
    inset: 0;
    mix-blend-mode: screen;
    opacity: 0.85;
    animation: layer-shift 16s linear infinite;
  }

  .effect-canvas.is-rainbow .shader-layer:nth-child(1) {
    background: linear-gradient(
      90deg,
      color-mix(in oklab, var(--a) 90%, transparent),
      color-mix(in oklab, var(--warm) 92%, transparent),
      color-mix(in oklab, var(--c) 88%, transparent),
      color-mix(in oklab, var(--b) 88%, transparent)
    );
    animation-duration: 10s;
  }

  .effect-canvas.is-rainbow .shader-layer:nth-child(2) {
    background: linear-gradient(45deg, color-mix(in oklab, var(--ink) 18%, transparent), transparent 65%);
    mix-blend-mode: overlay;
    animation-duration: 18s;
  }

  .effect-canvas.is-noise-flow .shader-layer:nth-child(1) {
    background: linear-gradient(135deg, color-mix(in oklab, var(--c) 72%, transparent), color-mix(in oklab, var(--halo-secondary) 58%, transparent));
    background-size: 200% 200%;
    animation-duration: 18s;
  }

  .effect-canvas.is-noise-flow .shader-layer:nth-child(2) {
    background: linear-gradient(135deg, color-mix(in oklab, var(--b) 68%, transparent), color-mix(in oklab, var(--a) 55%, transparent));
    animation-duration: 24s;
  }

  .effect-canvas.is-fire .shader-layer:nth-child(1) {
    background: radial-gradient(
      circle at 50% 90%,
      color-mix(in oklab, var(--warm) 90%, transparent),
      color-mix(in oklab, var(--a) 28%, var(--bg-0))
    );
    animation-duration: 8s;
  }

  .effect-canvas.is-fire .shader-layer:nth-child(2) {
    background: radial-gradient(circle at 50% 10%, color-mix(in oklab, var(--warm) 75%, transparent), transparent 70%);
    animation: fire-flicker 3s ease-in-out infinite;
  }

  .effect-canvas.is-warm-dim .shader-layer:nth-child(1) {
    background: linear-gradient(90deg, color-mix(in oklab, var(--warm) 90%, transparent), color-mix(in oklab, var(--a) 65%, transparent));
    animation-duration: 12s;
  }

  .effect-canvas.is-warm-dim .shader-layer:nth-child(2) {
    background: radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--ink) 15%, transparent), transparent 70%);
    animation: warm-dim 6s ease-in-out infinite;
  }

  .effect-canvas.is-poster-fade .shader-layer:nth-child(1) {
    background: linear-gradient(
      135deg,
      color-mix(in oklab, var(--signage-secondary) 45%, transparent),
      color-mix(in oklab, var(--signage-text) 22%, transparent)
    );
    animation-duration: 14s;
  }

  .effect-canvas.is-poster-fade .shader-layer:nth-child(2) {
    background: radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--signage-badge) 55%, transparent), transparent 72%);
    animation: signage-fade 6s ease-in-out infinite;
  }

  .effect-canvas.is-relay-band .shader-layer:nth-child(1) {
    background: linear-gradient(
      120deg,
      color-mix(in oklab, var(--halo-secondary) 55%, transparent),
      color-mix(in oklab, var(--halo-primary) 52%, transparent),
      color-mix(in oklab, var(--warm) 48%, transparent)
    );
    animation: relay-band 8s ease-in-out infinite;
  }

  .effect-canvas.is-relay-band .shader-layer:nth-child(2) {
    background: repeating-linear-gradient(
      90deg,
      color-mix(in oklab, var(--signage-text-strong) 24%, transparent) 0 12%,
      transparent 12% 24%
    );
    animation: relay-sweep 5s linear infinite;
    opacity: 0.45;
  }

  .effect-canvas.is-ticker-glide .shader-layer:nth-child(1) {
    background: repeating-linear-gradient(
      90deg,
      color-mix(in oklab, var(--signage-text) 16%, transparent) 0 12%,
      transparent 12% 24%
    );
    background-size: 220% 100%;
    animation: ticker-scroll 10s linear infinite;
    opacity: 0.5;
  }

  .effect-canvas.is-ticker-glide .shader-layer:nth-child(2) {
    background: linear-gradient(180deg, color-mix(in oklab, var(--signage-secondary) 28%, transparent), transparent 70%);
    animation-duration: 18s;
  }

  .effect-caption h3 {
    margin: 0;
  }

  .effect-caption p {
    margin: 0.4rem 0 0.6rem;
    color: var(--muted);
  }

  .effect-caption small {
    color: color-mix(in oklab, var(--muted) 85%, white 15%);
  }

  @keyframes layer-shift {
    0% {
      transform: translate3d(-5%, 0, 0) scale(1.05);
    }
    50% {
      transform: translate3d(5%, 0, 0) scale(1.12);
    }
    100% {
      transform: translate3d(-5%, 0, 0) scale(1.05);
    }
  }

  @keyframes fire-flicker {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(0.95);
    }
    40% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes warm-dim {
    0%,
    100% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(-18deg);
    }
  }

  @keyframes signage-fade {
    0%,
    100% {
      opacity: 0.45;
      transform: scale(0.98);
    }
    50% {
      opacity: 0.75;
      transform: scale(1.02);
    }
  }

  @keyframes relay-band {
    0%,
    100% {
      transform: translate3d(-8%, 0, 0);
    }
    50% {
      transform: translate3d(6%, 0, 0);
    }
  }

  @keyframes relay-sweep {
    0% {
      transform: translate3d(-24%, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes ticker-scroll {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  @keyframes table-glow {
    0% {
      transform: translate3d(-6%, -6%, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(8%, 8%, 0) rotate(160deg);
    }
    100% {
      transform: translate3d(-6%, -6%, 0) rotate(360deg);
    }
  }

  @media (min-width: 940px) {
    .effects-wrap {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
      align-items: center;
    }
  }

  @media (max-width: 840px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      border: 0;
      white-space: nowrap;
    }

    tbody {
      display: grid;
      gap: var(--card-gap);
      padding: clamp(var(--card-pad-tight), 4cqw, var(--card-pad));
    }

    tr {
      padding: clamp(var(--card-pad-tight), 4cqw, var(--card-pad));
      border-radius: var(--radius-card);
      border: 1px solid color-mix(in oklab, var(--border-soft) 70%, transparent);
      background: color-mix(in oklab, var(--surface-soft) 90%, transparent);
      box-shadow: 0 16px 38px color-mix(in oklab, var(--shadow-umbra) 30%, transparent);
      min-width: 0;
    }

    td {
      padding: var(--card-gap-tight) 0;
      border: 0;
    }

    td::before {
      content: attr(data-label);
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: color-mix(in oklab, var(--muted) 75%, white 25%);
      margin-bottom: 0.25rem;
    }

    .effect-buttons {
      margin-top: 0.35rem;
      flex-direction: column;
      align-items: stretch;
      gap: var(--card-gap-tight);
    }
  }

  @media (max-width: 540px) {
    .effect-preview {
      padding: clamp(var(--card-pad-tight), 5cqw, var(--card-pad));
    }

    .effect-canvas {
      height: clamp(180px, 42cqw, 220px);
    }

    .effect-caption p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 420px) {
    .effect-buttons {
      width: 100%;
    }

    .effect-btn {
      width: 100%;
      justify-content: center;
    }

    .effect-caption h3 {
      font-size: 1.1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .table-wrap::before,
    .shader-layer,
    .effect-canvas.is-fire .shader-layer:nth-child(2),
    .effect-canvas.is-warm-dim .shader-layer:nth-child(2),
    .effect-canvas.is-poster-fade .shader-layer:nth-child(2),
    .effect-canvas.is-ticker-glide .shader-layer:nth-child(1) {
      animation: none;
    }

    .effect-canvas.is-rainbow .shader-layer,
    .effect-canvas.is-noise-flow .shader-layer,
    .effect-canvas.is-fire .shader-layer,
    .effect-canvas.is-warm-dim .shader-layer,
    .effect-canvas.is-poster-fade .shader-layer,
    .effect-canvas.is-ticker-glide .shader-layer {
      transform: none;
    }
  }
</style>
