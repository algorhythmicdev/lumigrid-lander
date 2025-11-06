<script>
  export let filter = 'all';
  
  const items = [
    {
      title: 'Retail window rhythm',
      tag: 'retail',
      background: 'radial-gradient(120% 120% at 20% 30%, rgba(118,133,255,0.32), transparent 65%), linear-gradient(200deg, rgba(8,12,24,0.92), rgba(16,24,52,0.88))'
    },
    {
      title: 'Brand letter precision',
      tag: 'brand',
      background: 'radial-gradient(120% 120% at 70% 25%, rgba(255,140,190,0.4), transparent 60%), linear-gradient(210deg, rgba(15,18,36,0.92), rgba(28,36,66,0.9))'
    },
    {
      title: 'Outdoor facade choreography',
      tag: 'outdoor',
      background: 'radial-gradient(120% 120% at 35% 75%, rgba(255,205,135,0.42), transparent 65%), linear-gradient(200deg, rgba(12,18,34,0.95), rgba(8,10,22,0.9))'
    }
  ];

  const tagLine = {
    retail: 'Calm colour in the day; a gentle halo by evening.',
    brand: 'Logo letters stay clean white; halo only when you want attention.',
    outdoor: 'Façade runs line up so the whole wall moves as one.',
    default: 'Lighting that serves the message, not noise.'
  };

  // when receiving the event from CaseFilters:
  const onFilter = (e)=> filter = e.detail.active;
  
  $: filtered = filter === 'all' ? items : items.filter(it => it.tag === filter);
</script>

<section class="section container reveal" id="stories" on:change={onFilter}>
  <h2 class="under" style="font-size:var(--fs-h2)">Cases from installs</h2>
  <div class="slides">
    {#each filtered as it}
      <div class="slide grad-frame" role="group" aria-label={it.title} style={`--slide-bg:${it.background}`}>
        <div class="canvas" aria-hidden="true"></div>
        <div class="cap">
          <strong>{it.title}</strong>
          <span>{tagLine[it.tag] ?? tagLine.default}</span>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .slides { 
    display: flex; 
    gap: 1.5rem; 
    overflow-x: auto; 
    scroll-snap-type: x mandatory; 
    padding: 1rem 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  
  .slides::-webkit-scrollbar {
    height: 8px;
  }
  
  .slides::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  .slides::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  
  .slides::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  
  .slide { 
    scroll-snap-align: center; 
    min-width: min(92vw, 960px); 
    height: min(65vh, 560px); 
    position: relative;
    transition: transform 0.3s ease;
  }
  
  .slide:hover {
    transform: scale(1.02);
  }
  
  .canvas { 
    position: absolute; 
    inset: 0; 
    background: var(--slide-bg); 
    border-radius: 1rem; 
    box-shadow: 
      inset 0 0 80px rgba(0, 0, 0, 0.4),
      0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .slide .cap {
    position: absolute; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    padding: 1.5rem;
    display: flex; 
    flex-direction: column;
    gap: 0.75rem;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.75) 40%);
    color: #fff; 
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0 0 1rem 1rem;
  }
  
  .slide strong { 
    font-weight: 700;
    font-size: clamp(1.1rem, 2.2vw, 1.35rem);
    line-height: 1.3;
  }
  
  .slide span { 
    opacity: 0.95;
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    line-height: 1.6;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .slide:hover {
      transform: none;
    }
  }
  
  @media (max-width: 767px) {
    .slide .cap {
      padding: 1rem;
    }
  }
</style>
