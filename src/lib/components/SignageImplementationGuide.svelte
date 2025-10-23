<script>
  const defaultPhases = [
    {
      title: 'Asset intake',
      summary: 'Collect campaign, operations, and partner files into the placeholder kit before travel.',
      steps: [
        'Ingest stills, loops, captions, and alt-text via the signage API or drag-and-drop bridge.',
        'Contrast lint, safe-area framing, and timeline checks run automatically on upload.',
        'Assign approvals so operations can track readiness alongside the lighting cues.'
      ]
    },
    {
      title: 'Rehearsal at Reclame Fabriek',
      summary: 'Load the placeholders into the Daugavpils studio and shape the story together.',
      steps: [
        'Dual-output rehearsals sync the signage lane with PWM washes and pixel ribbons.',
        'Emergency and quiet-mode overrides inherit the emergency palette tokens and signage typography.',
        'Partner and sponsor lanes get staged with localization packs before they leave the studio.'
      ]
    },
    {
      title: 'Launch readiness',
      summary: 'Bundle playlists, backups, and approvals before the hardware ships.',
      steps: [
        'Distribute fallback signage packs and confirm webhooks across CMS bridges.',
        'Lock asset board approvals and surface them inside the operations observatory timeline.',
        'Schedule escalations, roster coverage, and signage monitoring webhooks.'
      ]
    },
    {
      title: 'Live operations',
      summary: 'Monitor, adjust, and protect the signage story without leaving the controller.',
      steps: [
        'Observatory dashboards surface ingest health, signage drift, and override readiness.',
        'Dual-output presets allow gentle blend tweaks while signage stays WCAG compliant.',
        'Escalations notify the roster whenever signage approvals lapse or CMS bridges lag.'
      ]
    }
  ];

  const defaultChecklist = [
    {
      label: 'Placeholder coverage',
      detail: 'Each canvas has a campaign, operations, and data rail variant rehearsed and approved.'
    },
    {
      label: 'Fallback scenes',
      detail: 'Emergency overrides, quiet hours, and safety slates armed with the emergency palette tokens.'
    },
    {
      label: 'CMS bridges',
      detail: 'Webhooks and SSE channels heartbeat every 15 seconds with tokenised signage payloads.'
    },
    {
      label: 'Audit trail',
      detail: 'Every signage publish logs acknowledgements to the operations observatory and partner receipts.'
    }
  ];

  export let phases = defaultPhases;
  export let checklist = defaultChecklist;

  $: guidePhases = phases?.length ? phases : defaultPhases;
  $: guideChecklist = checklist?.length ? checklist : defaultChecklist;
</script>

<div class="signage-guide glass" role="group" aria-labelledby="signage-guide-title">
  <span class="guide-halo" aria-hidden="true"></span>

  <header class="guide-head">
    <span class="guide-badge">Signage runbook</span>
    <h3 id="signage-guide-title">How the signage story ships</h3>
    <p>
      Follow the same runbook we use in Daugavpils — asset ingest, rehearsals, launch prep, and live operations — each step
      riding the LumiGrid token system.
    </p>
  </header>

  <div class="guide-grid">
    <section class="guide-track" aria-labelledby="signage-guide-title">
      <ol class="phase-list">
        {#each guidePhases as phase, index (phase.title)}
          <li class="phase-card">
            <span class="phase-index">{String(index + 1).padStart(2, '0')}</span>
            <div class="phase-body">
              <h4>{phase.title}</h4>
              <p>{phase.summary}</p>
              {#if phase.steps?.length}
                <ul class="phase-steps">
                  {#each phase.steps as step (step)}
                    <li>{step}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          </li>
        {/each}
      </ol>
    </section>

    <aside class="guide-checklist glass-panel" aria-labelledby="signage-checklist-title">
      <div class="checklist-head">
        <span class="checklist-pill">Controller handshake</span>
        <h4 id="signage-checklist-title">What stays live during showtime</h4>
      </div>
      <ul class="checklist-list">
        {#each guideChecklist as item (item.label)}
          <li>
            <strong>{item.label}</strong>
            <p>{item.detail}</p>
          </li>
        {/each}
      </ul>
    </aside>
  </div>
</div>

<style>
  .signage-guide {
    --guide-gap: clamp(var(--card-gap), 5cqw, clamp(1.4rem, 3vw, 2.2rem));
    --guide-pad: clamp(var(--card-pad), 6cqw, clamp(1.8rem, 3.4vw, 2.6rem));
    position: relative;
    display: grid;
    gap: var(--guide-gap);
    padding: var(--guide-pad);
    border-radius: var(--radius-stage);
    width: var(--card-shell-wide);
    margin-inline: auto;
    overflow: hidden;
    container-type: inline-size;
  }

  .signage-guide > * {
    position: relative;
    z-index: 1;
  }

  .guide-halo {
    position: absolute;
    inset: -30% -34% auto -34%;
    height: 155%;
    background:
      radial-gradient(120% 120% at 24% 36%, color-mix(in oklab, var(--halo-primary) 46%, transparent) 0%, transparent 78%),
      radial-gradient(120% 120% at 72% 60%, color-mix(in oklab, var(--halo-secondary) 44%, transparent) 0%, transparent 80%),
      radial-gradient(140% 140% at 50% 92%, color-mix(in oklab, var(--warm) 22%, transparent) 0%, transparent 86%);
    filter: blur(132px);
    opacity: 0.4;
    mix-blend-mode: screen;
    pointer-events: none;
    animation: guideGlow var(--halo-speed-alt, 18s) linear infinite;
  }

  @keyframes guideGlow {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(4%, -4%, 0);
    }
  }

  .guide-head {
    display: grid;
    gap: clamp(0.6rem, 2.1vw, 1.1rem);
    max-width: 56ch;
  }

  .guide-badge {
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

  .guide-head h3 {
    margin: 0;
    font-size: clamp(1.55rem, 3.2vw, 2.2rem);
  }

  .guide-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .guide-grid {
    display: grid;
    gap: clamp(var(--card-gap), 5cqw, var(--card-gap-loose));
    grid-template-columns: minmax(0, 1fr);
  }

  @container (min-width: 720px) {
    .guide-grid {
      grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.8fr);
      align-items: start;
    }
  }

  .guide-track {
    display: block;
  }

  .phase-list {
    display: grid;
    gap: clamp(var(--card-gap), 4cqw, var(--card-gap-loose));
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: signage-phase;
  }

  .phase-card {
    position: relative;
    display: grid;
    gap: clamp(0.8rem, 2.4vw, 1.2rem);
    padding: clamp(var(--card-pad-tight), 4cqw, var(--card-pad-loose));
    border-radius: var(--radius-panel);
    background: var(--card-surface-strong);
    border: 1px solid var(--card-border-strong);
    box-shadow: inset 0 0 0 1px var(--card-outline-soft);
    backdrop-filter: saturate(170%) blur(var(--panel-blur));
    -webkit-backdrop-filter: saturate(170%) blur(var(--panel-blur));
    overflow: hidden;
  }

  .phase-card::after {
    content: '';
    position: absolute;
    inset: -110% -36% auto;
    height: 130%;
    background: var(--halo-sheen-gradient);
    opacity: 0.16;
    filter: blur(var(--halo-sheen-blur));
    mix-blend-mode: screen;
    animation: guideSheen var(--halo-sheen-speed) linear infinite;
    pointer-events: none;
  }

  @keyframes guideSheen {
    0% {
      transform: translate3d(-8%, 0, 0);
    }
    50% {
      transform: translate3d(6%, 0, 0);
    }
    100% {
      transform: translate3d(-8%, 0, 0);
    }
  }

  .phase-index {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: clamp(2.6rem, 4vw, 3.1rem);
    height: clamp(2.6rem, 4vw, 3.1rem);
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--glass) 92%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-border) 84%, transparent);
    backdrop-filter: saturate(150%) blur(14px);
    -webkit-backdrop-filter: saturate(150%) blur(14px);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.06em;
  }

  .phase-body {
    display: grid;
    gap: clamp(0.55rem, 2vw, 1rem);
  }

  .phase-body h4 {
    margin: 0;
    font-size: clamp(1.1rem, 2.4vw, 1.35rem);
  }

  .phase-body p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 65%, var(--ink) 35%);
  }

  .phase-steps {
    display: grid;
    gap: clamp(0.45rem, 1.8vw, 0.85rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .phase-steps li {
    position: relative;
    padding-left: clamp(1.1rem, 2.2vw, 1.35rem);
  }

  .phase-steps li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: var(--r-circle);
    background: color-mix(in oklab, var(--halo-secondary) 70%, transparent);
    box-shadow: 0 0 0 4px color-mix(in oklab, var(--halo-secondary) 16%, transparent);
  }

  .guide-checklist {
    position: relative;
    display: grid;
    gap: clamp(var(--card-gap-tight), 3cqw, var(--card-gap));
  }

  .checklist-head {
    display: grid;
    gap: clamp(0.45rem, 1.6vw, 0.85rem);
  }

  .checklist-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1rem;
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--glass) 92%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-border) 84%, transparent);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .checklist-head h4 {
    margin: 0;
    font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  }

  .checklist-list {
    display: grid;
    gap: clamp(0.65rem, 1.8vw, 1rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .checklist-list li {
    display: grid;
    gap: clamp(0.35rem, 1.4vw, 0.65rem);
    padding: clamp(0.75rem, 1.8vw, 1rem) clamp(0.85rem, 2vw, 1.15rem);
    border-radius: var(--radius-card);
    background: color-mix(in oklab, var(--card-surface-soft) 94%, transparent);
    border: 1px solid color-mix(in oklab, var(--card-border-soft) 92%, transparent);
    box-shadow: inset 0 0 0 1px var(--card-outline-soft);
  }

  .checklist-list strong {
    font-size: clamp(0.95rem, 1.9vw, 1.05rem);
  }

  .checklist-list p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }
</style>
