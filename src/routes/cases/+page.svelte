<script lang="ts">
  import AmbientSync from '$lib/components/AmbientSync.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import Header from '$lib/components/Header.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';
  import AIField from '$lib/components/AIField.svelte';
  import CaseFilters from '$lib/components/CaseFilters.svelte';
  import UseCaseStory from '$lib/components/UseCaseStory.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  import MediaGallery from '$lib/components/MediaGallery.svelte';
  import { base } from '$app/paths';

  export let data;

  const canonicalBase = 'https://reclamefabriek.dev/';
  const trimmedBase = base.replace(/^\//, '');
  const slug = trimmedBase ? `${trimmedBase}/cases` : 'cases';
  const canonicalUrl = new URL(slug, canonicalBase).toString();
</script>

<svelte:head>
  <title>LED Node Case Studies — Real-world signage installs</title>
  <meta
    name="description"
    content="See how LED Node powers illuminated shop windows, channel letters, and façades with precise day-to-night lighting transitions."
  />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content="LED Node Case Studies" />
  <meta
    property="og:description"
    content="Explore real signage projects featuring LED Node: retail windows, logo letters, and façades tuned for daytime clarity and nighttime warmth."
  />
  <meta property="og:url" content={canonicalUrl} />
  <meta name="twitter:title" content="LED Node Case Studies" />
  <meta
    name="twitter:description"
    content="Explore real signage projects featuring LED Node: retail windows, logo letters, and façades tuned for daytime clarity and nighttime warmth."
  />
</svelte:head>

<AmbientSync initialHue={data?.theme?.hue} />
<RevealOnScroll />
<Header />

<section
  class="section container grad-frame reveal"
  id="hero"
  style="padding:clamp(1rem,3vw,1.5rem); position:relative; margin-top:clamp(2rem,10vh,8rem)"
  data-hue={data?.theme?.hue}
>
  <EpicHero
    kicker="Case studies"
    title="Real installs"
    sub="Examples from shop windows, logo letters and façades. Clean by day, warm by night."
  />
  <AIField count={48} />
</section>

<hr class="rule" />

<div class="container" style="margin-bottom: 1.5rem;">
  <CaseFilters />
</div>

<UseCaseStory />
<ProjectGallery />
<MediaGallery title="Real installations & demonstrations" />
