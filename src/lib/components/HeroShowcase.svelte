<script>
  import { onDestroy } from 'svelte';
  
  const mods = import.meta.glob('/static/assets/hero/*.{jpg,jpeg,png,webp,avif}', { eager: true, as: 'url' });
  const imgs = Object.values(mods);
  let idx = 0;
  let timer;
  
  function next(){ idx = (idx + 1) % imgs.length; }
  
  $: if(imgs.length > 1){
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }
  
  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

{#if imgs.length > 0}
<div class="hero-showcase">
  <img src={imgs[idx]} alt="Hero showcase" />
</div>
{/if}

<style>
  .hero-showcase {
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
