<script>
  // Expect filenames like: retail-shop-window-01.jpg, brand-letters-02.webp, outdoor-façade-01.avif
  const mods = import.meta.glob('/static/assets/gallery/*.{jpg,jpeg,png,webp,avif}', { eager:true, as:'url' });
  const items = Object.entries(mods).map(([p,url])=>{
    const name = (p.split('/').pop()||'').replace(/\.[^.]+$/,'');
    const tag = /^(retail|brand|outdoor)/i.test(name) ? name.split('-')[0] : 'misc';
    const title = name.replace(/[-_]/g,' ').replace(/\b\w/g, m=>m.toUpperCase());
    return { url, tag, title };
  });
  const groups = ['retail','brand','outdoor','misc'].map(t => ({ tag: t, items: items.filter(i=>i.tag===t) }));
</script>

<section class="section container reveal" id="examples">
  <h2 class="under" style="font-size:var(--fs-h2)">Where it shines</h2>

  {#each groups as g}
    {#if g.items.length}
      <h3 style="margin:.6rem 0 .4rem; color:var(--muted)">{g.tag.replace(/^./,c=>c.toUpperCase())}</h3>
      <div class="rail">
        {#each g.items as it}
          <figure class="card tile" data-halo="2" style="padding:0;overflow:hidden">
            <img src={it.url} alt="" loading="lazy"
                 width="1200" height="800"
                 style="display:block;width:100%;height:220px;object-fit:cover;filter:contrast(1.06) saturate(1.05)"/>
            <figcaption class="cap">{it.title}</figcaption>
          </figure>
        {/each}
      </div>
    {/if}
  {/each}
</section>

<style>
  .rail{ display:flex; gap:1rem; overflow:auto; scroll-snap-type:x mandatory; padding:.4rem 0 }
  .tile{ min-width:min(75vw,320px); scroll-snap-align:start; position:relative }
  .cap{ position:absolute; left:0; right:0; bottom:0; padding:.5rem .7rem; color:#fff;
        background:linear-gradient(180deg,transparent,rgba(0,0,0,.45)) }
</style>
