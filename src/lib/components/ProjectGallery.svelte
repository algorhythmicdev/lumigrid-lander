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
  <h2 id="gallery">Project gallery</h2>
  <div class="grid grid-3">
    {#each filtered as it}
      <article class="card gallery-card" style={`--card-bg:${it.background}`}>
        <div class="art" role="presentation"></div>
        <p class="title">{it.title}</p>
        <p class="summary">{it.summary}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  .gallery-card {
    padding: 0;
    display: grid;
    grid-template-rows: 180px auto auto;
    gap: .6rem;
  }
  .art {
    border-radius: .5rem .5rem 0 0;
    background: var(--card-bg);
    box-shadow: inset 0 0 45px rgba(0,0,0,0.25);
  }
  .title {
    font-weight: 600;
    text-transform: capitalize;
    padding: 0 1rem;
  }
  .summary {
    padding: 0 1rem 1rem;
    color: var(--muted);
  }
</style>
