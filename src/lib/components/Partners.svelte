<script>
  import { base } from '$app/paths';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  /**
   * Partner object structure:
   * @typedef {Object} Partner
   * @property {string} name - Partner organization name
   * @property {string} logo - Path to logo file in assets directory
   * @property {string} category - Partner category (e.g., 'award', 'sponsor', 'technology')
   * @property {string} description - Brief description of partnership or recognition
   */
  const partners = [
    {
      name: 'LIAA',
      logo: 'LIAA_logo_ansamblis-1.png',
      category: 'award',
      description: 'Investment and Development Agency of Latvia - Supporting Innovation'
    }
    // Future partners should follow the Partner typedef structure above
  ];


</script>

<section class="section container" id="partners">
  <div class="header-wrapper">
    <h2 class="section-title">Partners</h2>
    <p class="section-lead">Proud to work with industry leaders and innovation supporters.</p>
  </div>

  <div class="partners-grid">
    {#each partners as partner}
      <article class="partner-card grad-frame reveal">
        <div class="logo-container">
          <img 
            src={toAssetPath(partner.logo)} 
            alt={`${partner.name} logo`}
            class="partner-logo"
            loading="lazy"
          />
        </div>
        <div class="partner-info">
          <h3 class="partner-name">{partner.name}</h3>
          <p class="partner-description">{partner.description}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .header-wrapper {
    text-align: center;
    margin-bottom: clamp(2.5rem, 6vw, 4rem);
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    margin-bottom: 1rem;
    background: var(--primary-grad);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    gap: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: clamp(3rem, 8vw, 5rem);
  }

  .partner-card {
    padding: clamp(1.5rem, 4vw, 2.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out);
  }

  .partner-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  .logo-container {
    width: 100%;
    max-width: 280px;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 160px;
  }

  .partner-logo {
    width: 100%;
    height: auto;
    max-height: 120px;
    object-fit: contain;
  }

  .partner-info {
    flex: 1;
  }

  .partner-name {
    font-size: clamp(1.3rem, 2.8vw, 1.6rem);
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    color: var(--ink);
  }

  .partner-description {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 768px) {
    .partners-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
    }
  }
</style>
