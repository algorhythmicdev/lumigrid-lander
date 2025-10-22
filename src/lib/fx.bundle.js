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
  const win = getWindow();
  if(!doc) return cleanupNoop;
  const reduce = getMediaQueryList('(prefers-reduced-motion: reduce)');
  const elements = [...doc.querySelectorAll(selector)];
  if(!elements.length) return cleanupNoop;
  const ratio = Math.max(0, Math.min(1, Number.isFinite(threshold) ? threshold : 0));
  const showAll = () => elements.forEach((el) => el.classList.add('in'));
  const markInitial = () => {
    if(!win) return;
    const viewport = win.innerHeight || doc.documentElement?.clientHeight || 0;
    const lowerBound = -viewport * ratio;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if(rect.top <= viewport && rect.bottom >= lowerBound){
        el.classList.add('in');
      }
    });
  };
  if(reduce.matches){
    showAll();
    return cleanupNoop;
  }
  markInitial();
  const io = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),{threshold});
  elements.forEach((el)=> io.observe(el));
  const handleReduce = (event) => {
    if(event.matches){
      showAll();
      io.disconnect();
    } else {
      markInitial();
      elements.forEach((el)=> io.observe(el));
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
  const labelEl = toggleBtn.querySelector('[data-tts-label]') ?? toggleBtn;
  const indicatorEl = toggleBtn.querySelector('[data-tts-indicator]');
  const labelOn = toggleBtn.getAttribute('data-label-on') ?? 'Reading';
  const labelOff = toggleBtn.getAttribute('data-label-off') ?? 'Read aloud';
  let on=false;
  const set=(value)=>{
    on=value;
    toggleBtn.setAttribute('aria-pressed', String(on));
    toggleBtn.dataset.tts = on ? 'on' : 'off';
    labelEl.textContent = on ? labelOn : labelOff;
    if(indicatorEl){
      indicatorEl.hidden = !on;
    }
    if(!on && synth.speaking) synth.cancel();
  };
  set(false);
  const handleToggle = ()=> set(!on);
  const handleDblClick = (event)=>{
    if(!on) return;
    const node=event.target.closest('p, h1, h2, h3, li, summary, figcaption');
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
export function backgroundFlares({ canvasId = 'lg-fx' } = {}) {
  const doc = getDocument();
  const win = getWindow();
  if (!doc || !win) return cleanupNoop;
  const canvas = doc.getElementById(canvasId);
  if (!canvas) return cleanupNoop;
  canvas.style.setProperty('pointer-events', 'none', 'important');
  canvas.style.setProperty('position', 'fixed', 'important');
  canvas.style.setProperty('inset', '0', 'important');
  canvas.style.setProperty('z-index', '-1', 'important');
  if (!canvas.style.top) canvas.style.top = '0';
  if (!canvas.style.right) canvas.style.right = '0';
  if (!canvas.style.bottom) canvas.style.bottom = '0';
  if (!canvas.style.left) canvas.style.left = '0';
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return cleanupNoop;
  const root = doc.documentElement;
  const compute = getComputed();
  const reduceMotion = getMediaQueryList('(prefers-reduced-motion: reduce)');
  const schemeMedia = win.matchMedia('(prefers-color-scheme: dark)');

  const clampByte = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const hexToRgb = (hex) => {
    if (!hex) return null;
    let value = hex.trim().replace('#', '');
    if (!value) return null;
    if (value.length === 3) {
      value = value
        .split('')
        .map((char) => char + char)
        .join('');
    }
    if (value.length !== 6) return null;
    const int = Number.parseInt(value, 16);
    if (Number.isNaN(int)) return null;
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    };
  };
  const rgbStringToRgb = (input) => {
    if (!input) return null;
    const match = input
      .trim()
      .match(/rgba?\s*\(([^)]+)\)/i);
    if (!match) return null;
    const parts = match[1].split(',').map((part) => part.trim());
    if (parts.length < 3) return null;
    const [r, g, b] = parts.map((part) => clampByte(Number.parseFloat(part)));
    if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
    return { r, g, b };
  };
  const parseColor = (value, fallback) =>
    rgbStringToRgb(value) ?? hexToRgb(value) ?? rgbStringToRgb(fallback) ?? hexToRgb(fallback) ?? { r: 0, g: 0, b: 0 };
  const colorWithAlpha = ({ r, g, b }, alpha) => `rgba(${clampByte(r)}, ${clampByte(g)}, ${clampByte(b)}, ${Math.max(0, Math.min(1, alpha))})`;

  const readPalette = () => {
    const styles = compute ? compute(root) : null;
    const readColor = (prop, fallback) => {
      const raw = styles?.getPropertyValue(prop)?.trim();
      return parseColor(raw && raw.length ? raw : undefined, fallback);
    };
    const basePrimary = styles?.getPropertyValue('--a')?.trim() || '#e73ba3';
    const baseSecondary = styles?.getPropertyValue('--b')?.trim() || '#6c2bd9';
    const baseTertiary = styles?.getPropertyValue('--c')?.trim() || '#1cc5dc';
    const baseWarmth = styles?.getPropertyValue('--warm')?.trim() || '#ffd166';
    const baseTwinkle = styles?.getPropertyValue('--ink')?.trim() || '#f8fbff';
    const baseSurface = styles?.getPropertyValue('--bg-0')?.trim() || '#05060d';
    const accentPrimary = styles?.getPropertyValue('--active-orbit-a')?.trim();
    const accentSecondary = styles?.getPropertyValue('--active-orbit-b')?.trim();
    const accentGlow = styles?.getPropertyValue('--active-orbit-glow')?.trim();
    const accentStrengthRaw = styles?.getPropertyValue('--active-orbit-strength');
    const accentStrengthParsed = Number.parseFloat(accentStrengthRaw ?? '');
    const accentStrength = Number.isNaN(accentStrengthParsed) ? 0.5 : accentStrengthParsed;
    return {
      primary: readColor('--a', basePrimary),
      secondary: readColor('--b', baseSecondary),
      tertiary: readColor('--c', baseTertiary),
      warmth: readColor('--warm', baseWarmth),
      twinkle: readColor('--ink', baseTwinkle),
      base: readColor('--bg-0', baseSurface),
      accentPrimary: parseColor(accentPrimary, basePrimary),
      accentSecondary: parseColor(accentSecondary, baseSecondary),
      accentGlow: parseColor(accentGlow, baseTertiary),
      accentStrength
    };
  };

  let palette = readPalette();
  let dpr = Math.max(1, win.devicePixelRatio || 1);
  let width = 0;
  let height = 0;
  let running = false;
  let raf = 0;
  const pointer = { x: 0.5, y: 0.35 };
  const target = { x: 0.5, y: 0.35 };
  let scrollProgress = 0;
  const twinkles = Array.from({ length: 60 }, () => ({
    baseX: Math.random(),
    baseY: Math.random(),
    driftX: 0.015 + Math.random() * 0.03,
    driftY: 0.02 + Math.random() * 0.035,
    phase: Math.random() * Math.PI * 2,
    radius: 0.75 + Math.random() * 1.35
  }));

  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const stageCache = {
    '--stage-grid-focus-x': '',
    '--stage-grid-focus-y': '',
    '--stage-grid-offset-x': '',
    '--stage-grid-offset-y': ''
  };
  const setStageVar = (name, value) => {
    if(stageCache[name] === value) return;
    stageCache[name] = value;
    root.style.setProperty(name, value);
  };
  const projectPointerY = (rawY, scroll) => {
    const anchor = 0.25 + scroll * 0.5;
    const desired = Math.min(0.92, Math.max(0.1, anchor * 0.6 + rawY * 0.4));
    return desired;
  };
  const applyStageFocus = (px, py, scroll) => {
    const clampedX = clamp01(px);
    const clampedY = clamp01(py);
    const focusX = `${(clampedX * 100).toFixed(2)}%`;
    const focusY = `${(clampedY * 100).toFixed(2)}%`;
    const offsetX = `${((clampedX - 0.5) * 32).toFixed(2)}px`;
    const offsetY = `${(((scroll - 0.5) * 60) + (clampedY - 0.5) * 26).toFixed(2)}px`;
    setStageVar('--stage-grid-focus-x', focusX);
    setStageVar('--stage-grid-focus-y', focusY);
    setStageVar('--stage-grid-offset-x', offsetX);
    setStageVar('--stage-grid-offset-y', offsetY);
  };

  const now = () => win.performance?.now?.() ?? Date.now();

  const drawInstant = () => {
    if (running) return;
    drawFrame(now(), true);
  };

  const resize = () => {
    dpr = Math.max(1, win.devicePixelRatio || 1);
    width = Math.floor(win.innerWidth * dpr);
    height = Math.floor(win.innerHeight * dpr);
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${win.innerWidth}px`;
    canvas.style.height = `${win.innerHeight}px`;
    applyStageFocus(pointer.x, pointer.y, scrollProgress);
    drawInstant();
  };

  const updatePalette = () => {
    palette = readPalette();
    drawInstant();
  };

  const updateScroll = () => {
    const docHeight = Math.max(1, doc.documentElement.scrollHeight - win.innerHeight);
    scrollProgress = docHeight > 0 ? (win.scrollY || 0) / docHeight : 0;
    const projected = projectPointerY(target.y, scrollProgress);
    applyStageFocus(target.x, projected, scrollProgress);
    drawInstant();
  };

  const pointerMove = (event) => {
    target.x = event.clientX / win.innerWidth;
    target.y = event.clientY / win.innerHeight;
    const projected = projectPointerY(target.y, scrollProgress);
    applyStageFocus(target.x, projected, scrollProgress);
    drawInstant();
  };

  const pointerLeave = () => {
    target.x = 0.5;
    target.y = 0.35;
    const projected = projectPointerY(target.y, scrollProgress);
    applyStageFocus(target.x, projected, scrollProgress);
    drawInstant();
  };

  const touchMove = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    target.x = touch.clientX / win.innerWidth;
    target.y = touch.clientY / win.innerHeight;
    const projected = projectPointerY(target.y, scrollProgress);
    applyStageFocus(target.x, projected, scrollProgress);
    drawInstant();
  };

  function drawFrame(timestamp, immediate = false) {
    const time = (timestamp || 0) * 0.001;
    if (immediate) {
      pointer.x = target.x;
    } else {
      pointer.x += (target.x - pointer.x) * 0.06;
    }
    const scrollAnchor = 0.25 + scrollProgress * 0.5;
    const desiredY = projectPointerY(target.y, scrollProgress);
    if (immediate) {
      pointer.y = desiredY;
    } else {
      pointer.y += (desiredY - pointer.y) * 0.065;
    }

    applyStageFocus(pointer.x, pointer.y, scrollProgress);

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    const accentStrength = Math.min(0.9, Math.max(0.2, palette.accentStrength ?? 0.5));
    ctx.fillStyle = colorWithAlpha(palette.base, 0.08 + accentStrength * 0.06);
    ctx.fillRect(0, 0, width, height);

    const minDim = Math.min(width, height);
    const x1 = width * pointer.x + 36 * dpr * Math.sin(time * 0.6);
    const y1 = height * pointer.y + 28 * dpr * Math.cos(time * 0.5);
    const auraConfigs = [
      {
        x: x1,
        y: y1,
        radius: minDim * 0.85,
        stops: [
          { offset: 0, color: colorWithAlpha(palette.accentPrimary, 0.24 + accentStrength * 0.18) },
          { offset: 0.55, color: colorWithAlpha(palette.accentSecondary, 0.18 + accentStrength * 0.12) },
          { offset: 1, color: 'rgba(0,0,0,0)' }
        ]
      },
      {
        x: width * (0.18 + pointer.x * 0.55),
        y: height * (0.22 + scrollProgress * 0.5),
        radius: minDim * 0.68,
        stops: [
          { offset: 0, color: colorWithAlpha(palette.accentGlow, 0.18 + accentStrength * 0.1) },
          { offset: 0.6, color: colorWithAlpha(palette.tertiary, 0.12 + accentStrength * 0.1) },
          { offset: 1, color: 'rgba(0,0,0,0)' }
        ]
      },
      {
        x: width * (0.88 - pointer.x * 0.45),
        y: height * (0.82 - scrollProgress * 0.4),
        radius: minDim * 0.74,
        stops: [
          { offset: 0, color: colorWithAlpha(palette.secondary, 0.22 + accentStrength * 0.12) },
          { offset: 0.58, color: colorWithAlpha(palette.warmth, 0.14 + accentStrength * 0.08) },
          { offset: 1, color: 'rgba(0,0,0,0)' }
        ]
      }
    ];

    ctx.globalCompositeOperation = 'lighter';
    auraConfigs.forEach(({ x, y, radius, stops }) => {
      const gradient = ctx.createRadialGradient(x, y, radius * 0.08, x, y, radius);
      stops.forEach(({ offset, color }) => gradient.addColorStop(offset, color));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    twinkles.forEach((twinkle, index) => {
      const wave = time * 0.35 + twinkle.phase + index * 0.035;
      const x = ((twinkle.baseX + scrollProgress * 0.25 + time * twinkle.driftX) % 1) * width;
      const y = ((twinkle.baseY + scrollProgress * 0.4 + time * twinkle.driftY) % 1) * height;
      const blink = 0.35 + 0.45 * Math.sin(wave * 4);
      const size = (twinkle.radius + 0.4 * Math.sin(wave * 3.2)) * dpr;
      ctx.fillStyle = colorWithAlpha(palette.twinkle, 0.16 + blink * 0.3);
      ctx.beginPath();
      ctx.arc(x, y, Math.max(size, 0.6 * dpr), 0, Math.PI * 2);
      ctx.fill();
    });
  }

  const loop = (timestamp) => {
    raf = 0;
    drawFrame(timestamp);
    if (running) {
      raf = win.requestAnimationFrame(loop);
    }
  };

  const start = () => {
    if (running) return;
    running = true;
    raf = win.requestAnimationFrame(loop);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    if (raf) {
      win.cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const visibilityHandler = () => {
    if (doc.hidden) {
      stop();
    } else if (!reduceMotion.matches) {
      start();
    } else {
      drawInstant();
    }
  };

  const reduceHandler = (event) => {
    if (event.matches) {
      stop();
      drawFrame(now(), true);
    } else {
      updateScroll();
      start();
    }
  };

  const themeObserver = typeof win.MutationObserver !== 'undefined'
    ? new win.MutationObserver(updatePalette)
    : null;

  resize();
  updateScroll();
  updatePalette();
  if (!reduceMotion.matches) {
    start();
  } else {
    drawFrame(now(), true);
  }

  win.addEventListener('resize', resize, { passive: true });
  doc.addEventListener('scroll', updateScroll, { passive: true });
  win.addEventListener('pointermove', pointerMove, { passive: true });
  win.addEventListener('pointerleave', pointerLeave, { passive: true });
  win.addEventListener('touchmove', touchMove, { passive: true });
  doc.addEventListener('visibilitychange', visibilityHandler);
  reduceMotion.addEventListener('change', reduceHandler);
  themeObserver?.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-color', 'data-section', 'style'] });
  schemeMedia.addEventListener('change', updatePalette);

  return () => {
    stop();
    win.removeEventListener('resize', resize);
    doc.removeEventListener('scroll', updateScroll);
    win.removeEventListener('pointermove', pointerMove);
    win.removeEventListener('pointerleave', pointerLeave);
    win.removeEventListener('touchmove', touchMove);
    doc.removeEventListener('visibilitychange', visibilityHandler);
    reduceMotion.removeEventListener('change', reduceHandler);
    themeObserver?.disconnect();
    schemeMedia.removeEventListener('change', updatePalette);
    Object.keys(stageCache).forEach((key) => root.style.removeProperty(key));
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
