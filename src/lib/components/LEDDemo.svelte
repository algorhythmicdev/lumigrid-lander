<script>
  export let palette = 'rf';
  const palettes = {
    rf: 'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)',
    neon: 'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)',
    sunset: 'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)',
    mint: 'repeating-linear-gradient(90deg, rgba(159,255,215,.95) 0 6px, rgba(118,231,255,.95) 6px 12px, rgba(202,166,255,.95) 12px 18px, rgba(217,255,247,.95) 18px 24px)'
  };
  let speed = 1;
  function setPal(p){ palette = p; }
</script>
<div class="glass" style="padding:1rem;">
  <div class="strip" style="--led-grad:{palettes[palette]}"></div>
  <div class="strip" style="--led-grad:{palettes[palette]}"></div>
  <div class="strip" style="--led-grad:{palettes[palette]}"></div>
  <div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap;">
    <button class="btn ghost" on:click={() => setPal('rf')}>RF</button>
    <button class="btn ghost" on:click={() => setPal('neon')}>Neon</button>
    <button class="btn ghost" on:click={() => setPal('sunset')}>Sunset</button>
    <button class="btn ghost" on:click={() => setPal('mint')}>Mint</button>
  </div>
  <div style="margin-top:.75rem;">
    <label>Speed
      <input type="range" min="0.5" max="3" step="0.1" bind:value={speed} on:input={() => document.querySelectorAll('.strip').forEach(s => s.style.setProperty('--speed', `${3/Number(speed)}s`))}/>
    </label>
  </div>
  <p class="lead" style="margin-top:.5rem;">Preview different palettes and speed. All zones stay perfectly in step.</p>
</div>
