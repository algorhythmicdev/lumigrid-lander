<script>
  export let endpoints = [];
  export let safeguards = [];
  export let telemetry = [];

  const handshakePhases = [
    {
      step: '01',
      title: 'Discovery',
      detail: 'Nodes announce over mDNS + MQTT so CMS, signage suites, or show controllers map the mesh instantly.'
    },
    {
      step: '02',
      title: 'Auth handshake',
      detail: 'Signed tokens pair browsers, signage uploaders, and control rooms; REST keys rotate on the same cadence as firmware updates.'
    },
    {
      step: '03',
      title: 'Cue stream',
      detail: 'Multicast tick + SSE playhead keep REST triggers, signage swaps, MQTT cues, and OSC pulses in phase.'
    },
    {
      step: '04',
      title: 'Feedback loop',
      detail: 'Telemetry mirrors into dashboards, showing power headroom, signage asset status, and leadership swaps in real time.'
    }
  ];

  const bridgeModes = [
    'MQTT <-> REST bridge for signage CMS',
    'OSC clock for DAWs & show control',
    'Lighting consoles via Art-Net / sACN proxy',
    'BMS hooks publishing to Modbus gateway',
    'Asset ingest webhooks for poster + loop placeholders',
    'Playlist + ticker sync via SSE feed'
  ];
</script>

<div class="integration-matrix glass" role="group" aria-labelledby="integration-matrix-title">
  <span class="matrix-halo" aria-hidden="true"></span>

  <header class="matrix-head">
    <span class="matrix-badge">API mesh</span>
    <h3 id="integration-matrix-title">Integration matrix</h3>
    <p>
      Wire LumiGrid into creative tools, building control, or live show timelines while the glass console keeps
      safeguards locked.
    </p>
  </header>

  <div class="matrix-grid">
    <section class="matrix-column api" aria-labelledby="integration-api-title">
      <div class="column-head">
        <h4 id="integration-api-title">Endpoint lattice</h4>
        <p>Direct calls mirror the README so every install ships with the same contract.</p>
      </div>
      <ul class="endpoint-list">
        {#each endpoints as endpoint (endpoint.endpoint)}
          <li>
            <span class="endpoint-call">{endpoint.endpoint}</span>
            <p>{endpoint.description}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section class="matrix-column handshake" aria-labelledby="integration-handshake-title">
      <div class="column-head">
        <h4 id="integration-handshake-title">Handshake timeline</h4>
        <p>Every halo beat shares the same rounded choreography—from discovery to telemetry.</p>
      </div>
      <ol class="handshake-track">
        {#each handshakePhases as phase (phase.step)}
          <li data-step={phase.step}>
            <strong>{phase.title}</strong>
            <p>{phase.detail}</p>
          </li>
        {/each}
      </ol>
      <div class="bridge-panel glass-panel" aria-labelledby="integration-bridges-title">
        <h5 id="integration-bridges-title">Bridge modes</h5>
        <ul>
          {#each bridgeModes as mode}
            <li>{mode}</li>
          {/each}
        </ul>
      </div>
    </section>

    <section class="matrix-column safeguards" aria-labelledby="integration-safeguards-title">
      <div class="column-head">
        <h4 id="integration-safeguards-title">Safeguards & signals</h4>
        <p>Halo diagnostics surface instantly so operators see the mesh breathing.</p>
      </div>
      <div class="telemetry-stack" role="list">
        {#each telemetry as item (item.label)}
          <article class="telemetry-card" role="listitem">
            <span class="telemetry-label">{item.label}</span>
            <span class="telemetry-value">{item.value}</span>
          </article>
        {/each}
      </div>
      <div class="safeguard-panel glass-panel" aria-labelledby="integration-safeguard-list">
        <h5 id="integration-safeguard-list">Reliability guardrails</h5>
        <ul>
          {#each safeguards as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    </section>
  </div>
</div>

<style>
  .integration-matrix {
    --matrix-gap: clamp(var(--card-gap), 5cqw, var(--stage-gap));
    --matrix-pad: clamp(var(--card-pad), 6cqw, clamp(1.8rem, 3.6vw, 2.6rem));
    display: grid;
    gap: var(--matrix-gap);
    padding: var(--matrix-pad);
    border-radius: var(--radius-stage);
    width: var(--card-shell-wide);
    margin-inline: auto;
    container-type: inline-size;
  }

  .matrix-halo {
    position: absolute;
    inset: -25% -35% auto -35%;
    height: 140%;
    background: radial-gradient(120% 120% at 30% 30%, color-mix(in oklab, var(--halo-primary) 48%, transparent) 0%, transparent 75%),
      radial-gradient(120% 120% at 70% 60%, color-mix(in oklab, var(--halo-secondary) 44%, transparent) 0%, transparent 78%);
    filter: blur(120px);
    opacity: 0.45;
    mix-blend-mode: screen;
    pointer-events: none;
    animation: matrixPulse var(--halo-speed) linear infinite;
  }

  .matrix-head {
    position: relative;
    z-index: 1;
    display: grid;
    gap: clamp(0.6rem, 1.8vw, 1.1rem);
    max-width: 48ch;
  }

  .matrix-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.1rem;
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--glass) 94%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-border) 86%, transparent);
    backdrop-filter: saturate(160%) blur(14px);
    -webkit-backdrop-filter: saturate(160%) blur(14px);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  .matrix-head h3 {
    margin: 0;
    font-size: clamp(1.6rem, 3.4vw, 2.3rem);
  }

  .matrix-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 72%, var(--ink) 28%);
  }

  .matrix-grid {
    position: relative;
    z-index: 1;
    display: grid;
    gap: clamp(1.4rem, 3vw, 2.2rem);
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .matrix-column {
    --matrix-column-gap: clamp(var(--card-gap-tight), 4cqw, var(--card-gap));
    --matrix-column-pad: clamp(var(--card-pad-tight), 5cqw, var(--card-pad));
    display: grid;
    gap: var(--matrix-column-gap);
    padding: var(--matrix-column-pad);
    border-radius: var(--radius-panel);
    background: color-mix(in oklab, var(--surface-glass-strong) 82%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-strong-border) 82%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-soft) 45%, transparent);
    backdrop-filter: saturate(160%) blur(14px);
    -webkit-backdrop-filter: saturate(160%) blur(14px);
    position: relative;
    overflow: hidden;
  }

  .matrix-column::after {
    content: '';
    position: absolute;
    inset: -120% -40% auto;
    height: 120%;
    background: var(--halo-sheen-gradient);
    opacity: 0.18;
    filter: blur(var(--halo-sheen-blur));
    mix-blend-mode: screen;
    animation: sheenSweep var(--halo-sheen-speed) linear infinite;
    pointer-events: none;
  }

  .column-head {
    display: grid;
    gap: 0.4rem;
  }

  .column-head h4 {
    margin: 0;
    font-size: clamp(1.1rem, 2.6vw, 1.4rem);
  }

  .column-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .endpoint-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--card-gap);
  }

  .endpoint-list li {
    display: grid;
    gap: var(--card-gap-tight);
    padding: var(--card-pad-tight) clamp(1rem, 2.4vw, 1.4rem);
    border-radius: var(--radius-card-tight);
    background: var(--card-surface);
    border: 1px solid var(--card-border);
    box-shadow: inset 0 0 0 1px var(--card-outline-glow);
  }

  .endpoint-call {
    font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--ink) 75%, var(--muted) 25%);
  }

  .endpoint-list p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 72%, var(--ink) 28%);
  }

  .handshake-track {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--card-gap);
    counter-reset: handshake;
  }

  .handshake-track li {
    position: relative;
    padding: var(--card-pad-tight) clamp(1rem, 2.4vw, 1.4rem);
    border-radius: var(--radius-card-tight);
    background: var(--card-surface);
    border: 1px solid var(--card-border);
    box-shadow: inset 0 0 0 1px var(--card-outline-soft);
    display: grid;
    gap: var(--card-gap-tight);
  }

  .handshake-track li::before {
    content: attr(data-step);
    position: absolute;
    inset: clamp(0.7rem, 2vw, 1rem) clamp(0.8rem, 2vw, 1.1rem) auto auto;
    border-radius: var(--r-pill);
    padding: 0.3rem 0.65rem;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    background: var(--card-surface-soft);
    border: 1px solid var(--card-border-soft);
    color: color-mix(in oklab, var(--muted) 68%, var(--ink) 32%);
  }

  .handshake-track strong {
    font-size: 1rem;
  }

  .handshake-track p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .bridge-panel {
    margin-top: clamp(0.6rem, 2vw, 1rem);
    gap: 0.6rem;
  }

  .bridge-panel h5,
  .safeguard-panel h5 {
    margin: 0;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 0.72rem;
    color: color-mix(in oklab, var(--muted) 64%, var(--ink) 36%);
  }

  .bridge-panel ul,
  .safeguard-panel ul {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.45rem;
  }

  .bridge-panel li,
  .safeguard-panel li {
    color: color-mix(in oklab, var(--muted) 72%, var(--ink) 28%);
  }

  .telemetry-stack {
    display: grid;
    gap: var(--card-gap);
  }

  .telemetry-card {
    position: relative;
    padding: var(--card-pad-tight) clamp(1.1rem, 2.6vw, 1.45rem);
    border-radius: var(--radius-card);
    background: linear-gradient(135deg, color-mix(in oklab, var(--card-surface-strong) 100%, transparent), color-mix(in oklab, var(--card-surface) 80%, transparent));
    border: 1px solid var(--card-border-strong);
    box-shadow: inset 0 0 0 1px var(--card-outline-strong), 0 24px 48px var(--shadow-elevated-strong);
    display: grid;
    gap: var(--card-gap-tight);
  }

  .telemetry-card::after {
    content: '';
    position: absolute;
    inset: -120% auto auto -40%;
    width: 140%;
    height: 120%;
    background: var(--aurora-primary), var(--aurora-secondary);
    opacity: 0.28;
    filter: blur(76px);
    mix-blend-mode: screen;
    animation: telemetrySweep var(--halo-speed-alt) linear infinite;
    pointer-events: none;
  }

  .telemetry-label {
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 64%, var(--ink) 36%);
  }

  .telemetry-value {
    font-size: clamp(1.1rem, 2.6vw, 1.35rem);
    font-weight: 600;
  }

  .safeguard-panel {
    gap: 0.6rem;
  }

  @keyframes matrixPulse {
    0%,
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.42;
    }
    50% {
      transform: translate3d(3%, -2%, 0) scale(1.06);
      opacity: 0.54;
    }
  }

  @keyframes sheenSweep {
    0% {
      transform: translate3d(-20%, 0, 0);
    }
    50% {
      transform: translate3d(10%, 0, 0);
    }
    100% {
      transform: translate3d(-20%, 0, 0);
    }
  }

  @keyframes telemetrySweep {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(6%, -4%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @media (max-width: 960px) {
    .integration-matrix {
      border-radius: var(--radius-shell);
      --matrix-gap: clamp(var(--card-gap-tight), 4cqw, var(--stage-gap));
      --matrix-pad: clamp(var(--card-pad-tight), 5cqw, var(--card-pad));
    }

    .matrix-column {
      --matrix-column-gap: clamp(var(--card-gap-tight), 4cqw, var(--card-gap));
      --matrix-column-pad: clamp(var(--card-pad-tight), 5cqw, var(--card-pad));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .matrix-halo,
    .matrix-column::after,
    .telemetry-card::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
</style>
