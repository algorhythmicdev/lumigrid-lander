<script>
  export let filter = 'all';
  
  const items = [
    {
      title: 'Retail window halo',
      tag: 'retail',
      summary: 'Layered gradients keep merchandise legible without glare.',
      background: 'radial-gradient(120% 120% at 20% 20%, rgba(118,133,255,0.35), transparent), radial-gradient(120% 120% at 80% 70%, rgba(20,36,96,0.55), rgba(11,17,32,0.9))'
    },
    {
      title: 'Outdoor facade sync',
      tag: 'outdoor',
      summary: 'Long runs stay in step with a single controller.',
      background: 'radial-gradient(140% 140% at 15% 30%, rgba(255,189,122,0.45), transparent 60%), linear-gradient(160deg, rgba(13,22,44,0.95), rgba(8,12,24,0.9))'
    },
    {
      title: 'Logo letter glow',
      tag: 'brand',
      summary: 'Frosted acrylic keeps the face clean and halo subtle.',
      background: 'radial-gradient(120% 120% at 70% 30%, rgba(255,105,180,0.4), transparent 55%), linear-gradient(200deg, rgba(18,28,58,0.95), rgba(9,14,28,0.92))'
    },
    {
      title: 'Hospitality welcome wall',
      tag: 'retail',
      summary: 'Soft amber tone mapped to traffic peaks.',
      background: 'radial-gradient(120% 120% at 20% 70%, rgba(255,214,137,0.42), transparent 55%), linear-gradient(200deg, rgba(19,24,46,0.94), rgba(8,10,24,0.92))'
    },
    {
      title: 'Interactive product shelf',
      tag: 'retail',
      summary: 'A muted base with reactive pulses for launch weeks.',
      background: 'radial-gradient(150% 150% at 80% 20%, rgba(130,233,255,0.35), transparent 60%), linear-gradient(210deg, rgba(13,22,44,0.96), rgba(11,17,32,0.9))'
    },
    {
      title: 'Transit hub ticker',
      tag: 'outdoor',
      summary: 'High-contrast strips for wayfinding without flicker.',
      background: 'repeating-linear-gradient(120deg, rgba(41,216,255,0.2) 0 14px, rgba(41,216,255,0) 14px 28px), linear-gradient(200deg, rgba(8,16,34,0.95), rgba(5,10,24,0.92))'
    }
  ];

  // when receiving the event from CaseFilters:
  const onFilter = (e)=> filter = e.detail.active;
  
  $: filtered = filter === 'all' ? items : items.filter(it => it.tag === filter);
</script>

<section class="container section" data-hue="260" on:change={onFilter}>
  <div class="header-section">
    <h2 class="section-title" id="gallery">Project gallery</h2>
    <p class="section-lead">Explore our curated showcase of LED Node installations across different settings.</p>
  </div>
  <div class="projects-grid">
    {#each filtered as it}
      <article class="project-card grad-frame" style={`--card-bg:${it.background}`}>
        <div class="art-preview" role="presentation"></div>
        <div class="card-content">
          <h3 class="project-title">{it.title}</h3>
          <p class="project-summary">{it.summary}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .header-section {
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 3rem);
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
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: clamp(1.25rem, 3vw, 1.75rem);
  }

  .project-card {
    padding: 0;
    display: grid;
    grid-template-rows: minmax(180px, 25vh) auto;
    overflow: hidden;
    transition: transform var(--dur-med) var(--ease-out);
  }

  .project-card:hover {
    transform: translateY(-6px);
  }

  .art-preview {
    background: var(--card-bg);
    box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.35);
    position: relative;
  }

  .art-preview::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      rgba(11, 17, 32, 0.4) 100%
    );
  }

  .card-content {
    padding: clamp(1rem, 3vw, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-title {
    font-size: clamp(1.05rem, 2.1vw, 1.2rem);
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
    color: var(--ink);
  }

  .project-summary {
    font-size: clamp(0.9rem, 1.7vw, 1rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 640px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    }

    .project-card {
      grid-template-rows: minmax(200px, 28vh) auto;
    }
  }

  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
