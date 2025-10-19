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
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const elements = [...document.querySelectorAll(selector)];
  if(!elements.length) return;
  const showAll = () => elements.forEach((el) => el.classList.add('in'));
  if(reduce.matches){
    showAll();
    return;
  }
  const io = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),{threshold});
  elements.forEach((el)=> io.observe(el));
  reduce.addEventListener('change', (event) => {
    if(event.matches){
      showAll();
      io.disconnect();
    }
  });
}
export function parallax(selector='[data-parallax]'){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const els = [...document.querySelectorAll(selector)];
  if(!els.length) return;
  const onScroll = ()=>{
    const y = window.scrollY || 0;
    els.forEach(el=>{
      const amt = parseFloat(el.dataset.parallax || '0.1');
      el.style.transform = `translateY(${y * amt * -0.1}px)`;
    });
  };
  let active = false;
  const start = () => {
    if(active) return;
    active = true;
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  };
  const stop = () => {
    if(!active) return;
    active = false;
    document.removeEventListener('scroll', onScroll);
    els.forEach((el)=> (el.style.transform = ''));
  };
  if(reduce.matches){
    stop();
  } else {
    start();
  }
  reduce.addEventListener('change', (event) => {
    if(event.matches){
      stop();
    } else {
      start();
    }
  });
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
    items.forEach((li,i)=>{
      const isActive = i === active;
      li.classList.toggle('is-active', isActive);
      const link = li.querySelector('a');
      if(link){
        if(isActive){ link.setAttribute('aria-current','true'); }
        else { link.removeAttribute('aria-current'); }
      }
    });
    if(bar){
      const doc = document.body.scrollHeight - innerHeight;
      const p = Math.max(0, Math.min(1, (window.scrollY / doc)));
      const size = (p*100) + '% 100%';
      bar.style.maskSize = size;
      bar.style.webkitMaskSize = size;
    }
  }
  document.addEventListener('scroll', update, {passive:true});
  update();
}
export function setBrand(theme){ document.documentElement.setAttribute('data-theme', theme); }
export function bindBrandSelect(sel){
  if(!sel) return;
  const storageKey = 'lg-brand';
  const readStored = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  };
  const writeStored = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (err) {
      /* noop */
    }
  };
  const applyBrand = (value, persist = false) => {
    const next = value && sel.querySelector(`option[value="${value}"]`) ? value : sel.value || 'rf';
    sel.value = next;
    setBrand(next);
    if (persist) {
      writeStored(next);
    }
  };
  const stored = readStored();
  applyBrand(stored ?? sel.value ?? 'rf', Boolean(stored));
  sel.addEventListener('change', (e) => applyBrand(e.target.value, true));
}
export function bindThemeToggle(btn, onChange){
  if(!btn) return () => {};
  const root = document.documentElement;
  const storageKey = 'lg-color';
  const readStored = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  };
  const writeStored = (mode) => {
    try {
      localStorage.setItem(storageKey, mode);
    } catch (err) {
      /* noop */
    }
  };
  const mq = matchMedia('(prefers-color-scheme: dark)');
  let hasStored = false;
  const apply = (mode, persist = false) => {
    const value = mode === 'light' ? 'light' : 'dark';
    root.dataset.color = value;
    root.style.colorScheme = value;
    btn.dataset.theme = value;
    onChange?.(value);
    if(persist){
      writeStored(value);
      hasStored = true;
    }
  };
  const stored = readStored();
  hasStored = stored !== null;
  apply(stored ?? (mq.matches ? 'dark' : 'light'), hasStored);
  const handler = () => {
    const next = root.dataset.color === 'dark' ? 'light' : 'dark';
    apply(next, true);
  };
  const autoHandler = (event) => {
    if(hasStored) return;
    apply(event.matches ? 'dark' : 'light', false);
  };
  btn.addEventListener('click', handler);
  mq.addEventListener('change', autoHandler);
  return () => {
    btn.removeEventListener('click', handler);
    mq.removeEventListener('change', autoHandler);
  };
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
