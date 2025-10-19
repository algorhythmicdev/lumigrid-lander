<script>
  import { onMount } from 'svelte';

  const focusAreas = [
    {
      id: 'calibration',
      title: 'Adaptive colour calibration',
      detail: 'Nodes sample each other and align hues across the mesh.',
      hue: 42
    },
    {
      id: 'audio',
      title: 'Distributed audio analysis',
      detail: 'Beat detection runs in parallel so the grid never loses tempo.',
      hue: 180
    },
    {
      id: 'city',
      title: 'City-scale timelines',
      detail: 'Cloud cues ripple through districts on one shared schedule.',
      hue: 312
    }
  ];

  let selected = new Set(['calibration']);
  let note = 'Tap what you care about and we’ll tailor roadmap updates.';

  function toggle(area) {
    if (selected.has(area.id)) {
      selected.delete(area.id);
    } else {
      selected.add(area.id);
    }
    selected = new Set(selected);
    note = buildNote();
  }

  function buildNote() {
    if (!selected.size) {
      return 'Pick at least one focus to tune the updates we send.';
    }
    const labels = Array.from(selected)
      .map(id => focusAreas.find(area => area.id === id)?.title)
      .filter(Boolean);
    if (labels.length === 1) {
      return `${labels[0]} alerts queued — we will share progress the moment it lands.`;
    }
    if (labels.length === focusAreas.length) {
      return 'Full-spectrum roadmap mode enabled. Expect deep dives across calibration, audio, and city sync.';
    }
    return `We’ll send highlights on ${labels.slice(0, -1).join(', ')} and ${labels.at(-1)}.`;
  }

  function goToForm() {
    const target = document.getElementById('contact');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    note = buildNote();
  });
</script>

<div class="roadmap-card glass">
  <header>
    <h3>Shape the roadmap</h3>
    <p>Select the future-facing capabilities you want to pilot. We’ll tune sign-up emails to match.</p>
  </header>

  <div class="focus-grid">
    {#each focusAreas as area}
      <button
        type="button"
        class="focus-chip"
        aria-pressed={selected.has(area.id)}
        style={`--hue:${area.hue}deg;`}
        on:click={() => toggle(area)}
      >
        <span class="focus-title">{area.title}</span>
        <span class="focus-detail">{area.detail}</span>
      </button>
    {/each}
  </div>

  <div class="cta-line">
    <button class="btn primary" type="button" on:click={goToForm}>Sync me with the roadmap</button>
    <span class="micro-note" aria-live="polite">{note}</span>
  </div>
</div>

<style>
  .roadmap-card {
    margin-top: clamp(2rem, 5vw, 3rem);
    padding: clamp(1.4rem, 3vw, 2rem);
    display: grid;
    gap: clamp(1rem, 2.4vw, 1.6rem);
    max-width: 840px;
    margin-inline: auto;
  }

  header h3 {
    margin: 0;
    font-size: 1.3rem;
  }

  header p {
    margin: 0.35rem 0 0;
    color: var(--muted);
  }

  .focus-grid {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .focus-chip {
    display: grid;
    gap: 0.25rem;
    padding: 0.85rem 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.22);
    background: color-mix(in oklab, var(--glass) 85%, transparent);
    cursor: pointer;
    text-align: left;
    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .focus-chip::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, hsla(var(--hue), 82%, 62%, 0.35), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .focus-chip[aria-pressed='true'] {
    border-color: hsla(var(--hue), 82%, 62%, 0.6);
    background: linear-gradient(135deg, hsla(var(--hue), 82%, 18%, 0.35), rgba(12, 16, 30, 0.75));
    transform: translateY(-3px);
  }

  .focus-chip:focus-visible {
    outline: 2px solid hsla(var(--hue), 82%, 70%, 0.75);
    outline-offset: 3px;
  }

  .focus-chip[aria-pressed='true']::after {
    opacity: 0.9;
  }

  .focus-title {
    font-weight: 700;
  }

  .focus-detail {
    font-size: 0.85rem;
    color: var(--muted);
  }

  .cta-line {
    display: grid;
    gap: 0.5rem;
    align-items: center;
  }

  .micro-note {
    color: color-mix(in oklab, var(--muted) 85%, white 15%);
  }

  @media (min-width: 720px) {
    .cta-line {
      grid-template-columns: auto minmax(0, 1fr);
      gap: 1.1rem;
    }
  }

  @media (min-width: 960px) {
    .roadmap-card {
      grid-template-columns: minmax(0, 1fr);
    }

    header {
      max-width: 540px;
    }

    .focus-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }

  @media (max-width: 540px) {
    .roadmap-card {
      padding: 1.2rem;
    }

    .focus-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .focus-chip {
      padding: 0.75rem 0.9rem;
    }

    .focus-detail {
      font-size: 0.8rem;
    }

    .cta-line {
      gap: 0.6rem;
    }

    .micro-note {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 420px) {
    header h3 {
      font-size: 1.1rem;
    }

    .cta-line {
      gap: 0.5rem;
    }

    .micro-note {
      font-size: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .focus-chip,
    .focus-chip[aria-pressed='true'] {
      transition: none;
      transform: none;
    }
  }
</style>
