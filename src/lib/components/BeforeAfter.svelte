<script>
  export let before = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee';
  export let after = 'https://images.unsplash.com/photo-1545239565-7a46aabf1a1b';
  let pct = 50;
  let drag = false;

  const clamp = (value) => Math.max(0, Math.min(100, value));

  function setPct(value) {
    const next = clamp(Math.round(value));
    if (!Number.isNaN(next)) {
      pct = next;
    }
  }

  const isPrimaryPointer = (e) => e.button === 0 || e.button === undefined;

  function updateFromEvent(e) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    setPct((100 * (e.clientX - rect.left)) / rect.width);
  }

  function startDrag(e) {
    if (!isPrimaryPointer(e)) return;
    drag = true;
    updateFromEvent(e);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function stopDrag(e) {
    drag = false;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    }
  }

  function move(e) {
    if (!drag) return;
    updateFromEvent(e);
  }

  $: pctLabel = `${pct}% of the after scene revealed`;
</script>

<section class="section container card" aria-labelledby="ba-h">
  <h2 id="ba-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Before / After</h2>
  <div
    class="ba"
    on:pointerdown={startDrag}
    on:pointerup={stopDrag}
    on:pointercancel={stopDrag}
    on:pointerleave={(e) => {
      if (drag) stopDrag(e);
    }}
    on:pointermove={move}
  >
    <input
      class="sr-only"
      type="range"
      min="0"
      max="100"
      step="1"
      value={pct}
      aria-label="Reveal after scene"
      aria-valuetext={pctLabel}
      aria-describedby="ba-desc"
      on:input={(e) => setPct(e.currentTarget.valueAsNumber)}
    />
    <img src={before} alt="" />
    <div class="after" style={`width:${pct}%`}>
      <img src={after} alt="" />
    </div>
    <div class="handle" style={`left:${pct}%`}><i></i></div>
    <p id="ba-desc" class="sr-only" aria-live="polite">{pctLabel}</p>
  </div>
</section>

<style>
  .ba {
    position: relative;
    overflow: hidden;
    border-radius: 0.8rem;
    user-select: none;
    touch-action: none;
  }
  .ba > img,
  .after > img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .after {
    position: absolute;
    inset: 0 0 0 0;
    overflow: hidden;
  }
  .after > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .handle {
    position: absolute;
    top: 0;
    height: 100%;
    width: 0;
    transform: translateX(-1px);
  }
  .handle i {
    position: absolute;
    top: 50%;
    left: -14px;
    translate: 0 -50%;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--a), var(--c));
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
</style>
