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
    }
  ];

  const previewOrder = ['rainbow', 'noise-flow', 'fire', 'warm-dim'];
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
    display: grid;
    gap: clamp(1.4rem, 3vw, 2.2rem);
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  th,
  td {
    text-align: left;
    padding: 0.75rem 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  th {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.75rem;
    color: color-mix(in oklab, var(--muted) 75%, white 25%);
  }

  .effect-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .effect-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    background: rgba(15, 23, 42, 0.35);
    color: inherit;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    text-align: center;
  }

  .effect-btn[aria-pressed='true'] {
    background: linear-gradient(120deg, var(--a), var(--b));
    border-color: color-mix(in oklab, var(--a) 50%, transparent);
    color: #09101a;
  }

  .effect-btn:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--b) 60%, white 15%);
    outline-offset: 2px;
  }

  .effect-preview {
    display: grid;
    gap: 1rem;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: clamp(1rem, 2.4vw, 1.6rem);
    padding: clamp(1.2rem, 2.8vw, 1.8rem);
    box-shadow: var(--shadow);
    min-width: 0;
  }

  .effect-canvas {
    position: relative;
    height: 220px;
    border-radius: 1.2rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(8, 11, 22, 0.65);
  }

  .shader-layer {
    position: absolute;
    inset: 0;
    mix-blend-mode: screen;
    opacity: 0.85;
    animation: layer-shift 12s linear infinite;
  }

  .effect-canvas.is-rainbow .shader-layer:nth-child(1) {
    background: linear-gradient(90deg, #ff5f9e, #facc15, #22d3ee, #a855f7);
    animation-duration: 8s;
  }

  .effect-canvas.is-rainbow .shader-layer:nth-child(2) {
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.25), transparent 65%);
    mix-blend-mode: overlay;
  }

  .effect-canvas.is-noise-flow .shader-layer:nth-child(1) {
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.7" fill="%230ff0fc"/></svg>');
    background-size: 200% 200%;
    animation-duration: 14s;
  }

  .effect-canvas.is-noise-flow .shader-layer:nth-child(2) {
    background: linear-gradient(135deg, rgba(108, 43, 217, 0.6), rgba(231, 59, 163, 0.3));
    animation-duration: 18s;
  }

  .effect-canvas.is-fire .shader-layer:nth-child(1) {
    background: radial-gradient(circle at 50% 90%, rgba(249, 115, 22, 0.85), rgba(127, 29, 29, 0.2));
    animation-duration: 6s;
  }

  .effect-canvas.is-fire .shader-layer:nth-child(2) {
    background: radial-gradient(circle at 50% 10%, rgba(255, 214, 94, 0.5), transparent 70%);
    animation: fire-flicker 3s ease-in-out infinite;
  }

  .effect-canvas.is-warm-dim .shader-layer:nth-child(1) {
    background: linear-gradient(90deg, rgba(255, 214, 165, 0.9), rgba(255, 125, 64, 0.7));
    animation-duration: 10s;
  }

  .effect-canvas.is-warm-dim .shader-layer:nth-child(2) {
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.22), transparent 70%);
    animation: warm-dim 5s ease-in-out infinite;
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
      transform: translate3d(5%, 0, 0) scale(1.1);
    }
    100% {
      transform: translate3d(-5%, 0, 0) scale(1.05);
    }
  }

  @keyframes fire-flicker {
    0%, 100% {
      opacity: 0.6;
      transform: scale(0.95);
    }
    40% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  @keyframes warm-dim {
    0%, 100% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(-18deg);
    }
  }

  @media (min-width: 940px) {
    .effects-wrap {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
      align-items: center;
    }
  }

  @media (max-width: 820px) {
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
      gap: 1rem;
    }

    tr {
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1rem;
      background: rgba(9, 16, 26, 0.4);
      min-width: 0;
    }

    td {
      padding: 0.5rem 0;
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
      align-items: flex-start;
    }
  }

  @media (max-width: 540px) {
    .effect-preview {
      padding: 1rem;
    }

    .effect-canvas {
      height: 180px;
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
    .shader-layer,
    .effect-canvas.is-fire .shader-layer:nth-child(2),
    .effect-canvas.is-warm-dim .shader-layer:nth-child(2) {
      animation: none;
    }

    .effect-canvas.is-rainbow .shader-layer,
    .effect-canvas.is-noise-flow .shader-layer,
    .effect-canvas.is-fire .shader-layer,
    .effect-canvas.is-warm-dim .shader-layer {
      transform: none;
    }
  }
</style>
