<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  let canvas;
  let context;
  let pointer = { x: 9999, y: 9999 };
  let dots = [];

  const dotCount = 42;
  const dotRadius = 1.2;
  const bigDotRadius = 1.6;
  const bigDotChance = 0.2;
  const repelFactor = 0.00008;
  const G = 6.674e-11;

  // Smoothed pointer coordinates
  const smoothPointer = {
    x: spring(9999, { stiffness: 0.1, damping: 0.4 }),
    y: spring(9999, { stiffness: 0.1, damping: 0.4 })
  };

  onMount(() => {
    context = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);

    // Initial dot placement
    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() < bigDotChance ? bigDotRadius : dotRadius,
        mass: Math.random() < bigDotChance ? 1.5 : 1
      });
    }

    let animationFrame;
    const render = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      context.scale(devicePixelRatio, devicePixelRatio);

      context.clearRect(0, 0, width, height);

      // Gradient definitions
      const haloGradient = context.createRadialGradient(
        $smoothPointer.x,
        $smoothPointer.y,
        0,
        $smoothPointer.x,
        $smoothPointer.y,
        280
      );
      haloGradient.addColorStop(0, `hsla(var(--ambient-hue), 70%, 75%, 0.1)`);
      haloGradient.addColorStop(1, `hsla(var(--ambient-hue), 70%, 75%, 0)`);

      const cursorGradient = context.createRadialGradient(
        $smoothPointer.x,
        $smoothPointer.y,
        0,
        $smoothPointer.x,
        $smoothPointer.y,
        60
      );
      cursorGradient.addColorStop(0, `hsla(var(--ambient-hue), 80%, 80%, 0.22)`);
      cursorGradient.addColorStop(0.5, `hsla(var(--ambient-hue), 80%, 80%, 0.05)`);
      cursorGradient.addColorStop(1, `hsla(var(--ambient-hue), 80%, 80%, 0)`);

      const flareGradient = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width,height) / 1.5
      );
      flareGradient.addColorStop(0, `hsla(calc(var(--ambient-hue) - 30), 80%, 70%, 0.18)`);
      flareGradient.addColorStop(.5, `hsla(var(--ambient-hue), 80%, 70%, 0.05)`);
      flareGradient.addColorStop(1, `hsla(calc(var(--ambient-hue) + 40), 80%, 70%, 0)`);

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
        const dx = dot.x - $smoothPointer.x;
        const dy = dot.y - $smoothPointer.y;
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
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `hsla(var(--ambient-hue), 50%, 80%, ${0.22 * (1 - dist2 / 120)})`;
            context.stroke();
          }
        }
      });

      // Draw dots
      dots.forEach(dot => {
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(var(--ambient-hue), 70%, 90%, 0.8)`;
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
    smoothPointer.x.set(pointer.x);
    smoothPointer.y.set(pointer.y);
  }

  function handlePointerLeave() {
    smoothPointer.x.set(9999);
    smoothPointer.y.set(9999);
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
