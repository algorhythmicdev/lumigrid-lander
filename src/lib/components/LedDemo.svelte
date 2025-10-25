<script>
  import { tick } from 'svelte';

  const effectGroupId = 'demo-effect';
  const paletteGroupId = 'demo-palette';
  const speedGroupId = 'demo-speed';

  let effect = 'syncwave';
  let palette = 'rf';
  let speed = 'normal';

  const effects = {
    syncwave: {
      label: 'Sync wave',
      help: 'Even sweeps keep venue signage breathing together without calling attention to the controls.',
      strips: [
        { start: '-36%', end: '36%', delay: '0s', glow: '0 0 18px rgba(231,59,163,.32)' },
        { start: '-44%', end: '34%', delay: '-1.6s', saturation: 1.1, alpha: 0.92, glow: '0 0 20px rgba(28,197,220,.3)' },
        { start: '-38%', end: '32%', delay: '-3.2s', saturation: 1.05, alpha: 0.88, glow: '0 0 16px rgba(108,43,217,.28)' }
      ]
    },
    shimmer: {
      label: 'Shimmer drift',
      help: 'Opposing motion adds a light shimmer that draws the eye in retail windows.',
      strips: [
        { start: '32%', end: '-28%', delay: '0s', saturation: 1.15, alpha: 0.94, glow: '0 0 18px rgba(28,197,220,.28)' },
        { start: '-46%', end: '26%', delay: '-1.2s', saturation: 1.2, alpha: 0.9, glow: '0 0 22px rgba(231,59,163,.26)' },
        { start: '28%', end: '-32%', delay: '-2.4s', saturation: 1.05, alpha: 0.86, glow: '0 0 14px rgba(108,43,217,.24)' }
      ]
    },
    pulse: {
      label: 'Pulse beacon',
      help: 'Slow pulses announce a launch moment or timed activation from a distance.',
      strips: [
        { multiplier: 1.2, delay: '0s', alpha: 0.95, glow: '0 0 26px rgba(231,59,163,.35)' },
        { multiplier: 1.4, delay: '-2s', alpha: 0.85, blend: 'lighten', glow: '0 0 22px rgba(255,209,102,.3)' },
        { multiplier: 1.6, delay: '-4s', alpha: 0.8, glow: '0 0 20px rgba(28,197,220,.28)' }
      ]
    }
  };

  const palettes = {
    rf: {
      label: 'Radiant flux',
      help: 'Brand gradient that mixes cyan, magenta, violet, and warm amber.',
      gradient:
        'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)'
    },
    neon: {
      label: 'Neon wash',
      help: 'Electric turquoise and greens for nightlife marquees.',
      gradient:
        'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)'
    },
    sunset: {
      label: 'Sunset fade',
      help: 'Warm orange-to-rose blend for hospitality façades.',
      gradient:
        'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)'
    },
    mint: {
      label: 'Mint frost',
      help: 'Cool aquatic palette for healthcare or gallery calm.',
      gradient:
        'repeating-linear-gradient(90deg, rgba(159,255,215,.95) 0 6px, rgba(118,231,255,.95) 6px 12px, rgba(202,166,255,.95) 12px 18px, rgba(217,255,247,.95) 18px 24px)'
    }
  };

  const speeds = {
    slow: {
      label: 'Slow',
      help: '12 second loops for ambient glow behind glass.',
      base: 12
    },
    normal: {
      label: 'Normal',
      help: '8 second sweeps keep most signage lively.',
      base: 8
    },
    fast: {
      label: 'Fast',
      help: '5 second bursts for reveals and countdowns.',
      base: 5
    }
  };

  const effectOrder = Object.keys(effects);
  const paletteOrder = Object.keys(palettes);
  const speedOrder = Object.keys(speeds);

  let selectedEffect = effects[effect];
  let selectedPalette = palettes[palette];
  let selectedSpeed = speeds[speed];

  $: selectedEffect = effects[effect];
  $: selectedPalette = palettes[palette];
  $: selectedSpeed = speeds[speed];

  const formatDuration = (seconds) => {
    const clamped = Math.max(0.1, seconds);
    const rounded = Math.round(clamped * 100) / 100;
    return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toString()}s`;
  };

  const styleForStrip = (strip) => {
    const baseSpeed = selectedSpeed?.base ?? speeds.normal.base;
    const duration = formatDuration((strip.multiplier ?? 1) * baseSpeed);
    const parts = [
      `--speed:${strip.speed ?? duration}`,
      `--start:${strip.start ?? '-30%'}`,
      `--end:${strip.end ?? '30%'}`,
      `--delay:${strip.delay ?? '0s'}`,
      `--sat:${strip.saturation ?? 1}`,
      `--alpha:${strip.alpha ?? 1}`,
      `--blend:${strip.blend ?? 'screen'}`,
      `--glow:${strip.glow ?? '0 0 0 rgba(0,0,0,0)'}`
    ];
    return parts.join(';');
  };

  const focusOption = (container, key) => {
    if (!container) return;
    const target = container.querySelector(`[data-key="${key}"]`);
    target?.focus();
  };

  const orderIndex = (order, value) => {
    if (!order.length) return 0;
    const index = order.indexOf(value);
    return index >= 0 ? index : 0;
  };

  const cycleKey = (order, current, delta) => {
    if (!order.length) return current;
    const index = orderIndex(order, current);
    const nextIndex = (index + delta + order.length) % order.length;
    return order[nextIndex];
  };

  const handleRadioKey = async (event, key, order, current, setter) => {
    const pressed = event.key;
    if (pressed === ' ' || pressed === 'Spacebar' || pressed === 'Enter') {
      event.preventDefault();
      setter(key);
      return;
    }

    let nextKey = current;
    if (pressed === 'ArrowRight' || pressed === 'ArrowDown') {
      nextKey = cycleKey(order, current, 1);
    } else if (pressed === 'ArrowLeft' || pressed === 'ArrowUp') {
      nextKey = cycleKey(order, current, -1);
    } else if (pressed === 'Home') {
      nextKey = order[0] ?? current;
    } else if (pressed === 'End') {
      nextKey = order[order.length - 1] ?? current;
    } else {
      return;
    }

    if (nextKey === current) return;
    event.preventDefault();
    setter(nextKey);
    await tick();
    focusOption(event.currentTarget?.parentElement ?? null, nextKey);
  };
</script>

<section class="section container card" id="demo" aria-labelledby="demo-h">
  <h2 id="demo-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Live LED preview</h2>

  <div class="grid grid-2" style="align-items:center">
    <div class="strip-stack" aria-hidden="true">
      {#each selectedEffect.strips as strip}
        <div class="strip" style={styleForStrip(strip)}>
          <i style={`background:${selectedPalette.gradient}`}></i>
        </div>
      {/each}
    </div>
    <div class="control-groups">
      <div class="control-group">
        <h3 id={`${effectGroupId}-label`}>Effect</h3>
        <div
          class="chips"
          role="radiogroup"
          aria-labelledby={`${effectGroupId}-label`}
          aria-describedby={`${effectGroupId}-help`}
        >
          {#each Object.entries(effects) as [key, value]}
            <button
              type="button"
              class="chip"
              role="radio"
              data-key={key}
              tabindex={effect === key ? 0 : -1}
              aria-checked={effect === key}
              on:click={() => (effect = key)}
              on:keydown={(event) =>
                handleRadioKey(event, key, effectOrder, effect, (value) => (effect = value))}
            >
              {value.label}
            </button>
          {/each}
        </div>
        <p
          id={`${effectGroupId}-help`}
          class="help"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedEffect.help}
        </p>
      </div>

      <div class="control-group">
        <h3 id={`${paletteGroupId}-label`}>Palette</h3>
        <div
          class="chips"
          role="radiogroup"
          aria-labelledby={`${paletteGroupId}-label`}
          aria-describedby={`${paletteGroupId}-help`}
        >
          {#each Object.entries(palettes) as [key, value]}
            <button
              type="button"
              class="chip"
              role="radio"
              data-key={key}
              tabindex={palette === key ? 0 : -1}
              aria-checked={palette === key}
              on:click={() => (palette = key)}
              on:keydown={(event) =>
                handleRadioKey(event, key, paletteOrder, palette, (value) => (palette = value))}
            >
              {value.label}
            </button>
          {/each}
        </div>
        <p
          id={`${paletteGroupId}-help`}
          class="help"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedPalette.help}
        </p>
      </div>

      <div class="control-group">
        <h3 id={`${speedGroupId}-label`}>Speed</h3>
        <div
          class="chips"
          role="radiogroup"
          aria-labelledby={`${speedGroupId}-label`}
          aria-describedby={`${speedGroupId}-help`}
        >
          {#each Object.entries(speeds) as [key, value]}
            <button
              type="button"
              class="chip"
              role="radio"
              data-key={key}
              tabindex={speed === key ? 0 : -1}
              aria-checked={speed === key}
              on:click={() => (speed = key)}
              on:keydown={(event) =>
                handleRadioKey(event, key, speedOrder, speed, (value) => (speed = value))}
            >
              {value.label}
            </button>
          {/each}
        </div>
        <p
          id={`${speedGroupId}-help`}
          class="help"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedSpeed.help}
        </p>
      </div>
    </div>
  </div>
</section>
