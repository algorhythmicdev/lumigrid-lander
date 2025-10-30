<script>
  const palette = {
    retail: 'radial-gradient(140% 140% at 25% 25%, rgba(90, 125, 255, 0.38), transparent 60%), linear-gradient(200deg, rgba(9, 14, 28, 0.92), rgba(12, 18, 36, 0.88))',
    brand: 'radial-gradient(130% 130% at 70% 25%, rgba(255, 120, 180, 0.4), transparent 60%), linear-gradient(210deg, rgba(16, 18, 32, 0.94), rgba(24, 28, 48, 0.9))',
    outdoor: 'radial-gradient(130% 130% at 35% 70%, rgba(255, 210, 140, 0.42), transparent 60%), linear-gradient(220deg, rgba(10, 16, 30, 0.95), rgba(7, 10, 22, 0.9))',
    misc: 'radial-gradient(130% 130% at 50% 50%, rgba(130, 233, 255, 0.35), transparent 60%), linear-gradient(220deg, rgba(9, 14, 28, 0.94), rgba(6, 12, 24, 0.9))'
  };

  const scenarios = [
    { tag: 'retail', title: 'Window reveal loop', description: 'Timed fades highlight new arrivals with a low-power base glow.' },
    { tag: 'retail', title: 'Shelf runner pulse', description: 'Soft ripples chase attention without overpowering the products.' },
    { tag: 'brand', title: 'Logo halo', description: 'Edge-only colour for daytime clarity, full halo for evening draw.' },
    { tag: 'brand', title: 'Reception desk wash', description: 'A glass desk lit with a duotone gradient reacting to daylight.' },
    { tag: 'outdoor', title: 'Façade cascade', description: 'Sections stay synchronised across long cable runs and corners.' },
    { tag: 'misc', title: 'Experience tunnel', description: 'Immersive entrance with motion-sensitive gradients and sparkles.' }
  ];

  const groups = ['retail','brand','outdoor','misc'].map(tag => ({
    tag,
    items: scenarios.filter(item => item.tag === tag)
  }));
</script>

<section class="section container reveal" id="examples">
  <h2 class="under" style="font-size:var(--fs-h2)">Where it shines</h2>

  {#each groups as g}
    {#if g.items.length}
      <h3 style="margin:.6rem 0 .4rem; color:var(--muted)">{g.tag.replace(/^./,c=>c.toUpperCase())}</h3>
      <div class="rail">
        {#each g.items as it}
          <figure class="card tile" data-halo="2" style={`--tile-bg:${palette[it.tag]}`}> 
            <div class="art" aria-hidden="true"></div>
            <figcaption class="cap">
              <strong>{it.title}</strong>
              <span>{it.description}</span>
            </figcaption>
          </figure>
        {/each}
      </div>
    {/if}
  {/each}
</section>

<style>
  .rail{ display:flex; gap:1rem; overflow:auto; scroll-snap-type:x mandatory; padding:.4rem 0 }
  .tile{ min-width:min(75vw,320px); scroll-snap-align:start; position:relative; padding:0; }
  .art{ height:220px; background:var(--tile-bg); border-radius:.6rem .6rem 0 0; box-shadow: inset 0 0 40px rgba(0,0,0,.3); }
  .cap{ display:flex; flex-direction:column; gap:.3rem; padding:.6rem .8rem 1rem; color:var(--muted); }
  .cap strong{ color:var(--ink); font-weight:600; }
</style>
