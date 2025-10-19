// FX & UI helpers for LumiGrid (SvelteKit)
export function bindRipple(root=document){
  root.addEventListener('pointermove', (e)=>{
    const t = e.target.closest?.('.btn'); if(!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', ((e.clientX - r.left)/r.width*100)+'%');
    t.style.setProperty('--my', ((e.clientY - r.top)/r.height*100)+'%');
  });
}
export function reveals(selector='.reveal', threshold=0.12){
  const io = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),{threshold});
  document.querySelectorAll(selector).forEach(el=> io.observe(el));
}
export function parallax(selector='[data-parallax]'){
  const els = [...document.querySelectorAll(selector)];
  const onScroll = ()=>{
    const y = window.scrollY || 0;
    els.forEach(el=>{
      const amt = parseFloat(el.dataset.parallax || '0.1');
      el.style.transform = `translateY(${y * amt * -0.1}px)`;
    });
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}
export function timelineSpy({listSelector='#lg-tl', progressSelector='#lg-tl-progress', ids=[]}={}){
  const items = [...document.querySelectorAll(`${listSelector} li`)];
  const sections = ids.map(id=> document.getElementById(id)).filter(Boolean);
  const bar = document.querySelector(progressSelector);
  function update(){
    const mid = window.scrollY + innerHeight/2;
    let active = 0;
    sections.forEach((sec,i)=>{
      const top = window.scrollY + sec.getBoundingClientRect().top;
      if (top <= mid) active = i;
    });
    items.forEach((li,i)=> li.classList.toggle('is-active', i === active));
    if(bar){
      const doc = document.body.scrollHeight - innerHeight;
      const p = Math.max(0, Math.min(1, (window.scrollY / doc)));
      bar.style.maskSize = (p*100) + '% 100%';
    }
  }
  document.addEventListener('scroll', update, {passive:true});
  update();
}
export function setBrand(theme){ document.documentElement.setAttribute('data-theme', theme); }
export function bindBrandSelect(sel){ if(!sel) return; setBrand(sel.value||'rf'); sel.addEventListener('change', e=> setBrand(e.target.value)); }
export function bindThemeToggle(btn){
  if(!btn) return;
  let dark = matchMedia('(prefers-color-scheme: dark)').matches;
  const set = d=>{ dark=d; document.documentElement.style.colorScheme = dark ? 'dark' : 'light'; btn.setAttribute('aria-pressed', String(dark)); };
  set(dark); btn.addEventListener('click', ()=> set(!dark));
}
export function bindTTS(toggleBtn){
  if(!toggleBtn) return;
  let on=false; const set=v=>{ on=v; toggleBtn.setAttribute('aria-pressed', String(on)); toggleBtn.textContent = on ? 'Reading' : 'Read'; if(!on && speechSynthesis.speaking) speechSynthesis.cancel(); };
  set(false); toggleBtn.addEventListener('click', ()=> set(!on));
  document.addEventListener('dblclick', e=>{
    if(!on) return; const node=e.target.closest('p, h1, h2, h3, li, summary, figcaption'); if(!node) return;
    const u=new SpeechSynthesisUtterance(node.innerText); speechSynthesis.cancel(); speechSynthesis.speak(u);
  });
}
export function backgroundFlares({ canvasId='lg-fx', count=42, spawnRate=0.08, depth={ near:0.9, far:3.2 }, radiusPx={ near:380, far:120 }, hues=[ {h:316,s:85,l:60},{h:265,s:77,l:62},{h:188,s:82,l:60},{h:42,s:97,l:67} ], baseOpacity=0.18, addBloom=true, pointerParallax=0.035, cameraDrift=0.0008, maxBlinkHz=2.2 }={}){
  const mReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const cvs = document.getElementById(canvasId); if(!cvs) return;
  const ctx = cvs.getContext('2d', { alpha:true });
  let dpr = Math.max(1, devicePixelRatio||1), vw=0, vh=0;
  const resize=()=>{ vw=cvs.width=Math.floor(innerWidth*dpr); vh=cvs.height=Math.floor(innerHeight*dpr); cvs.style.width=innerWidth+'px'; cvs.style.height=innerHeight+'px'; };
  resize(); addEventListener('resize', resize, {passive:true});
  const makeSprite=(base,hsl,feather=1)=>{ const r=Math.max(8,Math.floor(base*dpr)); const off=document.createElement('canvas'); off.width=off.height=r*2; const g=off.getContext('2d'); const grad=g.createRadialGradient(r,r,0,r,r,r); grad.addColorStop(0.0,`hsla(${hsl.h},${hsl.s}%,${Math.min(96,hsl.l+15)}%,${0.95*feather})`); grad.addColorStop(0.35,`hsla(${hsl.h},${hsl.s}%,${hsl.l}%,${0.55*feather})`); grad.addColorStop(1.0,`hsla(${hsl.h},${Math.max(30,hsl.s-15)}%,${Math.max(20,hsl.l-25)}%,0)`); g.fillStyle=grad; g.beginPath(); g.arc(r,r,r,0,Math.PI*2); g.fill(); return {canvas:off,r}; };
  const SPR = hues.map(h=>({ main:makeSprite(320,h,1), bloom:addBloom?makeSprite(520,h,0.55):null }));
  const world={ w:4000, h:2600 }; let cam={x:0,y:0}; let pointer={x:.5,y:.35}, t0=performance.now(), flares=[], acc=0;
  addEventListener('pointermove', e=>{ pointer.x=e.clientX/innerWidth; pointer.y=e.clientY/innerHeight; }, {passive:true});
  addEventListener('touchmove', e=>{ const t=e.touches[0]; if(!t) return; pointer.x=t.clientX/innerWidth; pointer.y=t.clientY/innerHeight; }, {passive:true});
  const lerp=(a,b,t)=>a+(b-a)*t, invLerp=(a,b,v)=>(v-a)/(b-a), ease=(t)=> t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const spawn=()=>{ const pal=SPR[Math.floor(Math.random()*SPR.length)]; const z=depth.near+Math.random()*(depth.far-depth.near); const x=(Math.random()-.5)*world.w, y=(Math.random()-.5)*world.h; const life=8000+Math.random()*10000, t0=performance.now(); const blink=0.6+Math.random()*(maxBlinkHz-0.6); const baseR=lerp(radiusPx.far, radiusPx.near, invLerp(depth.far, depth.near, z)); return {x,y,z,t0,life,blink,baseR,pal,dead:false}; };
  let raf=null;
  const frame=(now)=>{
    const t=now-t0;
    cam.x=Math.sin(t*cameraDrift)*120 + (pointer.x-.5)*world.w*pointerParallax;
    cam.y=Math.cos(t*cameraDrift*1.2)*80  + (pointer.y-.5)*world.h*pointerParallax;
    ctx.clearRect(0,0,vw,vh);
    ctx.globalCompositeOperation='source-over'; ctx.fillStyle='rgba(0,0,0,0.25)'; ctx.fillRect(0,0,vw,vh);
    ctx.globalCompositeOperation='lighter';
    acc+=spawnRate; while(acc>1){ flares.push(spawn()); acc-=1; }
    if(flares.length<count && Math.random()<spawnRate) flares.push(spawn());
    flares.sort((a,b)=> b.z-a.z);
    for(const f of flares){
      const age=now-f.t0, nt=Math.min(1, age/f.life);
      const fadeIn=ease(Math.min(nt*1.3,1)), fadeOut=ease(1 - Math.max(0,(age-f.life*.6)/(f.life*.4)));
      const alpha=baseOpacity*fadeIn*fadeOut; if(alpha<=.002){ f.dead=(age>f.life); continue; }
      const blink=0.85 + 0.15*Math.sin(age*0.002*f.blink*Math.PI*2);
      const fov=420, sx=((f.x-cam.x)/f.z)*fov + (vw*.5), sy=((f.y-cam.y)/f.z)*fov + (vh*.5);
      const scale=1/f.z, r=Math.max(8, f.baseR*scale) * (devicePixelRatio||1);
      if(f.pal.bloom){ const k=r/f.pal.bloom.r; ctx.globalAlpha=alpha*.6*blink; ctx.drawImage(f.pal.bloom.canvas, sx-f.pal.bloom.r*k, sy-f.pal.bloom.r*k, f.pal.bloom.canvas.width*k, f.pal.bloom.canvas.height*k); }
      const k2=r/f.pal.main.r; ctx.globalAlpha=alpha*blink; ctx.drawImage(f.pal.main.canvas, sx-f.pal.main.r*k2, sy-f.pal.main.r*k2, f.pal.main.canvas.width*k2, f.pal.main.canvas.height*k2);
    }
    ctx.globalAlpha=1; if(flares.length>count*2) flares=flares.filter(f=>!f.dead);
    raf=requestAnimationFrame(frame);
  };
  if(!mReduce.matches){ raf=requestAnimationFrame(frame); } else { ctx.fillStyle='#0b1020'; ctx.fillRect(0,0,cvs.width,cvs.height); }
  document.addEventListener('visibilitychange', ()=>{ if(document.hidden && raf){ cancelAnimationFrame(raf); raf=null; } else if(!document.hidden && !mReduce.matches && !raf){ t0=performance.now(); raf=requestAnimationFrame(frame); } });
}
