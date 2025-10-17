import React, { useRef, useEffect } from 'react';
import { BrandTheme } from '../App';

interface BackgroundFXProps {
  brandTheme: BrandTheme;
}

interface Sphere {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  hue: number;
  phase: number;
  speed: number;
  pulseSpeed: number;
}

const BackgroundFX: React.FC<BackgroundFXProps> = ({ brandTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let vw: number, vh: number;
    let time = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    const spheres: Sphere[] = [];
    let bgColor = 'rgba(7, 8, 14, 0.03)'; // Cache bg color

    const resize = () => {
      vw = canvas.width = window.innerWidth;
      vh = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Update background color when theme changes
    const updateBgColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      bgColor = isDark ? 'rgba(7, 8, 14, 0.03)' : 'rgba(247, 248, 252, 0.03)';
    };
    updateBgColor();

    // Watch for theme changes
    const observer = new MutationObserver(updateBgColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Create LED-like halo spheres
    const createSphere = (index: number, total: number): Sphere => {
      const hues = {
        [BrandTheme.RF]: [320, 270, 190],
        [BrandTheme.Contrast]: [190, 220, 150],
        [BrandTheme.Warm]: [330, 270, 40]
      }[brandTheme];

      const angle = (index / total) * Math.PI * 2;
      const radius = Math.min(vw, vh) * 0.3;
      
      return {
        baseX: vw / 2 + Math.cos(angle) * radius,
        baseY: vh / 2 + Math.sin(angle) * radius,
        x: 0,
        y: 0,
        size: Math.min(vw, vh) * (0.15 + Math.random() * 0.1),
        hue: hues[index % hues.length],
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0002,
        pulseSpeed: 0.0008 + Math.random() * 0.0004
      };
    };

    // Initialize spheres
    const numSpheres = 4;
    for (let i = 0; i < numSpheres; i++) {
      spheres.push(createSphere(i, numSpheres));
    }

    const draw = () => {
      time++;
      
      // Fade out instead of clearing - use cached bg color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, vw, vh);

      ctx.globalCompositeOperation = 'lighter';

      spheres.forEach((sphere) => {
        // Very slow orbital movement
        const orbitX = Math.cos(time * sphere.speed + sphere.phase) * 60;
        const orbitY = Math.sin(time * sphere.speed + sphere.phase) * 40;
        
        sphere.x = sphere.baseX + orbitX;
        sphere.y = sphere.baseY + orbitY;

        // Slow pulsing
        const pulse = 0.7 + Math.sin(time * sphere.pulseSpeed + sphere.phase) * 0.3;
        const currentSize = sphere.size * pulse;

        // Create soft LED halo
        const gradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, currentSize
        );

        // Faded colors
        const opacity = 0.15;
        gradient.addColorStop(0, `hsla(${sphere.hue}, 80%, 60%, ${opacity * 0.8})`);
        gradient.addColorStop(0.4, `hsla(${sphere.hue}, 70%, 55%, ${opacity * 0.4})`);
        gradient.addColorStop(0.7, `hsla(${sphere.hue}, 60%, 50%, ${opacity * 0.15})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          sphere.x - currentSize,
          sphere.y - currentSize,
          currentSize * 2,
          currentSize * 2
        );

        // Core glow
        const coreGradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, currentSize * 0.3
        );
        coreGradient.addColorStop(0, `hsla(${sphere.hue}, 100%, 80%, ${opacity * 0.6})`);
        coreGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = coreGradient;
        ctx.fillRect(
          sphere.x - currentSize * 0.3,
          sphere.y - currentSize * 0.3,
          currentSize * 0.6,
          currentSize * 0.6
        );
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
      observer.disconnect();
    };
  }, [brandTheme]);

  return <canvas ref={canvasRef} id="fx" aria-hidden="true" className="fixed inset-0 w-screen h-screen -z-10 block bg-[var(--bg-0)]" />;
};

export default BackgroundFX;