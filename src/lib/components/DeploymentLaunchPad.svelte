<script>
  const phases = [
    {
      title: 'Design review',
      description:
        'Plan wiring, power, and sync before hardware is ordered so the install matches what the firmware can drive.',
      actions: [
        'Check LED load and breaker limits against firmware guardrails.',
        'Map node roles and confirm there is a spare leader.',
        'Load example palettes that match the project palette.',
        'Prepare signage placeholders with your actual assets.'
      ]
    },
    {
      title: 'Bench commissioning',
      description:
        'Stage a test rig so technicians can flash firmware, set Wi-Fi, and rehearse cues before arriving on-site.',
      actions: [
        'Provision each node with Wi-Fi and an access point fallback.',
        'Run the sync test to confirm drift stays within spec.',
        'Pair LED loads to confirm current draw and dimming.',
        'Review signage loops for readability on the target screens.'
      ]
    },
    {
      title: 'Go-live support',
      description:
        'During opening, the same console tracks telemetry, timelines, and any emergency looks.',
      actions: [
        'Mirror the dashboard to the control desk and mobile devices.',
        'Keep contact routes to the engineering team open day and night.',
        'Store backup looks for blackout, warm-dim, and promo scenes.',
        'Confirm signage triggers line up with the CMS or playlist feeds.'
      ]
    }
  ];

  const readiness = [
    {
      label: 'Mesh sync drift',
      value: '< 0.8 ms',
      note: 'Measured on the bench after a 20 minute warm-up.'
    },
    {
      label: 'Nodes online',
      value: '12 / 12',
      note: 'All peers respond to REST status checks.'
    },
    {
      label: 'Power headroom',
      value: '18%',
      note: 'PWM ramps stay within the power budget.'
    }
  ];

  const channels = ['Email or phone support', 'Remote timeline rehearsal', 'On-site calibration partner', 'Signage asset ingest'];
</script>

<div class="launch-shell reveal">
  <div class="launch-intro glass-panel">
    <p class="launch-eyebrow">Deployment launch pad</p>
    <h3 class="launch-title">Prepare the install and opening night</h3>
    <p class="launch-lead">
      The launch pad is a checklist we use on every LED Node project. It keeps power checks, sync tests, and signage reviews in
      one place so your crew can rehearse before guests arrive.
    </p>
    <div class="launch-channels" role="list">
      {#each channels as channel}
        <span class="channel-pill" role="listitem">{channel}</span>
      {/each}
    </div>
  </div>

  <div class="launch-grid">
    <div class="launch-checklist">
      {#each phases as phase, index}
        <article class="phase-card glass">
          <header class="phase-header">
            <span class="phase-index">0{index + 1}</span>
            <h4>{phase.title}</h4>
          </header>
          <p>{phase.description}</p>
          <ul>
            {#each phase.actions as action}
              <li>{action}</li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>

    <aside class="launch-telemetry glass" aria-live="polite">
      <div class="telemetry-header">
        <p class="telemetry-eyebrow">Readiness telemetry</p>
        <h4>Field confidence snapshot</h4>
        <p>
          These sample values show the kind of telemetry teams watch during commissioning: sync drift, live node count, and
          power headroom.
        </p>
      </div>
      <div class="telemetry-metrics">
        {#each readiness as metric}
          <div class="metric-card">
            <span class="metric-label">{metric.label}</span>
            <span class="metric-value">{metric.value}</span>
            <span class="metric-note">{metric.note}</span>
          </div>
        {/each}
      </div>
      <footer class="telemetry-footer">
        <p>
          Keep a spare controller flashed and ready so you can swap leadership without losing the running scene.
        </p>
      </footer>
    </aside>
  </div>
</div>

<style>
  .launch-shell {
    display: grid;
    gap: var(--stage-gap);
  }

  .launch-intro {
    position: relative;
  }

  .launch-eyebrow {
    margin: 0;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: color-mix(in oklab, var(--muted) 55%, var(--ink) 45%);
  }

  .launch-title {
    margin: 0;
    font-size: clamp(1.8rem, 3.2vw, 2.4rem);
  }

  .launch-lead {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 62%, var(--ink) 38%);
  }

  .launch-channels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .channel-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-chip);
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-soft) 85%, transparent);
    color: color-mix(in oklab, var(--muted) 55%, var(--ink) 45%);
    position: relative;
    overflow: hidden;
  }

  .channel-pill::before {
    content: '';
    position: absolute;
    inset: -50%;
    background: radial-gradient(120% 120% at 18% 32%, color-mix(in oklab, var(--halo-primary) 42%, transparent) 0%, transparent 72%);
    opacity: 0.55;
    filter: blur(42px);
    pointer-events: none;
  }

  .launch-grid {
    display: grid;
    gap: var(--stage-gap);
  }

  .launch-checklist {
    display: grid;
    gap: var(--card-gap-loose);
  }

  .phase-card {
    padding: var(--card-pad);
    border-radius: var(--radius-card);
    display: grid;
    gap: var(--card-gap);
    position: relative;
  }

  .phase-card::after {
    content: '';
    position: absolute;
    inset: auto clamp(18%, 4vw, 28%) -60% auto;
    height: 220%;
    background: linear-gradient(
      130deg,
      color-mix(in oklab, var(--halo-primary) 48%, transparent) 0%,
      color-mix(in oklab, var(--halo-secondary) 32%, transparent) 55%,
      color-mix(in oklab, var(--halo-glow) 42%, transparent) 100%
    );
    opacity: 0.18;
    filter: blur(96px);
    pointer-events: none;
  }

  .phase-header {
    display: flex;
    align-items: center;
    gap: var(--card-gap);
  }

  .phase-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: clamp(2.4rem, 5vw, 2.9rem);
    height: clamp(2.4rem, 5vw, 2.9rem);
    border-radius: var(--radius-button);
    font-weight: 600;
    font-feature-settings: 'tnum' 1, 'ss01' 1;
    background: color-mix(in oklab, var(--surface-track-strong) 90%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-track) 86%, transparent);
    color: color-mix(in oklab, var(--halo-primary) 58%, var(--ink) 42%);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--halo-secondary) 22%, transparent);
  }

  .phase-card h4 {
    margin: 0;
    font-size: clamp(1.1rem, 2.8vw, 1.35rem);
  }

  .phase-card p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 62%, var(--ink) 38%);
  }

  .phase-card ul {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: var(--card-gap-tight);
  }

  .phase-card li {
    color: color-mix(in oklab, var(--muted) 58%, var(--ink) 42%);
  }

  .launch-telemetry {
    border-radius: var(--radius-panel);
    padding: var(--panel-pad);
    display: grid;
    gap: var(--panel-gap);
  }

  .telemetry-header {
    display: grid;
    gap: 0.6rem;
  }

  .telemetry-eyebrow {
    margin: 0;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.72rem;
    color: color-mix(in oklab, var(--muted) 55%, var(--ink) 45%);
  }

  .telemetry-header h4 {
    margin: 0;
    font-size: clamp(1.2rem, 2.6vw, 1.6rem);
  }

  .telemetry-header p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 60%, var(--ink) 40%);
  }

  .telemetry-metrics {
    display: grid;
    gap: var(--card-gap);
  }

  .metric-card {
    display: grid;
    gap: var(--card-gap-tight);
    padding: var(--card-pad-tight);
    border-radius: var(--radius-card-tight);
    background: var(--card-surface-soft);
    border: 1px solid var(--card-border-soft);
    box-shadow: inset 0 0 0 1px var(--card-outline-glow);
  }

  .metric-label {
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 55%, var(--ink) 45%);
  }

  .metric-value {
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 600;
    color: color-mix(in oklab, var(--ink) 85%, var(--halo-primary) 15%);
  }

  .metric-note {
    font-size: 0.85rem;
    color: color-mix(in oklab, var(--muted) 58%, var(--ink) 42%);
  }

  .telemetry-footer {
    padding: var(--card-pad-tight);
    border-radius: var(--radius-card-tight);
    background: var(--card-surface-track);
    border: 1px solid var(--card-border-track);
    box-shadow: inset 0 0 0 1px var(--card-outline-strong);
  }

  .telemetry-footer p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 58%, var(--ink) 42%);
  }

  @media (min-width: 56rem) {
    .launch-grid {
      grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
      align-items: start;
    }
  }

  @media (min-width: 70rem) {
    .launch-shell {
      grid-template-columns: minmax(0, 1fr);
    }

    .launch-grid {
      grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    }
  }
</style>
