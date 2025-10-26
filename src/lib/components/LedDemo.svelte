<script>
  let palette='rf'; let speed=1;
  const palettes={
    rf:'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)',
    neon:'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)',
    sunset:'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)',
    mint:'repeating-linear-gradient(90deg, rgba(159,255,215,.95) 0 6px, rgba(118,231,255,.95) 6px 12px, rgba(202,166,255,.95) 12px 18px, rgba(217,255,247,.95) 18px 24px)'
  };
  $: dur = `${8/Math.max(0.5,Math.min(3,speed))}s`;
</script>

<section class="section container card" id="examples" aria-labelledby="ex-h">
  <h2 id="ex-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">LED examples</h2>
  <div class="grid grid-2" style="align-items:center">
    <div>
      <div class="strip" style="--speed:{dur}"><i style="background:{palettes[palette]}"></i></div>
      <div class="strip" style="--speed:{dur};margin:.5rem 0"><i style="background:{palettes[palette]}"></i></div>
      <div class="strip" style="--speed:{dur}"><i style="background:{palettes[palette]}"></i></div>
    </div>
    <div>
      <div class="chips" role="radiogroup" aria-label="Palette">
        {#each Object.keys(palettes) as key}
          <button
            type="button"
            class="chip"
            role="radio"
            aria-checked={palette===key}
            on:click={()=>palette=key}
          >
            {key}
          </button>
        {/each}
      </div>
      <div style="margin-top:.75rem">
        <label for="spd">Speed</label>
        <input id="spd" type="range" min="0.5" max="3" step="0.1" bind:value={speed} />
      </div>
    </div>
  </div>
</section>
