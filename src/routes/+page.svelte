<script>
  import '$lib/styles.css';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import InfoBlocks from '$lib/components/InfoBlocks.svelte';
  import BacklitLetters from '$lib/components/BacklitLetters.svelte';
  import StripWall from '$lib/components/StripWall.svelte';
  import NodeViz from '$lib/components/NodeViz.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import AmbientScroll from '$lib/components/AmbientScroll.svelte';
</script>

<svelte:head>
  <title>LED Node — Signage Lighting Controller</title>
  <meta
    name="description"
    content="LED Node by Reclame Fabriek R&D: a compact controller for LED signage. Lights that stay in step."
  />
</svelte:head>

<AmbientScroll />
<Header />
<Hero />
<BacklitLetters word="RF" />
<InfoBlocks />
<StripWall />
<NodeViz />
<FAQ />
<Contact />
