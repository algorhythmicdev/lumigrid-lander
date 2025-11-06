<script lang="ts">
  import AmbientSync from '$lib/components/AmbientSync.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import Header from '$lib/components/Header.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';
  import AIField from '$lib/components/AIField.svelte';

  import FeatureGrid from '$lib/components/FeatureGrid.svelte';
  import UseCaseStory from '$lib/components/UseCaseStory.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  import MediaGallery from '$lib/components/MediaGallery.svelte';
  import SpecHighlights from '$lib/components/SpecHighlights.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import Partners from '$lib/components/Partners.svelte';
  import PressDownloads from '$lib/components/PressDownloads.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';
  import TrustedBy from '$lib/components/TrustedBy.svelte';
  import CaseFilters from '$lib/components/CaseFilters.svelte';
  import BeforeAfterAuto from '$lib/components/BeforeAfterAuto.svelte';
  import { t } from '$lib/i18n';

  export let data;
  
</script>

<svelte:head>
  <title>LUMIGRID LED Node — Signage Lighting Controller | Reclame Fabriek R&D</title>
  <meta name="description" content="LUMIGRID LED Node is a compact controller for LED signage. Choose colour, motion and brightness; save scenes; keep multiple runs in step." />
  <meta name="theme-color" content="#0b1120" />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context":"https://schema.org",
      "@type":"Product",
      "name":"LUMIGRID LED Node",
      "brand": {"@type":"Brand","name":"Reclame Fabriek"},
      "category":"LED lighting controller for signage",
      "description":"A compact controller for LED signage.",
      "manufacturer": {"@type":"Organization","name":"Reclame Fabriek"},
      "offers": {"@type":"Offer","availability":"https://schema.org/PreOrder"}
    })}
  </script>
</svelte:head>

<AmbientSync initialHue={data?.theme?.hue} />
<RevealOnScroll />
<Header />

<section
  class="section container grad-frame reveal"
  id="hero"
  style="padding:clamp(1rem,3vw,1.5rem); position:relative; margin-top:clamp(1rem,8vh,6rem)"
  data-hue={data?.theme?.hue}
>
  <EpicHero kicker={$t('hero_kicker')} title={$t('hero_title')} sub={$t('hero_sub')} />
  <AIField count={56}/>
</section>

<hr class="rule" />

<FeatureGrid />

<hr class="rule" />

<section id="stories">
  <UseCaseStory />
</section>

<section id="cases">
  <div class="container" style="margin-bottom: 1.5rem; margin-top: 3rem;">
    <h2 style="text-align: center; margin-bottom: 2rem; font-size: var(--fs-h2);">Case Studies</h2>
    <CaseFilters />
  </div>
  <ProjectGallery />
  <MediaGallery title="Real installations & demonstrations" />
  <BeforeAfterAuto />
</section>

<hr class="rule" />

<SpecHighlights />
<TrustedBy />
<Testimonials />
<Partners />

<section id="press">
  <PressDownloads />
</section>

<section id="contact">
  <Contact 
    title="Start the brief"
    intro="Share where the LEDs go, how they behave in the day, and what you want to feel at night. We'll assemble a simple plan and reply within one business day."
    hue={data?.theme?.hue}
  />
</section>

<FooterCTA />
