<script>
  export let items = [
    { title: 'Window glow', subtitle: 'Evening flow', href: '#gallery', accent: 'var(--a)', accentB: 'var(--c)' },
    { title: 'Logo halo', subtitle: 'Clean white + edge', href: '#gallery', accent: 'var(--b)', accentB: 'var(--a)' },
    { title: 'Façade sweep', subtitle: 'Left to right', href: '#gallery', accent: 'var(--c)', accentB: 'var(--a)' },
    { title: 'Promo sparkle', subtitle: '15 s burst', href: '#gallery', accent: 'var(--halo-glow)', accentB: 'var(--a)' },
    { title: 'Calm morning', subtitle: 'Low-key ambience', href: '#gallery', accent: 'var(--c)', accentB: 'var(--halo-glow)' },
    { title: 'Midday clean', subtitle: 'Bright, readable', href: '#gallery', accent: 'var(--b)', accentB: 'var(--c)' },
    { title: 'Weekend halo', subtitle: 'Warm vibe', href: '#gallery', accent: 'var(--a)', accentB: 'var(--halo-glow)' },
    { title: 'Seasonal sparkle', subtitle: 'Reusable scene', href: '#gallery', accent: 'var(--b)', accentB: 'var(--halo-glow)' }
  ];
</script>
<div class="gallery">
  {#each items as it}
    <a class="g-item reveal" href={it.href} aria-label={it.title}>
      <div
        class="g-ph"
        style={`--accent:${it.accent ?? 'var(--a)'}; --accent-b:${it.accentB ?? 'var(--c)'}; --accent-c:${
          it.accentC ?? 'var(--halo-glow)'
        };`}
      >
        <span class="g-placeholder">Image coming soon</span>
      </div>
      <div class="g-cap"><strong>{it.title}</strong><span>{it.subtitle}</span></div>
    </a>
  {/each}
</div>
