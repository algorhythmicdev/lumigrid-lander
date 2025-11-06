<script>
  import { base } from '$app/paths';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  /**
   * Partner object structure:
   * @typedef {Object} Partner
   * @property {string} name - Partner organization name
   * @property {string} logo - Path to logo file in assets directory
   */
  const partners = [
    {
      name: 'Latgale Special Economic Zone - SEZ',
      logo: '20231220-1208-bilde3.png'
    },
    {
      name: 'LIAA - Investment and Development Agency of Latvia',
      logo: 'LIAA_logo_ansamblis-1.png'
    }
  ];


</script>

<section class="section container" id="partners">
  <div class="header-wrapper">
    <h2 class="section-title"><span class="accent">Partners</span></h2>
    <p class="section-lead">Proud to work with industry leaders and innovation supporters.</p>
  </div>

  <div class="partners-grid">
    {#each partners as partner}
      <article class="partner-card grad-frame reveal">
        <div class="logo-container">
          <img 
            src={toAssetPath(partner.logo)} 
            alt={partner.name}
            class="partner-logo"
            loading="lazy"
          />
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
    color: var(--ink);
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
    padding: clamp(2rem, 5vw, 3rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out);
    min-height: 240px;
  }

  .partner-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  .logo-container {
    width: 100%;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 180px;
  }

  .partner-logo {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    .partners-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
    }
  }
</style>
