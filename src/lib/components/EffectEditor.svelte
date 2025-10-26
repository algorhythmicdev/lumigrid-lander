<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Action } from 'svelte/action';
  import { get } from 'svelte/store';
  import { palettes, pulseColor, state } from '../stores/effects';
  import type { EffectState, PaletteKey } from '../stores/effects';

  let s: EffectState = get(state);
  const unsubscribe = state.subscribe((value) => {
    s = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  function set<K extends keyof EffectState>(k: K, v: EffectState[K]) {
    const next = { ...s, [k]: v };
    s = next;
    state.set(next);
  }

  const paletteKeys = Object.keys(palettes) as PaletteKey[];

  const pulsePreview: Action<HTMLDivElement> = (node) => {
    node.style.height = '100%';
    node.style.borderRadius = 'inherit';
    const unsub = pulseColor.subscribe((color) => {
      node.style.background = `linear-gradient(90deg, ${color}, transparent 70%)`;
    });
    return {
      destroy() {
        unsub();
      }
    };
  };
</script>

<section class="section container card" id="editor" aria-labelledby="ed-h">
  <h2 id="ed-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Effect editor</h2>
  <div class="grid grid-2">
    <div>
      <div class="chips" role="radiogroup" aria-label="Palette">
        {#each paletteKeys as key}
          <button
            class="chip"
            type="button"
            role="radio"
            aria-checked={s.palette === key}
            on:click={() => set('palette', key)}
          >
            {key}
          </button>
        {/each}
      </div>
      <div style="margin-top:1rem; display:grid; gap:.6rem">
        <label>Speed
          <input type="range" min="0.5" max="3" step="0.1" value={s.speed} on:input={(e)=>set('speed', +e.currentTarget.value)} />
        </label>
      </div>
    </div>
    <div>
      <div class="grid" style="grid-template-columns:repeat(3,1fr); gap:.6rem">
        <label>Hue
          <input type="range" min="0" max="360" step="1" value={s.hue} on:input={(e)=>set('hue', +e.currentTarget.value)} />
        </label>
        <label>Saturation
          <input type="range" min="0" max="100" step="1" value={s.saturation} on:input={(e)=>set('saturation', +e.currentTarget.value)} />
        </label>
        <label>Brightness
          <input type="range" min="60" max="100" step="1" value={s.brightness} on:input={(e)=>set('brightness', +e.currentTarget.value)} />
        </label>
      </div>
      <div
        style="margin-top:.6rem; height:36px; border-radius:.6rem; border:1px solid rgba(255,255,255,.2);"
        aria-label="Pulse color preview"
        use:pulsePreview
      ></div>
    </div>
  </div>
</section>
