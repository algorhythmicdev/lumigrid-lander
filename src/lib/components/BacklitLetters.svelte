<script>
  export let word = 'SIGN';
  export let mode = 'white'; // 'white' | 'neon' | 'blend'
</script>

<section class="section container card" id="letters" aria-labelledby="letters-h">
  <h2 id="letters-h" style="font-size:var(--fs-h2)">Backlit letters</h2>
  <p style="margin:0 0 .75rem;color:var(--muted)">See how clean white, neon colour, and a blended halo change the face.</p>
  <div class="letters-wrap" class:neon={mode === 'neon'} class:blend={mode === 'blend'}>
    <div class="letters-glow" aria-hidden="true"></div>
    <svg viewBox="0 0 1000 260" width="100%" height="auto" style="display:block">
      <defs>
        <filter id="face" x="-20%" y="-60%" width="140%" height="200%">
          <feSpecularLighting result="spec" specularExponent="12" lighting-color="white">
            <fePointLight x="500" y="-300" z="300" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" />
          <feGaussianBlur stdDeviation="1.2" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient id="neon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--a)" />
          <stop offset="100%" stop-color="var(--c)" />
        </linearGradient>
      </defs>

      <g filter="url(#face)">
        <text
          x="50%"
          y="65%"
          text-anchor="middle"
          font-family="Montserrat, system-ui, sans-serif"
          font-weight="800"
          font-size="180"
          fill={mode === 'neon' ? 'url(#neon)' : mode === 'blend' ? 'url(#neon)' : '#ffffff'}
        >
          {word}
        </text>
      </g>
    </svg>
  </div>

  <div class="chips" role="radiogroup" aria-label="Letter lighting" style="margin-top:.75rem">
    <button
      type="button"
      class="chip"
      role="radio"
      aria-checked={mode === 'white'}
      on:click={() => (mode = 'white')}
    >
      Clean white
    </button>
    <button
      type="button"
      class="chip"
      role="radio"
      aria-checked={mode === 'neon'}
      on:click={() => (mode = 'neon')}
    >
      Neon colour
    </button>
    <button
      type="button"
      class="chip"
      role="radio"
      aria-checked={mode === 'blend'}
      on:click={() => (mode = 'blend')}
    >
      Blend
    </button>
  </div>
</section>

<style>
  .letters-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: radial-gradient(140% 120% at 50% 50%, rgba(255, 255, 255, 0.08) 0 40%, rgba(7, 17, 29, 0.8) 75%);
  }
  .letters-glow {
    position: absolute;
    inset: 0;
    filter: blur(var(--halo));
    pointer-events: none;
    opacity: 0.85;
    background:
      radial-gradient(100% 140% at 40% 45%, color-mix(in oklab, var(--a) 60%, transparent) 0 40%, transparent 62%),
      radial-gradient(120% 150% at 60% 55%, color-mix(in oklab, var(--c) 50%, transparent) 0 36%, transparent 64%);
  }
  .letters-wrap.neon .letters-glow {
    background:
      radial-gradient(100% 160% at 40% 45%, color-mix(in oklab, var(--a) 75%, transparent) 0 38%, transparent 64%),
      radial-gradient(120% 150% at 60% 55%, color-mix(in oklab, var(--c) 70%, transparent) 0 34%, transparent 60%);
  }
  .letters-wrap.blend .letters-glow {
    background:
      radial-gradient(120% 140% at 42% 46%, color-mix(in oklab, var(--a) 65%, transparent) 0 36%, transparent 64%),
      radial-gradient(120% 140% at 58% 54%, color-mix(in oklab, var(--c) 65%, transparent) 0 34%, transparent 60%),
      radial-gradient(140% 160% at 50% 80%, color-mix(in oklab, var(--warm) 55%, transparent) 0 18%, transparent 65%);
  }
</style>
