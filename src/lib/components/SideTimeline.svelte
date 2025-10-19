<script>
  import { timelineSpy } from '$lib/fx.js';
  import { onMount } from 'svelte';
  export let ids = [];
  let listEl, progressEl;
  onMount(()=>{ timelineSpy({ listSelector:'#lg-tl', progressSelector:'#lg-tl-progress', ids }); });
</script>
<aside class="timeline-side glass" aria-label="Page sections">
  <ol id="lg-tl" class="tl" bind:this={listEl}>
    {#each ids as id}<li><a href={'#'+id}>{id}</a><span class="bar"></span></li>{/each}
  </ol>
  <span id="lg-tl-progress" class="tl-progress" bind:this={progressEl}></span>
</aside>
