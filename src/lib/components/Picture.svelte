<script>
  export let src = '';
  export let alt = '';
  export let w = 1200;
  export let h = 560;
</script>

<picture>
  <source srcset={`${src}.avif`} type="image/avif" />
  <source srcset={`${src}.webp`} type="image/webp" />
  <img src={`${src}.jpg`} alt={alt} width={w} height={h} loading="lazy" decoding="async" style="width:100%;height:auto;display:block" />
</picture>
