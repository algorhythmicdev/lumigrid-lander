<script lang="ts">
  import { onMount } from 'svelte';

  export let initialHue: number | null | undefined = undefined;

  let observer: IntersectionObserver | undefined;
  let mutationObserver: MutationObserver | undefined;
  const tracked = new WeakSet<Element>();

  const applyHue = (hue: number | string | null | undefined) => {
    if (typeof document === 'undefined') return;
    if (hue === null || hue === undefined) return;
    document.documentElement.style.setProperty('--ambient-hue', String(hue));
  };

  const registerSection = (section: Element | null | undefined) => {
    if (!section || !(section instanceof HTMLElement)) return;
    if (tracked.has(section)) return;
    observer?.observe(section);
    tracked.add(section);
  };

  const discoverSections = () => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll<HTMLElement>('section[data-hue]').forEach((section) => {
      registerSection(section);
    });
  };

  onMount(() => {
    applyHue(initialHue);

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            applyHue(target.dataset.hue);
          }
        });
      },
      { threshold: 0.4 }
    );

    discoverSections();

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;

            if (typeof node.matches === 'function' && node.matches('section[data-hue]')) {
              registerSection(node);
            }

            node.querySelectorAll('section[data-hue]').forEach((child) => {
              registerSection(child);
            });
          });
        }
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  });

  $: applyHue(initialHue);
</script>
