<script>
  const press = import.meta.glob('/static/assets/press/*.{png,svg,webp,pdf}', { eager:true, as:'url' });
  const downloads = import.meta.glob('/static/assets/downloads/*.{pdf,zip}', { eager:true, as:'url' });
  const pl = Object.entries(press).map(([p,url])=>({name:p.split('/').pop(), url}));
  const dl = Object.entries(downloads).map(([p,url])=>({name:p.split('/').pop(), url}));
</script>

<section class="section container reveal" id="press">
  <h2 class="under" style="font-size:var(--fs-h2)">Press & downloads</h2>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem; margin-top:.6rem">
    <article class="card grad-frame" style="padding:1rem">
      <h3>Logo pack</h3>
      <ul style="list-style:none;padding:0;margin:.6rem 0 0;display:grid;gap:.4rem">
        {#each pl as f}<li><a class="btn" href={f.url} download>{f.name}</a></li>{/each}
      </ul>
    </article>
    <article class="card grad-frame" style="padding:1rem">
      <h3>Product sheet</h3>
      <ul style="list-style:none;padding:0;margin:.6rem 0 0;display:grid;gap:.4rem">
        {#each dl as f}<li><a class="btn" href={f.url} download>{f.name}</a></li>{/each}
      </ul>
    </article>
  </div>
</section>
