<script>
  import { base } from '$app/paths';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;
  const filenameFromPath = (path) => path.split('/').pop();

  const assetGroups = [
    {
      title: 'Brand logos',
      summary: 'Official LED Node marks prepared as scalable SVG artwork.',
      assets: [
        {
          label: 'Horizontal logo (SVG)',
          path: 'press/logo-horizontal.svg',
          type: 'image',
          alt: 'LED Node horizontal logo'
        },
        {
          label: 'Square logo (SVG)',
          path: 'press/logo-square.svg',
          type: 'image',
          alt: 'LED Node square logo'
        }
      ]
    },
    {
      title: 'Photography',
      summary: 'Product imagery suitable for articles, decks and social posts.',
      assets: [
        {
          label: 'LED Node close-up',
          path: '20231220-1208-bilde3.png',
          type: 'image',
          alt: 'LED Node unit close-up'
        },
        {
          label: 'Clients signage collage',
          path: 'Clients-2.png',
          type: 'image',
          alt: 'Collage of client signage'
        },
        {
          label: 'LIAA award photo',
          path: 'LIAA_logo_ansamblis-1.png',
          type: 'image',
          alt: 'LIAA award recognition photo'
        }
      ]
    },
    {
      title: 'Video loops',
      summary: 'High-quality video loops showing LED Node animations in action.',
      assets: [
        { label: 'LED Node promo', path: 'led node promo.mp4', type: 'video' },
        { label: 'Casino frontage', path: 'casino front.mp4', type: 'video' },
        { label: 'Prop example – neon', path: 'prop example neon.mp4', type: 'video' },
        { label: 'Neon LED FX', path: 'neon led fx.mp4', type: 'video' },
        { label: 'Halo LED FX', path: 'halo led fx.mp4', type: 'video' },
        { label: 'Star Wars sign', path: 'star wars sign.mp4', type: 'video' }
      ]
    },
    {
      title: 'Documentation',
      summary: 'Download printable product sheets and technical specifications.',
      assets: [
        { label: 'Product sheet (PDF)', path: 'downloads/product-sheet.pdf', type: 'file' },
        { label: 'Technical specs (PDF)', path: 'downloads/technical-specs.pdf', type: 'file' }
      ]
    }
  ];

  const contactResources = [
    {
      title: 'Press desk',
      summary: 'Need alternate formats or interview access? Reach out directly.',
      action: {
        label: 'Email press desk',
        href: 'mailto:press@reclamefabriek.eu?subject=LED%20Node%20press%20assets'
      }
    },
    {
      title: 'Product team',
      summary: 'Request additional documentation, integrations, or partner materials.',
      action: {
        label: 'Ask for documentation',
        href: 'mailto:hello@reclamefabriek.eu?subject=LED%20Node%20documentation%20request'
      }
    }
  ];
</script>

<section class="section container reveal" id="press">
  <h2 class="under" style="font-size:var(--fs-h2)">Press & downloads</h2>
  <div class="group-grid">
    {#each assetGroups as group}
      <article class="card grad-frame">
        <header class="group-header">
          <div>
            <h3>{group.title}</h3>
            <p class="summary">{group.summary}</p>
          </div>
        </header>
        <div class="asset-grid">
          {#each group.assets as asset}
            <div class="asset">
              {#if asset.type === 'image'}
                <a class="asset-preview" href={toAssetPath(asset.path)} download>
                  <img src={toAssetPath(asset.path)} alt={asset.alt ?? asset.label} loading="lazy" />
                </a>
                <a class="asset-link" href={toAssetPath(asset.path)} download>{asset.label}</a>
                <span class="filename">{filenameFromPath(asset.path)}</span>
              {:else if asset.type === 'video'}
                <div class="video-wrapper">
                  <video
                    src={toAssetPath(asset.path)}
                    controls
                    playsinline
                    preload="metadata"
                    muted
                  ></video>
                </div>
                <a class="asset-link" href={toAssetPath(asset.path)} download>{asset.label}</a>
                <span class="filename">{filenameFromPath(asset.path)}</span>
              {:else}
                <a class="asset-link btn" href={toAssetPath(asset.path)} download>{asset.label}</a>
                <span class="filename">{filenameFromPath(asset.path)}</span>
              {/if}
            </div>
          {/each}
        </div>
      </article>
    {/each}
  </div>

  <div class="contact-grid">
    {#each contactResources as block}
      <article class="card grad-frame contact-card">
        <h3>{block.title}</h3>
        <p class="summary">{block.summary}</p>
        <a class="btn" href={block.action.href}>{block.action.label}</a>
      </article>
    {/each}
  </div>
</section>

<style>
  .group-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: clamp(1.2rem, 4vw, 2rem);
  }

  .card {
    padding: clamp(1rem, 3vw, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: clamp(0.8rem, 2vw, 1.2rem);
  }

  .summary {
    color: var(--muted);
  }

  .asset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: clamp(0.75rem, 2vw, 1rem);
  }

  .asset {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .asset-preview,
  .video-wrapper {
    position: relative;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(15, 23, 42, 0.4);
    min-height: 120px;
  }

  .asset-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .video-wrapper video {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    background: #000;
  }

  .asset-link {
    font-weight: 500;
  }

  .filename {
    font-size: 0.85rem;
    color: var(--muted);
    word-break: break-word;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    margin-top: clamp(2rem, 6vw, 3rem);
  }

  .contact-card {
    gap: 0.75rem;
  }
</style>
