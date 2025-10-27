<script>
  import { base } from '$app/paths';
  // Auto-discover images from the gallery folder
  const modules = import.meta.glob('/static/assets/gallery/*');
  let items = [];
  for (const path in modules) {
    const url = base + path.replace('/static', '');
    const title = url.split('/').pop().split('.').slice(0, -1).join('.').replace(/-/g, ' ');
    items.push({ url, title });
  }
</script>

<section class="container section" data-hue="260">
  <h2 id="gallery">Project gallery</h2>
  <div class="grid grid-3">
    {#each items as it}
      <a href={it.url} class="card" target="_blank" rel="noopener noreferrer">
        <img src={it.url} alt={it.title} style="display:block;width:100%;height:220px;object-fit:cover;filter:contrast(1.06) saturate(1.05)"/>
        <p style="margin:.5rem 0 0;font-weight:600;text-transform:capitalize;">{it.title}</p>
      </a>
    {/each}
  </div>
</section>
