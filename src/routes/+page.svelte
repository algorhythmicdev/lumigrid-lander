<script>
  import '$lib/styles.css';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import BacklitLetters from '$lib/components/BacklitLetters.svelte';
  import InfoBlocks from '$lib/components/InfoBlocks.svelte';
  import StripWall from '$lib/components/StripWall.svelte';
  import SceneTimeline from '$lib/components/SceneTimeline.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  import BeforeAfterAuto from '$lib/components/BeforeAfterAuto.svelte';
  import CaseStudy from '$lib/components/CaseStudy.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import NodeViz from '$lib/components/NodeViz.svelte';
  import BrandStripAuto from '$lib/components/BrandStripAuto.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';

  let timelinePalette = 'rf';
  let timelineSpeed = 1;
</script>

<svelte:head>
  <title>LED Node — Signage Lighting Controller</title>
  <meta
    name="description"
    content="LED Node by Reclame Fabriek R&D: a compact controller for LED signage. Lights that stay in step."
  />
</svelte:head>

<Header />
<Hero />
<BacklitLetters word="RF" />
<InfoBlocks />
<SceneTimeline onChange={(p) => {
  timelinePalette = p.palette;
  timelineSpeed = p.speed;
}} />
<StripWall bind:externalPalette={timelinePalette} bind:externalSpeed={timelineSpeed} />
<ProjectGallery />
<BeforeAfterAuto />
<CaseStudy />
<FAQ />
<NodeViz />
<BrandStripAuto />
<Contact />
<FooterCTA />
