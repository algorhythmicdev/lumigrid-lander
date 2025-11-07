<script>
  import { base } from '$app/paths';
  import { t } from '$lib/i18n';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;
</script>

<section class="section container reveal" id="trusted-by">
  <div class="header-wrapper">
    <h2 class="section-title">{@html $t('trustedby_title')}</h2>
    <p class="section-lead">{$t('trustedby_lead')}</p>
  </div>
  
  <div class="clients-showcase">
    <div class="clients-image-wrapper">
      <img 
        src={toAssetPath('Clients-2.png')} 
        alt="Collage of client signage installations showcasing various LED Node implementations"
        class="clients-image"
        loading="lazy"
      />
    </div>
  </div>
</section>

<style>
  .header-wrapper {
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 3rem);
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
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .clients-showcase {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .clients-image-wrapper {
    width: 100%;
    max-width: 1200px;
    border-radius: 1rem;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out);
  }

  .clients-image-wrapper:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.12);
  }

  .clients-image {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
