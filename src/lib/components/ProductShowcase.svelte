<script>
  import { base } from '$app/paths';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;
</script>

<section class="section container reveal" id="product-showcase">
  <div class="showcase-grid">
    <article class="showcase-card grad-frame">
      <div class="image-container">
        <img 
          src={toAssetPath('20231220-1208-bilde3.png')} 
          alt="Latgale Special Economic Zone - SEZ partner logo"
          class="showcase-image"
          loading="lazy"
        />
      </div>
      <div class="showcase-info">
        <h3 class="showcase-title">Latgale SEZ Partner</h3>
        <p class="showcase-description">Special Economic Zone partner - Supporting regional innovation and business development.</p>
      </div>
    </article>
    
    <article class="showcase-card grad-frame">
      <div class="logo-container">
        <img 
          src={toAssetPath('LIAA_logo_ansamblis-1.png')} 
          alt="LIAA - Investment and Development Agency of Latvia"
          class="partner-logo"
          loading="lazy"
        />
      </div>
      <div class="showcase-info">
        <h3 class="showcase-title">LIAA Partner</h3>
        <p class="showcase-description">Investment and Development Agency of Latvia - Supporting innovation and technology development.</p>
      </div>
    </article>
  </div>
</section>

<style>
  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    gap: clamp(1.5rem, 4vw, 2.5rem);
  }

  .showcase-card {
    padding: clamp(1.5rem, 4vw, 2rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out);
  }

  .showcase-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  .image-container,
  .logo-container {
    width: 100%;
    border-radius: 0.75rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-container {
    min-height: 160px;
    padding: 2rem;
  }

  .showcase-image,
  .partner-logo {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
  }

  .showcase-info {
    flex: 1;
  }

  .showcase-title {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    color: var(--ink);
  }

  .showcase-description {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 768px) {
    .showcase-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
    }
  }
</style>
