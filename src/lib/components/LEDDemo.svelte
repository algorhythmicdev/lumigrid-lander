<script>
  export let palette = 'rf';

  const palettes = {
    rf: {
      label: 'RF',
      gradient:
        'repeating-linear-gradient(90deg, color-mix(in oklab, var(--c) 92%, transparent) 0 6px, color-mix(in oklab, var(--a) 92%, transparent) 6px 12px, color-mix(in oklab, var(--b) 88%, transparent) 12px 18px, color-mix(in oklab, var(--warm) 92%, transparent) 18px 24px)',
      accent: 'color-mix(in oklab, var(--a) 90%, transparent)',
      glow: 'color-mix(in oklab, var(--b) 70%, transparent)',
      sheen: 'color-mix(in oklab, var(--c) 68%, transparent)',
      signageBg:
        'linear-gradient(135deg, color-mix(in oklab, var(--a) 90%, transparent) 0%, color-mix(in oklab, var(--c) 88%, transparent) 52%, color-mix(in oklab, var(--b) 85%, transparent) 100%)',
      signageOverlay:
        'radial-gradient(140% 120% at 12% 18%, color-mix(in oklab, var(--warm) 45%, transparent) 0%, transparent 48%), radial-gradient(120% 140% at 82% 78%, color-mix(in oklab, var(--c) 40%, transparent) 0%, transparent 58%)',
      signageText: 'var(--signage-text-strong)',
      signageSecondary: 'var(--signage-secondary-strong)',
      signageBadge: 'var(--signage-badge-base)'
    },
    neon: {
      label: 'Neon',
      gradient:
        'repeating-linear-gradient(90deg, color-mix(in oklab, var(--c) 95%, transparent) 0 6px, color-mix(in oklab, var(--halo-secondary) 82%, transparent) 6px 12px, color-mix(in oklab, var(--warm) 60%, transparent) 12px 18px, color-mix(in oklab, var(--halo-primary) 80%, transparent) 18px 24px)',
      accent: 'color-mix(in oklab, var(--c) 92%, transparent)',
      glow: 'color-mix(in oklab, var(--halo-primary) 70%, transparent)',
      sheen: 'color-mix(in oklab, var(--halo-secondary) 72%, transparent)',
      signageBg:
        'linear-gradient(140deg, color-mix(in oklab, var(--c) 92%, transparent) 0%, color-mix(in oklab, var(--halo-secondary) 88%, transparent) 48%, color-mix(in oklab, var(--halo-primary) 85%, transparent) 100%)',
      signageOverlay:
        'radial-gradient(140% 140% at 18% 16%, color-mix(in oklab, var(--warm) 45%, transparent) 0%, transparent 52%), radial-gradient(120% 120% at 78% 84%, color-mix(in oklab, var(--c) 42%, transparent) 0%, transparent 60%)',
      signageText: 'var(--signage-text-strong)',
      signageSecondary: 'var(--signage-secondary-strong)',
      signageBadge: 'var(--signage-badge-base)'
    },
    sunset: {
      label: 'Sunset',
      gradient:
        'repeating-linear-gradient(90deg, color-mix(in oklab, var(--warm) 90%, transparent) 0 6px, color-mix(in oklab, var(--a) 88%, transparent) 6px 12px, color-mix(in oklab, var(--warm) 94%, transparent) 12px 18px, color-mix(in oklab, var(--halo-glow) 70%, transparent) 18px 24px)',
      accent: 'color-mix(in oklab, var(--warm) 88%, transparent)',
      glow: 'color-mix(in oklab, var(--a) 70%, transparent)',
      sheen: 'color-mix(in oklab, var(--halo-glow) 68%, transparent)',
      signageBg:
        'linear-gradient(135deg, color-mix(in oklab, var(--warm) 92%, transparent) 0%, color-mix(in oklab, var(--a) 88%, transparent) 50%, color-mix(in oklab, var(--halo-glow) 82%, transparent) 100%)',
      signageOverlay:
        'radial-gradient(140% 140% at 20% 20%, color-mix(in oklab, var(--warm) 52%, transparent) 0%, transparent 52%), radial-gradient(120% 140% at 82% 80%, color-mix(in oklab, var(--a) 42%, transparent) 0%, transparent 58%)',
      signageText: 'var(--signage-text-strong)',
      signageSecondary: 'var(--signage-secondary-strong)',
      signageBadge: 'var(--signage-badge-base)'
    },
    mint: {
      label: 'Mint',
      gradient:
        'repeating-linear-gradient(90deg, color-mix(in oklab, var(--c) 85%, transparent) 0 6px, color-mix(in oklab, var(--halo-secondary) 88%, transparent) 6px 12px, color-mix(in oklab, var(--b) 82%, transparent) 12px 18px, color-mix(in oklab, var(--halo-primary) 75%, transparent) 18px 24px)',
      accent: 'color-mix(in oklab, var(--halo-secondary) 88%, transparent)',
      glow: 'color-mix(in oklab, var(--b) 72%, transparent)',
      sheen: 'color-mix(in oklab, var(--halo-primary) 68%, transparent)',
      signageBg:
        'linear-gradient(135deg, color-mix(in oklab, var(--halo-secondary) 90%, transparent) 0%, color-mix(in oklab, var(--c) 86%, transparent) 46%, color-mix(in oklab, var(--b) 82%, transparent) 100%)',
      signageOverlay:
        'radial-gradient(140% 140% at 18% 18%, color-mix(in oklab, var(--halo-primary) 42%, transparent) 0%, transparent 54%), radial-gradient(120% 120% at 78% 84%, color-mix(in oklab, var(--b) 38%, transparent) 0%, transparent 60%)',
      signageText: 'var(--signage-text-strong)',
      signageSecondary: 'var(--signage-secondary-strong)',
      signageBadge: 'var(--signage-badge-base)'
    }
  };

  const effects = {
    ambient: {
      label: 'Drift',
      mood: 'Calm tide',
      badge: 'FX · Drift',
      eyebrow: 'Ambient drift FX',
      headline: 'Drifted halos ease the promenade.',
      sub: 'Wide sweeps ripple through Mythica Strand while the signage frame holds a soft campaign glow.',
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
    relay: {
      label: 'Relay',
      mood: 'Signage handoff',
      badge: 'FX · Relay',
      eyebrow: 'Signage relay FX',
      headline: 'Campaign loops relay across the mesh.',
      sub: 'Hero posters glide into the marquee while support tickers echo across the halo and PWM cools the room.',
      stripSpeed: 'calc(var(--chase-speed, 2.6s) * 1.15)',
      stripDirection: 'alternate',
      glowSpeed: 'calc(var(--chase-speed, 2.6s) * 0.95)',
      glowDirection: 'normal',
      moduleSpeed: 'calc(var(--chase-speed, 2.6s) * 1.1)',
      moduleDirection: 'alternate',
      moduleGleamSpeed: 'calc(var(--chase-speed, 2.6s) * 1.35)',
      moduleGleamDirection: 'alternate-reverse',
      motifSpeed: 'calc(var(--chase-speed, 2.6s) * 1.25)',
      motifDirection: 'alternate',
      motifOpacity: '.34',
      motifAltSpeed: 'calc(var(--chase-speed, 2.6s) * 1.55)',
      motifAltDirection: 'reverse',
      motifAltOpacity: '.3',
      burstScale: '1.06',
      burstOpacity: '.48',
      burstSpeed: 'calc(var(--chase-speed, 2.6s) * 1.45)',
      signagePanSpeed: 'calc(var(--chase-speed, 2.6s) * 2.05)',
      signagePanDirection: 'alternate',
      auraSpeed: 'calc(var(--chase-speed, 2.6s) * 1.65)',
      auraDirection: 'alternate'
    },
    surge: {
      label: 'Surge',
      mood: 'Arena burst',
      badge: 'FX · Surge',
      eyebrow: 'Arena burst FX',
      headline: 'Surging chases ignite the skyline.',
      sub: 'Tight bursts hammer the strip while the signage flashes promo beats and badge overlays for launches.',
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
      sub: 'Staggered descents flow from the modules into the Strand billboard and asset kit in one sweep.',
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

  const signagePlaceholders = [
    {
      title: 'Poster slot',
      detail: 'Drop brand stills to confirm safe areas and contrast.'
    },
    {
      title: 'Loop window',
      detail: 'Load 15-second MP4 loops to sync with drift and surge FX.'
    },
    {
      title: 'Ticker lane',
      detail: 'Test CMS exports, translations, and accessibility copy on the band.'
    },
    {
      title: 'Caption rail',
      detail: 'Reserve bilingual captions that inherit accessible contrast tokens.'
    },
    {
      title: 'Emergency banner',
      detail: 'Fail-safe messaging placeholder mirrors the override palette for instant alerts.'
    }
  ];

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
          <ul class="signage-assets" aria-label="Asset placeholders">
            {#each signagePlaceholders as placeholder}
              <li>
                <span class="asset-label">{placeholder.title}</span>
                <span class="asset-detail">{placeholder.detail}</span>
              </li>
            {/each}
          </ul>
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
