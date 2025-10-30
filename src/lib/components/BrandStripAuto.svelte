<script>
  const brands = [
    'Reclame Fabriek',
    'LED Node Partners',
    'City Light Lab',
    'Retail Stories',
    'Facade Studio',
    'Night Shift Media'
  ];
  const list = [...brands, ...brands];
</script>

<section class="container section" data-hue="300">
  <h2 id="brands">Trusted for signage</h2>
  <div class="scroller" aria-hidden="true">
    <div class="scroller-inner">
      {#each list as name}
        <span class="brand-chip">{name}</span>
      {/each}
    </div>
  </div>
  <p class="sr">{brands.join(', ')}</p>
</section>

<style>
  .scroller {
    overflow: hidden;
    -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
    mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  }
  .scroller-inner {
    display: flex;
    gap: 2rem;
    width: max-content;
    animation: scroll 30s linear infinite;
  }
  .brand-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .4rem .8rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.18);
    background: rgba(255,255,255,.04);
    font-weight: 600;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }
  .sr {
    position: absolute;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
  }
  @keyframes scroll {
    to {
      transform: translateX(-50%);
    }
  }
</style>
