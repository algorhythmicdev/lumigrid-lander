/* LUMIGRID UI KIT v2 — JS (module) */
const THEME_KEY = 'lg-ui-theme';
const BRAND_KEY = 'lg-brand-theme';
const TOKEN_EVENT = 'lg:tokens-change';
const allowedThemes = new Set(['dark','light','contrast']);
const LED_PALETTE_VARS = Object.freeze({
  rf: '--led-palette-rf',
  neon: '--led-palette-neon',
  sunset: '--led-palette-sunset',
  mint: '--led-palette-mint',
});
const LED_GLOW_VARS = Object.freeze({
  rf: '--led-glow-rf',
  neon: '--led-glow-neon',
  sunset: '--led-glow-sunset',
  mint: '--led-glow-mint',
});
const AURA_GLOW_VARS = Object.freeze({
  ambient: '--aura-glow-ambient',
  pulse: '--aura-glow-pulse',
  burst: '--aura-glow-burst',
});
const LED_PALETTE_KEYS = new Set(Object.keys(LED_PALETTE_VARS));

export const lgTokenEvent = TOKEN_EVENT;

function readTokenValue(tokenName, fallbackToken){
  const styles = getComputedStyle(document.documentElement);
  const primary = tokenName ? styles.getPropertyValue(tokenName).trim() : '';
  if(primary) return primary;
  if(fallbackToken){
    const fallback = styles.getPropertyValue(fallbackToken).trim();
    if(fallback) return fallback;
  }
  return '';
}

export function lgGetLEDPalette(palette='rf'){
  const varName = LED_PALETTE_VARS[palette] || LED_PALETTE_VARS.rf;
  return readTokenValue(varName, LED_PALETTE_VARS.rf);
}

export function lgGetLEDGlow(palette='rf'){
  const varName = LED_GLOW_VARS[palette] || LED_GLOW_VARS.rf;
  return readTokenValue(varName, LED_GLOW_VARS.rf);
}

export function lgGetAuraGlow(mode='ambient'){
  const varName = AURA_GLOW_VARS[mode] || AURA_GLOW_VARS.ambient;
  return readTokenValue(varName, AURA_GLOW_VARS.ambient);
}

export function lgApplyThemeMode(mode='dark'){
  const root = document.documentElement;
  const choice = allowedThemes.has(mode) ? mode : 'dark';
  root.setAttribute('data-ui-theme', choice);
  root.style.colorScheme = choice === 'light' ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, choice); } catch (err) { /* storage disabled */ }
  document.dispatchEvent(new CustomEvent(TOKEN_EVENT, { detail: { theme: choice } }));
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
  document.dispatchEvent(new CustomEvent(TOKEN_EVENT, { detail: { brand: choice } }));
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
export function lgBackgroundFlares({ canvasId='lg-fx', stripeCount=6, pulseCount=28, orbCount=4, pointerParallax=0.04 }={}){
  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.max(1, devicePixelRatio || 1);
  let width = 0, height = 0;
  const paletteState = { hues: [210, 250, 190], bg: ['#040616', '#02030d'] };

  const readPalette = ()=>{
    const styles = getComputedStyle(document.documentElement);
    const hues = ['--a','--b','--c']
      .map(token=> cssColorToHue(styles.getPropertyValue(token)))
      .filter(h=> typeof h === 'number' && !Number.isNaN(h));
    paletteState.hues = hues.length ? hues : [210, 250, 190];
    const bg0 = styles.getPropertyValue('--bg-0').trim();
    const bg1 = styles.getPropertyValue('--bg-1').trim();
    paletteState.bg = [bg0 || '#040616', bg1 || '#02030d'];
  };

  readPalette();

  const pickHue = ()=>{
    if(!paletteState.hues.length) return 220;
    const idx = Math.floor(Math.random() * paletteState.hues.length);
    return paletteState.hues[idx];
  };

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
      thickness: 48 + Math.random() * 38,
      speed: 0.02 + Math.random() * 0.025,
      hue: pickHue(),
      offset: Math.random() * 800,
    };
  });

  const pulses = Array.from({ length: pulseTotal }, ()=>({
    stripe: Math.floor(Math.random() * stripes.length),
    position: Math.random(),
    speed: 0.015 + Math.random() * 0.035,
    width: 0.12 + Math.random() * 0.12,
    phase: Math.random() * Math.PI * 2,
  }));

  const orbs = Array.from({ length: orbTotal }, ()=>({
    radius: 120 + Math.random() * 180,
    hue: pickHue(),
    light: 60 + Math.random() * 16,
    speed: 0.06 + Math.random() * 0.09,
    size: 320 + Math.random() * 360,
    offset: Math.random() * Math.PI * 2,
    opacity: 0.35 + Math.random() * 0.2,
  }));

  const sparkTotal = Math.max(16, Math.round((stripeTotal + orbTotal) * 1.6));
  const sparks = Array.from({ length: sparkTotal }, ()=>({
    x: Math.random(),
    y: Math.random(),
    speed: 0.02 + Math.random() * 0.05,
    size: 28 + Math.random() * 38,
    hue: pickHue(),
    drift: Math.random() * Math.PI * 2,
  }));

  const retint = ()=>{
    stripes.forEach(stripe=>{ stripe.hue = pickHue(); });
    orbs.forEach(orb=>{ orb.hue = pickHue(); });
    sparks.forEach(spark=>{ spark.hue = pickHue(); });
  };

  document.addEventListener(TOKEN_EVENT, ()=>{ readPalette(); retint(); if(prefersReduce.matches) renderStatic(); });

  const renderStatic = ()=>{
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = width / dpr;
    const h = height / dpr;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, paletteState.bg[0]);
    grad.addColorStop(1, paletteState.bg[1]);
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
    const driftX = Math.sin(t * 0.12) * 64 + (pointer.x - 0.5) * w * pointerParallax;
    const driftY = Math.cos(t * 0.1) * 52 + (pointer.y - 0.5) * h * pointerParallax;

    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, withAlpha(paletteState.bg[0], 0.94));
    baseGrad.addColorStop(1, withAlpha(paletteState.bg[1], 0.92));
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    orbs.forEach((orb)=>{
      const angle = t * orb.speed + orb.offset;
      const x = w / 2 + Math.cos(angle) * orb.radius + driftX * 0.35;
      const y = h / 2 + Math.sin(angle * 0.9) * (orb.radius * 0.6) + driftY * 0.2;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
      grad.addColorStop(0, `hsla(${orb.hue}, 72%, ${orb.light}%, ${0.42 * orb.opacity})`);
      grad.addColorStop(0.6, `hsla(${orb.hue + 24}, 68%, ${Math.max(26, orb.light - 18)}%, ${0.22 * orb.opacity})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - orb.size, y - orb.size, orb.size * 2, orb.size * 2);
    });

    stripes.forEach((stripe)=>{
      const oscillate = Math.sin(t * stripe.speed * 1.2 + stripe.offset);
      const thickness = stripe.thickness + oscillate * 12;
      const baseY = ((stripe.base + t * stripe.speed * 0.015) % 1) * (h + thickness * 2) - thickness;
      const y = baseY + driftY * 0.18;
      const grad = ctx.createLinearGradient(0, y, w, y + thickness);
      grad.addColorStop(0, `hsla(${stripe.hue - 22}, 80%, 62%, 0)`);
      grad.addColorStop(0.55, `hsla(${stripe.hue}, 88%, 70%, 0.35)`);
      grad.addColorStop(1, `hsla(${stripe.hue + 18}, 80%, 60%, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(-w * 0.08, y - thickness * 0.65, w * 1.16, thickness * 1.3);

      ctx.save();
      ctx.filter = 'blur(56px)';
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = grad;
      ctx.fillRect(-w * 0.08, y - thickness * 0.8, w * 1.16, thickness * 1.5);
      ctx.restore();
    });

    pulses.forEach((pulse)=>{
      const stripe = stripes[pulse.stripe];
      if(!stripe) return;
      pulse.position += pulse.speed * 0.0012;
      if(pulse.position > 1.3){
        pulse.position = -0.25;
        pulse.stripe = Math.floor(Math.random() * stripes.length);
        pulse.speed = 0.012 + Math.random() * 0.032;
        pulse.width = 0.12 + Math.random() * 0.12;
        pulse.phase = Math.random() * Math.PI * 2;
      }
      const stripeThickness = stripe.thickness;
      const stripeY = ((stripe.base + t * stripe.speed * 0.015) % 1) * (h + stripeThickness * 2) - stripeThickness + driftY * 0.18;
      const x = pulse.position * w + Math.sin(t * 0.6 + pulse.phase) * 64 + driftX * 0.6;
      const widthPx = w * (pulse.width * 0.14 + 0.06);
      const glow = ctx.createRadialGradient(x, stripeY, 0, x, stripeY, widthPx);
      glow.addColorStop(0, `hsla(${stripe.hue + 4}, 88%, 76%, 0.62)`);
      glow.addColorStop(0.55, `hsla(${stripe.hue - 8}, 80%, 64%, 0.26)`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(x - widthPx, stripeY - widthPx, widthPx * 2, widthPx * 2);
    });

    sparks.forEach((spark)=>{
      spark.y -= spark.speed * 0.0008;
      if(spark.y < -0.2){
        spark.y = 1.15;
        spark.x = Math.random();
        spark.speed = 0.02 + Math.random() * 0.05;
        spark.size = 28 + Math.random() * 38;
        spark.hue = pickHue();
        spark.drift = Math.random() * Math.PI * 2;
      }
      const sx = spark.x * w + Math.sin(t * 0.4 + spark.drift) * 48 + driftX * 0.32;
      const sy = spark.y * h + Math.cos(t * 0.5 + spark.drift) * 32 + driftY * 0.25;
      const radius = spark.size * 1.2;
      const alpha = 0.26 + Math.sin(t * 1.4 + spark.drift) * 0.2;
      const shimmer = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
      shimmer.addColorStop(0, `hsla(${spark.hue}, 90%, 72%, ${0.52 * alpha})`);
      shimmer.addColorStop(0.55, `hsla(${spark.hue + 12}, 76%, 64%, ${0.26 * alpha})`);
      shimmer.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shimmer;
      ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2);
    });

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.15;
    const gridSpacing = Math.max(220, Math.min(320, Math.max(w, h) / 2.1));
    const offsetX = (t * 6 + driftX * 0.03) % gridSpacing;
    const offsetY = (t * 5 + driftY * 0.03) % gridSpacing;
    ctx.lineWidth = 1;
    for(let xLine = -gridSpacing; xLine < w + gridSpacing; xLine += gridSpacing){
      const px = xLine + offsetX;
      const g = ctx.createLinearGradient(px, 0, px, h);
      g.addColorStop(0, 'rgba(120,200,255,0)');
      g.addColorStop(0.5, 'rgba(160,220,255,0.26)');
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
      g.addColorStop(0.5, 'rgba(180,230,255,0.22)');
      g.addColorStop(1, 'rgba(120,200,255,0)');
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }
    const sweepY = ((t * 0.03) % 1) * h;
    const sweepGrad = ctx.createLinearGradient(0, sweepY - 220, 0, sweepY + 220);
    sweepGrad.addColorStop(0, 'rgba(0,0,0,0)');
    sweepGrad.addColorStop(0.5, 'rgba(170,230,255,0.18)');
    sweepGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, sweepY - 240, w, 480);
    ctx.restore();

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(3,5,16,0.38)';
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
export const lgLEDPalettes = new Proxy({}, {
  get(_target, prop){
    if(typeof prop !== 'string') return undefined;
    if(!LED_PALETTE_KEYS.has(prop)) return '';
    return lgGetLEDPalette(prop);
  },
  has(_target, prop){
    return typeof prop === 'string' && LED_PALETTE_KEYS.has(prop);
  },
  ownKeys(){
    return Array.from(LED_PALETTE_KEYS);
  },
  getOwnPropertyDescriptor(_target, prop){
    if(typeof prop === 'string' && LED_PALETTE_KEYS.has(prop)){
      return { configurable: true, enumerable: true, value: lgGetLEDPalette(prop) };
    }
    return undefined;
  }
});
const ledPatterns = new Set(['chase','pulse','wave']);
export function lgApplyLEDGradient(rootSel='.led-field', pal='rf'){
  const palette = LED_PALETTE_KEYS.has(pal) ? pal : 'rf';
  const gradient = lgGetLEDPalette(palette);
  document.querySelectorAll(rootSel).forEach(s=> s.style.setProperty('--led-grad', gradient));
  return palette;
}
export function lgSetSpeed(rootSel='.led-field', mult=1){
  const base = 9;
  const factor = Math.max(0.4, Math.min(3, Number(mult) || 1));
  const duration = (base / factor).toFixed(2);
  document.querySelectorAll(rootSel).forEach(s=> s.style.setProperty('--speed', `${duration}s`));
  return factor;
}
export function lgSetPattern(rootSel='.led-field', pattern='chase'){
  const applied = ledPatterns.has(pattern) ? pattern : 'chase';
  document.querySelectorAll(rootSel).forEach(s=> s.setAttribute('data-led-pattern', applied));
  return applied;
}
export function lgSetIntensity(rootSel='.led-field', intensity=1){
  const value = Math.max(0.4, Math.min(1.2, Number(intensity) || 1));
  document.querySelectorAll(rootSel).forEach(s=> s.style.setProperty('--led-intensity', value.toFixed(2)));
  return value;
}

function cssColorToHue(value){
  const hsl = cssColorToHsl(value);
  return hsl ? hsl.h : null;
}

function cssColorToHsl(value){
  if(!value) return null;
  const raw = value.trim();
  if(!raw) return null;
  if(raw.startsWith('#')){
    return hexToHsl(raw);
  }
  const rgbMatch = raw.match(/rgba?\(([^)]+)\)/i);
  if(rgbMatch){
    const parts = rgbMatch[1].split(',').map(part=> Number(part.trim()));
    if(parts.length >= 3){
      return rgbToHsl(parts[0], parts[1], parts[2]);
    }
  }
  return null;
}

function hexToHsl(hex){
  const rgb = hexToRgb(hex);
  if(!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

function hexToRgb(hex){
  if(!hex) return null;
  let value = hex.trim().replace(/^#/, '');
  if(value.length === 3){
    value = value.split('').map(ch=> ch + ch).join('');
  }
  if(value.length !== 6) return null;
  const num = parseInt(value, 16);
  if(Number.isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl(r, g, b){
  const rn = (r ?? 0) / 255;
  const gn = (g ?? 0) / 255;
  const bn = (b ?? 0) / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if(max !== min){
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      default: h = (rn - gn) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function withAlpha(color, alpha){
  const rgb = hexToRgb(color);
  if(rgb){
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
  const rgbMatch = (color || '').match(/rgba?\(([^)]+)\)/i);
  if(rgbMatch){
    const parts = rgbMatch[1].split(',').map(part=> Number(part.trim()));
    if(parts.length >= 3){
      return `rgba(${parts[0] || 0}, ${parts[1] || 0}, ${parts[2] || 0}, ${alpha})`;
    }
  }
  return color;
}
