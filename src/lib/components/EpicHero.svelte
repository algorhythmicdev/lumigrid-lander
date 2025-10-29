<script>
  export let title = 'LED Node';
  export let kicker = 'Reclame Fabriek R&D';
  export let sub = 'A compact controller for LED signage. Pick a look, set a simple plan, lights stay in step.';
</script>

<div style="position:relative; z-index:1">
  <p style="letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin:0 0 .35rem">{kicker}</p>
  <h1 class="kg" style="font-size:clamp(2.4rem,6.2vw,4.5rem); line-height:1.05; margin:.1rem 0">
    {title}
  </h1>
  <p class="lead" style="color:var(--muted); max-width:64ch; margin:.6rem 0 1rem">{sub}</p>

  <div class="glassbar">
    <a href="#cases" class="btn primary">See examples</a>
    <a href="#contact" class="btn">Talk to us</a>
  </div>
</div>

<style>
  .glassbar{
    display:flex; gap:.6rem; flex-wrap:wrap;
    background: rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.14);
    border-radius:.9rem; padding:.6rem; backdrop-filter: blur(8px);
  }
</style>
