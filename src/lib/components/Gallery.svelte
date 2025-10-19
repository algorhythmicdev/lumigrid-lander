<script>
  export let items = [
    {title:'Window glow', subtitle:'Evening flow', href:'#'},
    {title:'Logo halo', subtitle:'Clean white + edge', href:'#'},
    {title:'Façade sweep', subtitle:'Left to right', href:'#'},
    {title:'Promo sparkle', subtitle:'15 s burst', href:'#'},
    {title:'Calm morning', subtitle:'Low-key ambience', href:'#'},
    {title:'Midday clean', subtitle:'Bright, readable', href:'#'},
    {title:'Weekend halo', subtitle:'Warm vibe', href:'#'},
    {title:'Seasonal sparkle', subtitle:'Reusable scene', href:'#'}
  ];
</script>
<div class="gallery">
  {#each items as it}
    <a class="g-item reveal" href={it.href} aria-label={it.title}>
      <div class="g-ph"></div>
      <div class="g-cap"><strong>{it.title}</strong><span>{it.subtitle}</span></div>
    </a>
  {/each}
</div>
