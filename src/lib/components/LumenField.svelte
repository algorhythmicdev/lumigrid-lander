<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  let canvas;
  let context;
  let pointer = { x: 9999, y: 9999 };
  let dots = [];

  const dotCount = 42;
  const dotRadius = 2.8; // Scaled up by 200%
  const bigDotRadius = 4.4; // Scaled up by 200%
  const bigDotChance = 0.3;
  const repelFactor = 0.00008;
  const G = 6.674e-11;
  
  // LED pulsing effect
  let time = 0;

  // Smoothed pointer coordinates
  const smoothPointerX = spring(9999, { stiffness: 0.1, damping: 0.4 });
  const smoothPointerY = spring(9999, { stiffness: 0.1, damping: 0.4 });

  onMount(() => {
    context = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);

    // Get computed CSS variable value (cached, doesn't change during animation)
    const ambientHue = getComputedStyle(canvas).getPropertyValue('--ambient-hue').trim() || '260';

    // Initial dot placement
    for (let i = 0; i < dotCount; i++) {
      const isBig = Math.random() < bigDotChance;
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: isBig ? bigDotRadius : dotRadius,
        mass: isBig ? 1.5 : 1,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.8 + Math.random() * 0.6,
        isBig: isBig
      });
    }

    let animationFrame;
    const render = () => {
      time += 0.016; // Increment time for pulsing effect
      
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      context.scale(devicePixelRatio, devicePixelRatio);

      context.clearRect(0, 0, width, height);

      // Gradient definitions
      const smoothX = $smoothPointerX;
      const smoothY = $smoothPointerY;
      
      const haloGradient = context.createRadialGradient(
        smoothX,
        smoothY,
        0,
        smoothX,
        smoothY,
        280
      );
      haloGradient.addColorStop(0, `hsla(${ambientHue}, 70%, 75%, 0.1)`);
      haloGradient.addColorStop(1, `hsla(${ambientHue}, 70%, 75%, 0)`);

      const cursorGradient = context.createRadialGradient(
        smoothX,
        smoothY,
        0,
        smoothX,
        smoothY,
        60
      );
      cursorGradient.addColorStop(0, `hsla(${ambientHue}, 80%, 80%, 0.22)`);
      cursorGradient.addColorStop(0.5, `hsla(${ambientHue}, 80%, 80%, 0.05)`);
      cursorGradient.addColorStop(1, `hsla(${ambientHue}, 80%, 80%, 0)`);

      const flareGradient = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width,height) / 1.5
      );
      flareGradient.addColorStop(0, `hsla(${parseInt(ambientHue) - 30}, 80%, 70%, 0.18)`);
      flareGradient.addColorStop(.5, `hsla(${ambientHue}, 80%, 70%, 0.05)`);
      flareGradient.addColorStop(1, `hsla(${parseInt(ambientHue) + 40}, 80%, 70%, 0)`);

      // Draw gradients
      context.fillStyle = flareGradient;
      context.fillRect(0,0,width,height);

      context.fillStyle = haloGradient;
      context.fillRect(0, 0, width, height);

      context.fillStyle = cursorGradient;
      context.fillRect(0, 0, width, height);

      // Update dot positions and draw lines/dots
      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        // Pointer interaction
        const dx = dot.x - smoothX;
        const dy = dot.y - smoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) * repelFactor;
          dot.vx += force * dx / dist;
          dot.vy += force * dy / dist;
        }

        // Draw connecting filaments
        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j];
          const dx2 = dot.x - other.x;
          const dy2 = dot.y - other.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            // Add pulsing to connection lines
            const avgPulse = (Math.sin(time * dot.pulseSpeed + dot.pulseOffset) + 
                             Math.sin(time * other.pulseSpeed + other.pulseOffset)) / 2;
            const linePulse = 0.5 + avgPulse * 0.5;
            
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `hsla(${ambientHue}, 55%, 82%, ${0.18 * (1 - dist2 / 120) * linePulse})`;
            context.lineWidth = 1 + linePulse * 0.5;
            context.stroke();
            context.lineWidth = 1;
          }
        }
      });

      // Draw dots with LED pulsing effect
      dots.forEach(dot => {
        // Calculate pulse for this dot
        const pulse = Math.sin(time * dot.pulseSpeed + dot.pulseOffset);
        const pulseIntensity = 0.5 + pulse * 0.5; // 0.0 to 1.0
        
        // Draw outer glow for big LEDs
        if (dot.isBig) {
          const glowGradient = context.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, dot.radius * 3
          );
          glowGradient.addColorStop(0, `hsla(${ambientHue}, 80%, 85%, ${0.3 * pulseIntensity})`);
          glowGradient.addColorStop(0.5, `hsla(${ambientHue}, 80%, 85%, ${0.15 * pulseIntensity})`);
          glowGradient.addColorStop(1, `hsla(${ambientHue}, 80%, 85%, 0)`);
          context.fillStyle = glowGradient;
          context.beginPath();
          context.arc(dot.x, dot.y, dot.radius * 3, 0, Math.PI * 2);
          context.fill();
        }
        
        // Draw main LED dot
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        const brightness = 85 + pulseIntensity * 10; // Vary brightness
        context.fillStyle = `hsla(${ambientHue}, 75%, ${brightness}%, ${0.85 + pulseIntensity * 0.15})`;
        context.fill();
        
        // Add bright center for LED effect
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius * 0.5, 0, Math.PI * 2);
        context.fillStyle = `hsla(${ambientHue}, 80%, 98%, ${0.7 + pulseIntensity * 0.3})`;
        context.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  });

  function handlePointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    smoothPointerX.set(pointer.x);
    smoothPointerY.set(pointer.y);
  }

  function handlePointerLeave() {
    smoothPointerX.set(9999);
    smoothPointerY.set(9999);
  }
</script>

<canvas
  bind:this={canvas}
  on:pointermove={handlePointerMove}
  on:pointerleave={handlePointerLeave}
  class="lumen-field"
></canvas>

<style>
  .lumen-field {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none; /* Pointer events are handled by the window */
    background: transparent;
    mix-blend-mode: screen;
    opacity: 0; /* Fade in when ready */
    animation: fadeIn 3s forwards;
    animation-delay: 0.5s;
  }

  @media (pointer: fine) {
    .lumen-field {
      pointer-events: auto;
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lumen-field {
      animation: none;
      opacity: 1;
    }
  }
</style>
