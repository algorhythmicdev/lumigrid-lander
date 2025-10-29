<script>
  import { onMount } from 'svelte';
  export let selector = '.reveal';
  export let rootMargin = '-10% 0px -10% 0px';
  onMount(()=>{
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('in');
      });
    }, { rootMargin });
    document.querySelectorAll(selector).forEach(el => io.observe(el));
  });
</script>
