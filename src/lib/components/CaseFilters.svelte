<script>
  import { onMount } from 'svelte';
  export let tags = ['retail','brand','outdoor','all'];
  let active = 'all';
  const set = (t)=> active = t;

  // announce to parent (ProjectGallery & UseCaseStory can listen)
  let el;
  const send = () => el?.dispatchEvent(new CustomEvent('change', { detail:{ active }, bubbles:true }));
  $: if (el) send();
</script>

<div bind:this={el} class="chips" role="tablist" aria-label="Case filters" style="display:flex;gap:.5rem;flex-wrap:wrap">
  {#each tags as tag}
    <button role="tab" aria-selected={active===tag} class="chip" on:click={()=>set(tag)}>
      {tag === 'all' ? 'All' : tag.replace(/^./,c=>c.toUpperCase())}
    </button>
  {/each}
</div>
