<script>
  import { base } from '$app/paths';
  let pairs = [];
  const modules = import.meta.glob('/static/assets/before-after/*');

  const items = {};
  for (const path in modules) {
    const url = base + path.replace('/static', '');
    const slug = url.split('/').pop().split('-')[0];
    if (!items[slug]) items[slug] = {};
    if (path.includes('-before.')) items[slug].before = url;
    if (path.includes('-after.')) items[slug].after = url;
  }
  pairs = Object.values(items).filter(p => p.before && p.after);

  let active = null;
  let pct = 50;
  let drag = false;

  function handlePointerDown(event) {
    drag = true;
    const r = event.currentTarget.getBoundingClientRect();
    pct = Math.max(0, Math.min(100, 100 * (event.clientX - r.left) / r.width));
  }
</script>

<section class="container section" data-hue="220">
  <h2 id="before-after">Before / After</h2>
  <div class="grid grid-2">
    {#each pairs as p}
      <div class="card" on:pointerenter={() => active = p} on:pointerleave={() => active = null}>
        <div class="preview">
          <img src={p.before} alt="Before" />
          <div class="after" style:clip-path="inset(0 {100-pct}% 0 0)">
            <img src={p.after} alt="After" />
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if active}
    <div class="lightbox" on:pointerdown={()=>drag=true} on:pointerup={()=>drag=false} on:pointerleave={()=>drag=false} on:pointermove={(e)=>{ if(!drag) return; const r=e.currentTarget.getBoundingClientRect(); pct=Math.max(0,Math.min(100, 100*(e.clientX-r.left)/r.width)); }}>
      <div class="preview">
        <img src={active.before} alt="Before" />
        <div class="after" style:clip-path="inset(0 {100-pct}% 0 0)">
          <img src={active.after} alt="After" />
        </div>
        <div class="slider" style:left="{pct}%" on:pointerdown|stopPropagation={handlePointerDown}></div>
      </div>
      <button on:click={() => active = null}>Close</button>
    </div>
  {/if}
</section>

<style>
  .preview { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: .5rem; }
  .preview img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .after { position: absolute; inset: 0; }
  .slider { position: absolute; top: 0; bottom: 0; width: 4px; background: rgba(255,255,255,.5); cursor: ew-resize; transform: translateX(-2px); backdrop-filter: blur(2px); }
  .lightbox { position: fixed; inset: 0; background: rgba(11, 17, 32, 0.8); backdrop-filter: blur(20px); z-index: 100; display: grid; place-content: center; gap: 1rem; }
</style>
