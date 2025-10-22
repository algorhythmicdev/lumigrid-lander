<script>
  import '$lib/styles.css';
  import { base } from '$app/paths';
  import { onDestroy, onMount } from 'svelte';
  import { backgroundFlares, bindRipple, reveals, parallax, sectionFlares } from '$lib/fx.js';
  const themeBoot = `<script>(function(){try{const root=document.documentElement;const stored=localStorage.getItem('lg-color');const mq=window.matchMedia('(prefers-color-scheme: dark)');const mode=stored||(mq.matches?'dark':'light');root.dataset.color=mode;root.style.colorScheme=mode;}catch(e){}})();<\/script>`;
  const brandBoot = `<script>(function(){try{const root=document.documentElement;const brand=localStorage.getItem('lg-brand');if(brand){root.setAttribute('data-theme',brand);}}catch(e){}})();<\/script>`;
  let releaseSectionFlares;
  let releaseBackground;
  let releaseRipple;
  let releaseReveal;
  let releaseParallax;
  onMount(()=>{
    releaseBackground = backgroundFlares({ canvasId:'lg-fx' });
    releaseRipple = bindRipple();
    releaseReveal = reveals();
    releaseParallax = parallax();
    releaseSectionFlares = sectionFlares();
  });
  onDestroy(() => {
    releaseBackground?.();
    releaseRipple?.();
    releaseReveal?.();
    releaseParallax?.();
    releaseSectionFlares?.();
  });
</script>
<svelte:head>
  {@html themeBoot}
  {@html brandBoot}
  <link rel="icon" href={`${base}/favicon.svg`} />
</svelte:head>
<canvas
  id="lg-fx"
  aria-hidden="true"
  style="position:fixed;inset:0;z-index:-1;pointer-events:none"
></canvas>
<div class="main-root" style="position:relative;z-index:0">
  <slot />
</div>
