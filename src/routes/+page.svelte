<script lang="ts">
  import '$lib/styles.css';
  import Header from '$lib/components/Header.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';
  import AIField from '$lib/components/AIField.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import AmbientSync from '$lib/components/AmbientSync.svelte';
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
  
  export let data;

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

<AmbientSync/>
<RevealOnScroll/>

<Header />

<section style="position:relative">
  <EpicHero {...data.hero}/>
  <AIField count={56}/>
</section>

<hr class="rule" />

<BacklitLetters word="RF" />

<hr class="rule" />

<InfoBlocks />

<hr class="rule" />

<SceneTimeline onChange={(p) => {
  timelinePalette = p.palette;
  timelineSpeed = p.speed;
}} />

<hr class="rule" />

<StripWall bind:externalPalette={timelinePalette} bind:externalSpeed={timelineSpeed} />

<hr class="rule" />

<ProjectGallery />

<hr class="rule" />

<BeforeAfterAuto />

<hr class="rule" />

<CaseStudy />

<hr class="rule" />

<FAQ />

<hr class="rule" />

<NodeViz />

<hr class="rule" />

<BrandStripAuto />

<hr class="rule" />

<Contact />

<FooterCTA />
