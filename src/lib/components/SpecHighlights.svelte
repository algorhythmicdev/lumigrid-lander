<script>
  import { getIconPaths } from '$lib/icons';
  import { t } from '$lib/i18n';

  const highlights = [
    { icon: 'lightBulb', halo: '2', titleKey: 'highlights_dimming', textKey: 'highlights_dimming_desc' },
    { icon: 'swatch', halo: '2', titleKey: 'highlights_colour', textKey: 'highlights_colour_desc' },
    { icon: 'bolt', halo: '1', titleKey: 'highlights_setup', textKey: 'highlights_setup_desc' },
    { icon: 'shieldCheck', halo: '1', titleKey: 'highlights_reliable', textKey: 'highlights_reliable_desc' }
  ];
</script>

<section class="section container reveal" id="highlights">
  <div class="header-section">
    <h2 class="section-title">{@html $t('highlights_title')}</h2>
    <p class="section-lead">{$t('highlights_lead')}</p>
  </div>
  <ul class="highlights-grid">
    {#each highlights as highlight}
      <li class="highlight-card grad-frame" data-halo={highlight.halo}>
        <div class="card-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            {#each getIconPaths(highlight.icon) as path}
              <path stroke-linecap="round" stroke-linejoin="round" d={path} />
            {/each}
          </svg>
        </div>
        <h3 class="card-title">{$t(highlight.titleKey)}</h3>
        <p class="card-text">{$t(highlight.textKey)}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  .header-section {
    text-align: center;
    margin-bottom: clamp(2.5rem, 6vw, 4rem);
    padding: 0 1rem;
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    margin: 0 0 1.25rem;
    color: var(--ink);
    line-height: 1.2;
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    gap: clamp(1.5rem, 3.5vw, 2rem);
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: stretch;
  }

  .highlight-card {
    padding: clamp(2rem, 4.5vw, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
    transition: transform var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out);
    height: 100%;
  }

  .highlight-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .card-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.25rem;
    color: var(--ink);
    opacity: 0.9;
  }

  .card-icon svg {
    width: 100%;
    height: 100%;
  }

  .card-title {
    font-size: clamp(1.2rem, 2.5vw, 1.45rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
    line-height: 1.3;
  }

  .card-text {
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: var(--muted);
    line-height: 1.7;
    margin: 0;
    flex-grow: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .highlight-card:hover {
      transform: none;
    }
  }

  @media (max-width: 767px) {
    .highlights-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .highlight-card {
      padding: 1.75rem;
    }
  }

  @media (min-width: 768px) {
    .highlights-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 900px) {
    .highlights-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .highlights-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
