<script>
  export let logos = [
    { alt: 'Brand A', src: 'https://dummyimage.com/160x48/fff/000&text=A' },
    { alt: 'Brand B', src: 'https://dummyimage.com/160x48/fff/000&text=B' },
    { alt: 'Brand C', src: 'https://dummyimage.com/160x48/fff/000&text=C' },
    { alt: 'Brand D', src: 'https://dummyimage.com/160x48/fff/000&text=D' }
  ];
</script>

<section class="section container" id="brands" aria-labelledby="bm-h">
  <h2 id="bm-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Trusted for signage</h2>
  <div class="card" style="overflow:hidden">
    <div class="rail">
      {#each [...logos, ...logos] as l}
        <div class="slot"><img src={l.src} alt={l.alt} loading="lazy" /></div>
      {/each}
      <div class="sweep"></div>
    </div>
  </div>
</section>

<style>
  .rail {
    display: flex;
    gap: 2.5rem;
    padding: 1rem 2rem;
    animation: marquee 24s linear infinite;
    position: relative;
  }
  .slot {
    display: grid;
    place-items: center;
    min-width: 160px;
    height: 64px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35));
  }
  .slot img {
    opacity: 0.85;
  }
  .sweep {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 140px;
    translate: -50% 0;
    left: 20%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    filter: blur(6px);
    animation: sweep 8s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes marquee {
    to {
      transform: translateX(-50%);
    }
  }
  @keyframes sweep {
    50% {
      left: 80%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .rail {
      animation: none;
      justify-content: center;
    }
    .sweep {
      display: none;
    }
  }
</style>
