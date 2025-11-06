<script>
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';

  const focusAreas = [
    {
      id: 'calibration',
      titleKey: 'roadmap_focus_calibration_title',
      detailKey: 'roadmap_focus_calibration_detail',
      hue: 42
    },
    {
      id: 'audio',
      titleKey: 'roadmap_focus_audio_title',
      detailKey: 'roadmap_focus_audio_detail',
      hue: 180
    },
    {
      id: 'city',
      titleKey: 'roadmap_focus_city_title',
      detailKey: 'roadmap_focus_city_detail',
      hue: 312
    },
    {
      id: 'signage',
      titleKey: 'roadmap_focus_signage_title',
      detailKey: 'roadmap_focus_signage_detail',
      hue: 96
    }
  ];

  let selected = new Set(['calibration']);
  let note = '';

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
      return $t('roadmap_note_empty');
    }
    const labels = Array.from(selected)
      .map(id => focusAreas.find(area => area.id === id)?.titleKey)
      .filter(Boolean)
      .map(key => $t(key));
    if (labels.length === 1) {
      return $t('roadmap_note_single').replace('{label}', labels[0]);
    }
    if (labels.length === focusAreas.length) {
      return $t('roadmap_note_all');
    }
    const labelsList = labels.slice(0, -1).join(', ') + ' and ' + labels.at(-1);
    return $t('roadmap_note_multiple').replace('{labels}', labelsList);
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
    <h3>{$t('roadmap_title')}</h3>
    <p>{$t('roadmap_intro')}</p>
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
        <span class="focus-title">{$t(area.titleKey)}</span>
        <span class="focus-detail">{$t(area.detailKey)}</span>
      </button>
    {/each}
  </div>

  <div class="cta-line">
    <button class="btn primary" type="button" on:click={goToForm}>{$t('roadmap_cta')}</button>
    <span class="micro-note" aria-live="polite">{note}</span>
  </div>
</div>

<style>
  .roadmap-card {
    margin-top: clamp(2rem, 5vw, 3.2rem);
    padding: var(--panel-pad);
    display: grid;
    gap: var(--panel-gap);
    width: var(--card-shell);
    margin-inline: auto;
    position: relative;
  }

  .roadmap-card > * {
    position: relative;
    z-index: 1;
  }

  .roadmap-card::before {
    content: '';
    position: absolute;
    inset: -28% -18% 35% -18%;
    background: var(--aurora-secondary);
    opacity: 0.55;
    filter: blur(110px);
    pointer-events: none;
    animation: halo-drift var(--halo-speed) linear infinite;
  }

  header {
    display: grid;
    gap: 0.5rem;
  }

  header h3 {
    margin: 0;
    font-size: clamp(1.25rem, 3vw, 1.45rem);
  }

  header p {
    margin: 0;
    color: var(--muted);
    max-width: 58ch;
  }

  .focus-grid {
    display: grid;
    gap: var(--card-gap);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .focus-chip {
    display: grid;
    gap: var(--card-gap-tight);
    padding: var(--card-pad-tight);
    border-radius: var(--radius-card);
    border: 1px solid var(--card-border);
    background: var(--card-surface);
    cursor: pointer;
    text-align: left;
    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: var(--card-shadow);
  }

  .focus-chip::before {
    content: '';
    position: absolute;
    inset: -120% -40% auto;
    height: 70%;
    background: linear-gradient(135deg, hsla(var(--hue), 82%, 62%, 0.4), transparent 70%);
    opacity: 0;
    filter: blur(60px);
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  .focus-chip::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, hsla(var(--hue), 82%, 62%, 0.32), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .focus-chip:hover {
    border-color: color-mix(in oklab, hsla(var(--hue), 82%, 62%, 0.35) 55%, var(--glass-stroke));
    box-shadow: var(--card-shadow-lift);
  }

  .focus-chip[aria-pressed='true'] {
    border-color: color-mix(in oklab, hsla(var(--hue), 82%, 62%, 0.65) 70%, var(--glass-stroke));
    background: color-mix(in oklab, hsla(var(--hue), 82%, 32%, 0.42) 45%, var(--surface-glass-strong));
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-lift);
  }

  .focus-chip:focus-visible {
    outline: 2px solid hsla(var(--hue), 82%, 70%, 0.75);
    outline-offset: 3px;
  }

  .focus-chip:hover::before,
  .focus-chip[aria-pressed='true']::before {
    opacity: 0.6;
  }

  .focus-chip[aria-pressed='true']::after {
    opacity: 0.9;
  }

  .focus-title {
    font-weight: 700;
  }

  .focus-detail {
    font-size: 0.85rem;
    color: color-mix(in oklab, var(--muted) 85%, var(--ink) 15%);
  }

  .cta-line {
    display: grid;
    gap: 0.65rem;
    align-items: center;
    padding: clamp(0.75rem, 2vw, 1rem);
    border-radius: var(--radius-panel);
    border: 1px solid var(--border-soft);
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--surface-outline-glow) 35%, transparent);
  }

  .micro-note {
    color: color-mix(in oklab, var(--muted) 85%, white 15%);
  }

  @keyframes halo-drift {
    0% {
      transform: translate3d(-4%, -4%, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(6%, 6%, 0) rotate(140deg);
    }
    100% {
      transform: translate3d(-4%, -4%, 0) rotate(360deg);
    }
  }

  @media (min-width: 720px) {
    .cta-line {
      grid-template-columns: auto minmax(0, 1fr);
      gap: 1.1rem;
    }
  }

  @media (min-width: 960px) {
    header {
      max-width: 560px;
    }
  }

  @media (max-width: 540px) {
    .roadmap-card {
      padding: clamp(1.2rem, 4.4vw, 1.4rem);
    }

    .focus-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .focus-chip {
      padding: 0.8rem 0.95rem;
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

    .focus-chip::before {
      animation: none;
    }
  }
</style>
