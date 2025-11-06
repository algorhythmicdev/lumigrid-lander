<script lang="ts">
  import AmbientSync from '$lib/components/AmbientSync.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import Header from '$lib/components/Header.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';

  import FeatureGrid from '$lib/components/FeatureGrid.svelte';
  import UseCaseStory from '$lib/components/UseCaseStory.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  import MediaGallery from '$lib/components/MediaGallery.svelte';
  import SpecHighlights from '$lib/components/SpecHighlights.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import Partners from '$lib/components/Partners.svelte';

  import Contact from '$lib/components/Contact.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';
  import TrustedBy from '$lib/components/TrustedBy.svelte';
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
  class="hero-section container grad-frame reveal"
  id="hero"
  data-hue={data?.theme?.hue}
>
  <EpicHero kicker={$t('hero_kicker')} title={$t('hero_title')} sub={$t('hero_sub')} />
</section>

<style>
  .hero-section {
    padding: clamp(2rem, 5vw, 3rem);
    position: relative;
    margin-top: clamp(2rem, 10vh, 8rem);
    margin-bottom: clamp(3rem, 8vh, 6rem);
    min-height: min(85vh, 700px);
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  
  .hero-section::before {
    content: "";
    position: absolute;
    inset: -50%;
    background: radial-gradient(
      circle at 30% 40%,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 50%
    );
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    .hero-section {
      min-height: auto;
      margin-top: clamp(1rem, 6vh, 4rem);
    }
  }
</style>

<hr class="rule" />

<FeatureGrid />

<hr class="rule" />

<section id="stories">
  <UseCaseStory />
</section>

<ProjectGallery />
<MediaGallery />

<hr class="rule" />

<SpecHighlights />
<TrustedBy />
<Testimonials />
<Partners />

<section id="contact">
  <Contact 
    title="Start the brief"
    intro="Share where the LEDs go, how they behave in the day, and what you want to feel at night. We'll assemble a simple plan and reply within one business day."
    hue={data?.theme?.hue}
  />
</section>

<FooterCTA />
