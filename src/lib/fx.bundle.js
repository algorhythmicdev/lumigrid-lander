// FX & UI helpers for LumiGrid (SvelteKit)

const noop = () => {};
const cleanupNoop = () => {};
const mediaQueryFallback = {
  matches: false,
  addEventListener: noop,
  removeEventListener: noop,
  addListener: noop,
  removeListener: noop
};

const getDocument = () => (typeof document === 'undefined' ? null : document);
const getWindow = () => (typeof window === 'undefined' ? null : window);
const getComputed = () => (typeof getComputedStyle === 'function' ? getComputedStyle : null);

const getMediaQueryList = (query) => {
  const win = getWindow();
  return win?.matchMedia ? win.matchMedia(query) : mediaQueryFallback;
};

export function bindRipple(root = getDocument()){
  if(!root) return cleanupNoop;
  const handler = (e)=>{
    const t = e.target.closest?.('.btn'); if(!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', ((e.clientX - r.left)/r.width*100)+'%');
    t.style.setProperty('--my', ((e.clientY - r.top)/r.height*100)+'%');
  };
  root.addEventListener('pointermove', handler);
  return () => root.removeEventListener('pointermove', handler);
}
export function reveals(selector='.reveal', threshold=0.12){
  const doc = getDocument();
  if(!doc) return cleanupNoop;
  const reduce = getMediaQueryList('(prefers-reduced-motion: reduce)');
  const elements = [...doc.querySelectorAll(selector)];
  if(!elements.length) return cleanupNoop;
  const showAll = () => elements.forEach((el) => el.classList.add('in'));
  if(reduce.matches){
    showAll();
    return cleanupNoop;
  }
  const io = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),{threshold});
  elements.forEach((el)=> io.observe(el));
  const handleReduce = (event) => {
    if(event.matches){
      showAll();
      io.disconnect();
    }
  };
  reduce.addEventListener('change', handleReduce);
  return () => {
    io.disconnect();
    reduce.removeEventListener('change', handleReduce);
  };
}
export function parallax(selector='[data-parallax]'){
  const doc = getDocument();
  const win = getWindow();
  if(!doc || !win) return cleanupNoop;
  const reduce = getMediaQueryList('(prefers-reduced-motion: reduce)');
  const els = [...doc.querySelectorAll(selector)];
  if(!els.length) return cleanupNoop;
  const onScroll = ()=>{
    const y = win.scrollY || 0;
    els.forEach(el=>{
      const amt = parseFloat(el.dataset.parallax || '0.1');
      el.style.transform = `translateY(${y * amt * -0.1}px)`;
    });
  };
  let active = false;
  const start = () => {
    if(active) return;
    active = true;
    doc.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  };
  const stop = () => {
    if(!active) return;
    active = false;
    doc.removeEventListener('scroll', onScroll);
    els.forEach((el)=> (el.style.transform = ''));
  };
  if(reduce.matches){
    stop();
  } else {
    start();
  }
  const handleReduce = (event) => {
    if(event.matches){
      stop();
    } else {
      start();
    }
  };
  reduce.addEventListener('change', handleReduce);
  return () => {
    reduce.removeEventListener('change', handleReduce);
    stop();
  };
}
export function timelineSpy({listSelector='#lg-tl', progressSelector='#lg-tl-progress', ids=[], onActive}={}){
  const doc = getDocument();
  const win = getWindow();
  if(!doc || !win) return cleanupNoop;
  const items = [...doc.querySelectorAll(`${listSelector} li`)];
  const sections = ids.map((id) => doc.getElementById(id)).filter(Boolean);
  const bar = doc.querySelector(progressSelector);
  if(!items.length || !sections.length) return cleanupNoop;
  let raf = 0;
  let lastActive = -1;
  const update = () => {
    raf = 0;
    const mid = win.scrollY + win.innerHeight / 2;
    let active = 0;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const top = win.scrollY + rect.top;
      if (top <= mid) {
        active = i;
      }
    });
    items.forEach((li, i) => {
      const isActive = i === active;
      li.classList.toggle('is-active', isActive);
      const link = li.querySelector('a');
      if (link) {
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      }
    });
    if (bar) {
      const docHeight = Math.max(1, doc.body.scrollHeight - win.innerHeight);
      const p = Math.max(0, Math.min(1, win.scrollY / docHeight));
      const size = `${(p * 100).toFixed(2)}% 100%, 100% 100%`;
      bar.style.maskSize = size;
      bar.style.webkitMaskSize = size;
    }
    if(active !== lastActive){
      lastActive = active;
      const id = ids[active];
      onActive?.({ index: active, id, item: items[active] });
    }
  };
  const queueUpdate = () => {
    if (raf) return;
    raf = win.requestAnimationFrame(update);
  };
  doc.addEventListener('scroll', queueUpdate, { passive: true });
  win.addEventListener('resize', queueUpdate, { passive: true });
  update();
  return () => {
    doc.removeEventListener('scroll', queueUpdate);
    win.removeEventListener('resize', queueUpdate);
    if (raf) {
      win.cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
export function setBrand(theme){ const doc = getDocument(); doc?.documentElement?.setAttribute('data-theme', theme); }
export function bindBrandSelect(sel){
  const win = getWindow();
  if(!sel || !win) return cleanupNoop;
  const storageKey = 'lg-brand';
  const readStored = () => {
    try {
      return win.localStorage?.getItem(storageKey);
    } catch (err) {
      return null;
    }
  };
  const writeStored = (value) => {
    try {
      win.localStorage?.setItem(storageKey, value);
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
  const handler = (e) => applyBrand(e.target.value, true);
  sel.addEventListener('change', handler);
  return () => sel.removeEventListener('change', handler);
}
export function bindThemeToggle(btn, onChange){
  const doc = getDocument();
  const win = getWindow();
  if(!btn || !doc || !win) return cleanupNoop;
  const root = doc.documentElement;
  const storageKey = 'lg-color';
  const readStored = () => {
    try {
      return win.localStorage?.getItem(storageKey);
    } catch (err) {
      return null;
    }
  };
  const writeStored = (mode) => {
    try {
      win.localStorage?.setItem(storageKey, mode);
    } catch (err) {
      /* noop */
    }
  };
  const mq = getMediaQueryList('(prefers-color-scheme: dark)');
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
  const doc = getDocument();
  const win = getWindow();
  if(!toggleBtn || !doc || !win || !('speechSynthesis' in win) || typeof win.SpeechSynthesisUtterance !== 'function'){
    return cleanupNoop;
  }
  const synth = win.speechSynthesis;
  let on=false;
  const set=v=>{
    on=v;
    toggleBtn.setAttribute('aria-pressed', String(on));
    toggleBtn.textContent = on ? 'Reading' : 'Read';
    if(!on && synth.speaking) synth.cancel();
  };
  set(false);
  const handleToggle = ()=> set(!on);
  const handleDblClick = (e)=>{
    if(!on) return;
    const node=e.target.closest('p, h1, h2, h3, li, summary, figcaption');
    if(!node) return;
    const utterance=new win.SpeechSynthesisUtterance(node.innerText);
    synth.cancel();
    synth.speak(utterance);
  };
  toggleBtn.addEventListener('click', handleToggle);
  doc.addEventListener('dblclick', handleDblClick);
  return () => {
    toggleBtn.removeEventListener('click', handleToggle);
    doc.removeEventListener('dblclick', handleDblClick);
    if(synth.speaking) synth.cancel();
  };
}
export function backgroundFlares({ canvasId='lg-fx', count=42, spawnRate=0.08, depth={ near:0.9, far:3.2 }, radiusPx={ near:380, far:120 }, hues=[ {h:316,s:85,l:60},{h:265,s:77,l:62},{h:188,s:82,l:60},{h:42,s:97,l:67} ], baseOpacity=0.18, addBloom=true, pointerParallax=0.035, cameraDrift=0.0008, maxBlinkHz=2.2, palettes }={}){
  const doc = getDocument();
  const win = getWindow();
  if(!doc || !win) return cleanupNoop;
  const mReduce = getMediaQueryList('(prefers-reduced-motion: reduce)');
  const cvs = doc.getElementById(canvasId); if(!cvs) return cleanupNoop;
  const ctx = cvs.getContext('2d', { alpha:true });
  if(!ctx) return cleanupNoop;
  const root = doc.documentElement;
  let dpr = Math.max(1, win.devicePixelRatio||1), vw=0, vh=0;
  const resize=()=>{
    vw=cvs.width=Math.floor(win.innerWidth*dpr);
    vh=cvs.height=Math.floor(win.innerHeight*dpr);
    cvs.style.width=win.innerWidth+'px';
    cvs.style.height=win.innerHeight+'px';
  };
  resize();
  win.addEventListener('resize', resize, {passive:true});
  const defaultDark = { hues, baseOpacity, fill:'rgba(0,0,0,0.25)' };
  const defaultLight = {
    hues:[
      {h:305,s:72,l:70},
      {h:248,s:68,l:66},
      {h:188,s:64,l:68},
      {h:48,s:84,l:72}
    ],
    baseOpacity: Math.max(0.12, baseOpacity * 0.8),
    fill:'rgba(246,248,255,0.45)'
  };
  const mergePalette = (base, override={}) => ({
    hues: override.hues ?? base.hues,
    baseOpacity: override.baseOpacity ?? base.baseOpacity,
    fill: override.fill ?? base.fill
  });
  const paletteConfig = {
    dark: mergePalette(defaultDark, palettes?.dark),
    light: mergePalette(defaultLight, palettes?.light)
  };
  const currentMode = () => (root.dataset.color === 'light' ? 'light' : 'dark');
  const makeSprite=(base,hsl,feather=1)=>{ const r=Math.max(8,Math.floor(base*dpr)); const off=doc.createElement('canvas'); off.width=off.height=r*2; const g=off.getContext('2d'); const grad=g.createRadialGradient(r,r,0,r,r,r); grad.addColorStop(0.0,`hsla(${hsl.h},${hsl.s}%,${Math.min(96,hsl.l+15)}%,${0.95*feather})`); grad.addColorStop(0.35,`hsla(${hsl.h},${hsl.s}%,${hsl.l}%,${0.55*feather})`); grad.addColorStop(1.0,`hsla(${hsl.h},${Math.max(30,hsl.s-15)}%,${Math.max(20,hsl.l-25)}%,0)`); g.fillStyle=grad; g.beginPath(); g.arc(r,r,r,0,Math.PI*2); g.fill(); return {canvas:off,r}; };
  const buildSprites = (palette) => palette.hues.map(h=>({ main:makeSprite(320,h,1), bloom:addBloom?makeSprite(520,h,0.55):null }));
  const getPalette = (mode) => paletteConfig[mode] ?? paletteConfig.dark ?? defaultDark;
  let activePalette = getPalette(currentMode());
  let SPR = buildSprites(activePalette);
  if(!SPR.length){
    activePalette = defaultDark;
    SPR = buildSprites(activePalette);
  }
  let fillStyle = activePalette.fill;
  let activeBaseOpacity = activePalette.baseOpacity;
  const applyPalette = (mode) => {
    activePalette = getPalette(mode);
    SPR = buildSprites(activePalette);
    if(!SPR.length){
      activePalette = defaultDark;
      SPR = buildSprites(activePalette);
    }
    fillStyle = activePalette.fill;
    activeBaseOpacity = activePalette.baseOpacity;
    flares.forEach((flare)=>{
      flare.pal = SPR[Math.floor(Math.random()*SPR.length)];
    });
  };
  const perf = win.performance ?? { now: () => Date.now() };
  const world={ w:4000, h:2600 }; let cam={x:0,y:0}; let pointer={x:.5,y:.35}, t0=perf.now(), flares=[], acc=0;
  const pointerMove = e=>{ pointer.x=e.clientX/win.innerWidth; pointer.y=e.clientY/win.innerHeight; };
  const touchMove = e=>{ const t=e.touches[0]; if(!t) return; pointer.x=t.clientX/win.innerWidth; pointer.y=t.clientY/win.innerHeight; };
  win.addEventListener('pointermove', pointerMove, {passive:true});
  win.addEventListener('touchmove', touchMove, {passive:true});
  const lerp=(a,b,t)=>a+(b-a)*t, invLerp=(a,b,v)=>(v-a)/(b-a), ease=(t)=> t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const spawn=()=>{ const pal=SPR[Math.floor(Math.random()*SPR.length)]; const z=depth.near+Math.random()*(depth.far-depth.near); const x=(Math.random()-.5)*world.w, y=(Math.random()-.5)*world.h; const life=8000+Math.random()*10000, t0=perf.now(); const blink=0.6+Math.random()*(maxBlinkHz-0.6); const baseR=lerp(radiusPx.far, radiusPx.near, invLerp(depth.far, depth.near, z)); return {x,y,z,t0,life,blink,baseR,pal,dead:false}; };
  let observer;
  if(typeof win.MutationObserver !== 'undefined'){
    observer = new win.MutationObserver(()=> applyPalette(currentMode()));
    observer.observe(root, { attributes:true, attributeFilter:['data-color'] });
  }
  let raf=null;
  const frame=(now)=>{
    const t=now-t0;
    cam.x=Math.sin(t*cameraDrift)*120 + (pointer.x-.5)*world.w*pointerParallax;
    cam.y=Math.cos(t*cameraDrift*1.2)*80  + (pointer.y-.5)*world.h*pointerParallax;
    ctx.clearRect(0,0,vw,vh);
    ctx.globalCompositeOperation='source-over'; ctx.fillStyle=fillStyle; ctx.fillRect(0,0,vw,vh);
    ctx.globalCompositeOperation='lighter';
    acc+=spawnRate; while(acc>1){ flares.push(spawn()); acc-=1; }
    if(flares.length<count && Math.random()<spawnRate) flares.push(spawn());
    flares.sort((a,b)=> b.z-a.z);
    for(const f of flares){
      const age=now-f.t0, nt=Math.min(1, age/f.life);
      const fadeIn=ease(Math.min(nt*1.3,1)), fadeOut=ease(1 - Math.max(0,(age-f.life*.6)/(f.life*.4)));
      const alpha=activeBaseOpacity*fadeIn*fadeOut; if(alpha<=.002){ f.dead=(age>f.life); continue; }
      const blink=0.85 + 0.15*Math.sin(age*0.002*f.blink*Math.PI*2);
      const fov=420, sx=((f.x-cam.x)/f.z)*fov + (vw*.5), sy=((f.y-cam.y)/f.z)*fov + (vh*.5);
      const scale=1/f.z, r=Math.max(8, f.baseR*scale) * (win.devicePixelRatio||1);
      if(f.pal.bloom){ const k=r/f.pal.bloom.r; ctx.globalAlpha=alpha*.6*blink; ctx.drawImage(f.pal.bloom.canvas, sx-f.pal.bloom.r*k, sy-f.pal.bloom.r*k, f.pal.bloom.canvas.width*k, f.pal.bloom.canvas.height*k); }
      const k2=r/f.pal.main.r; ctx.globalAlpha=alpha*blink; ctx.drawImage(f.pal.main.canvas, sx-f.pal.main.r*k2, sy-f.pal.main.r*k2, f.pal.main.canvas.width*k2, f.pal.main.canvas.height*k2);
    }
    ctx.globalAlpha=1; if(flares.length>count*2) flares=flares.filter(f=>!f.dead);
    raf=win.requestAnimationFrame(frame);
  };
  if(!mReduce.matches){ raf=win.requestAnimationFrame(frame); } else { ctx.fillStyle=fillStyle; ctx.fillRect(0,0,cvs.width,cvs.height); }
  const visHandler = ()=>{
    if(doc.hidden && raf){ win.cancelAnimationFrame(raf); raf=null; }
    else if(!doc.hidden && !mReduce.matches && !raf){ t0=perf.now(); raf=win.requestAnimationFrame(frame); }
  };
  doc.addEventListener('visibilitychange', visHandler);
  return () => {
    win.removeEventListener('resize', resize);
    win.removeEventListener('pointermove', pointerMove);
    win.removeEventListener('touchmove', touchMove);
    doc.removeEventListener('visibilitychange', visHandler);
    if(observer) observer.disconnect();
    if(raf){ win.cancelAnimationFrame(raf); }
  };
}

export function sectionFlares({ selector='.section', rootMargin='-35% 0px -35%', threshold=0.35 }={}){
  const doc = getDocument();
  const win = getWindow();
  const compute = getComputed();
  if(!doc || !win) return cleanupNoop;
  const sections = Array.from(doc.querySelectorAll(selector));
  if(!sections.length) return cleanupNoop;
  const root = doc.documentElement;
  const computed = compute ? compute(root) : null;
  const defaults = {
    primary: computed?.getPropertyValue('--active-orbit-a')?.trim() || 'var(--a)',
    secondary: computed?.getPropertyValue('--active-orbit-b')?.trim() || 'var(--b)',
    glow: computed?.getPropertyValue('--active-orbit-glow')?.trim() || 'var(--halo-glow)',
    strength: computed?.getPropertyValue('--active-orbit-strength')?.trim() || '.5'
  };
  const applyFlare = (section) => {
    const current = section ?? null;
    const primary = current?.dataset?.flarePrimary || defaults.primary;
    const secondary = current?.dataset?.flareSecondary || defaults.secondary;
    const glow = current?.dataset?.flareGlow || defaults.glow;
    const strength = current?.dataset?.flareStrength || defaults.strength;
    root.style.setProperty('--active-orbit-a', primary);
    root.style.setProperty('--active-orbit-b', secondary);
    root.style.setProperty('--active-orbit-glow', glow);
    root.style.setProperty('--active-orbit-strength', strength);
    if(current?.id){
      root.dataset.section = current.id;
    } else {
      delete root.dataset.section;
    }
  };
  const nearestActive = () => {
    let best = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    const mid = win.innerHeight / 2;
    sections.forEach((section) => {
      if(section.dataset.active === 'true'){
        const rect = section.getBoundingClientRect();
        const distance = Math.abs((rect.top + rect.height / 2) - mid);
        if(distance < bestDistance){
          bestDistance = distance;
          best = section;
        }
      }
    });
    return best ?? sections[0];
  };
  const setAll = (state) => {
    sections.forEach((section) => {
      section.dataset.active = state ? 'true' : 'false';
    });
    applyFlare(state ? nearestActive() : null);
  };
  sections.forEach((section) => {
    if(section.dataset.active === undefined){
      section.dataset.active = 'false';
    }
  });
  const supportsObserver = typeof win.IntersectionObserver === 'function';
  let observer;
  if(supportsObserver){
    observer = new win.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.active = entry.isIntersecting ? 'true' : 'false';
      });
      applyFlare(nearestActive());
    }, { rootMargin, threshold });
  }
  const start = () => {
    if(!observer) return;
    sections.forEach((section) => observer.observe(section));
  };
  const stop = () => {
    observer?.disconnect();
  };
  const reduce = getMediaQueryList('(prefers-reduced-motion: reduce)');
  const handleReduce = (event) => {
    if(event.matches){
      stop();
      setAll(true);
    } else {
      setAll(false);
      start();
      applyFlare(nearestActive());
    }
  };
  if(reduce.matches || !supportsObserver){
    setAll(true);
  } else {
    start();
    applyFlare(nearestActive());
  }
  reduce.addEventListener('change', handleReduce);
  return () => {
    stop();
    reduce.removeEventListener('change', handleReduce);
    sections.forEach((section) => { delete section.dataset.active; });
    applyFlare(null);
    root.style.setProperty('--active-orbit-a', defaults.primary);
    root.style.setProperty('--active-orbit-b', defaults.secondary);
    root.style.setProperty('--active-orbit-glow', defaults.glow);
    root.style.setProperty('--active-orbit-strength', defaults.strength);
  };
}
