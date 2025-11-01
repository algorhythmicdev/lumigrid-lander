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
    <h2 class="section-title">{$t('what_title')}</h2>
  </div>
  <div class="features-grid">
    {#each features as feature}
      <article class="feature-card grad-frame" data-halo={feature.halo}>
        <div class="feature-icon" aria-hidden="true">{feature.icon}</div>
        <h3 class="feature-title">{$t(`what_${feature.key}_t`)}</h3>
        <p class="feature-description">{$t(`what_${feature.key}_d`)}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  .header-section {
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 3rem);
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    background: var(--primary-grad);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: clamp(1.25rem, 3vw, 1.75rem);
  }

  .feature-card {
    padding: clamp(1.75rem, 4vw, 2.25rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform var(--dur-med) var(--ease-out);
  }

  .feature-card:hover {
    transform: translateY(-6px);
  }

  .feature-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .feature-title {
    font-size: clamp(1.15rem, 2.3vw, 1.35rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
  }

  .feature-description {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    }
  }
</style>
