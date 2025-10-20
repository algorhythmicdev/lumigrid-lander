<script>
  import '$lib/styles.css';
  import { onDestroy, onMount } from 'svelte';
  import { backgroundFlares, bindRipple, reveals, parallax, sectionFlares } from '$lib/fx.js';
  const themeBoot = `<script>(function(){try{const root=document.documentElement;const stored=localStorage.getItem('lg-color');const mq=window.matchMedia('(prefers-color-scheme: dark)');const mode=stored||(mq.matches?'dark':'light');root.dataset.color=mode;root.style.colorScheme=mode;}catch(e){}})();<\/script>`;
  const brandBoot = `<script>(function(){try{const root=document.documentElement;const brand=localStorage.getItem('lg-brand');if(brand){root.setAttribute('data-theme',brand);}}catch(e){}})();<\/script>`;
  let releaseSectionFlares;
  onMount(()=>{
    backgroundFlares({ canvasId:'lg-fx' });
    bindRipple();
    reveals();
    parallax();
    releaseSectionFlares = sectionFlares();
  });
  onDestroy(() => {
    releaseSectionFlares?.();
  });
</script>
<svelte:head>
  {@html themeBoot}
  {@html brandBoot}
</svelte:head>
<canvas id="lg-fx" aria-hidden="true"></canvas>
<slot />
