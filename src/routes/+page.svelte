<script>
  import '$lib/styles.css';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import InfoBlocks from '$lib/components/InfoBlocks.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import LedDemo from '$lib/components/LedDemo.svelte';
  import NodeViz from '$lib/components/NodeViz.svelte';
  import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
  <title>LED Node — Reclame Fabriek R&D</title>
  <meta name="description" content="LED Node is a compact controller for LED lighting in signs, shop windows, and façades. Pick a look, set a simple plan, and lights stay in step.">
</svelte:head>

<Header />
<Hero />
<InfoBlocks />
<LedDemo />
<NodeViz />
<FAQ />
<Contact />
