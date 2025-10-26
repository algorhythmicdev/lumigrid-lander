<script>
  export let scenarios = [];
  export let signals = [];
  export let playbooks = [];
  export let roster = [];
  export let escalations = [];
</script>

<div class="ops-observatory glass" role="group" aria-labelledby="operations-observatory-title">
  <span class="ops-halo" aria-hidden="true"></span>

  <header class="ops-head">
    <span class="ops-badge">Operations deck</span>
    <h3 id="operations-observatory-title">Operations observatory</h3>
    <p>
      Monitor the controllers during live shows: check uptime, confirm signage status, hand over shifts, and trigger any
      rehearsed responses from the same console.
    </p>
    <p class="ops-note">Demo view shown here—connect to a live mesh to stream production data.</p>
  </header>

  <div class="ops-grid">
    <section class="ops-column ops-console" aria-labelledby="operations-console-title">
      <div class="column-head">
        <h4 id="operations-console-title">Live schedule</h4>
        <p>Upcoming cues and handover notes for the current run.</p>
      </div>
      <ul class="ops-scenarios">
        {#each scenarios as scenario (scenario.title)}
          <li>
            <span class="scenario-time">{scenario.time}</span>
            <div class="scenario-copy">
              <strong>{scenario.title}</strong>
              <p>{scenario.detail}</p>
            </div>
          </li>
        {/each}
      </ul>
      <div class="ops-escalations glass-panel" aria-labelledby="operations-escalations-title">
        <h5 id="operations-escalations-title">Auto-escalations</h5>
        <ul>
          {#each escalations as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    </section>

    <section class="ops-column ops-health" aria-labelledby="operations-health-title">
      <div class="column-head">
        <h4 id="operations-health-title">Mesh health</h4>
        <p>Quick signals show node uptime, sync state, and signage health.</p>
      </div>
      <div class="ops-signal-grid" role="list">
        {#each signals as signal (signal.label)}
          <article class="ops-signal" role="listitem">
            <span class="signal-label">{signal.label}</span>
            <span class="signal-value">{signal.value}</span>
          </article>
        {/each}
      </div>
      <div class="ops-roster glass-panel" aria-labelledby="operations-roster-title">
        <h5 id="operations-roster-title">On-call roster</h5>
        <ul>
          {#each roster as entry (entry.role)}
            <li>
              <span class="roster-role">{entry.role}</span>
              <span class="roster-person">{entry.person}</span>
            </li>
          {/each}
        </ul>
      </div>
    </section>

    <section class="ops-column ops-playbook" aria-labelledby="operations-playbook-title">
      <div class="column-head">
        <h4 id="operations-playbook-title">Rounded playbooks</h4>
        <p>Short checklists help crews follow the same steps every time.</p>
      </div>
      <ol class="playbook-list">
        {#each playbooks as play (play.title)}
          <li>
            <div class="playbook-head">
              <span class="playbook-step"></span>
              <div>
                <strong>{play.title}</strong>
                <p>{play.summary}</p>
              </div>
            </div>
            <ul class="playbook-steps">
              {#each play.steps as step, index}
                <li>
                  <span class="step-index">{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ol>
    </section>
  </div>
</div>

<style>
  .ops-observatory {
    --ops-gap: clamp(var(--card-gap), 5cqw, clamp(1.6rem, 3vw, 2.6rem));
    --ops-pad: clamp(var(--card-pad), 6cqw, clamp(1.9rem, 3.6vw, 2.7rem));
    position: relative;
    display: grid;
    gap: var(--ops-gap);
    padding: var(--ops-pad);
    border-radius: var(--radius-stage);
    overflow: hidden;
    width: var(--card-shell-wide);
    margin-inline: auto;
    container-type: inline-size;
  }

  .ops-halo {
    position: absolute;
    inset: -28% -38% auto -38%;
    height: 150%;
    background:
      radial-gradient(120% 120% at 30% 32%, color-mix(in oklab, var(--halo-primary) 48%, transparent) 0%, transparent 78%),
      radial-gradient(120% 120% at 72% 68%, color-mix(in oklab, var(--halo-secondary) 42%, transparent) 0%, transparent 80%),
      conic-gradient(from 210deg at 50% 50%, color-mix(in oklab, var(--halo-glow) 40%, transparent) 0 45%, transparent 70% 100%);
    filter: blur(128px);
    opacity: 0.44;
    mix-blend-mode: screen;
    pointer-events: none;
    animation: opsPulse var(--halo-speed-alt) linear infinite;
  }

  .ops-head {
    position: relative;
    z-index: 1;
    display: grid;
    gap: clamp(0.6rem, 2vw, 1.1rem);
    max-width: 52ch;
  }

  .ops-badge {
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

  .ops-head h3 {
    margin: 0;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  }

  .ops-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .ops-note {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 65%, var(--ink) 35%);
    opacity: 0.82;
  }

  .ops-grid {
    position: relative;
    z-index: 1;
    display: grid;
    gap: clamp(1.4rem, 3vw, 2.2rem);
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .ops-column {
    position: relative;
    display: grid;
    gap: var(--panel-gap);
    padding: var(--panel-pad);
    border-radius: var(--radius-panel);
    background: var(--card-surface-strong);
    border: 1px solid var(--card-border-strong);
    box-shadow: inset 0 0 0 1px var(--card-outline-soft);
    backdrop-filter: saturate(170%) blur(var(--panel-blur));
    -webkit-backdrop-filter: saturate(170%) blur(var(--panel-blur));
    overflow: hidden;
  }

  .ops-column::after {
    content: '';
    position: absolute;
    inset: -120% -40% auto;
    height: 130%;
    background: var(--halo-sheen-gradient);
    opacity: 0.16;
    filter: blur(var(--halo-sheen-blur));
    mix-blend-mode: screen;
    animation: opsSheen var(--halo-sheen-speed) linear infinite;
    pointer-events: none;
  }

  .column-head {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.45rem;
  }

  .column-head h4 {
    margin: 0;
    font-size: clamp(1.1rem, 2.6vw, 1.45rem);
  }

  .column-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .ops-scenarios {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--card-gap);
  }

  .ops-scenarios li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--card-gap);
    align-items: start;
    padding: var(--card-pad-tight) clamp(1rem, 2.4vw, 1.45rem);
    border-radius: var(--radius-card-tight);
    background: var(--card-surface);
    border: 1px solid var(--card-border);
    box-shadow: inset 0 0 0 1px var(--card-outline-soft);
  }

  .scenario-time {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.85rem;
    border-radius: var(--r-pill);
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    background: var(--card-surface-soft);
    border: 1px solid var(--card-border-soft);
    color: color-mix(in oklab, var(--muted) 64%, var(--ink) 36%);
  }

  .scenario-copy {
    display: grid;
    gap: 0.35rem;
  }

  .scenario-copy strong {
    font-size: clamp(1rem, 2.4vw, 1.2rem);
  }

  .scenario-copy p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .ops-escalations {
    position: relative;
    z-index: 1;
    gap: 0.65rem;
  }

  .ops-escalations h5,
  .ops-roster h5 {
    margin: 0;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 0.72rem;
    color: color-mix(in oklab, var(--muted) 64%, var(--ink) 36%);
  }

  .ops-escalations ul,
  .ops-roster ul {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.45rem;
  }

  .ops-escalations li,
  .ops-roster li {
    color: color-mix(in oklab, var(--muted) 72%, var(--ink) 28%);
  }

  .ops-signal-grid {
    position: relative;
    z-index: 1;
    display: grid;
    gap: clamp(0.75rem, 2vw, 1.1rem);
  }

  .ops-signal {
    display: grid;
    gap: var(--card-gap-tight);
    padding: var(--card-pad-tight) clamp(1rem, 2.4vw, 1.45rem);
    border-radius: var(--radius-card);
    background: linear-gradient(135deg, color-mix(in oklab, var(--card-surface-strong) 100%, transparent), color-mix(in oklab, var(--card-surface) 80%, transparent));
    border: 1px solid var(--card-border-strong);
    box-shadow: inset 0 0 0 1px var(--card-outline-strong), 0 24px 48px var(--shadow-elevated);
  }

  .signal-label {
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 64%, var(--ink) 36%);
  }

  .signal-value {
    font-size: clamp(1.1rem, 2.6vw, 1.35rem);
    font-weight: 600;
  }

  .ops-roster {
    position: relative;
    z-index: 1;
    gap: 0.7rem;
  }

  .ops-roster ul {
    list-style: none;
    padding: 0;
  }

  .ops-roster li {
    display: grid;
    gap: 0.2rem;
    padding: clamp(0.65rem, 1.8vw, 0.9rem) clamp(0.85rem, 2vw, 1.1rem);
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--glass) 88%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-border) 88%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-soft) 32%, transparent);
  }

  .roster-role {
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 62%, var(--ink) 38%);
  }

  .roster-person {
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .playbook-list {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: clamp(0.85rem, 2.2vw, 1.2rem);
    counter-reset: playbook;
  }

  .playbook-list > li {
    border-radius: var(--radius-card);
    background: color-mix(in oklab, var(--glass) 88%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-border) 88%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-soft) 34%, transparent);
    padding: clamp(0.95rem, 2.4vw, 1.4rem) clamp(1.1rem, 2.8vw, 1.6rem);
    display: grid;
    gap: clamp(0.75rem, 2vw, 1.1rem);
  }

  .playbook-head {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: clamp(0.75rem, 2vw, 1rem);
    align-items: center;
  }

  .playbook-step {
    width: clamp(2.1rem, 4vw, 2.6rem);
    height: clamp(2.1rem, 4vw, 2.6rem);
    border-radius: var(--r-pill);
    background: color-mix(in oklab, var(--soft-bg) 92%, transparent);
    border: 1px solid color-mix(in oklab, var(--soft-border) 84%, transparent);
    position: relative;
  }

  .playbook-step::after {
    content: counter(playbook, decimal-leading-zero);
    counter-increment: playbook;
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--muted) 62%, var(--ink) 38%);
    font-weight: 600;
  }

  .playbook-head strong {
    font-size: clamp(1.05rem, 2.6vw, 1.3rem);
  }

  .playbook-head p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .playbook-steps {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: clamp(0.5rem, 1.8vw, 0.85rem);
  }

  .playbook-steps li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: clamp(0.55rem, 2vw, 0.85rem);
    align-items: start;
    padding: clamp(0.65rem, 1.8vw, 0.9rem) clamp(0.85rem, 2vw, 1.1rem);
    border-radius: var(--radius-card-tight);
    background: color-mix(in oklab, var(--surface-track) 88%, transparent);
    border: 1px solid color-mix(in oklab, var(--border-track) 86%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-veil) 30%, transparent);
  }

  .step-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: clamp(2rem, 3.6vw, 2.4rem);
    height: clamp(2rem, 3.6vw, 2.4rem);
    border-radius: var(--r-pill);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: color-mix(in oklab, var(--glass) 86%, transparent);
    border: 1px solid color-mix(in oklab, var(--glass-border) 88%, transparent);
    color: color-mix(in oklab, var(--muted) 62%, var(--ink) 38%);
    font-weight: 600;
  }

  .playbook-steps p {
    margin: 0;
    color: color-mix(in oklab, var(--muted) 72%, var(--ink) 28%);
  }

  @keyframes opsPulse {
    0%,
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.42;
    }
    50% {
      transform: translate3d(4%, -3%, 0) scale(1.05);
      opacity: 0.52;
    }
  }

  @keyframes opsSheen {
    0% {
      transform: translate3d(-25%, 0, 0);
    }
    50% {
      transform: translate3d(12%, 0, 0);
    }
    100% {
      transform: translate3d(-25%, 0, 0);
    }
  }

  @media (max-width: 720px) {
    .ops-observatory {
      --ops-gap: clamp(var(--card-gap-tight), 5cqw, var(--card-gap));
      --ops-pad: clamp(var(--card-pad-tight), 6cqw, var(--card-pad));
    }

    .ops-scenarios li,
    .playbook-head,
    .playbook-steps li {
      grid-template-columns: minmax(0, 1fr);
    }

    .scenario-time,
    .playbook-step,
    .step-index {
      justify-self: flex-start;
    }
  }
</style>
