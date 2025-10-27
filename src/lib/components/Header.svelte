<script>
  import { base } from '$app/paths';
</script>

<div
  class="container"
  style="position:sticky;top:0;z-index:10;padding:.6rem 0;backdrop-filter:blur(8px);background:rgba(5,8,15,.45);border-bottom:1px solid rgba(255,255,255,.08)"
>
  <div style="display:flex;align-items:center;gap:.75rem">
    <a href="#hero" class="btn brand" aria-label="Reclame Fabriek R&D home">
      <img src={`${base}/icons/icon.svg`} alt="" class="brand-mark" aria-hidden="true" />
      <span class="brand-label">Reclame Fabriek R&D</span>
    </a>
    <div style="margin-left:auto;display:flex;gap:.5rem;flex-wrap:wrap">
      <a class="btn" href="#what">What it is</a>
      <a class="btn" href="#examples">Examples</a>
      <a class="btn" href="#gallery">Gallery</a>
      <a class="btn primary" href="#contact">Contact</a>
    </div>
  </div>
</div>
