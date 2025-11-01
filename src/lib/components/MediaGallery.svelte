<script>
  import { base } from '$app/paths';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;

  export let items = [
    {
      title: 'LED Node close-up',
      type: 'image',
      path: '20231220-1208-bilde3.png',
      alt: 'LED Node unit close-up',
      category: 'product'
    },
    {
      title: 'Clients signage collage',
      type: 'image',
      path: 'Clients-2.png',
      alt: 'Collage of client signage installations',
      category: 'showcase'
    },
    {
      title: 'LED Node promo',
      type: 'video',
      path: 'led node promo.mp4',
      category: 'demo'
    },
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

  export let title = 'Project media';
  export let showAll = true;
  export let filterCategory = null;

  $: filteredItems = filterCategory && !showAll 
    ? items.filter(item => item.category === filterCategory)
    : items;
</script>

<section class="section container" id="media-gallery">
  <h2 class="section-title">{title}</h2>
  <div class="gallery-grid">
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
                controls
                playsinline
                preload="metadata"
                muted
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
    background: var(--primary-grad);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: clamp(1.5rem, 4vw, 2.5rem);
    margin-top: clamp(1.5rem, 4vw, 2rem);
  }

  .gallery-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
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
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
    }
  }

  @media (min-width: 1024px) {
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
    }
  }
</style>
