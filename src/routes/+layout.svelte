<script>
  import { onMount } from 'svelte';
  function startFX(){
    const c = document.getElementById('lg-fx');
    if(!c) return;
    const ctx = c.getContext('2d', { alpha: true });
    const DPR = Math.max(1, devicePixelRatio||1);
    const resize = ()=>{ c.width=innerWidth*DPR; c.height=innerHeight*DPR; c.style.width=innerWidth+'px'; c.style.height=innerHeight+'px'; };
    resize(); addEventListener('resize', resize, { passive:true });

    let raf;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const orbs = [
      { r:.55, hue: 318 }, // magenta
      { r:.65, hue: 260 }, // violet
      { r:.85, hue: 200 }  // cyan
    ];
    function frame(t){
      ctx.clearRect(0,0,c.width,c.height);
      ctx.globalCompositeOperation='lighter';
      orbs.forEach((o,i)=>{
        const a = (t*0.0001 + i*1.3);
        const cx = c.width*(0.5 + 0.25*Math.cos(a));
        const cy = c.height*(0.45 + 0.3*Math.sin(a*0.9));
        const R = Math.max(c.width,c.height)*o.r;
        const g = ctx.createRadialGradient(cx,cy,0,cx,cy,R);
        g.addColorStop(0, `oklch(70% .16 ${o.hue} / 0.16)`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height);
      });
      if(!reduce.matches) raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    document.addEventListener('visibilitychange',()=>{ if(document.hidden&&raf){cancelAnimationFrame(raf); raf=null;} else if(!raf && !reduce.matches){ raf=requestAnimationFrame(frame);} });
  }
  onMount(startFX);
</script>

<canvas id="lg-fx" aria-hidden="true" style="position:fixed;inset:0;z-index:-1;pointer-events:none"></canvas>
<slot />
