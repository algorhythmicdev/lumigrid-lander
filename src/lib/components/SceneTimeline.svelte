<script>
  const marks = [
    { t: 6, name: 'Morning calm', palette: 'rf', speed: 0.8 },
    { t: 12, name: 'Day clean', palette: 'rf', speed: 1 },
    { t: 18, name: 'Evening halo', palette: 'sunset', speed: 1.3 },
    { t: 21, name: 'Night soft', palette: 'neon', speed: 0.9 }
  ];
  let time = 18;
  $: active = marks.reduce((p, c) => (Math.abs(c.t - time) < Math.abs(p.t - time) ? c : p), marks[0]);

  export let onChange = (preset) => {};
  let lastPreset;
  $: if (active && active !== lastPreset) {
    lastPreset = active;
    onChange(active);
  }

  let sectionEl;

  const applyAmbient = (preset) => {
    if (typeof document === 'undefined' || typeof window === 'undefined' || !preset || !sectionEl) {
      return;
    }
    const rect = sectionEl.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
      return;
    }
    const name = preset.name ?? '';
    const hue = name.includes('Evening')
      ? 200
      : name.includes('Morning')
        ? 320
        : name.includes('Night')
          ? 260
          : 285;
    const value = String(hue);
    const root = document.documentElement;
    root.style.setProperty('--ambient-hue', value);
    root.style.setProperty('--glow-hue', value);
  };

  $: if (sectionEl) {
    applyAmbient(active);
  }

  const formatTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}`;
  };

  $: timeLabel = formatTime(time);
  $: activeLabel = `${active.name} • palette ${active.palette.toUpperCase()} • speed ${active.speed.toFixed(1)}×`;
</script>

<section class="section container card" aria-labelledby="tl-h" bind:this={sectionEl}>
  <h2 id="tl-h" style="font-size:var(--fs-h2)">Scene timeline</h2>
  <div style="display:grid;gap:.5rem">
    <input
      type="range"
      min="0"
      max="24"
      step="0.25"
      bind:value={time}
      aria-label="Time of day"
      aria-describedby="timeline-meta"
    />
    <div style="display:flex;justify-content:space-between;font-size:.9rem;color:var(--muted)"><span>00:00</span><span>24:00</span></div>
    <div id="timeline-meta" class="timeline-meta" aria-live="polite" role="status">
      <span class="meta-time">Time {timeLabel}</span>
      <span class="meta-preset">{activeLabel}</span>
    </div>
    <div class="chips" aria-label="Presets">
      {#each marks as m}
        <button
          type="button"
          class="chip"
          aria-pressed={m === active}
          on:click={() => (time = m.t)}
        >
          {m.name}
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  input[type='range'] {
    width: 100%;
  }

  .timeline-meta {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .timeline-meta span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
</style>
