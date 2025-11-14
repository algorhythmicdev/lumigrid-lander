<script>
  import { base } from '$app/paths';
  import { t } from '$lib/i18n';
  import { onMount, onDestroy } from 'svelte';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  export let items = [
    {
      title: 'Casino frontage',
      type: 'video',
      path: 'casino front.mp4',
      category: 'installation'
    },
    {
      title: 'Prop example – neon',
      type: 'video',
      path: 'prop example neon.mp4',
      category: 'demo'
    },
    {
      title: 'Neon LED FX',
      type: 'video',
      path: 'neon led fx.mp4',
      category: 'effect'
    },
    {
      title: 'Halo LED FX',
      type: 'video',
      path: 'halo led fx.mp4',
      category: 'effect'
    },
    {
      title: 'Star Wars sign',
      type: 'video',
      path: 'star wars sign.mp4',
      category: 'showcase'
    }
  ];

  export let title = null;
  export let showAll = true;
  export let filterCategory = null;

  $: filteredItems = filterCategory && !showAll 
    ? items.filter(item => item.category === filterCategory)
    : items;

  let currentIndex = 0;
  let videoElement;
  let sectionElement;
  let intersectionObserver;
  let touchStartX = 0;
  let touchEndX = 0;

  $: currentItem = filteredItems[currentIndex];

  const goToPrevious = () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = filteredItems.length - 1;
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  };

  // Keyboard navigation handler
  const handleKeydown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  // Touch/swipe handlers for mobile
  const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const swipeThreshold = 50; // minimum distance for swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next
      goToNext();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous
      goToPrevious();
    }
  };

  // Autoplay video when index changes
  $: if (videoElement && currentItem && currentItem.type === 'video') {
    // Small delay to ensure video is loaded
    setTimeout(() => {
      videoElement.load();
      videoElement.play().catch((error) => {
        console.debug('Video autoplay blocked:', error.message);
      });
    }, 100);
  }

  // Setup intersection observer for autoplay on scroll and keyboard navigation
  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined' && sectionElement) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoElement && currentItem?.type === 'video') {
              videoElement.play().catch((error) => {
                console.debug('Video autoplay blocked:', error.message);
              });
            } else if (!entry.isIntersecting && videoElement) {
              videoElement.pause();
            }
          });
        },
        { threshold: 0.5 }
      );
      intersectionObserver.observe(sectionElement);
    }

    // Add keyboard event listener (browser only)
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    if (intersectionObserver && sectionElement) {
      intersectionObserver.unobserve(sectionElement);
    }
    // Remove keyboard event listener (browser only)
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<section 
  bind:this={sectionElement} 
  class="section container" 
  id="media-gallery"
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
>
  <h2 class="section-title">{title || $t('media_title')}</h2>
  <div class="gallery-carousel">
    {#if currentItem}
      <button 
        class="nav-button nav-button-prev" 
        on:click={goToPrevious}
        aria-label="Previous video"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <article class="gallery-item reveal">
        <div class="media-container">
          {#if currentItem.type === 'image'}
            <a href={toAssetPath(currentItem.path)} target="_blank" rel="noopener noreferrer" class="media-link">
              <img 
                src={toAssetPath(currentItem.path)} 
                alt={currentItem.alt ?? currentItem.title} 
                loading="lazy"
                class="gallery-image"
              />
              <div class="overlay">
                <span class="view-full">View full size</span>
              </div>
            </a>
          {:else if currentItem.type === 'video'}
            <div class="video-wrapper">
              <video
                bind:this={videoElement}
                src={toAssetPath(currentItem.path)}
                autoplay
                playsinline
                preload="metadata"
                muted
                loop
                class="gallery-video"
                aria-label={currentItem.title}
              ></video>
            </div>
          {/if}
        </div>
        <div class="item-caption">
          <h3 class="item-title">{currentItem.title}</h3>
        </div>
      </article>

      <button 
        class="nav-button nav-button-next" 
        on:click={goToNext}
        aria-label="Next video"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    {/if}

    <div class="gallery-indicators">
      {#each filteredItems as item, index}
        <button
          class="indicator"
          class:active={index === currentIndex}
          on:click={() => currentIndex = index}
          aria-label={`Go to ${item.title}`}
        ></button>
      {/each}
    </div>
  </div>
</section>

<style>
  .section-title {
    font-size: var(--fs-h2);
    margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--ink);
    font-weight: 700;
  }

  .gallery-carousel {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem);
    margin-top: clamp(1.5rem, 4vw, 2rem);
    padding: 2rem 0;
  }

  .nav-button {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: var(--ink);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--dur-med) var(--ease-out);
    z-index: 2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .nav-button:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .nav-button:active {
    transform: scale(0.96);
    transition-duration: var(--dur-fast);
  }

  .nav-button:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  .gallery-item {
    flex: 1;
    max-width: min(90vw, 720px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .media-container {
    position: relative;
    border-radius: 1.25rem;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25),
                0 2px 8px rgba(0, 0, 0, 0.15);
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out),
                border-color var(--dur-med) var(--ease-out);
  }

  .media-container:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 16px 56px rgba(0, 0, 0, 0.35),
                0 4px 16px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .media-link {
    display: block;
    position: relative;
    text-decoration: none;
  }

  .gallery-image {
    width: 100%;
    height: auto;
    min-height: 220px;
    object-fit: cover;
    display: block;
    aspect-ratio: 16 / 10;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(231, 59, 163, 0.85), rgba(108, 43, 217, 0.85));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--dur-med) var(--ease-out);
  }

  .media-link:hover .overlay,
  .media-link:focus .overlay {
    opacity: 1;
  }

  .view-full {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .video-wrapper {
    position: relative;
    width: 100%;
  }

  .gallery-video {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    background: #000;
    border-radius: inherit;
    object-fit: cover;
  }

  .item-caption {
    padding: 0 0.5rem;
    text-align: center;
  }

  .item-title {
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 600;
    color: var(--ink);
    margin: 0;
    line-height: 1.4;
  }

  .gallery-indicators {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }

  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    border: none;
    cursor: pointer;
    transition: all var(--dur-med) var(--ease-out);
    padding: 0;
  }

  .indicator.active {
    background: rgba(255, 255, 255, 0.95);
    width: 28px;
    border-radius: 4px;
  }

  .indicator:hover:not(.active) {
    background: rgba(255, 255, 255, 0.65);
    transform: scale(1.2);
  }

  .indicator:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    .gallery-carousel {
      gap: 0.5rem;
      padding: 1rem 0;
    }

    .nav-button {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .nav-button-prev {
      left: 0.5rem;
    }

    .nav-button-next {
      right: 0.5rem;
    }

    .gallery-item {
      max-width: 100%;
    }

    .gallery-indicators {
      bottom: -0.5rem;
    }
  }

  @media (min-width: 1024px) {
    .gallery-item {
      max-width: min(70vw, 900px);
    }
  }
</style>
