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
  .slides{ display:flex; gap:1rem; overflow:auto; scroll-snap-type:x mandatory; padding:.5rem 0 }
  .slide{ scroll-snap-align:center; min-width:min(92vw,960px); height:min(60vh,520px); position:relative; }
  .canvas{ position:absolute; inset:0; background:var(--slide-bg); border-radius:.8rem; box-shadow: inset 0 0 60px rgba(0,0,0,.35); }
  .slide .cap{
    position:absolute; left:0; right:0; bottom:0; padding:.8rem 1rem;
    display:flex; justify-content:space-between; gap:.6rem; flex-wrap:wrap;
    background:linear-gradient(180deg, transparent, rgba(0,0,0,.55));
    color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.4);
    border-radius:0 0 .8rem .8rem;
  }
  .slide strong{ font-weight:700 }
  .slide span{ opacity:.9 }
</style>
