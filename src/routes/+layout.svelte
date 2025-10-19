<script>
  import '$lib/styles.css';
  import { onMount } from 'svelte';
  import { backgroundFlares, bindRipple, reveals, parallax } from '$lib/fx.js';
  onMount(()=>{ backgroundFlares({ canvasId:'lg-fx' }); bindRipple(); reveals(); parallax(); });
</script>
<canvas id="lg-fx" aria-hidden="true"></canvas>
<slot />
