import React, { useRef, useEffect } from 'react';

interface Flare {
  x: number;
  y: number;
  z: number;
  t0: number;
  life: number;
  palette: {
    main: { canvas: HTMLCanvasElement; r: number; };
    bloom: { canvas: HTMLCanvasElement; r: number; } | null;
  };
  baseRadius: number;
  blinkHz: number;
  dead: boolean;
}

const BackgroundFX: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ==== CONFIG ===============================================================
    const FX_CONFIG = {
      count: 42,
      spawnRate: 0.08,
      depth: { near: 0.9, far: 3.2 },
      radiusPx: { near: 380, far: 120 },
      hueSet: [
        {h: 316, s: 85, l: 60}, // magenta
        {h: 265, s: 77, l: 62}, // violet
        {h: 188, s: 82, l: 60}, // cyan
        {h:  42, s: 97, l: 67}  // warm amber
      ],
      baseOpacity: 0.18,
      addBloom: true,
      pointerParallax: 0.035,
      cameraDrift: 0.0008,
      maxBlinkHz: 2.2,
      reduceMotionMedia: window.matchMedia('(prefers-reduced-motion: reduce)')
    };

    // ==== BOILERPLATE ==========================================================
    let vw = 0, vh = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
    const handleResize = () => {
      vw = canvas.width  = Math.floor(innerWidth  * dpr);
      vh = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
    }
    handleResize();
    window.addEventListener('resize', handleResize, {passive:true});

    // ==== SPRITE CACHE ==========================================================
    function makeSprite(baseRadiusPx: number, colorStop: { h: number; s: number; l: number; }, feather = 1){
      const r = Math.max(8, Math.floor(baseRadiusPx * dpr));
      const off = document.createElement('canvas');
      off.width = off.height = r * 2;
      const g = off.getContext('2d');
      if (!g) return { canvas: off, r };
      const grad = g.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0.0, `hsla(${colorStop.h},${colorStop.s}%,${Math.min(96, colorStop.l+15)}%,${0.95*feather})`);
      grad.addColorStop(0.35, `hsla(${colorStop.h},${colorStop.s}%,${colorStop.l}%,${0.55*feather})`);
      grad.addColorStop(1.0, `hsla(${colorStop.h},${Math.max(30,colorStop.s-15)}%,${Math.max(20,colorStop.l-25)}%,0)`);
      g.fillStyle = grad;
      g.beginPath(); g.arc(r, r, r, 0, Math.PI*2); g.fill();
      return { canvas: off, r };
    }

    const SPRITES = FX_CONFIG.hueSet.map(hsl => ({
      main:  makeSprite(320, hsl, 1.0),
      bloom: FX_CONFIG.addBloom ? makeSprite(520, hsl, 0.55) : null
    }));

    // ==== STATE ================================================================
    const reduced = FX_CONFIG.reduceMotionMedia.matches;
    let pointer = { x: 0.5, y: 0.35 };
    let cam = { x: 0, y: 0 };
    let world = { w: 4000, h: 2600 };
    let timeStart = performance.now();
    let flares: Flare[] = [];
    let spawnAccumulator = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const px = e.clientX / innerWidth;
      const py = e.clientY / innerHeight;
      pointer.x = px; pointer.y = py;
    };
    window.addEventListener('pointermove', handlePointerMove, {passive:true});

    function spawnFlare(): Flare {
      const palette = SPRITES[Math.floor(Math.random()*SPRITES.length)];
      const z = FX_CONFIG.depth.near + Math.random()*(FX_CONFIG.depth.far - FX_CONFIG.depth.near);
      const x = (Math.random() - 0.5) * world.w;
      const y = (Math.random() - 0.5) * world.h;
      const life = 8_000 + Math.random()*10_000;
      const t0 = performance.now();
      const blinkHz = 0.6 + Math.random()* (FX_CONFIG.maxBlinkHz - 0.6);
      const baseRadius = lerp(FX_CONFIG.radiusPx.far, FX_CONFIG.radiusPx.near, invLerp(FX_CONFIG.depth.far, FX_CONFIG.depth.near, z));
      return { x, y, z, t0, life, palette, baseRadius, blinkHz, dead:false };
    }

    function lerp(a: number,b: number,t: number){ return a + (b-a)*t; }
    function invLerp(a: number,b: number,v: number){ return (v-a)/(b-a); }
    function easeInOut(t: number){ return t<0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }

    // ==== RENDER LOOP ==========================================================
    let raf: number | null = null;
    function frame(now: number){
      const t = now - timeStart;
      cam.x = Math.sin(t*FX_CONFIG.cameraDrift) * 120 + (pointer.x - 0.5) * world.w * FX_CONFIG.pointerParallax;
      cam.y = Math.cos(t*FX_CONFIG.cameraDrift*1.2) * 80  + (pointer.y - 0.5) * world.h * FX_CONFIG.pointerParallax;

      ctx.clearRect(0,0,vw,vh);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(0,0,0,0.25)`;
      ctx.fillRect(0,0,vw,vh);

      ctx.globalCompositeOperation = 'lighter';

      spawnAccumulator += FX_CONFIG.spawnRate;
      while(spawnAccumulator > 1){
        flares.push(spawnFlare());
        spawnAccumulator -= 1;
      }
      if (flares.length < FX_CONFIG.count && Math.random() < FX_CONFIG.spawnRate){
        flares.push(spawnFlare());
      }

      flares.sort((a,b)=> b.z - a.z);

      for(const f of flares){
        const age = now - f.t0;
        const nt = Math.min(1, age / f.life);
        const fade = easeInOut(Math.min(nt*1.3, 1));
        const fadeOut = easeInOut(1 - Math.max(0, (age - f.life*0.6) / (f.life*0.4)));
        const alpha = FX_CONFIG.baseOpacity * fade * fadeOut;

        if (alpha <= 0.002){ f.dead = (age > f.life); continue; }

        const blink = 0.85 + 0.15 * Math.sin(age * 0.002 * f.blinkHz * Math.PI*2);
        const fov = 420;
        const sx = ((f.x - cam.x) / f.z) * fov + vw*0.5;
        const sy = ((f.y - cam.y) / f.z) * fov + vh*0.5;
        const scale = (1 / f.z);
        const r = Math.max(8, f.baseRadius * scale) * dpr;
        const sprMain = f.palette.main;
        const sprBloom = f.palette.bloom;

        if (sprBloom){
          const k = (r / sprBloom.r);
          ctx.globalAlpha = alpha * 0.6 * blink;
          ctx.drawImage(sprBloom.canvas, sx - sprBloom.r*k, sy - sprBloom.r*k, sprBloom.canvas.width*k, sprBloom.canvas.height*k);
        }

        const k2 = (r / sprMain.r);
        ctx.globalAlpha = alpha * blink;
        ctx.drawImage(sprMain.canvas, sx - sprMain.r*k2, sy - sprMain.r*k2, sprMain.canvas.width*k2, sprMain.canvas.height*k2);
      }
      ctx.globalAlpha = 1;

      if (flares.length > FX_CONFIG.count * 2){
        flares = flares.filter(f => !f.dead);
      }

      raf = requestAnimationFrame(frame);
    }

    if (!reduced) {
      raf = requestAnimationFrame(frame);
    } else {
      ctx.fillStyle = '#0b1020';
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    const handleVisibilityChange = () => {
      if (document.hidden && raf){ cancelAnimationFrame(raf); raf = null; }
      else if (!document.hidden && !reduced && !raf){ timeStart = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, []);

  return <canvas ref={canvasRef} id="fx" aria-hidden="true" className="fixed inset-0 w-screen h-screen -z-10 block bg-[var(--bg-0)]" />;
};

export default BackgroundFX;