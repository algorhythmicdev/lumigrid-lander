<script lang="ts">
  import '$lib/styles.css';
  import AmbientSync from '$lib/components/AmbientSync.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import Header from '$lib/components/Header.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';
  import AIField from '$lib/components/AIField.svelte';

  import FeatureGrid from '$lib/components/FeatureGrid.svelte';
  import UseCasesReel from '$lib/components/UseCasesReel.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  import BeforeAfterAuto from '$lib/components/BeforeAfterAuto.svelte';
  import SpecHighlights from '$lib/components/SpecHighlights.svelte';
  import ProcessSteps from '$lib/components/ProcessSteps.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import BrandStripAuto from '$lib/components/BrandStripAuto.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';
</script>

<svelte:head>
  <title>LED Node — Signage Lighting Controller</title>
  <meta
    name="description"
    content="LED Node by Reclame Fabriek R&D: a compact controller for LED signage. Lights that stay in step."
  />
</svelte:head>

<AmbientSync />
<RevealOnScroll />
<Header />

<section style="position:relative">
  <EpicHero
    kicker="Reclame Fabriek R&D"
    title="LED Node"
    sub="A compact controller for LED signage. Choose colour, motion and brightness. Save scenes. Lights can run on a plan, and several runs can move together." />
  <AIField count={56}/>
</section>

<hr class="rule" />

<FeatureGrid />
<SpecHighlights />

<hr class="rule" />

<UseCasesReel />
<ProjectGallery />
<BeforeAfterAuto />

<hr class="rule" />

<ProcessSteps />
<Testimonials />

<hr class="rule" />

<FAQ />
<BrandStripAuto />

<Contact />
<FooterCTA />
