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
    margin-top: clamp(1.8rem, 4vw, 2.6rem);
    padding: clamp(1.4rem, 3vw, 2rem);
    display: grid;
    gap: clamp(1rem, 2.2vw, 1.6rem);
    max-width: 900px;
    margin-inline: auto;
  }

  .dual-config header h2 {
    margin: 0 0 0.4rem;
    font-size: 1.4rem;
  }

  .dual-config header p {
    margin: 0;
    color: var(--muted);
  }

  .scenario-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .scenario-pills .pill {
    background: var(--soft-bg);
    border: 1px solid var(--soft-border);
    color: inherit;
    padding: 0.55rem 0.95rem;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  .scenario-pills .pill[aria-pressed='true'] {
    background: color-mix(in oklab, var(--c) 20%, var(--soft-bg));
    border-color: color-mix(in oklab, var(--c) 30%, var(--soft-border));
  }

  .scenario-pills .pill:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--c) 65%, white 10%);
    outline-offset: 2px;
  }

  .outputs {
    display: grid;
    gap: clamp(1rem, 2.1vw, 1.5rem);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .outputs section {
    min-width: 0;
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.6rem;
  }

  .section-head h3 {
    margin: 0;
  }

  .pwm-bars {
    display: grid;
    gap: 0.8rem;
  }

  .pwm-bar {
    position: relative;
    height: 60px;
    border-radius: 0.9rem;
    background: linear-gradient(90deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05));
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .pwm-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    width: var(--level);
    background: linear-gradient(135deg, var(--warm), var(--a));
    box-shadow: 0 0 18px rgba(231, 59, 163, 0.45);
    border-radius: inherit;
    transition: width 0.4s ease;
  }

  .pwm-value {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-weight: 600;
    color: var(--ink);
    mix-blend-mode: screen;
  }

  .pixel-strip {
    display: grid;
    grid-template-columns: repeat(var(--pixel-columns, 16), minmax(0, 1fr));
    gap: 0.35rem;
    padding: 0.6rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .pixel {
    aspect-ratio: 1 / 1;
    border-radius: 0.5rem;
    box-shadow: 0 0 16px rgba(28, 197, 220, 0.4);
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateZ(0);
  }

  .pixel:nth-child(odd) {
    animation: pixel-spark 3.2s linear infinite;
    animation-delay: calc(var(--order, 1) * -0.2s);
  }

  .blend-control {
    display: grid;
    gap: 0.45rem;
  }

  .blend-control label {
    font-weight: 600;
  }

  footer p {
    margin: 0;
    color: var(--muted);
  }

  input[type='range'] {
    width: 100%;
    accent-color: var(--c);
  }

  @keyframes pixel-spark {
    0%, 100% {
      transform: scale(0.92);
      box-shadow: 0 0 10px rgba(28, 197, 220, 0.35);
    }
    40% {
      transform: scale(1);
      box-shadow: 0 0 22px rgba(231, 59, 163, 0.45);
    }
  }

  @media (min-width: 960px) {
    .dual-config {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      grid-template-areas:
        'header outputs'
        'pills outputs'
        'blend outputs'
        'footer outputs';
      align-items: start;
    }

    .dual-config header {
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

  @media (max-width: 640px) {
    .dual-config header h2 {
      font-size: 1.2rem;
    }

    .scenario-pills {
      gap: 0.45rem;
    }

    .pixel-strip {
      --pixel-columns: 8;
      gap: 0.3rem;
      padding: 0.5rem;
    }

    .pwm-bar {
      height: 48px;
    }

    .blend-control label {
      font-size: 0.95rem;
    }

    footer p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    .scenario-pills {
      flex-direction: column;
      align-items: stretch;
    }

    .scenario-pills .pill {
      width: 100%;
      justify-content: center;
    }

    .blend-control {
      gap: 0.35rem;
    }

    .pixel-strip {
      --pixel-columns: 6;
    }
  }

  @media (max-width: 420px) {
    .dual-config {
      padding: 1.1rem;
    }

    .outputs {
      grid-template-columns: 1fr;
    }

    .pixel-strip {
      --pixel-columns: 5;
      gap: 0.28rem;
      padding: 0.45rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pixel,
    .pwm-bar::after {
      transition: none;
    }

    .pixel:nth-child(odd) {
      animation: none;
    }
  }
</style>
