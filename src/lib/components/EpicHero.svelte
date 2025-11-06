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
    <p class="hero-kicker">{kicker}</p>
    <h1 class="hero-title">
      {title}
    </h1>
    <p class="hero-lead">{sub}</p>

    <div class="hero-cta">
      <a href={`${base}/cases`} class="btn primary hero-btn">See examples</a>
      <a href={`${base}/contact#contact`} class="btn hero-btn">Talk to us</a>
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
    gap: clamp(2.5rem, 6vw, 4rem);
    align-items: center;
    padding: clamp(2rem, 4vw, 3rem) 0;
  }
  
  .hero-text {
    order: 1;
    animation: fadeSlideIn 0.8s ease-out;
  }
  
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hero-kicker {
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 0.5rem;
    font-size: clamp(0.75rem, 1.5vw, 0.9rem);
    font-weight: 600;
    opacity: 0.9;
  }
  
  .hero-title {
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    line-height: 1.08;
    margin: 0.2rem 0 1rem;
    font-weight: 800;
    color: #ffffff;
    background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
    letter-spacing: -0.02em;
  }
  
  .hero-lead {
    color: var(--muted);
    max-width: 56ch;
    margin: 0 0 2rem;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    line-height: 1.65;
    opacity: 0.95;
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 1.2rem;
    padding: 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
  
  .hero-btn {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    padding: 0.9rem 1.5rem;
    transition: all 0.3s ease;
  }
  
  .hero-btn:hover {
    transform: translateY(-2px) scale(1.02);
  }
  
  .hero-video {
    order: 2;
    position: relative;
    animation: fadeSlideIn 0.8s ease-out 0.2s backwards;
  }
  
  .video-container {
    position: relative;
    border-radius: 1.2rem;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 80px rgba(255, 255, 255, 0.05) inset;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .video-container:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 
      0 24px 70px rgba(0, 0, 0, 0.5),
      0 0 100px rgba(255, 255, 255, 0.08) inset;
  }
  
  .promo-video {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .hero-text,
    .hero-video {
      animation: none;
    }
    
    .video-container:hover {
      transform: none;
    }
    
    .hero-btn:hover {
      transform: none;
    }
  }
  
  @media (min-width: 768px) {
    .hero-content {
      grid-template-columns: 1.1fr 1fr;
      gap: clamp(3rem, 6vw, 5rem);
    }
    
    .hero-text {
      order: 1;
    }
    
    .hero-video {
      order: 2;
    }
  }
  
  @media (min-width: 1024px) {
    .hero-content {
      grid-template-columns: 1.2fr 1fr;
    }
  }
</style>
