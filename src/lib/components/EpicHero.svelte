<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  
  export let title = 'LED Node';
  export let kicker = 'Reclame Fabriek R&D';
  export let sub = 'A compact controller for LED signage. Pick a look, set a simple plan, lights stay in step.';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;
  
  let videoElement;
  
  onMount(() => {
    if (videoElement) {
      // Ensure autoplay works even with browser restrictions
      videoElement.play().catch(() => {
        // If autoplay fails, try again on user interaction
        console.log('Autoplay was prevented');
      });
    }
  });
</script>

<div class="hero-content">
  <div class="hero-text" style="position:relative; z-index:1">
    <p style="letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin:0 0 .35rem">{kicker}</p>
    <h1 class="kg" style="font-size:clamp(2.4rem,6.2vw,4.5rem); line-height:1.05; margin:.1rem 0">
      {title}
    </h1>
    <p class="lead" style="color:var(--muted); max-width:64ch; margin:.6rem 0 1rem">{sub}</p>

    <div class="glassbar">
      <a href={`${base}/cases`} class="btn primary">See examples</a>
      <a href={`${base}/contact#contact`} class="btn">Talk to us</a>
    </div>
  </div>
  
  <div class="hero-video">
    <div class="video-container">
      <video
        bind:this={videoElement}
        src={toAssetPath('led node promo.mp4')}
        autoplay
        muted
        loop
        playsinline
        class="promo-video"
        aria-label="LED Node promotional video"
      ></video>
    </div>
  </div>
</div>

<style>
  .hero-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 5vw, 3rem);
    align-items: center;
  }
  
  .hero-text {
    order: 1;
  }
  
  .hero-video {
    order: 2;
  }
  
  .video-container {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .promo-video {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  
  .glassbar{
    display:flex; gap:.6rem; flex-wrap:wrap;
    background: rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.14);
    border-radius:.9rem; padding:.6rem; backdrop-filter: blur(8px);
  }
  
  @media (min-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr 1fr;
    }
    
    .hero-text {
      order: 1;
    }
    
    .hero-video {
      order: 2;
    }
  }
</style>
