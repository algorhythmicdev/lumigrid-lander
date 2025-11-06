<script>
  import HaloCanvas from './HaloCanvas.svelte';
  import { base } from '$app/paths';
  import { t } from '$lib/i18n';
</script>

<header id="hero" class="site-header" aria-label="Header" style="position: relative; min-height: 76vh; display: grid; place-items: center; overflow: hidden;">
  <!-- full-page halo with inertia -->
  <HaloCanvas />
  
  <div class="hero" style="position: relative; z-index: 1; max-width: 980px; text-align: center; padding: clamp(1rem, 3vw, 2rem);">
    <h1>{$t('hero_alt_title')}</h1>
    <p class="lead">{$t('hero_alt_lead')}</p>
    <div class="hero-cta" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: .75rem;">
      <a href="#what" class="btn primary">{$t('hero_alt_cta_primary')}</a>
      <a href={`${base}/cases`} class="btn outline">{$t('hero_alt_cta_secondary')}</a>
    </div>
    <p class="credit" style="color: var(--muted); margin-top: .5rem;">
      {$t('hero_alt_credit')} <a href="https://reclamefabriek.eu" target="_blank" rel="noopener" style="color: var(--cya);">Reclame Fabriek R&amp;D</a>
    </p>
  </div>
</header>
