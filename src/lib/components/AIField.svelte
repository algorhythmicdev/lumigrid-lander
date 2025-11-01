<script>
  import { onMount, onDestroy } from 'svelte';
  export let count = 48;
  let canvas, raf; const pts=[]; let time=0;
  onMount(()=>{
    const c=canvas, ctx=c.getContext('2d', {alpha:true});
    const DPR=Math.max(1,devicePixelRatio||1);
    const resize=()=>{ c.width=innerWidth*DPR; c.height=innerHeight*DPR; c.style.width='100%'; c.style.height='100%'; };
    resize(); addEventListener('resize',resize,{passive:true});

    for(let i=0;i<count;i++){
      pts.push({ 
        x:Math.random()*c.width, 
        y:Math.random()*c.height, 
        vx:(Math.random()-.5)*.2*DPR, 
        vy:(Math.random()-.5)*.2*DPR,
        radius: 8+Math.random()*16,
        pulseOffset: Math.random()*Math.PI*2,
        pulseSpeed: 0.5+Math.random()*0.5
      });
    }
    const reduce=matchMedia('(prefers-reduced-motion: reduce)');
    const hueValue=()=>{
      const val=getComputedStyle(document.documentElement).getPropertyValue('--ambient-hue')||'285';
      return parseFloat(val)||285;
    };
    const loop=()=>{
      time+=0.016;
      const hue=hueValue();
      ctx.clearRect(0,0,c.width,c.height);
      ctx.globalCompositeOperation='lighter';
      if(!reduce.matches){
        for(const p of pts){
          p.x+=p.vx; p.y+=p.vy;
          if(p.x<0||p.x>c.width) p.vx*=-1;
          if(p.y<0||p.y>c.height) p.vy*=-1;
        }
      }
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const a=pts[i], b=pts[j];
          const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
          if(d<180*DPR){
            const o=1-(d/(180*DPR));
            ctx.strokeStyle=`oklch(85% .12 ${hue} / ${.10*o})`;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      for(const p of pts){
        const pulse = Math.sin(time*p.pulseSpeed+p.pulseOffset);
        const intensity = 0.5+pulse*0.5;
        const grad=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius*DPR);
        grad.addColorStop(0,`oklch(90% .15 ${hue} / ${.35*intensity})`);
        grad.addColorStop(0.4,`oklch(85% .12 ${hue} / ${.20*intensity})`);
        grad.addColorStop(0.7,`oklch(80% .10 ${hue+30} / ${.12*intensity})`);
        grad.addColorStop(1,`oklch(75% .08 ${hue-20} / 0)`);
        ctx.fillStyle=grad;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.radius*DPR,0,Math.PI*2); ctx.fill();
      }
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return ()=>{ cancelAnimationFrame(raf); removeEventListener('resize',resize); };
  });
</script>

<canvas bind:this={canvas} aria-hidden="true" style="position:absolute; inset:0; z-index:-1; pointer-events:none"></canvas>
