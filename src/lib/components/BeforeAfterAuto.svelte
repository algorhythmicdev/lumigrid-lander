<script>
  const pairs = [
    {
      name: 'Retail frontage',
      before: {
        caption: 'Before: harsh tubes and glare',
        background: 'linear-gradient(200deg, rgba(12,16,28,0.95), rgba(8,12,24,0.9)), radial-gradient(140% 140% at 80% 20%, rgba(120,136,255,0.38), transparent 60%)'
      },
      after: {
        caption: 'After: diffused halo with focus zones',
        background: 'linear-gradient(200deg, rgba(11,15,26,0.96), rgba(8,12,22,0.92)), radial-gradient(140% 140% at 20% 70%, rgba(255,188,120,0.4), transparent 55%)'
      }
    },
    {
      name: 'Logo letter set',
      before: {
        caption: 'Before: uneven colour mix',
        background: 'linear-gradient(210deg, rgba(16,20,34,0.95), rgba(12,16,26,0.9)), radial-gradient(140% 140% at 30% 25%, rgba(255,120,170,0.3), transparent 55%)'
      },
      after: {
        caption: 'After: tuned edge glow',
        background: 'linear-gradient(210deg, rgba(11,16,30,0.96), rgba(9,12,24,0.9)), radial-gradient(140% 140% at 70% 65%, rgba(110,220,255,0.36), transparent 55%)'
      }
    },
    {
      name: 'Outdoor canopy',
      before: {
        caption: 'Before: hotspots on acrylic',
        background: 'linear-gradient(220deg, rgba(14,18,28,0.95), rgba(9,12,20,0.9)), radial-gradient(150% 150% at 50% 30%, rgba(120,180,255,0.28), transparent 60%)'
      },
      after: {
        caption: 'After: even wash with amber cue',
        background: 'linear-gradient(220deg, rgba(11,16,26,0.95), rgba(8,12,20,0.9)), radial-gradient(150% 150% at 40% 70%, rgba(255,200,130,0.4), transparent 55%)'
      }
    }
  ];

  let active = null;
  let pct = 50;
  let drag = false;

  function updatePct(event, element = event.currentTarget) {
    const rect = element.getBoundingClientRect();
    pct = Math.max(0, Math.min(100, 100 * (event.clientX - rect.left) / rect.width));
  }
</script>

<section class="container section" data-hue="220">
  <h2 id="before-after">Before / After</h2>
  <div class="grid grid-2">
    {#each pairs as p}
      <div class="card" on:pointerenter={() => active = p} on:pointerleave={() => active = null}>
        <div class="preview" role="img" aria-label={`${p.name} lighting comparison`}>
          <div class="frame" style={`background:${p.before.background}`}>
            <span>{p.before.caption}</span>
          </div>
          <div class="frame after" style={`background:${p.after.background}; clip-path:inset(0 ${100-pct}% 0 0)`}>
            <span>{p.after.caption}</span>
          </div>
        </div>
        <p class="label">{p.name}</p>
      </div>
    {/each}
  </div>

  {#if active}
    <div class="lightbox">
      <div
        class="preview large"
        role="img"
        aria-label={`${active.name} detailed lighting comparison`}
        on:pointerdown={(e) => { drag = true; updatePct(e, e.currentTarget); }}
        on:pointerup={() => drag = false}
        on:pointerleave={() => drag = false}
        on:pointermove={(e) => { if (!drag) return; updatePct(e, e.currentTarget); }}
      >
        <div class="frame" style={`background:${active.before.background}`}>
          <span>{active.before.caption}</span>
        </div>
        <div class="frame after" style={`background:${active.after.background}; clip-path:inset(0 ${100-pct}% 0 0)`}>
          <span>{active.after.caption}</span>
        </div>
        <div class="slider" style={`left:${pct}%`} on:pointerdown|stopPropagation={(e) => { drag = true; updatePct(e, e.currentTarget.parentElement); }}></div>
      </div>
      <button on:click={() => active = null} class="btn">Close</button>
    </div>
  {/if}
</section>

<style>
  .preview { position: relative; width: 100%; height: 220px; border-radius: .8rem; overflow: hidden; }
  .preview.large { height: min(70vh, 520px); width: min(90vw, 960px); }
  .frame {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    background-size: cover;
    background-position: center;
    color: rgba(255,255,255,0.92);
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  .frame span { font-weight: 600; max-width: 18ch; }
  .after { pointer-events: none; transition: clip-path .25s var(--ease-out); }
  .label { margin-top: .6rem; font-weight: 600; }
  .slider { position: absolute; top: 0; bottom: 0; width: 4px; background: rgba(255,255,255,.5); cursor: ew-resize; transform: translateX(-2px); backdrop-filter: blur(2px); }
  .lightbox { position: fixed; inset: 0; background: rgba(11, 17, 32, 0.8); backdrop-filter: blur(20px); z-index: 100; display: grid; place-content: center; gap: 1rem; padding: 1rem; }
</style>
