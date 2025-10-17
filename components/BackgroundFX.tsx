import React, { useRef, useEffect } from 'react';
import { BrandTheme } from '../App';

interface BackgroundFXProps {
  brandTheme: BrandTheme;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  lightness: number;
  size: number;
  angle: number;
}

const BackgroundFX: React.FC<BackgroundFXProps> = ({ brandTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let vw: number, vh: number;
    let targetX = 0.5, targetY = 0.35, hx = 0.5, hy = 0.35;
    let lastPointerX = window.innerWidth / 2;
    let lastPointerY = window.innerHeight / 2;
    let pointerSpeed = 0;
    let smoothSpeed = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      vw = canvas.width = window.innerWidth;
      vh = canvas.height = window.innerHeight;
      lastPointerX = vw / 2;
      lastPointerY = vh / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const updatePointer = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        targetX = (clientX - rect.left) / rect.width;
        targetY = (clientY - rect.top) / rect.height;

        const dx = clientX - lastPointerX;
        const dy = clientY - lastPointerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        pointerSpeed = Math.min(1, dist / 50); // Normalize speed to a 0-1 range

        lastPointerX = clientX;
        lastPointerY = clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };
    window.addEventListener('pointermove', onPointerMove);

    const onTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        if(!touch) return;
        updatePointer(touch.clientX, touch.clientY);
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const createParticle = (): Particle => {
      const hues = {
        [BrandTheme.RF]: [320, 270, 190],
        [BrandTheme.Contrast]: [190, 220, 150],
        [BrandTheme.Warm]: [330, 270, 40]
      }[brandTheme];

      return {
        x: Math.random() * vw,
        y: Math.random() * vh,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 200 + Math.random() * 200,
        hue: hues[Math.floor(Math.random() * hues.length)],
        lightness: 50 + Math.random() * 15,
        size: 2 + Math.random() * 4,
        angle: Math.random() * Math.PI * 2
      };
    };

    const draw = () => {
      hx += (targetX - hx) * 0.04;
      hy += (targetY - hy) * 0.04;

      // Smoothly update and decay pointer speed
      smoothSpeed += (pointerSpeed - smoothSpeed) * 0.1;
      pointerSpeed *= 0.9; // Apply decay so effect fades when pointer stops

      ctx.clearRect(0, 0, vw, vh);

      const themeColors = {
        [BrandTheme.RF]: ['rgba(231,59,163,0.3)', 'rgba(108,43,217,0.25)'],
        [BrandTheme.Contrast]: ['rgba(0,212,255,0.3)', 'rgba(122,162,255,0.25)'],
        [BrandTheme.Warm]: ['rgba(255,77,179,0.3)', 'rgba(182,109,255,0.25)']
      };

      ctx.globalCompositeOperation = 'lighter';
      // Halo size expands with pointer speed
      const haloSize = Math.min(vw, vh) * (0.45 + smoothSpeed * 0.3);
      const grad = ctx.createRadialGradient(vw * hx, vh * hy, 0, vw * hx, vh * hy, haloSize);
      grad.addColorStop(0, themeColors[brandTheme][0]);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, vw, vh);
      
      // Manage particles
      if (particles.length < 100) {
        particles.push(createParticle());
      }
      
      const influenceRadius = vw * 0.15;
      const influenceRadiusSq = influenceRadius * influenceRadius;

      particles.forEach((p, i) => {
        // Apply friction/drag
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Repel from cursor
        const dx = p.x - (vw * hx);
        const dy = p.y - (vh * hy);
        const distSq = dx * dx + dy * dy;

        if (distSq < influenceRadiusSq) {
            const dist = Math.sqrt(distSq);
            // Force is stronger closer to cursor and with higher speed
            const force = (1 - dist / influenceRadius) * (smoothSpeed + 0.1) * 0.6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife || p.x < -p.size || p.x > vw + p.size || p.y < -p.size || p.y > vh + p.size) {
          particles[i] = createParticle();
        }

        const fadeInOut = Math.sin((p.life / p.maxLife) * Math.PI);
        const opacity = 0.6 * fadeInOut * (0.5 + Math.sin(p.life * 0.1) * 0.5);
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        const flareGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 6);
        flareGrad.addColorStop(0, `hsla(${p.hue}, 100%, ${p.lightness}%, ${opacity * 0.8})`);
        flareGrad.addColorStop(1, `hsla(${p.hue}, 100%, ${p.lightness}%, 0)`);

        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 6, p.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 100%, 95%, ${opacity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      if (!reduced) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (!reduced) {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [brandTheme]);

  return <canvas ref={canvasRef} id="fx" aria-hidden="true" className="fixed inset-0 w-screen h-screen -z-10 block bg-[var(--bg-0)]" />;
};

export default BackgroundFX;