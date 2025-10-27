<script>
  import { onMount } from 'svelte';

  let observer;
  let sections = [];

  onMount(() => {
    const root = document.documentElement;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hue = entry.target.dataset.hue;
            if (hue) {
              root.style.setProperty('--ambient-hue', hue);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll('section[data-hue]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  });
</script>
