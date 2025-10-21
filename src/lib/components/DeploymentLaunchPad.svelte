<script>
  const phases = [
    {
      title: 'Preflight modeling',
      description:
        'Simulate the install before metal work begins — every circuit, pixel map, and sync hop is rehearsed in the launch pad.',
      actions: [
        'Power envelopes validated against firmware guard rails',
        'Mesh topology rehearsed with redundant masters',
        'Effect palettes hydrated with venue-specific gradients'
      ]
    },
    {
      title: 'Bench commissioning',
      description:
        'Bundle a pocket of LumiGrid into a staging kit so technicians can plug, flash, and validate timelines on-site within minutes.',
      actions: [
        'Provision nodes with Wi-Fi + fallback AP scripts',
        'Run deterministic sync test suite with heartbeat scopes',
        'Sign off LED + PWM load pairing in the DualOutput console'
      ]
    },
    {
      title: 'Showtime escalation',
      description:
        'When the venue opens, the launch pad keeps telemetry, cue playback, and emergency overrides one tap away.',
      actions: [
        'Ops dashboard mirrored to mobile + control booth',
        '24/7 Signal + email escalation into the engineering thread',
        'Hot spare presets for blackout, warm-dim, and promo looks'
      ]
    }
  ];

  const readiness = [
    {
      label: 'Mesh sync drift',
      value: '< 0.8 ms',
      note: 'Captured from the bench scope after a 20 minute thermal soak.'
    },
    {
      label: 'Nodes online',
      value: '12 / 12',
      note: 'All peers heartbeat + respond to REST and MQTT status pings.'
    },
    {
      label: 'Power headroom',
      value: '18%',
      note: 'Live monitor keeps PWM ramps inside thermal and breaker margins.'
    }
  ];

  const channels = ['Signal + email bridge', 'Remote timeline rehearsal', 'On-site calibration partner'];
</script>

<div class="launch-shell reveal">
  <div class="launch-intro glass-panel">
    <p class="launch-eyebrow">Deployment launch pad</p>
    <h3 class="launch-title">Ready the mesh, then roll it live</h3>
    <p class="launch-lead">
      Every LumiGrid install ships with the same glass control surface the demo runs on — tuned tokens, rounded halos, and
      field-proven commissioning rituals. The launch pad stages rehearsals, validates sync, and guides the crew through opening
      night.
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
          The live dashboard mirrors into the launch pad, surfacing drift, load headroom, and node count so crews can stage,
          rehearse, and trigger cues with certainty.
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
          Backups stay synced on a hot spare node — swap leadership in the Mesh Navigator and the launch pad updates instantly.
        </p>
      </footer>
    </aside>
  </div>
</div>

<style>
  .launch-shell {
    display: grid;
    gap: clamp(1.6rem, 4vw, 2.6rem);
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
    gap: clamp(1.6rem, 4vw, 2.4rem);
  }

  .launch-checklist {
    display: grid;
    gap: clamp(1.2rem, 3vw, 1.8rem);
  }

  .phase-card {
    padding: clamp(1.35rem, 3.2vw, 2rem);
    border-radius: var(--radius-card);
    display: grid;
    gap: 0.85rem;
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
    gap: 0.8rem;
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
    gap: 0.55rem;
  }

  .phase-card li {
    color: color-mix(in oklab, var(--muted) 58%, var(--ink) 42%);
  }

  .launch-telemetry {
    border-radius: var(--radius-panel);
    padding: clamp(1.6rem, 3.4vw, 2.2rem);
    display: grid;
    gap: clamp(1.1rem, 3vw, 1.6rem);
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
    gap: 0.9rem;
  }

  .metric-card {
    display: grid;
    gap: 0.25rem;
    padding: clamp(1rem, 2.6vw, 1.4rem);
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--surface-soft) 96%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-soft) 88%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--halo-primary) 12%, transparent);
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
    padding: clamp(1rem, 2.6vw, 1.4rem);
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--surface-track) 94%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-track) 88%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--halo-glow) 18%, transparent);
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
