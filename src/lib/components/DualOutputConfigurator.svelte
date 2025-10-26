<script>
  import { onMount, onDestroy } from 'svelte';
  import { caps } from '../stores/capabilities';

  const scenarios = [
    {
      id: 'hybrid',
      label: 'Façade blend',
      description: 'Pixel strips add colour while white channels hold a steady base for the façade.',
      signage: 'Use when a storefront sign needs motion on the edges and even white light on the face.',
      assets: ['White channels stay around 60% for legibility.', 'Pixel lane runs a slow gradient for background colour.'],
      pwm: [0.8, 0.4, 0.65, 0.3],
      pixels: [
        'color-mix(in oklab, var(--c) 92%, transparent)',
        'color-mix(in oklab, var(--a) 92%, transparent)',
        'color-mix(in oklab, var(--b) 88%, transparent)',
        'color-mix(in oklab, var(--warm) 94%, transparent)'
      ],
      blend: 0.6
    },
    {
      id: 'power',
      label: 'Energy saver',
      description: 'Reduce white output late in the day while keeping a light pixel motion for attention.',
      signage: 'Good for late trading hours when you want to stay visible without running full power.',
      assets: ['White channels dim to roughly one third output.', 'Pixel lane stays active so passers-by still notice the sign.'],
      pwm: [0.35, 0.2, 0.25, 0.15],
      pixels: [
        'color-mix(in oklab, var(--c) 88%, transparent)',
        'color-mix(in oklab, var(--halo-secondary) 68%, var(--warm))',
        'color-mix(in oklab, var(--halo-primary) 78%, transparent)',
        'color-mix(in oklab, var(--warm) 82%, transparent)'
      ],
      blend: 0.35
    },
    {
      id: 'event',
      label: 'Event mode',
      description: 'Drive both outputs high for a launch night or promo when you need full brightness.',
      signage: 'Signage copy stays bright while the pixel lane adds motion for the campaign.',
      assets: ['White channels run close to full output.', 'Pixel lane sweeps bright gradients behind the signage area.'],
      pwm: [0.95, 0.85, 0.7, 0.9],
      pixels: [
        'color-mix(in oklab, var(--warm) 82%, transparent)',
        'color-mix(in oklab, var(--a) 80%, transparent)',
        'color-mix(in oklab, var(--warm) 96%, transparent)',
        'color-mix(in oklab, var(--b) 80%, transparent)'
      ],
      blend: 0.8
    },
    {
      id: 'signage',
      label: 'Signage focus',
      description: 'Keep the sign easy to read while the room lighting stays calm.',
      signage: 'Ideal for day mode: sign stays on-brand, ambient light sits lower for comfort.',
      assets: ['White channels cover the main sign faces.', 'Pixel lane adds a soft halo without overpowering text.'],
      pwm: [0.6, 0.42, 0.5, 0.38],
      pixels: [
        'color-mix(in oklab, var(--halo-secondary) 86%, transparent)',
        'color-mix(in oklab, var(--c) 88%, transparent)',
        'color-mix(in oklab, var(--halo-primary) 84%, transparent)',
        'color-mix(in oklab, var(--warm) 78%, transparent)'
      ],
      blend: 0.58
    },
    {
      id: 'emergency',
      label: 'Safety override',
      description: 'Switch to a safety look: white output rises while pixels pulse in red.',
      signage: 'Use for emergency rehearsals so crews know what the override will show.',
      assets: ['White channels lift for visibility.', 'Pixel lane pulses red and amber as a warning.'],
      pwm: [0.28, 0.18, 0.24, 0.2],
      pixels: [
        'color-mix(in oklab, var(--state-error-strong) 82%, transparent)',
        'color-mix(in oklab, var(--halo-secondary) 72%, transparent)',
        'color-mix(in oklab, var(--state-success-strong) 70%, transparent)',
        'color-mix(in oklab, var(--halo-primary) 68%, transparent)'
      ],
      blend: 0.46
    },
    {
      id: 'district',
      label: 'Linked sites',
      description: 'Use one blend across a few storefronts so every site looks consistent.',
      signage: 'Handy when a retail district wants a shared look for a promotion.',
      assets: ['White channels keep brand colours aligned.', 'Pixel lane shares a paced sweep across each location.'],
      pwm: [0.72, 0.5, 0.58, 0.62],
      pixels: [
        'color-mix(in oklab, var(--halo-primary) 88%, transparent)',
        'color-mix(in oklab, var(--halo-secondary) 84%, transparent)',
        'color-mix(in oklab, var(--warm) 82%, transparent)',
        'color-mix(in oklab, var(--c) 86%, transparent)'
      ],
      blend: 0.68
    }
  ];

  const pwmChannels = Array.from({ length: 4 });
  const pixelSegments = Array.from({ length: 16 });

  let active = scenarios[0];
  let blend = active.blend;
  let pixelColumns = null;
  let pixelStrip;
  let resizeObserver;

  $: whiteAvailable = $caps?.features.white_pwm;
  $: pixelAvailable = $caps?.features.pixels;
  $: blendControlAvailable = $caps?.features.blend_control;
  $: hasCaps = Boolean($caps);

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

    return `radial-gradient(circle at 50% 50%, ${colour} ${Math.max(35, blend * 80)}%, color-mix(in oklab, var(--ink) 8%, transparent) 100%)`;
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
      <p>
        Preview how PWM and pixel outputs respond in common use cases. Adjust the blend to see how LED Node balances both outputs
        while signage stays readable.
      </p>
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
      {#if whiteAvailable === false}
        <p class="output-note" role="status">
          White PWM output is off in this firmware build. Connect to a node with white channels enabled to preview dimming leve
ls.
        </p>
      {:else}
        <div class="pwm-bars">
          {#each pwmChannels as _, index}
            <div class="pwm-bar" style={`--level:${pwmLevel(index)}%;`}>
              <span class="pwm-value">{pwmLevel(index)}%</span>
            </div>
          {/each}
        </div>
      {/if}
    </section>

    <section aria-labelledby="pixel-title">
      <div class="section-head">
        <h3 id="pixel-title">Pixel stream</h3>
        <span class="badge">Addressable lane</span>
      </div>
      {#if pixelAvailable === false}
        <p class="output-note" role="status">
          Pixel output is off in this firmware build. Connect to a node with pixel output enabled to preview addressable effect
s.
        </p>
      {:else}
        <div
          class="pixel-strip"
          bind:this={pixelStrip}
          style={pixelColumns ? `--pixel-columns:${pixelColumns}` : undefined}
        >
          {#each pixelSegments as _, index}
            <span class="pixel" style={`background:${pixelTint(index)}; opacity:${0.35 + blend * 0.65};`}></span>
          {/each}
        </div>
      {/if}
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
      disabled={blendControlAvailable === false}
      aria-disabled={blendControlAvailable === false}
    />
  </div>

  {#if pixelAvailable === false || whiteAvailable === false}
    <p class="output-note" style="margin-top:.75rem">
      This preview uses both outputs. {#if whiteAvailable === false}White PWM is disabled.{/if}
      {#if pixelAvailable === false} Pixel output is disabled.{/if} Connect to a node with the outputs you need to view the full blend.
    </p>
  {/if}

  {#if blendControlAvailable === false}
    <p class="output-note" style="margin-top:.35rem">
      Blend control is off in this firmware build. The slider is locked to show the default mix between PWM and pixel output.
    </p>
  {:else if !hasCaps}
    <p class="output-note" style="margin-top:.35rem">
      Connect to a LED Node to confirm whether blend control is available in your firmware build.
    </p>
  {/if}

  <footer>
    <p>{active.description}</p>
    {#if active.signage}
      <p class="scenario-signage">{active.signage}</p>
    {/if}
    {#if active.assets?.length}
      <ul class="scenario-assets">
        {#each active.assets as note}
          <li>{note}</li>
        {/each}
      </ul>
    {/if}
  </footer>
</div>

<style>
  .dual-config {
    --dual-config-gap: clamp(var(--card-gap-tight), 4cqw, var(--panel-gap));
    --dual-config-pad: clamp(var(--card-pad-tight), 6cqw, var(--panel-pad));
    margin-top: var(--stage-gap);
    padding: var(--dual-config-pad);
    display: grid;
    gap: var(--dual-config-gap);
    width: var(--card-shell-wide);
    margin-inline: auto;
    z-index: 0;
    min-width: 0;
    container-type: inline-size;
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
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-strong) 40%, transparent);
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
    box-shadow: 0 8px 22px color-mix(in oklab, var(--shadow-umbra) 35%, transparent);
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

  .output-note {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
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
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-soft) 40%, transparent);
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
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-faint) 38%, transparent);
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
    background: radial-gradient(circle at 30% 30%, var(--surface-highlight-specular), transparent 68%);
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

  footer {
    display: grid;
    gap: clamp(0.55rem, 2vw, 0.9rem);
  }

  footer p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 85%, var(--ink) 15%);
  }

  .scenario-signage {
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .scenario-assets {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.45rem;
    color: color-mix(in oklab, var(--muted) 78%, var(--ink) 22%);
  }

  .scenario-assets li {
    line-height: 1.5;
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
      gap: var(--card-gap-tight);
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
