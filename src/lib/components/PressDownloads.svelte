<script>
  import { base } from '$app/paths';
  
  const toAssetPath = (path) => `${base}/assets/${path.split('/').map(encodeURIComponent).join('/')}`;
  const filenameFromPath = (path) => path.split('/').pop();

  const downloadGroups = [
    {
      title: 'Brand assets',
      summary: 'Official LED Node logos and brand marks in scalable vector format.',
      icon: '🎨',
      assets: [
        {
          label: 'Horizontal logo (SVG)',
          path: 'press/logo-horizontal.svg',
          type: 'file',
          size: 'Vector'
        },
        {
          label: 'Square logo (SVG)',
          path: 'press/logo-square.svg',
          type: 'file',
          size: 'Vector'
        }
      ]
    },
    {
      title: 'Documentation',
      summary: 'Comprehensive product sheets, technical specifications and installation guides.',
      icon: '📄',
      assets: [
        { label: 'Product sheet (PDF)', path: 'downloads/product-sheet.pdf', type: 'file', size: '2.4 MB' },
        { label: 'Technical specs (PDF)', path: 'downloads/technical-specs.pdf', type: 'file', size: '1.8 MB' }
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
  <div class="header-wrapper">
    <h2 class="section-title">Downloads & press kit</h2>
    <p class="section-lead">Essential resources for media, partners, and technical teams.</p>
  </div>
  
  <div class="downloads-grid">
    {#each downloadGroups as group}
      <article class="download-card grad-frame">
        <div class="card-header">
          <span class="card-icon" aria-hidden="true">{group.icon}</span>
          <div class="header-text">
            <h3 class="card-title">{group.title}</h3>
            <p class="card-summary">{group.summary}</p>
          </div>
        </div>
        <div class="asset-list">
          {#each group.assets as asset}
            <a class="asset-item" href={toAssetPath(asset.path)} download>
              <div class="asset-info">
                <span class="asset-label">{asset.label}</span>
                <span class="asset-meta">
                  {filenameFromPath(asset.path)}
                  {#if asset.size}
                    <span class="separator">•</span>
                    <span class="asset-size">{asset.size}</span>
                  {/if}
                </span>
              </div>
              <span class="download-icon" aria-label="Download">⬇</span>
            </a>
          {/each}
        </div>
      </article>
    {/each}
  </div>

  <div class="contact-section">
    <div class="contact-grid">
      {#each contactResources as block}
        <article class="contact-card grad-frame">
          <h3 class="contact-title">{block.title}</h3>
          <p class="contact-summary">{block.summary}</p>
          <a class="btn btn-primary" href={block.action.href}>{block.action.label}</a>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .header-wrapper {
    text-align: center;
    margin-bottom: clamp(2rem, 6vw, 3.5rem);
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    margin-bottom: 1rem;
    background: var(--primary-grad);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .downloads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
    gap: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: clamp(3rem, 8vw, 5rem);
  }

  .download-card {
    padding: clamp(1.5rem, 4vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: transform var(--dur-med) var(--ease-out);
  }

  .download-card:hover {
    transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .card-icon {
    font-size: 2rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .header-text {
    flex: 1;
  }

  .card-title {
    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: var(--ink);
  }

  .card-summary {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.5;
    margin: 0;
  }

  .asset-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .asset-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.75rem;
    text-decoration: none;
    color: var(--ink);
    transition: all var(--dur-fast) var(--ease-out);
  }

  .asset-item:hover,
  .asset-item:focus {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }

  .asset-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .asset-label {
    font-weight: 600;
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  }

  .asset-meta {
    font-size: 0.85rem;
    color: var(--muted);
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .separator {
    opacity: 0.5;
  }

  .asset-size {
    font-weight: 500;
  }

  .download-icon {
    font-size: 1.25rem;
    opacity: 0.7;
    transition: opacity var(--dur-fast) var(--ease-out);
    flex-shrink: 0;
  }

  .asset-item:hover .download-icon,
  .asset-item:focus .download-icon {
    opacity: 1;
  }

  .contact-section {
    padding-top: clamp(2rem, 6vw, 3rem);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  .contact-card {
    padding: clamp(1.5rem, 4vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-title {
    font-size: clamp(1.1rem, 2.2vw, 1.3rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
  }

  .contact-summary {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all var(--dur-fast) var(--ease-out);
    align-self: flex-start;
  }
</style>
