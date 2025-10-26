<script>
  let palette = 'rf';
  let speed = 1;

  const pal = {
    rf:
      'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)',
    neon:
      'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)',
    sunset:
      'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)'
  };

  $: speedValue = Number(speed) || 1;
  $: dur = `${8 / Math.max(0.5, Math.min(3, speedValue))}s`;
</script>

<section class="section container card" aria-labelledby="wall-h">
  <h2 id="wall-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">LED strip wall</h2>
  <div class="wall">
    {#each [0, 1, 2, 3, 4] as i}
      <div class="strip" style="--speed:{dur}; margin:{i ? '.6rem 0 0' : 0}">
        <i style="background:{pal[palette]}"></i>
      </div>
    {/each}
  </div>

  <div class="chips" role="radiogroup" aria-label="Palette" style="margin-top:.75rem">
    {#each Object.keys(pal) as k}
      <button
        type="button"
        class="chip"
        role="radio"
        aria-checked={palette === k}
        on:click={() => (palette = k)}
      >
        {k}
      </button>
    {/each}
  </div>
  <div style="margin-top:.75rem">
    <label>
      Speed
      <input type="range" min="0.5" max="3" step="0.1" bind:value={speed} />
    </label>
  </div>
  <div class="chips" aria-label="Presets" style="margin-top:.5rem">
    <button type="button" class="chip" on:click={() => {
      palette = 'rf';
      speed = 0.8;
    }}>Calm</button>
    <button type="button" class="chip" on:click={() => {
      palette = 'rf';
      speed = 1;
    }}>Clean</button>
    <button type="button" class="chip" on:click={() => {
      palette = 'sunset';
      speed = 1.4;
    }}>Halo</button>
  </div>
</section>

<style>
  .wall {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  input[type='range'] {
    accent-color: var(--warm);
  }
</style>
