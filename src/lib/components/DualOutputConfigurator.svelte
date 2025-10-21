<script>
  import { onMount, onDestroy } from 'svelte';

  const scenarios = [
    {
      id: 'hybrid',
      label: 'Hybrid façade show',
      description: 'Blend pixel-led ribbons with PWM wall washers for immersive gradients.',
      pwm: [0.8, 0.4, 0.65, 0.3],
      pixels: ['#1cc5dc', '#e73ba3', '#6c2bd9', '#ffd166'],
      blend: 0.6
    },
    {
      id: 'power',
      label: 'Power-conscious evening',
      description: 'Dial PWM output down while keeping sparkly highlights alive on addressable nodes.',
      pwm: [0.35, 0.2, 0.25, 0.15],
      pixels: ['#0ff0fc', '#10b981', '#38bdf8', '#f97316'],
      blend: 0.35
    },
    {
      id: 'event',
      label: 'Event takeover',
      description: 'Drive PWM props at full tilt and let pixel strips paint motion between beats.',
      pwm: [0.95, 0.85, 0.7, 0.9],
      pixels: ['#f97316', '#fb7185', '#fde047', '#a855f7'],
      blend: 0.8
    }
  ];

  const pwmChannels = Array.from({ length: 4 });
  const pixelSegments = Array.from({ length: 16 });

  let active = scenarios[0];
  let blend = active.blend;
  let pixelColumns = null;
  let pixelStrip;
  let resizeObserver;

  function selectScenario(next) {
    active = next;
    blend = next.blend;
  }

  function pwmLevel(index) {
    const level = active.pwm[index] ?? 0;
    return Math.round(level * blend * 100);
  }

  function pixelTint(index) {
    const colour = active.pixels[index % active.pixels.length];

    return `radial-gradient(circle at 50% 50%, ${colour} ${Math.max(35, blend * 80)}%, rgba(255,255,255,0.08) 100%)`;
  }

  function computeColumns(width) {
    if (width <= 260) return 4;
    if (width <= 320) return 5;
    if (width <= 420) return 6;
    if (width <= 540) return 8;
    if (width <= 720) return 12;
    return 16;
  }

  function observePixels(entry) {
    const { width } = entry.contentRect;
    pixelColumns = computeColumns(width);
  }

  onMount(() => {
    if (typeof ResizeObserver === 'undefined') return;
    resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) observePixels(entry);
    });
    if (pixelStrip) {
      resizeObserver.observe(pixelStrip);
      pixelColumns = computeColumns(pixelStrip.getBoundingClientRect().width);
    }
  });

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
  });
</script>

<div class="dual-config glass">
  <header>
    <h2>Dual-output navigator</h2>
    <p>Preview how PWM and pixel outputs respond across real launch scenarios. Drag the blend to see LumiGrid balance both engines.</p>
  </header>

  <div class="scenario-pills" role="group" aria-label="Dual-output scenarios">
    {#each scenarios as scenario}
      <button
        type="button"
        class="pill"
        aria-pressed={active.id === scenario.id}
        on:click={() => selectScenario(scenario)}
      >
        {scenario.label}
      </button>
    {/each}
  </div>

  <div class="outputs">
    <section aria-labelledby="pwm-title">
      <div class="section-head">
        <h3 id="pwm-title">PWM wash</h3>
        <span class="badge">Analog channels</span>
      </div>
      <div class="pwm-bars">
        {#each pwmChannels as _, index}
          <div class="pwm-bar" style={`--level:${pwmLevel(index)}%;`}>
            <span class="pwm-value">{pwmLevel(index)}%</span>
          </div>
        {/each}
      </div>
    </section>

    <section aria-labelledby="pixel-title">
      <div class="section-head">
        <h3 id="pixel-title">Pixel stream</h3>
        <span class="badge">Addressable lane</span>
      </div>
      <div
        class="pixel-strip"
        bind:this={pixelStrip}
        style={pixelColumns ? `--pixel-columns:${pixelColumns}` : undefined}
      >
        {#each pixelSegments as _, index}
          <span class="pixel" style={`background:${pixelTint(index)}; opacity:${0.35 + blend * 0.65};`}></span>
        {/each}
      </div>
    </section>
  </div>

  <div class="blend-control">
    <label for="blend-slider">PWM ↔ Pixel blend</label>
    <input
      id="blend-slider"
      type="range"
      min="0.2"
      max="1"
      step="0.05"
      bind:value={blend}
    />
  </div>

  <footer>
    <p>{active.description}</p>
  </footer>
</div>

<style>
  .dual-config {
    margin-top: clamp(1.8rem, 4vw, 2.8rem);
    padding: clamp(1.5rem, 3.2vw, 2.3rem);
    display: grid;
    gap: clamp(1.1rem, 2.4vw, 1.8rem);
    max-width: 940px;
    margin-inline: auto;
    z-index: 0;
  }

  .dual-config > * {
    position: relative;
    z-index: 1;
  }

  header {
    display: grid;
    gap: 0.45rem;
  }

  header h2 {
    margin: 0;
    font-size: clamp(1.35rem, 2.8vw, 1.6rem);
  }

  header p {
    margin: 0;
    color: var(--muted);
    max-width: 52ch;
  }

  .scenario-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    padding: clamp(0.55rem, 1.6vw, 0.8rem);
    border-radius: var(--radius-ribbon);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-soft) 90%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, rgba(255, 255, 255, 0.16) 40%, transparent);
    position: relative;
    isolation: isolate;
  }

  .scenario-pills::before {
    content: '';
    position: absolute;
    inset: -130% -55% 38%;
    background: var(--aurora-tertiary);
    opacity: 0.4;
    filter: blur(82px);
    pointer-events: none;
    animation: halo-drift var(--halo-speed) linear infinite;
  }

  .scenario-pills .pill {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.55rem 1rem;
    border-radius: var(--r-pill);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-soft) 80%, transparent);
    color: inherit;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    box-shadow: 0 8px 22px color-mix(in oklab, rgba(8, 12, 26, 0.75) 35%, transparent);
  }

  .scenario-pills .pill[aria-pressed='true'] {
    background: linear-gradient(135deg, color-mix(in oklab, var(--c) 16%, var(--surface-soft)), color-mix(in oklab, var(--a) 22%, transparent));
    border-color: color-mix(in oklab, var(--c) 40%, var(--border-soft));
    color: color-mix(in oklab, var(--ink) 85%, white 15%);
    box-shadow: 0 16px 36px color-mix(in oklab, var(--glow-secondary) 42%, transparent);
    transform: translateY(-2px);
  }

  .scenario-pills .pill:hover {
    border-color: color-mix(in oklab, var(--a) 38%, var(--border-soft));
  }

  .scenario-pills .pill:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--c) 65%, white 10%);
    outline-offset: 2px;
  }

  .outputs {
    position: relative;
    display: grid;
    gap: clamp(1rem, 2.2vw, 1.6rem);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .outputs section {
    min-width: 0;
    display: grid;
    gap: 0.75rem;
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .section-head h3 {
    margin: 0;
  }

  .pwm-bars {
    position: relative;
    display: grid;
    gap: 0.75rem;
    padding: clamp(0.75rem, 2vw, 1rem);
    border-radius: var(--radius-panel);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, rgba(255, 255, 255, 0.12) 40%, transparent);
    overflow: hidden;
  }

  .pwm-bars::before {
    content: '';
    position: absolute;
    inset: 10% 6%;
    border-radius: var(--radius-panel);
    border: 1px solid color-mix(in oklab, var(--border-track) 60%, transparent);
    opacity: 0.35;
    pointer-events: none;
  }

  .pwm-bar {
    position: relative;
    height: clamp(56px, 8vw, 68px);
    border-radius: var(--radius-card-tight);
    border: 1px solid var(--border-track);
    background: linear-gradient(90deg, color-mix(in oklab, var(--surface-track) 92%, transparent), color-mix(in oklab, var(--surface-soft) 75%, transparent));
    overflow: hidden;
  }

  .pwm-bar::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--glass-highlight);
    opacity: 0.45;
  }

  .pwm-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    width: var(--level);
    background: linear-gradient(120deg, var(--warm), var(--a));
    box-shadow: 0 0 32px color-mix(in oklab, var(--glow-primary) 75%, transparent);
    border-radius: inherit;
    transition: width 0.4s ease;
  }

  .pwm-value {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-weight: 600;
    color: color-mix(in oklab, var(--ink) 85%, white 15%);
    mix-blend-mode: screen;
  }

  .pixel-strip {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--pixel-columns, 16), minmax(0, 1fr));
    gap: 0.35rem;
    padding: clamp(0.55rem, 1.8vw, 0.75rem);
    border-radius: var(--radius-panel);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-glass-strong) 90%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, rgba(255, 255, 255, 0.1) 38%, transparent);
    overflow: hidden;
  }

  .pixel-strip::after {
    content: '';
    position: absolute;
    inset: -40% -20% auto;
    height: 60%;
    background: var(--track-lens);
    opacity: 0.4;
    filter: blur(48px);
    pointer-events: none;
    animation: halo-drift var(--halo-speed-alt) linear infinite;
  }

  .pixel {
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-button);
    border: 1px solid color-mix(in oklab, var(--border-track) 80%, transparent);
    box-shadow: 0 12px 26px color-mix(in oklab, var(--glow-secondary) 45%, transparent);
    overflow: hidden;
    transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    transform: translateZ(0);
  }

  .pixel::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.35), transparent 68%);
    mix-blend-mode: screen;
    opacity: 0.75;
  }

  .pixel:nth-child(odd) {
    animation: pixel-spark 3.2s linear infinite;
    animation-delay: calc(var(--order, 1) * -0.2s);
  }

  .pixel:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 32px color-mix(in oklab, var(--glow-secondary) 55%, transparent);
  }

  .blend-control {
    position: relative;
    display: grid;
    gap: 0.4rem;
  }

  .blend-control label {
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.75rem;
    border-radius: var(--r-pill);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--ink) 75%, var(--muted) 25%);
  }

  footer p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 85%, var(--ink) 15%);
  }

  @keyframes pixel-spark {
    0%,
    100% {
      transform: scale(0.9);
      box-shadow: 0 10px 18px color-mix(in oklab, var(--glow-secondary) 55%, transparent);
    }
    40% {
      transform: scale(1.05);
      box-shadow: 0 16px 32px color-mix(in oklab, var(--glow-primary) 70%, transparent);
    }
  }

  @keyframes halo-drift {
    0% {
      transform: translate3d(-4%, -4%, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(6%, 6%, 0) rotate(120deg);
    }
    100% {
      transform: translate3d(-4%, -4%, 0) rotate(360deg);
    }
  }

  @media (min-width: 960px) {
    .dual-config {
      grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
      grid-template-areas:
        'header outputs'
        'pills outputs'
        'blend outputs'
        'footer outputs';
      align-items: start;
    }

    header {
      grid-area: header;
    }

    .scenario-pills {
      grid-area: pills;
      align-self: start;
    }

    .outputs {
      grid-area: outputs;
      align-self: stretch;
    }

    .blend-control {
      grid-area: blend;
      align-self: end;
    }

    footer {
      grid-area: footer;
    }
  }

  @media (max-width: 720px) {
    header h2 {
      font-size: clamp(1.2rem, 5vw, 1.3rem);
    }

    .scenario-pills {
      gap: 0.45rem;
    }

    .pixel-strip {
      --pixel-columns: 10;
    }

    .pwm-bar {
      height: clamp(48px, 12vw, 56px);
    }

    footer p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 560px) {
    .dual-config {
      padding: clamp(1.2rem, 4vw, 1.4rem);
    }

    .scenario-pills {
      flex-direction: column;
      align-items: stretch;
    }

    .scenario-pills .pill {
      width: 100%;
    }

    .pixel-strip {
      --pixel-columns: 8;
      gap: 0.3rem;
    }
  }

  @media (max-width: 420px) {
    .outputs {
      grid-template-columns: 1fr;
    }

    .pixel-strip {
      --pixel-columns: 6;
      gap: 0.26rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scenario-pills::before,
    .pixel-strip::after,
    .pixel,
    .pixel:nth-child(odd),
    .pwm-bar::after {
      animation: none;
      transition: none;
    }

    .pixel {
      transform: none;
    }
  }
</style>
