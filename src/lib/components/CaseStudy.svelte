<script>
  import { base } from '$app/paths';
  export let title = 'Window display upgrade';
  export let client = 'Local Boutique';
  export let outcome = [
    { k: 'Install time', v: '↓ 35%' },
    { k: 'Power use', v: '↓ 22%' },
    { k: 'Passerby stop rate', v: '↑ 41%' }
  ];
  export let img = 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4';
</script>

<section class="section container card" aria-labelledby="cs-h">
  <h2 id="cs-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Case study</h2>
  <div class="grid grid-2" style="align-items:center">
    <img
      src={img}
      alt=""
      loading="lazy"
      style="width:100%;height:auto;border-radius:.8rem;object-fit:cover"
    />
    <div>
      <h3 style="margin:.25rem 0 0">{title}</h3>
      <p style="color:var(--muted);margin:.25rem 0">Client: {client}</p>
      <ul style="list-style:none; padding:0; margin:.5rem 0; display:grid; gap:.4rem">
        {#each outcome as o}
          <li class="card" style="padding:.6rem .8rem;display:flex;justify-content:space-between">
            <span>{o.k}</span><strong>{o.v}</strong>
          </li>
        {/each}
      </ul>
      <a class="btn" href={`${base}/contact#contact`}>Ask about this setup</a>
    </div>
  </div>
</section>
