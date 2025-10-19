/* LUMIGRID UI KIT v2 — JS (module) */
const THEME_KEY = 'lg-ui-theme';
const BRAND_KEY = 'lg-brand-theme';
const allowedThemes = new Set(['dark','light','contrast']);

export function lgApplyThemeMode(mode='dark'){
  const root = document.documentElement;
  const choice = allowedThemes.has(mode) ? mode : 'dark';
  root.setAttribute('data-ui-theme', choice);
  root.style.colorScheme = choice === 'light' ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, choice); } catch (err) { /* storage disabled */ }
  return choice;
}

export function lgBindThemeMode(selectEl){
  if(!selectEl) return;
  const prefersDark = matchMedia('(prefers-color-scheme: dark)');
  let stored;
  try { stored = localStorage.getItem(THEME_KEY); } catch (err) { stored = null; }
  let current = stored && allowedThemes.has(stored) ? stored : (prefersDark.matches ? 'dark' : 'light');
  current = lgApplyThemeMode(current);
  selectEl.value = current;

  selectEl.addEventListener('change', e=>{
    const val = e.target.value;
    current = lgApplyThemeMode(val);
  });

  const onPrefChange = ev=>{
    let saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (err) { saved = null; }
    if(saved) return; // user set a preference, do not override
    const next = ev.matches ? 'dark' : 'light';
    current = lgApplyThemeMode(next);
    selectEl.value = current;
  };
  if(typeof prefersDark.addEventListener === 'function'){
    prefersDark.addEventListener('change', onPrefChange);
  } else if(typeof prefersDark.addListener === 'function'){
    prefersDark.addListener(onPrefChange);
  }
}

export function lgSetBrand(theme){
  const root = document.documentElement;
  const choice = theme || 'rf';
  root.setAttribute('data-brand', choice);
  try { localStorage.setItem(BRAND_KEY, choice); } catch (err) { /* storage disabled */ }
}

export function lgBindBrandSelect(sel){
  if(!sel) return;
  let stored;
  try { stored = localStorage.getItem(BRAND_KEY); } catch (err) { stored = null; }
  const initial = stored && [...sel.options].some(opt=> opt.value===stored) ? stored : (sel.value || 'rf');
  sel.value = initial;
  lgSetBrand(initial);
  sel.addEventListener('change', e=> lgSetBrand(e.target.value));
}

export function lgBindRipple(root=document){
  root.addEventListener('pointermove', e=>{
    const t = e.target.closest?.('.btn'); if(!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', ((e.clientX - r.left)/r.width*100)+'%');
    t.style.setProperty('--my', ((e.clientY - r.top)/r.height*100)+'%');
  });
}

export function lgReveals(selector='.reveal', threshold=0.12){
  const io = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),{threshold});
  document.querySelectorAll(selector).forEach(el=> io.observe(el));
}

export function lgParallax(selector='[data-parallax]'){
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

export function lgTimelineSpy({listSelector='#lg-tl', progressSelector='#lg-tl-progress', ids=[]}={}){
  const items = [...document.querySelectorAll(`${listSelector} li`)];
  const sections = ids.map(id=> document.getElementById(id)).filter(Boolean);
  const bar = document.querySelector(progressSelector);
  const links = items.map(li=> li.querySelector('a'));
  if(!items.length || !sections.length) return;
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
      const link = links[i];
      if(link){
        if(isActive){ link.setAttribute('aria-current','location'); }
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

export function lgHeroTimelineLoop({ selector='[data-hero-timeline]', duration=9000 }={}){
  const el = document.querySelector(selector);
  if(!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const progress = el.querySelector('.hero-timeline-progress');
  if(!progress) return;
  let start = performance.now();
  const frame = now =>{
    const t = ((now - start) % duration) / duration;
    const eased = 0.5 - Math.cos(Math.PI * 2 * t)/2; // smooth loop
    progress.style.width = `${Math.max(0.05, Math.min(0.98, eased)) * 100}%`;
    el.style.setProperty('--hero-progress', Math.max(0.05, Math.min(0.98, eased)));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* Background flares */
export function lgBackgroundFlares({ canvasId='lg-fx', stripeCount=11, pulseCount=72, orbCount=5, pointerParallax=0.06 }={}){
  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.max(1, devicePixelRatio || 1);
  let width = 0, height = 0;

  const resize = ()=>{
    dpr = Math.max(1, devicePixelRatio || 1);
    width = Math.floor(innerWidth * dpr);
    height = Math.floor(innerHeight * dpr);
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
  };
  resize();
  addEventListener('resize', resize, { passive: true });

  const pointer = { x: 0.5, y: 0.35 };
  const setPointer = (x, y)=>{
    const w = Math.max(1, innerWidth || 1);
    const h = Math.max(1, innerHeight || 1);
    pointer.x = Math.max(0, Math.min(1, x / w));
    pointer.y = Math.max(0, Math.min(1, y / h));
  };
  addEventListener('pointermove', e=> setPointer(e.clientX, e.clientY), { passive: true });
  addEventListener('touchmove', e=>{ const t = e.touches[0]; if(t) setPointer(t.clientX, t.clientY); }, { passive: true });

  const stripeTotal = Math.max(1, Math.floor(stripeCount));
  const pulseTotal = Math.max(1, Math.floor(pulseCount));
  const orbTotal = Math.max(1, Math.floor(orbCount));

  const stripes = Array.from({ length: stripeTotal }, (_, i)=>{
    const denom = Math.max(1, stripeTotal - 1);
    const base = stripeTotal === 1 ? 0.5 : i / denom;
    return {
      base,
      thickness: 18 + Math.random() * 24,
      speed: 0.05 + Math.random() * 0.06,
      hue: 200 + Math.random() * 120,
      offset: Math.random() * 1000,
    };
  });

  const pulses = Array.from({ length: pulseTotal }, ()=>({
    stripe: Math.floor(Math.random() * stripes.length),
    position: Math.random(),
    speed: 0.04 + Math.random() * 0.08,
    width: 0.05 + Math.random() * 0.08,
    phase: Math.random() * Math.PI * 2,
  }));

  const orbs = Array.from({ length: orbTotal }, ()=>({
    radius: 90 + Math.random() * 140,
    hue: 190 + Math.random() * 120,
    light: 58 + Math.random() * 18,
    speed: 0.15 + Math.random() * 0.2,
    size: 220 + Math.random() * 280,
    offset: Math.random() * Math.PI * 2,
    opacity: 0.45 + Math.random() * 0.25,
  }));

  const sparkTotal = Math.max(24, Math.round((stripeTotal + orbTotal) * 2.4));
  const sparks = Array.from({ length: sparkTotal }, ()=>({
    x: Math.random(),
    y: Math.random(),
    speed: 0.08 + Math.random() * 0.2,
    size: 18 + Math.random() * 26,
    hue: 180 + Math.random() * 140,
    drift: Math.random() * Math.PI * 2,
  }));

  const renderStatic = ()=>{
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = width / dpr;
    const h = height / dpr;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#050818');
    grad.addColorStop(1, '#01030c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  };

  if(prefersReduce.matches){
    renderStatic();
    return;
  }

  const frame = (now)=>{
    const w = width / dpr;
    const h = height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const t = now * 0.001;
    const driftX = Math.sin(t * 0.18) * 48 + (pointer.x - 0.5) * w * pointerParallax;
    const driftY = Math.cos(t * 0.22) * 38 + (pointer.y - 0.5) * h * pointerParallax;

    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, 'rgba(5,8,24,0.92)');
    baseGrad.addColorStop(1, 'rgba(2,4,12,0.92)');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    orbs.forEach((orb)=>{
      const angle = t * orb.speed + orb.offset;
      const x = w / 2 + Math.cos(angle) * orb.radius + driftX * 0.35;
      const y = h / 2 + Math.sin(angle * 0.9) * (orb.radius * 0.6) + driftY * 0.2;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
      grad.addColorStop(0, `hsla(${orb.hue}, 80%, ${orb.light}%, ${0.58 * orb.opacity})`);
      grad.addColorStop(0.55, `hsla(${orb.hue + 30}, 70%, ${Math.max(28, orb.light - 12)}%, ${0.26 * orb.opacity})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - orb.size, y - orb.size, orb.size * 2, orb.size * 2);
    });

    stripes.forEach((stripe)=>{
      const oscillate = Math.sin(t * stripe.speed * 2 + stripe.offset);
      const thickness = stripe.thickness + oscillate * 6;
      const baseY = ((stripe.base + t * stripe.speed * 0.04) % 1) * (h + thickness * 2) - thickness;
      const y = baseY + driftY * 0.2;
      const grad = ctx.createLinearGradient(0, y, w, y + thickness);
      grad.addColorStop(0, `hsla(${stripe.hue - 18}, 85%, 58%, 0)`);
      grad.addColorStop(0.5, `hsla(${stripe.hue}, 90%, 68%, 0.48)`);
      grad.addColorStop(1, `hsla(${stripe.hue + 24}, 80%, 58%, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(-w * 0.05, y - thickness * 0.6, w * 1.1, thickness * 1.4);

      ctx.save();
      ctx.filter = 'blur(38px)';
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = grad;
      ctx.fillRect(-w * 0.05, y - thickness * 0.8, w * 1.1, thickness * 1.6);
      ctx.restore();
    });

    pulses.forEach((pulse)=>{
      const stripe = stripes[pulse.stripe];
      if(!stripe) return;
      pulse.position += pulse.speed * 0.0024;
      if(pulse.position > 1.25){
        pulse.position = -0.2;
        pulse.stripe = Math.floor(Math.random() * stripes.length);
        pulse.speed = 0.035 + Math.random() * 0.08;
        pulse.width = 0.05 + Math.random() * 0.08;
        pulse.phase = Math.random() * Math.PI * 2;
      }
      const stripeThickness = stripe.thickness;
      const stripeY = ((stripe.base + t * stripe.speed * 0.04) % 1) * (h + stripeThickness * 2) - stripeThickness + driftY * 0.2;
      const x = pulse.position * w + Math.sin(t + pulse.phase) * 42 + driftX;
      const widthPx = w * (pulse.width * 0.12 + 0.04);
      const glow = ctx.createRadialGradient(x, stripeY, 0, x, stripeY, widthPx);
      glow.addColorStop(0, `hsla(${stripe.hue + 8}, 95%, 78%, 0.88)`);
      glow.addColorStop(0.45, `hsla(${stripe.hue - 10}, 82%, 66%, 0.32)`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(x - widthPx, stripeY - widthPx, widthPx * 2, widthPx * 2);
    });

    sparks.forEach((spark)=>{
      spark.y -= spark.speed * 0.0018;
      if(spark.y < -0.15){
        spark.y = 1.1;
        spark.x = Math.random();
        spark.speed = 0.08 + Math.random() * 0.2;
        spark.size = 18 + Math.random() * 26;
        spark.hue = 180 + Math.random() * 140;
        spark.drift = Math.random() * Math.PI * 2;
      }
      const sx = spark.x * w + Math.sin(t * 0.9 + spark.drift) * 30 + driftX * 0.2;
      const sy = spark.y * h + Math.cos(t * 1.1 + spark.drift) * 18 + driftY * 0.2;
      const radius = spark.size;
      const alpha = 0.35 + Math.sin(t * 2.2 + spark.drift) * 0.25;
      const shimmer = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
      shimmer.addColorStop(0, `hsla(${spark.hue}, 95%, 76%, ${0.65 * alpha})`);
      shimmer.addColorStop(0.55, `hsla(${spark.hue + 18}, 82%, 64%, ${0.32 * alpha})`);
      shimmer.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shimmer;
      ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2);
    });

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.2;
    const gridSpacing = Math.max(140, Math.min(220, Math.max(w, h) / 3));
    const offsetX = (t * 18 + driftX * 0.05) % gridSpacing;
    const offsetY = (t * 14 + driftY * 0.05) % gridSpacing;
    ctx.lineWidth = 1;
    for(let xLine = -gridSpacing; xLine < w + gridSpacing; xLine += gridSpacing){
      const px = xLine + offsetX;
      const g = ctx.createLinearGradient(px, 0, px, h);
      g.addColorStop(0, 'rgba(120,200,255,0)');
      g.addColorStop(0.5, 'rgba(160,220,255,0.32)');
      g.addColorStop(1, 'rgba(120,200,255,0)');
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    }
    for(let yLine = -gridSpacing; yLine < h + gridSpacing; yLine += gridSpacing){
      const py = yLine + offsetY;
      const g = ctx.createLinearGradient(0, py, w, py);
      g.addColorStop(0, 'rgba(120,200,255,0)');
      g.addColorStop(0.5, 'rgba(180,230,255,0.25)');
      g.addColorStop(1, 'rgba(120,200,255,0)');
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }
    const sweepY = ((t * 0.08) % 1) * h;
    const sweepGrad = ctx.createLinearGradient(0, sweepY - 140, 0, sweepY + 140);
    sweepGrad.addColorStop(0, 'rgba(0,0,0,0)');
    sweepGrad.addColorStop(0.5, 'rgba(170,230,255,0.28)');
    sweepGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, sweepY - 160, w, 320);
    ctx.restore();

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(3,5,16,0.3)';
    ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){ return; }
    resize();
  });
}

/* TTS */
export function lgBindTTS(toggleBtn){
  if(!toggleBtn) return;
  let on=false; const set=v=>{ on=v; toggleBtn.setAttribute('aria-pressed', String(on)); toggleBtn.textContent = on ? 'Reading' : 'Read'; if(!on && speechSynthesis.speaking) speechSynthesis.cancel(); };
  set(false); toggleBtn.addEventListener('click', ()=> set(!on));
  document.addEventListener('dblclick', e=>{
    if(!on) return; const node=e.target.closest('p, h1, h2, h3, li, summary, figcaption'); if(!node) return;
    const u=new SpeechSynthesisUtterance(node.innerText); speechSynthesis.cancel(); speechSynthesis.speak(u);
  });
}

/* Pills -> cards */
export function lgBindPills(){
  const pills=document.querySelectorAll('.pill'); const cards=document.querySelectorAll('[data-info-card]');
  pills.forEach(p=> p.addEventListener('click', ()=>{
    pills.forEach(x=> x.setAttribute('aria-pressed','false')); p.setAttribute('aria-pressed','true');
    const k=p.dataset.info; cards.forEach(c=> c.classList.toggle('in', c.dataset.infoCard===k));
  })); pills[0]?.click();
}

/* LED helpers */
export const lgLEDPalettes = {
  rf: 'repeating-linear-gradient(90deg, rgba(28,197,220,.95) 0 6px, rgba(231,59,163,.95) 6px 12px, rgba(108,43,217,.95) 12px 18px, rgba(255,209,102,.95) 18px 24px)',
  neon: 'repeating-linear-gradient(90deg, rgba(0,229,255,.95) 0 6px, rgba(119,247,203,.95) 6px 12px, rgba(199,247,1,.95) 12px 18px, rgba(0,191,255,.95) 18px 24px)',
  sunset: 'repeating-linear-gradient(90deg, rgba(255,123,123,.95) 0 6px, rgba(255,162,76,.95) 6px 12px, rgba(255,209,102,.95) 12px 18px, rgba(255,214,231,.95) 18px 24px)',
  mint: 'repeating-linear-gradient(90deg, rgba(159,255,215,.95) 0 6px, rgba(118,231,255,.95) 6px 12px, rgba(202,166,255,.95) 12px 18px, rgba(217,255,247,.95) 18px 24px)'
};
const ledPatterns = new Set(['chase','pulse','wave']);
export function lgApplyLEDGradient(rootSel='.strip', pal='rf'){
  const palette = lgLEDPalettes[pal] ? pal : 'rf';
  document.querySelectorAll(rootSel).forEach(s=> s.style.setProperty('--led-grad', lgLEDPalettes[palette]));
  return palette;
}
export function lgSetSpeed(rootSel='.strip', mult=1){
  const base = 4.5;
  const factor = Math.max(0.4, Math.min(3, Number(mult) || 1));
  const duration = (base / factor).toFixed(2);
  document.querySelectorAll(rootSel).forEach(s=> s.style.setProperty('--speed', `${duration}s`));
  return factor;
}
export function lgSetPattern(rootSel='.strip', pattern='chase'){
  const applied = ledPatterns.has(pattern) ? pattern : 'chase';
  document.querySelectorAll(rootSel).forEach(s=> s.setAttribute('data-led-pattern', applied));
  return applied;
}
export function lgSetIntensity(rootSel='.strip', intensity=1){
  const value = Math.max(0.4, Math.min(1.2, Number(intensity) || 1));
  document.querySelectorAll(rootSel).forEach(s=> s.style.setProperty('--led-intensity', value.toFixed(2)));
  return value;
}
