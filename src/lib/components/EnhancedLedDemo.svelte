<script>
  import { onMount } from 'svelte';

  let effect = 'breathe';
  let speed = 1;
  let intensity = 1;
  let daynight = false;
  let paused = false;
  let scrubValue = 0;
  let sceneNote = 'Scene: Morning Calm';

  const effects = [
    { value: 'breathe', label: 'Soft breathe' },
    { value: 'rainbow', label: 'Rainbow sweep' },
    { value: 'sparkle', label: 'Sparkle' },
    { value: 'chase', label: 'Clean chase' }
  ];

  function setSpeed(mult) {
    const base = { breathe: 6, rainbow: 3, sparkle: 1.8, chase: 2.4 }[effect] || 3;
    const strips = document.querySelectorAll('.led-enhanced-demo .strip');
    strips.forEach(s => s.style.setProperty('--speed', `${base / Number(mult)}s`));
  }

  function setIntensity(mult) {
    const strips = document.querySelectorAll('.led-enhanced-demo .strip');
    strips.forEach(s => {
      s.style.filter = `brightness(${mult}) saturate(${0.8 + mult * 0.5})`;
      s.style.opacity = Math.min(1, 0.9 + (mult - 1) * 0.2);
    });
  }

  function setEffect(name) {
    const strips = document.querySelectorAll('.led-enhanced-demo .strip');
    strips.forEach((s, i) => {
      s.style.animationTimingFunction = (name === 'breathe') ? 'ease-in-out' : 'linear';
    });
  }

  function togglePlayPause() {
    paused = !paused;
    const strips = document.querySelectorAll('.led-enhanced-demo .strip');
    strips.forEach(s => {
      s.style.animationPlayState = paused ? 'paused' : 'running';
    });
  }

  function handleScrub(val) {
    const v = Number(val);
    if (v < 25) {
      effect = 'breathe';
      sceneNote = 'Scene: Morning Calm';
    } else if (v < 50) {
      effect = 'chase';
      sceneNote = 'Scene: Midday Clean';
    } else if (v < 75) {
      effect = 'rainbow';
      sceneNote = 'Scene: Evening Flow';
    } else {
      effect = 'sparkle';
      sceneNote = 'Scene: Promo Sparkle';
    }
    setEffect(effect);
    setSpeed(speed);
  }

  onMount(() => {
    setEffect(effect);
    setSpeed(speed);
    setIntensity(intensity);
    handleScrub(scrubValue);
  });

  $: setSpeed(speed);
  $: setIntensity(intensity);
  $: setEffect(effect);
  $: handleScrub(scrubValue);
</script>

<section id="led-node" class="section focus">
  <div class="container">
    <h2>LED control — where it begins</h2>
    <p class="lead">Colourful strips and clean white channels working together. Calm when you want it, exciting when you need it.</p>

    <div class="grid two">
      <!-- working demo -->
      <div>
        <div class="demo led-enhanced-demo" aria-label="LED demo" class:night-mode={daynight}>
          <div class="strip" data-strip="1"></div>
          <div class="strip" data-strip="2"></div>
          <div class="strip" data-strip="3"></div>
        </div>

        <form class="controls" id="demoForm" role="group" aria-label="LED demo controls" on:submit|preventDefault>
          <label>
            Effect
            <select id="effect" bind:value={effect}>
              {#each effects as eff}
                <option value={eff.value}>{eff.label}</option>
              {/each}
            </select>
          </label>
          <label>
            Speed
            <input id="speed" type="range" min="0.2" max="3" step="0.1" bind:value={speed} />
          </label>
          <label>
            Intensity
            <input id="intensity" type="range" min="0.3" max="1.3" step="0.05" bind:value={intensity} />
          </label>
          <label class="switch">
            <input id="daynight" type="checkbox" bind:checked={daynight} aria-label="Day/Night" />
            <span>Night</span>
          </label>
          <button type="button" class="btn ghost" id="toggle" aria-pressed={paused} on:click={togglePlayPause}>
            {paused ? 'Play' : 'Pause'}
          </button>
        </form>

        <div class="timeline">
          <label for="scrub" class="mono">Timeline</label>
          <input id="scrub" type="range" min="0" max="100" step="1" bind:value={scrubValue} />
          <div class="timeline-note" aria-live="polite">{sceneNote}</div>
        </div>
      </div>

      <!-- simple, elder/kid-friendly explanations -->
      <div class="spec">
        <h3>Simple, useful controls</h3>
        <ul>
          <li><strong>Many zones</strong> — control several LED runs separately or link them together.</li>
          <li><strong>Colour + white</strong> — set gentle ambience or clean brand lighting, or both.</li>
          <li><strong>Scenes</strong> — name your favourites and switch in one tap.</li>
          <li><strong>Schedules</strong> — day/night, weekdays/weekends, special dates.</li>
          <li><strong>Web app</strong> — open in a browser; no extra software.</li>
          <li><strong>Always in step</strong> — when one moves, the others move with it.</li>
        </ul>

        <details class="accordion">
          <summary><strong>How makers use it</strong></summary>
          <ul>
            <li>Plan the day: calm in the morning, brighter at lunch, warm in the evening.</li>
            <li>Create a promo: a 15-second sweep across window and logo, then back to normal.</li>
            <li>Make seasons: winter sparkle, summer glow — saved as scenes you can reuse every year.</li>
          </ul>
        </details>
      </div>
    </div>
  </div>
</section>

<style>
  .demo.night-mode {
    background:
      radial-gradient(800px 400px at 50% -30%, rgba(108,43,217,.22), transparent 60%),
      radial-gradient(800px 400px at 10% 130%, rgba(255,209,102,.18), transparent 60%),
      #060a16;
  }

  select {
    font: inherit;
    padding: .5rem .65rem;
    border-radius: .6rem;
    border: 1px solid rgba(255,255,255,.2);
    background: rgba(8,16,26,.65);
    color: var(--ink);
    cursor: pointer;
  }

  .spec ul {
    list-style: none;
    padding-left: 0;
    display: grid;
    gap: .5rem;
  }

  .spec ul li {
    padding-left: 1.2rem;
    position: relative;
  }

  .spec ul li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--cya);
  }
</style>
