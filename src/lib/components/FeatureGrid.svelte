<script>
  import { t } from '$lib/i18n';

  const features = [
    { icon: '🎨', halo: '3', key: '1' },
    { icon: '⚙️', halo: '2', key: '2' },
    { icon: '📱', halo: '2', key: '3' },
    { icon: '🌟', halo: '1', key: '4' }
  ];
</script>

<section class="section container reveal" id="what">
  <div class="header-section">
    <h2 class="section-title">{@html $t('what_title')}</h2>
  </div>
  <div class="features-grid">
    {#each features as feature}
      <article class="feature-card grad-frame" data-halo={feature.halo}>
        <div class="feature-icon" aria-hidden="true">{feature.icon}</div>
        <h3 class="feature-title">{@html $t(`what_${feature.key}_t`)}</h3>
        <p class="feature-description">{$t(`what_${feature.key}_d`)}</p>
      </article>
    {/each}
  </div>
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
    color: var(--ink);
    margin: 0;
    line-height: 1.2;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    gap: clamp(1.5rem, 3.5vw, 2rem);
    align-items: stretch;
  }

  .feature-card {
    padding: clamp(2rem, 4.5vw, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
    transition: transform var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out);
    height: 100%;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .feature-icon {
    font-size: 3rem;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .feature-title {
    font-size: clamp(1.2rem, 2.5vw, 1.45rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
    line-height: 1.3;
  }

  .feature-description {
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: var(--muted);
    line-height: 1.7;
    margin: 0;
    flex-grow: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .feature-card:hover {
      transform: none;
    }
  }

  @media (max-width: 767px) {
    .features-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .feature-card {
      padding: 1.75rem;
    }
  }

  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
