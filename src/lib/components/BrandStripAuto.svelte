<script>
  const modules = import.meta.glob('/static/assets/brands/*');
  let list = [];
  for (const path in modules) {
    list.push(path.replace('/static', ''));
  }
</script>

<section class="container section" data-hue="300">
  <h2 id="brands">Trusted for signage</h2>
  <div class="scroller">
    <div class="scroller-inner">
      {#each [...list, ...list] as url}
        <img src={url} alt="" />
      {/each}
    </div>
  </div>
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
  .scroller-inner img {
    height: 48px;
    filter: grayscale(1) brightness(1.5);
    opacity: .8;
  }
  @keyframes scroll {
    to {
      transform: translateX(-50%);
    }
  }
</style>
