<script>
  const defaultCollections = [
    {
      pill: 'Campaign kit',
      title: 'Campaign rehearsal kit',
      summary: 'Stage campaign looks before the hardware ships.',
      items: [
        {
          label: 'Hero poster frame',
          detail: 'Load stills or motion in the common ratios and confirm safe areas stay clear.'
        },
        {
          label: 'Loop + bumper lane',
          detail: 'Pair loops with short bumpers so lighting cues stay aligned with signage changes.'
        },
        {
          label: 'CTA ticker',
          detail: 'Preview multilingual call-to-action copy and check timing in the ticker band.'
        }
      ]
    },
    {
      pill: 'Operations pack',
      title: 'Operational safeguards',
      summary: 'Keep safety messaging and quiet hours ready to trigger.',
      items: [
        {
          label: 'Emergency override',
          detail: 'Store the safety scene that plays when the override is fired.'
        },
        {
          label: 'Quiet-hour slate',
          detail: 'Prepare the low-brightness night template, including language changes if needed.'
        },
        {
          label: 'Escalation log',
          detail: 'Keep notes on who armed or cleared each safety or maintenance message.'
        }
      ]
    },
    {
      pill: 'Data overlays',
      title: 'Live data overlays',
      summary: 'Mirror live feeds without losing readability.',
      items: [
        {
          label: 'Occupancy pulse',
          detail: 'Check that occupancy or ticketing feeds remain readable in the data rail.'
        },
        {
          label: 'Transit relay',
          detail: 'Load arrival or shuttle times and confirm bilingual text fits the space.'
        },
        {
          label: 'Sensor beacons',
          detail: 'Add space for sensor alerts or icons with short, clear wording.'
        }
      ]
    },
    {
      pill: 'Partner lane',
      title: 'Partner + sponsor lane',
      summary: 'Prepare partner content with compliance in mind.',
      items: [
        {
          label: 'Brand palette snapshot',
          detail: 'List the colour values that stay within contrast guidelines.'
        },
        {
          label: 'Localization pack',
          detail: 'Store translations and legal copy alongside the primary artwork.'
        },
        {
          label: 'Approval receipts',
          detail: 'Record who approved the takeover and when it went live.'
        }
      ]
    }
  ];

  export let collections = defaultCollections;
  export let note = 'Each placeholder carries contrast checks, safe areas, and timing notes before deployment.';

  $: board = collections?.length ? collections : defaultCollections;
</script>

<div class="signage-board glass" role="group" aria-labelledby="signage-board-title">
  <span class="board-halo" aria-hidden="true"></span>

  <header class="board-head">
    <span class="board-badge">Signage asset board</span>
    <h3 id="signage-board-title">Placeholder coverage map</h3>
    <p>
      Map the signage content we rehearse with LED Node—from campaign visuals to emergency messaging—before the playlist goes
      live.
    </p>
  </header>

  <div class="board-grid">
    {#each board as column (column.title)}
      <article class="board-card" role="listitem">
        <span class="board-pill">{column.pill}</span>
        <h4>{column.title}</h4>
        <p>{column.summary}</p>
        <ul>
          {#each column.items as item (item.label)}
            <li>
              <strong>{item.label}</strong>
              <p>{item.detail}</p>
            </li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>

  <footer class="board-note" aria-live="polite">{note}</footer>
</div>

<style>
  .signage-board {
    --board-gap: clamp(var(--card-gap), 5cqw, var(--panel-gap));
    --board-pad: clamp(var(--card-pad), 6cqw, var(--panel-pad));
    position: relative;
    display: grid;
    gap: var(--board-gap);
    padding: var(--board-pad);
    border-radius: var(--radius-stage);
    width: var(--card-shell-wide);
    margin-inline: auto;
    overflow: hidden;
    container-type: inline-size;
  }

  .signage-board > * {
    position: relative;
    z-index: 1;
  }

  .board-halo {
    position: absolute;
    inset: -32% -36% auto -36%;
    height: 160%;
    background:
      radial-gradient(120% 120% at 28% 32%, color-mix(in oklab, var(--halo-secondary) 46%, transparent) 0%, transparent 78%),
      radial-gradient(120% 120% at 72% 64%, color-mix(in oklab, var(--halo-primary) 44%, transparent) 0%, transparent 78%),
      radial-gradient(120% 120% at 50% 90%, color-mix(in oklab, var(--warm) 24%, transparent) 0%, transparent 82%);
    filter: blur(140px);
    opacity: 0.42;
    mix-blend-mode: screen;
    pointer-events: none;
    animation: boardGlow var(--halo-speed-alt, 18s) linear infinite;
  }

  @keyframes boardGlow {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(4%, -3%, 0);
    }
  }

  .board-head {
    display: grid;
    gap: clamp(0.6rem, 2.2vw, 1.2rem);
    max-width: 56ch;
  }

  .board-badge {
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

  .board-head h3 {
    margin: 0;
    font-size: clamp(1.55rem, 3.2vw, 2.2rem);
  }

  .board-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .board-grid {
    display: grid;
    gap: clamp(var(--card-gap), 4cqw, var(--card-gap-loose));
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .board-card {
    display: grid;
    gap: clamp(var(--card-gap-tight), 3cqw, var(--card-gap));
    padding: clamp(var(--card-pad-tight), 4cqw, var(--card-pad));
    border-radius: var(--radius-card);
    background: color-mix(in oklab, var(--card-surface-strong) 88%, transparent);
    border: 1px solid color-mix(in oklab, var(--card-border-strong) 82%, transparent);
    box-shadow: var(--card-shadow);
    backdrop-filter: saturate(160%) blur(var(--card-blur));
    -webkit-backdrop-filter: saturate(160%) blur(var(--card-blur));
    min-width: 0;
    overflow: hidden;
    position: relative;
  }

  .board-card::before {
    content: '';
    position: absolute;
    inset: -120% -40% auto;
    height: 65%;
    background: linear-gradient(135deg, color-mix(in oklab, var(--halo-primary) 36%, transparent) 0%, transparent 70%);
    opacity: 0.28;
    filter: blur(60px);
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .board-card:hover::before,
  .board-card:focus-within::before {
    opacity: 0.45;
  }

  .board-card h4 {
    margin: 0;
    font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  }

  .board-card > p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 68%, var(--ink) 32%);
  }

  .board-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.95rem;
    border-radius: var(--r-pill);
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-soft) 88%, transparent);
  }

  .board-card ul {
    display: grid;
    gap: clamp(0.5rem, 1.8vw, 0.85rem);
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .board-card li {
    display: grid;
    gap: 0.35rem;
    padding: clamp(0.65rem, 2vw, 0.9rem);
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--card-surface) 88%, transparent);
    border: 1px solid color-mix(in oklab, var(--card-border) 80%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-soft) 35%, transparent);
  }

  .board-card strong {
    font-size: clamp(0.92rem, 2vw, 1rem);
  }

  .board-card li p {
    margin: 0;
    font-size: 0.9rem;
    color: color-mix(in oklab, var(--muted) 72%, var(--ink) 28%);
  }

  .board-note {
    margin: 0;
    padding: clamp(0.65rem, 2vw, 0.85rem) clamp(0.85rem, 2.6vw, 1.1rem);
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-soft) 82%, transparent);
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
    font-size: 0.92rem;
  }

  @container (width < 620px) {
    .board-head {
      text-align: left;
    }

    .board-card {
      padding: clamp(1rem, 6cqw, 1.35rem);
    }
  }
</style>
