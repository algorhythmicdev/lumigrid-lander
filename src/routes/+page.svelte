<script lang="ts">
  import '$lib/styles.css';
  import AmbientSync from '$lib/components/AmbientSync.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import Header from '$lib/components/Header.svelte';
  import LangToggle from '$lib/components/LangToggle.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';
  import AIField from '$lib/components/AIField.svelte';

  import FeatureGrid from '$lib/components/FeatureGrid.svelte';
  import UseCaseStory from '$lib/components/UseCaseStory.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  import BeforeAfterAuto from '$lib/components/BeforeAfterAuto.svelte';
  import SpecHighlights from '$lib/components/SpecHighlights.svelte';
  import ProcessSteps from '$lib/components/ProcessSteps.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import BrandStripAuto from '$lib/components/BrandStripAuto.svelte';
  import PressDownloads from '$lib/components/PressDownloads.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';
  import { t } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let data;
  
  onMount(() => {
    if (data.theme?.hue) {
      document.documentElement.style.setProperty('--ambient-hue', String(data.theme.hue));
    }
  });
</script>

<svelte:head>
  <title>LED Node — Signage Lighting Controller | Reclame Fabriek R&D</title>
  <meta name="description" content="LED Node is a compact controller for LED signage. Choose colour, motion and brightness; save scenes; keep multiple runs in step." />
  <meta name="theme-color" content="#0b1120" />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context":"https://schema.org",
      "@type":"Product",
      "name":"LED Node",
      "brand": {"@type":"Brand","name":"Reclame Fabriek"},
      "category":"LED lighting controller for signage",
      "description":"A compact controller for LED signage.",
      "manufacturer": {"@type":"Organization","name":"Reclame Fabriek"},
      "offers": {"@type":"Offer","availability":"https://schema.org/PreOrder"}
    })}
  </script>
</svelte:head>

<AmbientSync />
<RevealOnScroll />
<Header />
<div class="container" style="display:flex; justify-content:flex-end; margin-top:.6rem"><LangToggle/></div>

<section class="section container grad-frame reveal" id="hero" style="padding:clamp(1rem,3vw,1.5rem); position:relative; margin-top:clamp(1rem,8vh,6rem)">
  <EpicHero kicker={$t('hero_kicker')} title={$t('hero_title')} sub={$t('hero_sub')} />
  <AIField count={56}/>
</section>

<hr class="rule" />

<FeatureGrid />

<hr class="rule" />

<UseCaseStory />
<ProjectGallery />
<BeforeAfterAuto />

<hr class="rule" />

<SpecHighlights />
<ProcessSteps />
<Testimonials />
<BrandStripAuto />
<PressDownloads />

<Contact />
<FooterCTA />
