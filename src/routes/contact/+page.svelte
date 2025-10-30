<script lang="ts">
  import AmbientSync from '$lib/components/AmbientSync.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import Header from '$lib/components/Header.svelte';
  import EpicHero from '$lib/components/EpicHero.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import { base } from '$app/paths';

  export let data;

  const canonicalBase = 'https://reclamefabriek.dev/';
  const trimmedBase = base.replace(/^\//, '');
  const slug = trimmedBase ? `${trimmedBase}/contact` : 'contact';
  const canonicalUrl = new URL(slug, canonicalBase).toString();
</script>

<svelte:head>
  <title>Contact LED Node — Plan your signage lighting</title>
  <meta
    name="description"
    content="Tell us about your signage project and we’ll design zones, schedules, and installation support for LED Node."
  />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content="Contact LED Node" />
  <meta
    property="og:description"
    content="Share your signage goals and we’ll map lighting looks, installation steps, and ongoing support for LED Node."
  />
  <meta property="og:url" content={canonicalUrl} />
  <meta name="twitter:title" content="Contact LED Node" />
  <meta
    name="twitter:description"
    content="Share your signage goals and we’ll map lighting looks, installation steps, and ongoing support for LED Node."
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
    kicker="Talk to us"
    title="Tell us about your sign"
    sub="We’ll propose zones, looks and a simple day plan — and take care of install and support."
  />
</section>

<Contact
  title="Start the brief"
  intro="Share where the LEDs go, how they behave in the day, and what you want to feel at night. We’ll assemble a simple plan and reply within one business day."
  hue={data?.theme?.hue}
/>
