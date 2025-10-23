<script>
  const defaultStreams = [
    {
      name: 'Lobby signage lane',
      status: 'Live',
      tone: 'good',
      detail:
        'Lobby canvases mirror the welcome playlist with caption lint, luminance guards, and dual-output sync telemetry.',
      metrics: [
        { label: 'Contrast', value: 'AA+ verified (demo)' },
        { label: 'Sync drift', value: '≈0.6 ms demo' },
        { label: 'Approvals', value: 'Campaign · Ops (sample)' }
      ]
    },
    {
      name: 'Promenade ribbon',
      status: 'Syncing',
      tone: 'info',
      detail:
        'Outdoor ribbon streams signage payloads alongside façade pixels with adaptive brightness tied to ambient sensors.',
      metrics: [
        { label: 'Ambient', value: '42% dimmed (demo sensor)' },
        { label: 'Heartbeat', value: 'demo heartbeat' },
        { label: 'Fallback', value: 'Ready (simulated)' }
      ]
    },
    {
      name: 'Emergency overrides',
      status: 'Armed',
      tone: 'alert',
      detail:
        'Emergency slates inherit the emergency palette tokens and propagate rehearsed copy across every node.',
      metrics: [
        { label: 'Palette', value: 'Emergency token (sample)' },
        { label: 'Drill', value: 'Drill passed (demo)' },
        { label: 'Acknowledged', value: 'Roster A (sample)' }
      ]
    }
  ];

  const defaultAlerts = [
    {
      title: 'CMS webhook heartbeat',
      status: 'Stable',
      tone: 'good',
      detail: 'SSE signage bridge delivering placeholder updates across campaign + safety lanes.',
      time: 'Demo 14s ago'
    },
    {
      title: 'Partner takeover staging',
      status: 'Action needed',
      tone: 'alert',
      detail: 'Sponsor playlist awaiting localisation approval before the takeover slot unlocks.',
      time: 'Awaiting review (demo)'
    },
    {
      title: 'Transit relay overlay',
      status: 'Monitoring',
      tone: 'info',
      detail: 'Metro feed mirrored into the data rail with adaptive typography tokens watching contrast.',
      time: 'Live (demo)'
    }
  ];

  const defaultPlaybooks = [
    {
      title: 'Morning signage warm-up',
      summary: 'Validate daypart playlists before doors open so lobby, promenade, and partner lanes stay aligned.',
      steps: [
        'Load fresh campaign placeholders into the signage asset board and verify approvals.',
        'Trigger DualOutputConfigurator rehearsal to confirm signage and lighting cues stay in phase.',
        'Confirm CMS bridges, SSE heartbeats, and fallback signage packs from the operations observatory.'
      ]
    },
    {
      title: 'Partner takeover rehearsal',
      summary: 'Give sponsor playlists a dedicated rehearsal window with localisation and compliance in view.',
      steps: [
        'Run localisation packs through the SignageAssetBoard to validate typography and contrast.',
        'Route sponsor colours through the token mixer to maintain WCAG guardrails.',
        'Capture approvals and acknowledgements so the takeover unlocks without escalations.'
      ]
    },
    {
      title: 'Emergency override drill',
      summary: 'Keep safety messaging rehearsed so roster handoffs can trigger overrides without hesitation.',
      steps: [
        'Launch the emergency signage preset to ensure emergency palette tokens propagate mesh-wide.',
        'Verify roster acknowledgements inside the operations observatory escalation thread.',
        'Reset to the quiet-mode placeholder and confirm the signage audit trail logs the drill.'
      ]
    }
  ];

  export let streams = defaultStreams;
  export let alerts = defaultAlerts;
  export let playbooks = defaultPlaybooks;

  $: centerStreams = streams?.length ? streams : defaultStreams;
  $: centerAlerts = alerts?.length ? alerts : defaultAlerts;
  $: centerPlaybooks = playbooks?.length ? playbooks : defaultPlaybooks;
</script>

<div class="signage-center glass" role="group" aria-labelledby="signage-center-title">
  <span class="center-halo" aria-hidden="true"></span>

  <header class="center-head">
    <span class="center-badge">Signage command center</span>
    <h3 id="signage-center-title">Live signage oversight without leaving the controller</h3>
    <p>
      Follow the real-time state of signage lanes, alerts, and rehearsed responses. Everything rides the same token system so
      lighting, signage, and safety stories stay in sync.
    </p>
    <p class="center-note">Example telemetry for demonstration—values update when a live mesh connects.</p>
  </header>

  <div class="center-grid">
    <section class="center-panel streams glass-panel" aria-labelledby="signage-center-streams">
      <div class="panel-head">
        <span class="panel-pill">Live lanes</span>
        <h4 id="signage-center-streams">Signage streams</h4>
      </div>
      <ul class="stream-list">
        {#each centerStreams as stream (stream.name)}
          <li class="stream-card" data-tone={stream.tone ?? 'info'}>
            <div class="stream-head">
              <div class="stream-title">
                <strong>{stream.name}</strong>
                <p>{stream.detail}</p>
              </div>
              <span class="stream-status">{stream.status}</span>
            </div>
            {#if stream.metrics?.length}
              <dl class="stream-metrics">
                {#each stream.metrics as metric (metric.label)}
                  <div>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                {/each}
              </dl>
            {/if}
          </li>
        {/each}
      </ul>
    </section>

    <aside class="center-panel alerts glass-panel" aria-labelledby="signage-center-alerts">
      <div class="panel-head">
        <span class="panel-pill">Escalations</span>
        <h4 id="signage-center-alerts">Alert queue</h4>
      </div>
      <ul class="alert-list">
        {#each centerAlerts as alert (alert.title)}
          <li class="alert-card" data-tone={alert.tone ?? 'info'}>
            <div class="alert-head">
              <strong>{alert.title}</strong>
              <span class="alert-status">{alert.status}</span>
            </div>
            <p>{alert.detail}</p>
            {#if alert.time}
              <p class="alert-meta"><span>{alert.time}</span></p>
            {/if}
          </li>
        {/each}
      </ul>
    </aside>

    <section class="center-panel playbooks glass-panel" aria-labelledby="signage-center-playbooks">
      <div class="panel-head">
        <span class="panel-pill">Response patterns</span>
        <h4 id="signage-center-playbooks">Playbook snapshots</h4>
      </div>
      <ul class="playbook-list">
        {#each centerPlaybooks as book (book.title)}
          <li class="playbook-card">
            <strong>{book.title}</strong>
            <p>{book.summary}</p>
            {#if book.steps?.length}
              <ul class="playbook-steps">
                {#each book.steps as step (step)}
                  <li>{step}</li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  </div>
</div>

<style>
  .signage-center {
    --center-gap: clamp(var(--card-gap), 5cqw, var(--panel-gap));
    --center-pad: clamp(var(--card-pad), 6cqw, var(--panel-pad));
    position: relative;
    display: grid;
    gap: var(--center-gap);
    padding: var(--center-pad);
    border-radius: var(--radius-stage);
    width: var(--card-shell-wide);
    margin-inline: auto;
    overflow: hidden;
    container-type: inline-size;
  }

  .signage-center > * {
    position: relative;
    z-index: 1;
  }

  .center-halo {
    position: absolute;
    inset: -34% -38% auto -38%;
    height: 165%;
    background:
      radial-gradient(120% 120% at 24% 34%, color-mix(in oklab, var(--halo-secondary) 42%, transparent) 0%, transparent 80%),
      radial-gradient(120% 120% at 70% 60%, color-mix(in oklab, var(--halo-primary) 44%, transparent) 0%, transparent 82%),
      radial-gradient(140% 140% at 50% 92%, color-mix(in oklab, var(--halo-glow) 36%, transparent) 0%, transparent 88%);
    filter: blur(140px);
    opacity: 0.4;
    mix-blend-mode: screen;
    pointer-events: none;
    animation: centerGlow var(--halo-speed, 18s) linear infinite;
  }

  @keyframes centerGlow {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(-4%, 4%, 0);
    }
  }

  .center-head {
    display: grid;
    gap: clamp(0.6rem, 2.1vw, 1.1rem);
    max-width: 58ch;
  }

  .center-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
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

  .center-head h3 {
    margin: 0;
    font-size: clamp(1.55rem, 3.1vw, 2.2rem);
  }

  .center-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .center-note {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 65%, var(--ink) 35%);
    opacity: 0.8;
  }

  .center-grid {
    display: grid;
    gap: clamp(var(--card-gap), 5cqw, var(--card-gap-loose));
    grid-template-columns: minmax(0, 1fr);
  }

  .center-panel {
    display: grid;
    gap: clamp(var(--card-gap-tight), 3cqw, var(--card-gap));
    padding: clamp(var(--card-pad), 4cqw, var(--panel-pad));
    border-radius: var(--radius-panel);
  }

  .panel-head {
    display: grid;
    gap: clamp(0.4rem, 2vw, 0.8rem);
  }

  .panel-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.9rem;
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--surface-glass) 90%, transparent);
    border: 1px solid color-mix(in oklab, var(--surface-outline-soft) 48%, transparent);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .panel-head h4 {
    margin: 0;
    font-size: clamp(1.15rem, 2.6vw, 1.6rem);
  }

  .stream-list,
  .alert-list,
  .playbook-list {
    display: grid;
    gap: clamp(var(--card-gap-tight), 3cqw, var(--card-gap));
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .stream-card,
  .alert-card,
  .playbook-card {
    --tone-border: color-mix(in oklab, var(--surface-outline-soft) 46%, transparent);
    --tone-bg: color-mix(in oklab, var(--card-surface-soft) 92%, transparent);
    --tone-text: var(--ink);
    border: 1px solid var(--tone-border);
    border-radius: var(--radius-card);
    padding: clamp(1rem, 3cqw, 1.45rem);
    background: var(--tone-bg);
    display: grid;
    gap: clamp(0.55rem, 2.1vw, 0.85rem);
    box-shadow: var(--card-shadow);
  }

  .stream-card {
    --tone-border: color-mix(in oklab, var(--surface-outline-soft) 42%, transparent);
    --tone-bg: color-mix(in oklab, var(--card-surface) 88%, transparent);
  }

  .stream-card[data-tone='good'],
  .alert-card[data-tone='good'] {
    --tone-border: color-mix(in oklab, var(--state-success-strong) 34%, transparent);
    --tone-bg: color-mix(in oklab, var(--card-surface-soft) 60%, var(--state-success-strong) 40%);
    --tone-text: var(--signage-text-strong);
  }

  .stream-card[data-tone='alert'],
  .alert-card[data-tone='alert'] {
    --tone-border: color-mix(in oklab, var(--state-error-strong) 34%, transparent);
    --tone-bg: color-mix(in oklab, var(--card-surface-soft) 62%, var(--state-error-strong) 38%);
  }

  .stream-card[data-tone='info'],
  .alert-card[data-tone='info'] {
    --tone-border: color-mix(in oklab, var(--surface-outline-glow) 52%, transparent);
    --tone-bg: color-mix(in oklab, var(--card-surface-soft) 74%, var(--halo-secondary) 26%);
  }

  .alert-card {
    --tone-bg: color-mix(in oklab, var(--card-surface-soft) 90%, transparent);
  }

  .playbook-card {
    --tone-border: color-mix(in oklab, var(--surface-outline-soft) 38%, transparent);
    --tone-bg: color-mix(in oklab, var(--card-surface-soft) 92%, transparent);
  }

  .stream-head,
  .alert-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: clamp(0.6rem, 2.2vw, 1rem);
  }

  .stream-title strong,
  .alert-head strong,
  .playbook-card strong {
    font-size: clamp(1rem, 2.4vw, 1.2rem);
    color: var(--tone-text);
  }

  .stream-title p,
  .alert-card p,
  .playbook-card p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 65%, var(--ink) 35%);
  }

  .stream-status,
  .alert-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.75rem;
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--surface-outline-glow) 60%, transparent);
    border: 1px solid color-mix(in oklab, var(--surface-outline-strong) 38%, transparent);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tone-text);
    white-space: nowrap;
  }

  .stream-card[data-tone='good'] .stream-status,
  .alert-card[data-tone='good'] .alert-status {
    background: color-mix(in oklab, var(--state-success-strong) 26%, transparent);
    border-color: color-mix(in oklab, var(--state-success-strong) 38%, transparent);
    color: var(--signage-text-strong);
  }

  .stream-card[data-tone='alert'] .stream-status,
  .alert-card[data-tone='alert'] .alert-status {
    background: color-mix(in oklab, var(--state-error-strong) 26%, transparent);
    border-color: color-mix(in oklab, var(--state-error-strong) 38%, transparent);
  }

  .stream-card[data-tone='info'] .stream-status,
  .alert-card[data-tone='info'] .alert-status {
    background: color-mix(in oklab, var(--halo-secondary) 30%, transparent);
    border-color: color-mix(in oklab, var(--halo-secondary) 42%, transparent);
  }

  .stream-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: clamp(0.55rem, 2vw, 0.85rem);
    margin: 0;
  }

  .stream-metrics div {
    display: grid;
    gap: 0.25rem;
    padding: 0.6rem 0.75rem;
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--card-surface-soft) 88%, transparent);
    border: 1px solid color-mix(in oklab, var(--surface-outline-soft) 36%, transparent);
  }

  .stream-metrics dt {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .stream-metrics dd {
    margin: 0;
    font-weight: 600;
  }

  .alert-meta {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 65%, var(--ink) 35%);
    font-size: 0.85rem;
  }

  .alert-meta span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--surface-outline-soft) 24%, transparent);
    border: 1px solid color-mix(in oklab, var(--surface-outline-soft) 34%, transparent);
  }

  .playbook-card {
    padding: clamp(1rem, 3cqw, 1.6rem);
  }

  .playbook-steps {
    display: grid;
    gap: clamp(0.4rem, 1.8vw, 0.75rem);
    margin: 0;
    padding-left: 1.1rem;
  }

  .playbook-steps li {
    color: color-mix(in oklab, var(--muted) 60%, var(--ink) 40%);
  }

  @container (min-width: 820px) {
    .center-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .playbooks {
      grid-column: span 2;
    }
  }

  @container (min-width: 1040px) {
    .center-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .playbooks {
      grid-column: span 1;
    }
  }
</style>
