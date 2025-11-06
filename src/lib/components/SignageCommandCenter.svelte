<script>
  import { t } from '$lib/i18n';

  // Generate default data reactively based on current language
  $: defaultStreams = [
    {
      name: $t('signage_stream_lobby_name'),
      status: $t('signage_stream_lobby_status'),
      tone: 'good',
      detail: $t('signage_stream_lobby_detail'),
      metrics: [
        { label: $t('signage_stream_lobby_contrast'), value: $t('signage_stream_lobby_contrast_value') },
        { label: $t('signage_stream_lobby_sync'), value: $t('signage_stream_lobby_sync_value') },
        { label: $t('signage_stream_lobby_approvals'), value: $t('signage_stream_lobby_approvals_value') }
      ]
    },
    {
      name: $t('signage_stream_promenade_name'),
      status: $t('signage_stream_promenade_status'),
      tone: 'info',
      detail: $t('signage_stream_promenade_detail'),
      metrics: [
        { label: $t('signage_stream_promenade_ambient'), value: $t('signage_stream_promenade_ambient_value') },
        { label: $t('signage_stream_promenade_heartbeat'), value: $t('signage_stream_promenade_heartbeat_value') },
        { label: $t('signage_stream_promenade_fallback'), value: $t('signage_stream_promenade_fallback_value') }
      ]
    },
    {
      name: $t('signage_stream_emergency_name'),
      status: $t('signage_stream_emergency_status'),
      tone: 'alert',
      detail: $t('signage_stream_emergency_detail'),
      metrics: [
        { label: $t('signage_stream_emergency_palette'), value: $t('signage_stream_emergency_palette_value') },
        { label: $t('signage_stream_emergency_drill'), value: $t('signage_stream_emergency_drill_value') },
        { label: $t('signage_stream_emergency_ack'), value: $t('signage_stream_emergency_ack_value') }
      ]
    }
  ];

  $: defaultAlerts = [
    {
      title: $t('signage_alert_cms_title'),
      status: $t('signage_alert_cms_status'),
      tone: 'good',
      detail: $t('signage_alert_cms_detail'),
      time: $t('signage_alert_cms_time')
    },
    {
      title: $t('signage_alert_partner_title'),
      status: $t('signage_alert_partner_status'),
      tone: 'alert',
      detail: $t('signage_alert_partner_detail'),
      time: $t('signage_alert_partner_time')
    },
    {
      title: $t('signage_alert_transit_title'),
      status: $t('signage_alert_transit_status'),
      tone: 'info',
      detail: $t('signage_alert_transit_detail'),
      time: $t('signage_alert_transit_time')
    }
  ];

  $: defaultPlaybooks = [
    {
      title: $t('signage_playbook_morning_title'),
      summary: $t('signage_playbook_morning_summary'),
      steps: [
        $t('signage_playbook_morning_step1'),
        $t('signage_playbook_morning_step2'),
        $t('signage_playbook_morning_step3')
      ]
    },
    {
      title: $t('signage_playbook_sponsor_title'),
      summary: $t('signage_playbook_sponsor_summary'),
      steps: [
        $t('signage_playbook_sponsor_step1'),
        $t('signage_playbook_sponsor_step2'),
        $t('signage_playbook_sponsor_step3')
      ]
    },
    {
      title: $t('signage_playbook_emergency_title'),
      summary: $t('signage_playbook_emergency_summary'),
      steps: [
        $t('signage_playbook_emergency_step1'),
        $t('signage_playbook_emergency_step2'),
        $t('signage_playbook_emergency_step3')
      ]
    }
  ];

  export let streams = undefined;
  export let alerts = undefined;
  export let playbooks = undefined;

  $: centerStreams = streams?.length ? streams : defaultStreams;
  $: centerAlerts = alerts?.length ? alerts : defaultAlerts;
  $: centerPlaybooks = playbooks?.length ? playbooks : defaultPlaybooks;
</script>

<div class="signage-center glass" role="group" aria-labelledby="signage-center-title">
  <span class="center-halo" aria-hidden="true"></span>

  <header class="center-head">
    <span class="center-badge">{$t('signage_center_badge')}</span>
    <h3 id="signage-center-title">{$t('signage_center_title')}</h3>
    <p>
      {$t('signage_center_desc')}
    </p>
    <p class="center-note">{$t('signage_center_note')}</p>
  </header>

  <div class="center-grid">
    <section class="center-panel streams glass-panel" aria-labelledby="signage-center-streams">
      <div class="panel-head">
        <span class="panel-pill">{$t('signage_panel_live')}</span>
        <h4 id="signage-center-streams">{$t('signage_panel_streams_title')}</h4>
        <p>{$t('signage_panel_streams_desc')}</p>
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
        <span class="panel-pill">{$t('signage_panel_escalations')}</span>
        <h4 id="signage-center-alerts">{$t('signage_panel_alerts_title')}</h4>
        <p>{$t('signage_panel_alerts_desc')}</p>
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
        <span class="panel-pill">{$t('signage_panel_response')}</span>
        <h4 id="signage-center-playbooks">{$t('signage_panel_playbooks_title')}</h4>
        <p>{$t('signage_panel_playbooks_desc')}</p>
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
