<script>
  // Pull assets from static/assets/gallery/*
  const mods = import.meta.glob('/static/assets/gallery/*.{jpg,jpeg,png,webp,avif}', { eager:true, as:'url' });
  const items = Object.entries(mods).map(([p,url])=>{
    const file = (p.split('/').pop()||'').replace(/\.[^.]+$/,'');
    // infer a tag from filename prefix: retail-, brand-, outdoor-
    const tag = /^(retail|brand|outdoor)/i.test(file) ? file.split('-')[0] : 'default';
    const title = file.replace(/[-_]/g,' ').replace(/\b\w/g,m=>m.toUpperCase());
    return { url, tag, title };
  });

  // one-liners per tag (plain language)
  const tagLine = {
    retail:  'Calm colour in the day; a gentle halo by evening.',
    brand:   'Logo letters stay clean white; halo only when you want attention.',
    outdoor: 'Façade runs line up so the whole wall moves as one.',
    default:   'Lighting that serves the message, not noise.'
  };
</script>

<section class="section container reveal" id="cases">
  <h2 class="under" style="font-size:var(--fs-h2)">Cases from installs</h2>
  <div class="slides">
    {#each items as it}
      <figure class="slide grad-frame" tabindex="0" aria-label={it.title}>
        <img src={it.url} alt="" loading="lazy" width="1600" height="1000"
             style="display:block;width:100%;height:100%;object-fit:cover"/>
        <figcaption class="cap">
          <strong>{it.title}</strong>
          <span>{tagLine[it.tag] ?? tagLine.default}</span>
        </figcaption>
      </figure>
    {/each}
  </div>
</section>

<style>
  .slides{ display:flex; gap:1rem; overflow:auto; scroll-snap-type:x mandatory; padding:.5rem 0 }
  .slide{ scroll-snap-align:center; min-width:min(92vw,960px); height:min(60vh,520px); position:relative; }
  .slide .cap{
    position:absolute; left:0; right:0; bottom:0; padding:.8rem 1rem;
    display:flex; justify-content:space-between; gap:.6rem; flex-wrap:wrap;
    background:linear-gradient(180deg, transparent, rgba(0,0,0,.55));
    color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.4);
  }
  .slide strong{ font-weight:700 }
  .slide span{ opacity:.9 }
</style>
