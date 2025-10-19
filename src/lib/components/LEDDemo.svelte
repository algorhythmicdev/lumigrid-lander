<script>
  export let palette = 'rf';

  const palettes = {
    rf: {
      label: 'RF',
      gradient:
        'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)'
    },
    neon: {
      label: 'Neon',
      gradient:
        'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)'
    },
    sunset: {
      label: 'Sunset',
      gradient:
        'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)'
    },
    mint: {
      label: 'Mint',
      gradient:
        'repeating-linear-gradient(90deg, rgba(159,255,215,.95) 0 6px, rgba(118,231,255,.95) 6px 12px, rgba(202,166,255,.95) 12px 18px, rgba(217,255,247,.95) 18px 24px)'
    }
  };

  const paletteKeys = Object.keys(palettes);

  let speed = 1;
  const sliderId = 'led-speed';

  const clampPalette = (value) => (paletteKeys.includes(value) ? value : 'rf');
  const setPalette = (value) => {
    palette = clampPalette(value);
  };

  $: palette = clampPalette(palette);

  const describeSpeed = (value) => {
    if (value <= 0.8) return 'Slow drift';
    if (value >= 2.4) return 'Rapid chase';
    return 'Smooth flow';
  };

  $: activePalette = palettes[palette];
  $: animationSpeed = `${(3 / Number(speed || 1)).toFixed(2)}s`;
  $: speedLabel = describeSpeed(speed);
</script>

<div class="glass led-demo">
  {#each Array(3) as _, index (index)}
    <div
      class="led-strip"
      style={`--led-grad:${activePalette.gradient}; --speed:${animationSpeed};`}
      aria-hidden="true"
      data-index={index}
    ></div>
  {/each}

  <div class="led-demo__controls">
    <fieldset class="palette-group">
      <legend class="sr-only">Palette</legend>
      <div class="palette-buttons">
        {#each paletteKeys as key}
          <button
            type="button"
            class="btn ghost"
            on:click={() => setPalette(key)}
            aria-pressed={palette === key}
          >
            {palettes[key].label}
          </button>
        {/each}
      </div>
    </fieldset>

    <div class="speed-control">
      <label class="speed-label" for={sliderId}>Playback speed</label>
      <input
        id={sliderId}
        type="range"
        min="0.5"
        max="3"
        step="0.1"
        bind:value={speed}
        aria-valuetext={speedLabel}
        aria-describedby={`${sliderId}-hint`}
      />
      <div class="speed-hint" id={`${sliderId}-hint`}>{speedLabel}</div>
    </div>
  </div>

  <p class="lead led-demo__note">Preview different palettes and pacing. Every zone stays in sync.</p>
</div>
