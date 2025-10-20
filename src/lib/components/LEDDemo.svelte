<script>
  export let palette = 'rf';

  const palettes = {
    rf: {
      label: 'RF',
      gradient:
        'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)',
      accent: 'rgba(231,59,163,1)',
      glow: 'rgba(108,43,217,.65)',
      sheen: 'rgba(28,197,220,.6)',
      signageBg:
        'linear-gradient(135deg, rgba(231,59,163,.92) 0%, rgba(28,197,220,.88) 52%, rgba(108,43,217,.88) 100%)',
      signageOverlay:
        'radial-gradient(140% 120% at 12% 18%, rgba(255,209,102,.35) 0%, transparent 48%), radial-gradient(120% 140% at 82% 78%, rgba(28,197,220,.36) 0%, transparent 58%)',
      signageText: '#05060d',
      signageSecondary: 'rgba(255,255,255,.88)',
      signageBadge: 'rgba(255,255,255,.18)'
    },
    neon: {
      label: 'Neon',
      gradient:
        'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)',
      accent: 'rgba(0,229,255,1)',
      glow: 'rgba(0,191,255,.65)',
      sheen: 'rgba(119,247,203,.55)',
      signageBg:
        'linear-gradient(140deg, rgba(0,229,255,.92) 0%, rgba(119,247,203,.9) 48%, rgba(0,191,255,.88) 100%)',
      signageOverlay:
        'radial-gradient(140% 140% at 18% 16%, rgba(199,247,1,.38) 0%, transparent 52%), radial-gradient(120% 120% at 78% 84%, rgba(0,229,255,.34) 0%, transparent 60%)',
      signageText: '#021317',
      signageSecondary: 'rgba(255,255,255,.85)',
      signageBadge: 'rgba(255,255,255,.16)'
    },
    sunset: {
      label: 'Sunset',
      gradient:
        'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)',
      accent: 'rgba(255,162,76,1)',
      glow: 'rgba(255,123,123,.62)',
      sheen: 'rgba(255,214,231,.55)',
      signageBg:
        'linear-gradient(135deg, rgba(255,162,76,.95) 0%, rgba(255,123,123,.9) 50%, rgba(255,214,231,.88) 100%)',
      signageOverlay:
        'radial-gradient(140% 140% at 20% 20%, rgba(255,209,102,.4) 0%, transparent 52%), radial-gradient(120% 140% at 82% 80%, rgba(255,123,123,.32) 0%, transparent 58%)',
      signageText: '#32070f',
      signageSecondary: 'rgba(255,246,238,.88)',
      signageBadge: 'rgba(255,255,255,.2)'
    },
    mint: {
      label: 'Mint',
      gradient:
        'repeating-linear-gradient(90deg, rgba(159,255,215,.95) 0 6px, rgba(118,231,255,.95) 6px 12px, rgba(202,166,255,.95) 12px 18px, rgba(217,255,247,.95) 18px 24px)',
      accent: 'rgba(118,231,255,1)',
      glow: 'rgba(202,166,255,.62)',
      sheen: 'rgba(159,255,215,.58)',
      signageBg:
        'linear-gradient(135deg, rgba(118,231,255,.92) 0%, rgba(159,255,215,.9) 46%, rgba(202,166,255,.88) 100%)',
      signageOverlay:
        'radial-gradient(140% 140% at 18% 18%, rgba(217,255,247,.38) 0%, transparent 54%), radial-gradient(120% 120% at 78% 84%, rgba(202,166,255,.32) 0%, transparent 60%)',
      signageText: '#042126',
      signageSecondary: 'rgba(255,255,255,.88)',
      signageBadge: 'rgba(255,255,255,.18)'
    }
  };

  const effects = {
    ambient: {
      label: 'Drift',
      mood: 'Calm tide',
      badge: 'FX · Drift',
      eyebrow: 'Ambient drift FX',
      headline: 'Drifted halos ease the promenade.',
      sub: 'Wide sweeps ripple through Mythica Strand while the modules exhale softly.',
      stripSpeed: 'calc(var(--chase-speed, 2.6s) * 1.15)',
      stripDirection: 'normal',
      glowSpeed: 'calc(var(--chase-speed, 2.6s) * 1.3)',
      glowDirection: 'alternate',
      moduleSpeed: 'calc(var(--chase-speed, 2.6s) * 1.35)',
      moduleDirection: 'alternate',
      moduleGleamSpeed: 'calc(var(--chase-speed, 2.6s) * 1.6)',
      moduleGleamDirection: 'alternate',
      motifSpeed: 'calc(var(--chase-speed, 2.6s) * 1.45)',
      motifDirection: 'normal',
      motifOpacity: '.34',
      motifAltSpeed: 'calc(var(--chase-speed, 2.6s) * 1.85)',
      motifAltDirection: 'reverse',
      motifAltOpacity: '.28',
      burstScale: '1.08',
      burstOpacity: '.44',
      burstSpeed: 'calc(var(--chase-speed, 2.6s) * 1.5)',
      signagePanSpeed: 'calc(var(--chase-speed, 2.6s) * 2.15)',
      signagePanDirection: 'alternate',
      auraSpeed: 'calc(var(--chase-speed, 2.6s) * 1.9)',
      auraDirection: 'alternate'
    },
    surge: {
      label: 'Surge',
      mood: 'Arena burst',
      badge: 'FX · Surge',
      eyebrow: 'Arena burst FX',
      headline: 'Surging chases ignite the skyline.',
      sub: 'Tight bursts hammer the strip while the signage flashes promo beats for launches.',
      stripSpeed: 'calc(var(--chase-speed, 2.6s) * 0.75)',
      stripDirection: 'reverse',
      glowSpeed: 'calc(var(--chase-speed, 2.6s) * 0.9)',
      glowDirection: 'normal',
      moduleSpeed: 'calc(var(--chase-speed, 2.6s) * 0.85)',
      moduleDirection: 'normal',
      moduleGleamSpeed: 'calc(var(--chase-speed, 2.6s) * 1.05)',
      moduleGleamDirection: 'reverse',
      motifSpeed: 'calc(var(--chase-speed, 2.6s) * 1.1)',
      motifDirection: 'reverse',
      motifOpacity: '.42',
      motifAltSpeed: 'calc(var(--chase-speed, 2.6s) * 1.35)',
      motifAltDirection: 'normal',
      motifAltOpacity: '.34',
      burstScale: '1.18',
      burstOpacity: '.56',
      burstSpeed: 'calc(var(--chase-speed, 2.6s) * 1.25)',
      signagePanSpeed: 'calc(var(--chase-speed, 2.6s) * 1.7)',
      signagePanDirection: 'alternate-reverse',
      auraSpeed: 'calc(var(--chase-speed, 2.6s) * 1.35)',
      auraDirection: 'alternate'
    },
    cascade: {
      label: 'Cascade',
      mood: 'Skyfall shimmer',
      badge: 'FX · Cascade',
      eyebrow: 'Skyfall cascade FX',
      headline: 'Cascading beams pour over the plaza.',
      sub: 'Staggered descents flow from the modules into the Strand billboard in one sweep.',
      stripSpeed: 'calc(var(--chase-speed, 2.6s) * 1.05)',
      stripDirection: 'alternate',
      glowSpeed: 'calc(var(--chase-speed, 2.6s) * 1.2)',
      glowDirection: 'alternate-reverse',
      moduleSpeed: 'calc(var(--chase-speed, 2.6s) * 1.2)',
      moduleDirection: 'alternate-reverse',
      moduleGleamSpeed: 'calc(var(--chase-speed, 2.6s) * 1.5)',
      moduleGleamDirection: 'alternate',
      motifSpeed: 'calc(var(--chase-speed, 2.6s) * 1.55)',
      motifDirection: 'alternate',
      motifOpacity: '.38',
      motifAltSpeed: 'calc(var(--chase-speed, 2.6s) * 2.05)',
      motifAltDirection: 'alternate-reverse',
      motifAltOpacity: '.3',
      burstScale: '1.12',
      burstOpacity: '.5',
      burstSpeed: 'calc(var(--chase-speed, 2.6s) * 1.65)',
      signagePanSpeed: 'calc(var(--chase-speed, 2.6s) * 2.4)',
      signagePanDirection: 'alternate',
      auraSpeed: 'calc(var(--chase-speed, 2.6s) * 2.1)',
      auraDirection: 'alternate-reverse'
    }
  };

  const paletteKeys = Object.keys(palettes);
  const effectKeys = Object.keys(effects);

  let speed = 1.2;
  let effect = 'ambient';
  const sliderId = 'led-speed';

  const clampPalette = (value) => (paletteKeys.includes(value) ? value : 'rf');
  const clampEffect = (value) => (effectKeys.includes(value) ? value : 'ambient');

  const setPalette = (value) => {
    palette = clampPalette(value);
  };

  const setEffect = (value) => {
    effect = clampEffect(value);
  };

  $: palette = clampPalette(palette);
  $: effect = clampEffect(effect);

  const describeSpeed = (value) => {
    if (value <= 0.8) return 'Slow drift';
    if (value >= 2.4) return 'Rapid chase';
    return 'Smooth flow';
  };

  $: activePalette = palettes[palette];
  $: activeEffect = effects[effect];
  $: animationSpeed = `${(3 / Number(speed || 1)).toFixed(2)}s`;
  $: speedLabel = describeSpeed(speed);
</script>

<div
  class="glass led-demo"
  data-effect={effect}
  style={`--led-grad:${activePalette.gradient}; --led-accent:${activePalette.accent}; --led-glow:${activePalette.glow}; --led-sheen:${activePalette.sheen}; --signage-bg:${activePalette.signageBg}; --signage-overlay:${activePalette.signageOverlay}; --signage-text:${activePalette.signageText}; --signage-secondary:${activePalette.signageSecondary}; --signage-badge:${activePalette.signageBadge}; --chase-speed:${animationSpeed}; --strip-speed:${activeEffect.stripSpeed}; --strip-direction:${activeEffect.stripDirection}; --glow-speed:${activeEffect.glowSpeed}; --glow-direction:${activeEffect.glowDirection}; --module-speed:${activeEffect.moduleSpeed}; --module-direction:${activeEffect.moduleDirection}; --module-gleam-speed:${activeEffect.moduleGleamSpeed}; --module-gleam-direction:${activeEffect.moduleGleamDirection}; --motif-speed:${activeEffect.motifSpeed}; --motif-direction:${activeEffect.motifDirection}; --motif-opacity:${activeEffect.motifOpacity}; --motif-alt-speed:${activeEffect.motifAltSpeed}; --motif-alt-direction:${activeEffect.motifAltDirection}; --motif-alt-opacity:${activeEffect.motifAltOpacity}; --burst-scale:${activeEffect.burstScale}; --burst-opacity:${activeEffect.burstOpacity}; --burst-speed:${activeEffect.burstSpeed}; --signage-pan-speed:${activeEffect.signagePanSpeed}; --signage-pan-direction:${activeEffect.signagePanDirection}; --aura-speed:${activeEffect.auraSpeed}; --aura-direction:${activeEffect.auraDirection};`}
>
  <div class="led-preview" aria-hidden="true">
    <div class="preview-strip">
      <span class="strip-core"></span>
      <span class="strip-glow"></span>
    </div>

    <div class="preview-modules" role="presentation">
      {#each Array(10) as _, index (index)}
        <span class="module" style={`--delay:${index * 0.12}s`}></span>
      {/each}
    </div>

    <div class="preview-signage" role="presentation">
      <header class="signage-header">
        <span class="signage-brand">Mythica&nbsp;Strand</span>
        <span class="signage-sync" aria-label={`Palette ${activePalette.label} in sync`}>SYNCED</span>
      </header>
      <div class="signage-screen">
        <div class="signage-canvas">
          <span class="signage-motif" aria-hidden="true"></span>
          <span class="signage-motif motif-alt" aria-hidden="true"></span>
          <span class="signage-burst" aria-hidden="true"></span>
          <div class="signage-copy">
            <p class="signage-eyebrow">{activeEffect.eyebrow}</p>
            <p class="signage-headline">{activeEffect.headline}</p>
            <p class="signage-sub">{activeEffect.sub}</p>
          </div>
        </div>
      </div>
      <footer class="signage-footer">
        <span class="signage-pill strong">{activeEffect.badge}</span>
        <span class="signage-pill">Palette · {activePalette.label}</span>
        <span class="signage-pill">Speed · {speedLabel}</span>
      </footer>
    </div>
  </div>

  <div class="led-demo__controls">
    <fieldset class="palette-group">
      <legend class="sr-only">Palette</legend>
      <div class="palette-buttons">
        {#each paletteKeys as key}
          <button
            type="button"
            class={`btn ghost ${palette === key ? 'is-active' : ''}`}
            on:click={() => setPalette(key)}
            aria-pressed={palette === key}
          >
            {palettes[key].label}
          </button>
        {/each}
      </div>
    </fieldset>

    <fieldset class="effect-group">
      <legend class="sr-only">Effect</legend>
      <div class="effect-buttons">
        {#each effectKeys as key}
          <button
            type="button"
            class={`effect-btn ${effect === key ? 'is-active' : ''}`}
            on:click={() => setEffect(key)}
            aria-pressed={effect === key}
          >
            <span class="effect-label">{effects[key].label}</span>
            <span class="effect-mood">{effects[key].mood}</span>
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

  <p class="lead led-demo__note">
    One strip, one halo of modules, and the Mythica Strand signage stay locked together — swap FX modes to
    watch the story shift.
  </p>
</div>
