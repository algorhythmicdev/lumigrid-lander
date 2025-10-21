<script>
  import { timelineSpy } from '$lib/fx.js';
  import { getIconPaths } from '$lib/icons.js';
  import { onDestroy, onMount } from 'svelte';
  export let items = [];
  let listEl, progressEl;
  let normalized = [];
  let activeIndex = 0;
  $: normalized = items.map((item) => {
    const base =
      typeof item === 'string'
        ? { id: item, label: item }
        : { id: item.id, label: item.label ?? item.id, icon: item.icon };
    return { ...base, icon: base.icon ?? 'sparkles' };
  });
  $: activeIndex = Math.min(Math.max(activeIndex, 0), Math.max(normalized.length - 1, 0));
  $: activeEntry = normalized[activeIndex] ?? normalized[0] ?? { label: '', icon: 'sparkles' };
  $: activePaths = getIconPaths(activeEntry.icon ?? 'sparkles');
  let releaseSpy;
  onMount(() => {
    const ids = normalized.map((item) => item.id);
    releaseSpy = timelineSpy({
      listSelector: '#lg-tl',
      progressSelector: '#lg-tl-progress',
      ids,
      onActive: ({ index }) => {
        activeIndex = index;
      }
    });
  });
  onDestroy(() => {
    releaseSpy?.();
  });
</script>
<aside class="timeline-side glass" aria-label="Page sections" role="navigation">
  <div class="tl-head">
    <span class="tl-head-glow" aria-hidden="true"></span>
    <span class="tl-head-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        {#each activePaths as d}
          <path d={d} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        {/each}
      </svg>
      <span class="tl-head-step">{String(activeIndex + 1).padStart(2, '0')}</span>
    </span>
    <div class="tl-head-copy" aria-live="polite">
      <span class="tl-head-eyebrow">Active stage</span>
      <span class="tl-head-label">{activeEntry.label}</span>
    </div>
  </div>
  <ol id="lg-tl" class="tl" bind:this={listEl}>
    {#each normalized as item}
      <li data-id={item.id}>
        <span class="tl-node-glow" aria-hidden="true"></span>
        <a href={'#' + item.id} aria-label={item.label} title={item.label}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {#each getIconPaths(item.icon) as d}
              <path d={d} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            {/each}
          </svg>
          <span class="sr-only">{item.label}</span>
        </a>
        <span class="tl-tooltip">{item.label}</span>
      </li>
    {/each}
  </ol>
  <span id="lg-tl-progress" class="tl-progress" bind:this={progressEl}></span>
</aside>
