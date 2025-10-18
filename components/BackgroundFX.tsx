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

    // Mouse and scroll tracking
    let mx = vw / 2, my = vh / 2, sx = 0, sy = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener('mousemove', onMouseMove);

    const onScroll = () => {
      const scrollElement = document.scrollingElement || document.documentElement;
      sx = scrollElement.scrollLeft;
      sy = scrollElement.scrollTop;
    };
    document.addEventListener('scroll', onScroll, { passive: true });

    // Create soft, faded flares
    const createSphere = (index: number): Sphere => {
      const hues = {
        [BrandTheme.RF]: [320, 270, 190],
        [BrandTheme.Contrast]: [190, 220, 150],
        [BrandTheme.Warm]: [330, 270, 40]
      }[brandTheme];

      return {
        baseX: vw * (0.2 + Math.random() * 0.6),
        baseY: vh * (0.3 + Math.random() * 0.4),
        x: 0,
        y: 0,
        size: Math.min(vw, vh) * (0.3 + Math.random() * 0.3),
        hue: hues[index % hues.length],
        phase: Math.random() * Math.PI * 2,
        speed: 0.00015 + Math.random() * 0.0001,
        pulseSpeed: 0.0004 + Math.random() * 0.0002
      };
    };

    // Initialize spheres
    const numSpheres = 3;
    for (let i = 0; i < numSpheres; i++) {
      spheres.push(createSphere(i));
    }

    const draw = () => {
      time++;
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, vw, vh);

      ctx.globalCompositeOperation = 'lighter';

      spheres.forEach((sphere, i) => {
        // 3D parallax effect based on mouse and scroll
        const parallaxFactor = 0.04 + i * 0.03;
        const targetX = sphere.baseX + (mx - vw / 2) * parallaxFactor - sx * 0.2;
        const targetY = sphere.baseY + (my - vh / 2) * parallaxFactor - sy * 0.3;
        
        sphere.x += (targetX - sphere.x) * 0.06;
        sphere.y += (targetY - sphere.y) * 0.06;

        // Slow pulsing and color shifting
        const pulse = 0.8 + Math.sin(time * sphere.pulseSpeed + sphere.phase) * 0.2;
        const currentSize = sphere.size * pulse;
        const currentHue = sphere.hue + Math.sin(time * sphere.speed * 0.5 + sphere.phase) * 10;

        // Create very soft, faded flare
        const gradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, currentSize
        );

        const opacity = 0.08;
        gradient.addColorStop(0, `hsla(${currentHue}, 80%, 70%, ${opacity})`);
        gradient.addColorStop(0.5, `hsla(${currentHue}, 70%, 60%, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          sphere.x - currentSize,
          sphere.y - currentSize,
          currentSize * 2,
          currentSize * 2
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
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [brandTheme]);

  return <canvas ref={canvasRef} id="fx" aria-hidden="true" className="fixed inset-0 w-screen h-screen -z-10 block bg-[var(--bg-0)]" />;
};

export default BackgroundFX;