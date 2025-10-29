<script>
  import HaloCanvas from './HaloCanvas.svelte';
</script>

<header id="hero" class="site-header" role="banner" aria-label="Header" style="position: relative; min-height: 76vh; display: grid; place-items: center; overflow: hidden;">
  <!-- full-page halo with inertia -->
  <HaloCanvas />
  
  <div class="hero" style="position: relative; z-index: 1; max-width: 980px; text-align: center; padding: clamp(1rem, 3vw, 2rem);">
    <h1>Light that brings your brand to life.</h1>
    <p class="lead">Design signs that breathe, windows that glow, and façades that move together — all from a calm, simple app.</p>
    <div class="hero-cta" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: .75rem;">
      <a href="#what" class="btn primary">See how it works</a>
      <a href="#examples" class="btn outline">Try LED control</a>
    </div>
    <p class="credit" style="color: var(--muted); margin-top: .5rem;">
      Developed by <a href="https://reclamefabriek.eu" target="_blank" rel="noopener" style="color: var(--cya);">Reclame Fabriek R&amp;D</a>
    </p>
  </div>
</header>
