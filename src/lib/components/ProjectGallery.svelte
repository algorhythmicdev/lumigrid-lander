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
  
  $: filtered = filter === 'all' ? items : items.filter(it => it.tag === filter);
  
  let selectedIndex = null;
  
  function selectCard(index) {
    selectedIndex = selectedIndex === index ? null : index;
  }
  
  function handleKeyDown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCard(index);
    }
  }
</script>

<section class="container section" data-hue="260">
  <div class="header-section">
    <h2 class="section-title" id="gallery">Project <span class="accent">gallery</span></h2>
    <p class="section-lead">Explore our curated showcase of LED Node installations across different settings.</p>
  </div>
  <div class="projects-carousel">
    {#each filtered as it, index}
      <div 
        class="project-card grad-frame" 
        class:selected={selectedIndex === index}
        style={`--card-bg:${it.background}`}
        on:click={() => selectCard(index)}
        on:keydown={(e) => handleKeyDown(e, index)}
        tabindex="0"
        role="button"
        aria-pressed={selectedIndex === index}
        aria-label={it.title}
      >
        <div class="art-preview" role="presentation">
          <div class="glow-effect"></div>
        </div>
        <div class="card-content">
          <h3 class="project-title">{it.title}</h3>
          <p class="project-summary">{it.summary}</p>
          {#if selectedIndex === index}
            <div class="expanded-info">
              <p class="category-badge">{it.tag}</p>
            </div>
          {/if}
        </div>
      </div>
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
    color: var(--ink);
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .projects-carousel {
    display: flex;
    gap: clamp(1.25rem, 3vw, 1.75rem);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 1rem 0 2rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  
  .projects-carousel::-webkit-scrollbar {
    height: 10px;
  }
  
  .projects-carousel::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
  }
  
  .projects-carousel::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
  
  .projects-carousel::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  .project-card {
    padding: 0;
    display: grid;
    grid-template-rows: minmax(200px, 28vh) auto;
    overflow: hidden;
    min-width: min(85vw, 380px);
    scroll-snap-align: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .project-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
  
  .project-card.selected {
    transform: scale(1.05);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
  }
  
  .project-card:focus {
    outline: 2px solid rgba(118, 133, 255, 0.6);
    outline-offset: 4px;
  }

  .art-preview {
    background: var(--card-bg);
    box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
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
    transition: opacity 0.3s ease;
  }
  
  .project-card:hover .art-preview::after {
    opacity: 0.7;
  }
  
  .glow-effect {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 70%
    );
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .project-card:hover .glow-effect {
    opacity: 1;
    transform: scale(1.2);
  }
  
  .project-card.selected .glow-effect {
    opacity: 1;
    transform: scale(1.3);
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.4);
      opacity: 1;
    }
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
    transition: color 0.3s ease;
  }
  
  .project-card:hover .project-summary {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .expanded-info {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .category-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(118, 133, 255, 0.2);
    border: 1px solid rgba(118, 133, 255, 0.4);
    border-radius: 12px;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (min-width: 640px) {
    .project-card {
      min-width: min(75vw, 420px);
    }
  }

  @media (min-width: 1024px) {
    .project-card {
      min-width: min(45vw, 480px);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .project-card,
    .glow-effect,
    .art-preview::after,
    .project-summary,
    .expanded-info {
      transition: none;
      animation: none;
    }
    
    .project-card:hover {
      transform: none;
    }
  }
</style>
