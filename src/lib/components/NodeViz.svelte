<script>
  import { onMount } from 'svelte';
  let nodes = Array.from({length:9}, (_,i)=>({id:'N'+(i+1), x:(i%3), y:Math.floor(i/3), active:false}));
  let t=0, raf; let reduce={matches:false};
  const cx = (n)=> 32 + n.x*110; const cy = (n)=> 32 + n.y*110;
  let tip={show:false,x:0,y:0,text:''};

  function toggle(n){ n.active=!n.active; }
  function showTip(n, e){
    const svg = e.currentTarget.ownerSVGElement; const s = svg.getBoundingClientRect();
    const c = e.currentTarget.querySelector('circle').getBoundingClientRect();
    tip={show:true,x:Math.max(8,Math.min(c.left-s.left-80, 340-160)), y:Math.max(8,Math.min(c.top-s.top+24, 300)), text:`${n.id} — ${n.active?'Linked':'Idle'}`};
  }

  onMount(()=>{
    reduce = typeof matchMedia==='function' ? matchMedia('(prefers-reduced-motion: reduce)') : { matches:false };
    const loop=(tm)=>{
      t = tm*0.002;
      if(!reduce.matches) raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    const hide=()=>{ if(document.hidden&&raf){cancelAnimationFrame(raf); raf=null;} else if(!document.hidden && !raf && !reduce.matches){ raf=requestAnimationFrame(loop);} };
    document.addEventListener('visibilitychange', hide);
    return ()=>{
      if(raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', hide);
    };
  });
</script>

<section class="section container card" id="nodes" aria-labelledby="nodes-h">
  <h2 id="nodes-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Node visualization</h2>
  <div class="node-card">
    <svg viewBox="0 0 340 340" width="100%" height="auto" role="img" aria-label="Nine synchronized nodes in a grid" on:mouseleave={()=>tip.show=false}>
      {#each nodes as a}
        {#each nodes as b}
          {#if Math.abs(a.x-b.x)+Math.abs(a.y-b.y)===1}
            <line x1={cx(a)} y1={cy(a)} x2={cx(b)} y2={cy(b)} stroke="rgba(255,255,255,.15)" stroke-width="2"/>
          {/if}
        {/each}
      {/each}
      {#each nodes as n (n.id)}
        <g role="switch" aria-checked={n.active} tabindex="0"
           on:click={(e)=>{toggle(n);showTip(n,e)}}
           on:keydown={(e)=> e.key==='Enter' && (toggle(n),showTip(n,e))}>
          <circle cx={cx(n)} cy={cy(n)} r={18+2*Math.sin(t)} fill="none" stroke="rgba(28,197,220,.65)" stroke-width="2"/>
          <circle cx={cx(n)} cy={cy(n)} r="11" fill={n.active?'url(#act)':'url(#idle)'} stroke="rgba(255,255,255,.55)" stroke-width="1"/>
          <title>{n.id}</title>
        </g>
      {/each}
      <defs>
        <radialGradient id="idle"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#6c2bd9"/></radialGradient>
        <radialGradient id="act"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#1cc5dc"/></radialGradient>
      </defs>
    </svg>
    {#if tip.show}<div class="tip" style="left:{tip.x}px;top:{tip.y}px">{tip.text}</div>{/if}
  </div>
  <p class="lead" style="color:var(--muted);margin:.5rem 0 0">Tap a node to link or unlink. All nodes share the same timing pulse, so effects line up.</p>
</section>
