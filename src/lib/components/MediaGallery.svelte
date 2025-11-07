<script>
  import { base } from '$app/paths';
  import { t } from '$lib/i18n';
  import { onMount } from 'svelte';
  
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

  onMount(() => {
    // Set up intersection observer for autoplay on scroll
    const videos = document.querySelectorAll('.gallery-video');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay was prevented, likely due to browser policy
          });
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.5 // Play when at least 50% visible
    });

    videos.forEach(video => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  });
</script>

<section class="section container" id="media-gallery">
  <h2 class="section-title">{title || $t('media_title')}</h2>
  <div class="gallery-scroll">
    {#each filteredItems as item}
      <article class="gallery-item reveal">
        <div class="media-container">
          {#if item.type === 'image'}
            <a href={toAssetPath(item.path)} target="_blank" rel="noopener noreferrer" class="media-link">
              <img 
                src={toAssetPath(item.path)} 
                alt={item.alt ?? item.title} 
                loading="lazy"
                class="gallery-image"
              />
              <div class="overlay">
                <span class="view-full">View full size</span>
              </div>
            </a>
          {:else if item.type === 'video'}
            <div class="video-wrapper">
              <video
                src={toAssetPath(item.path)}
                playsinline
                preload="metadata"
                muted
                loop
                class="gallery-video"
                aria-label={item.title}
              ></video>
            </div>
          {/if}
        </div>
        <div class="item-caption">
          <h3 class="item-title">{item.title}</h3>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .section-title {
    font-size: var(--fs-h2);
    margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--ink);
    font-weight: 700;
  }

  .gallery-scroll {
    display: flex;
    gap: clamp(1.5rem, 4vw, 2.5rem);
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding-bottom: 1rem;
    margin-top: clamp(1.5rem, 4vw, 2rem);
    /* Hide scrollbar for Chrome, Safari and Opera */
    -webkit-overflow-scrolling: touch;
  }

  .gallery-scroll::-webkit-scrollbar {
    height: 8px;
  }

  .gallery-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  .gallery-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  .gallery-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .gallery-item {
    flex: 0 0 auto;
    width: min(85vw, 420px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    scroll-snap-align: start;
  }

  .media-container {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out);
  }

  .media-container:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.12);
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
  }

  .item-title {
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 600;
    color: var(--ink);
    margin: 0;
    line-height: 1.4;
  }

  @media (min-width: 768px) {
    .gallery-item {
      width: min(45vw, 480px);
    }
  }

  @media (min-width: 1024px) {
    .gallery-item {
      width: min(35vw, 520px);
    }
  }
</style>
