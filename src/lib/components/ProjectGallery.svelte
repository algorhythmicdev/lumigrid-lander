<script>
  export let items = [
    {
      id: 'w1',
      title: 'Shop window — calm colour',
      tag: 'Retail',
      src: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade'
    },
    {
      id: 'l1',
      title: 'Logo letters — clean white',
      tag: 'Brand',
      src: 'https://images.unsplash.com/photo-1543997385-22fe0f7a9a04'
    },
    {
      id: 'f1',
      title: 'Façade bands — synced',
      tag: 'Outdoor',
      src: 'https://images.unsplash.com/photo-1520975922284-4c2e3e86b3d0'
    },
    {
      id: 'w2',
      title: 'Window — evening halo',
      tag: 'Retail',
      src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6'
    },
    {
      id: 'l2',
      title: 'Letters — soft rim',
      tag: 'Brand',
      src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4'
    }
  ];
</script>

<section class="section container" id="gallery" aria-labelledby="g-h">
  <h2 id="g-h" style="font-size:var(--fs-h2);margin:0 0 .75rem">Project gallery</h2>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem">
    {#each items as it}
      <a
        class="card tile"
        href="#contact"
        aria-label={`${it.title} (${it.tag})`}
        style="padding:0;overflow:hidden"
      >
        <picture>
          <source srcset={`${it.src}?auto=format&fit=crop&w=960&q=80`} type="image/jpeg" />
          <img
            src={`${it.src}?auto=format&fit=crop&w=960&q=70`}
            alt=""
            loading="lazy"
            decoding="async"
            style="display:block;width:100%;height:220px;object-fit:cover;filter:contrast(1.06) saturate(1.05)"
          />
        </picture>
        <div class="cap">
          <strong>{it.title}</strong><span>{it.tag}</span>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  .tile {
    position: relative;
    transform: translateZ(0);
  }
  .tile picture {
    display: block;
  }
  .tile::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(60% 80% at 50% 40%, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.35));
    transition: 0.3s;
  }
  .tile:hover::after,
  .tile:focus-visible::after {
    background: radial-gradient(60% 80% at 50% 40%, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.15));
  }
  .cap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    color: #fff;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45));
    transform: translateY(18px);
    opacity: 0.92;
    transition: 0.25s;
  }
  .tile:hover .cap,
  .tile:focus-visible .cap {
    transform: none;
  }
  .cap span {
    opacity: 0.8;
    font-size: 0.9rem;
  }
</style>
