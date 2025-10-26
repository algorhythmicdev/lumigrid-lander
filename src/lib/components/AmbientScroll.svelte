<script>
  import { onMount } from 'svelte';

  export let sections = [
    { id: 'hero', hue: 285 },
    { id: 'what', hue: 320 },
    { id: 'examples', hue: 200 },
    { id: 'nodes', hue: 285 },
    { id: 'faq', hue: 315 },
    { id: 'contact', hue: 60 }
  ];

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((section) => section.id === entry.target.id);
            if (matched) {
              document.documentElement.style.setProperty('--glow-hue', matched.hue);
            }
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  });
</script>
