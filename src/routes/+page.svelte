<script>
  import { base } from '$app/paths';
  import '$lib/styles.css';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import EffectEditor from '$lib/components/EffectEditor.svelte';
  import LedDemo from '$lib/components/LedDemo.svelte';
  import NodeViz from '$lib/components/NodeViz.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import WhiteOnlyDemo from '$lib/components/WhiteOnlyDemo.svelte';
  import { caps, capsError } from '$lib/stores/capabilities';
  import { claims } from '$lib/claims';

  const placements = [
    { heading: 'Shop windows', text: 'Set calm colour with a clean white base to match changing displays.' },
    { heading: 'Logo letters', text: 'Keep the brand crisp in white, then add a soft halo when you need attention.' },
    { heading: 'Façades', text: 'Run multiple LED lines together so cues land at the same time.' }
  ];

  const faqs = [
    { q: 'Do I need special software?', a: 'No. Open the LED Node web app in your browser.' },
    {
      q: 'Will long runs stay in sync?',
      a: 'Yes, when Sync is enabled in your firmware. Multiple controllers share timing.',
      featureKey: 'sync',
      fallback: 'This firmware build does not enable Sync. Each controller runs on its own clock.',
      pending: 'Connect to a LED Node to confirm if Sync is available in your firmware.'
    },
    {
      q: 'What happens after a power cut?',
      a: 'If Reliable is enabled, LED Node resumes the last scene automatically.',
      featureKey: 'failsafe_resume',
      fallback: 'Reliable resume is not active in this firmware build. After power returns, choose a scene to continue.',
      pending: 'Connect to a LED Node to see if Reliable resume is available.'
    },
    {
      q: 'Can I use my LED strips?',
      a: 'Most common addressable RGB/RGBW strips and standard white channels are supported. Contact us if you are unsure.'
    }
  ];

  const lightTypes = [
    {
      key: 'white_pwm',
      title: 'White channels (PWM)',
      text: 'Smooth, flicker-free dimming for clean brand lighting.'
    },
    { key: 'pixels', title: 'Pixel LED strips', text: 'Animated colour and patterns for attention.' },
    { key: 'blend_control', title: 'Blend control', text: 'Balance white and pixel to fit the moment.' }
  ];

  let featureSet = new Set();
  let hasCaps = false;
  let introDetail = '';
  let capabilitySentences = [];
  let metaDescription = '';
  let footerDetail = '';
  let availableClaims = [];
  let availableLightTypes = [];

  $: featureSet = new Set(
    Object.entries($caps?.features ?? {})
      .filter(([, enabled]) => enabled)
      .map(([key]) => key)
  );

  $: hasCaps = Boolean($caps);
  $: availableClaims = claims.filter((item) => featureSet.has(item.key));
  $: availableLightTypes = lightTypes.filter((item) => featureSet.has(item.key));
  const baseDescription =
    'LED Node is a small controller by Reclame Fabriek R&D. It runs LED lighting for signs, windows, and façades.';

  const noCapabilityDetail =
    'Connect to a LED Node to confirm which features—such as scenes, scheduling, or sync—are active in your firmware.';

  const minimalCapabilityDetail =
    'This firmware build exposes core lighting control without extra automation features.';

  function buildCapabilitySentences() {
    if (!hasCaps) {
      return [];
    }

    const sentences = [];

    if (featureSet.has('web_app')) {
      sentences.push('Use the local web app to choose colours and motion.');
    } else {
      sentences.push('Control looks through your integration or API client.');
    }

    if (featureSet.has('scenes')) {
      sentences.push('Save looks as scenes so you can reuse them.');
    }

    if (featureSet.has('schedule')) {
      sentences.push('Place them on a timeline when you want automated changes.');
    }

    if (featureSet.has('sync')) {
      sentences.push('Controllers share timing so effects line up.');
    } else {
      sentences.push('Each controller runs on its own clock in this firmware build.');
    }

    if (featureSet.has('failsafe_resume')) {
      sentences.push('After power returns, the last scene resumes automatically.');
    }

    if (!sentences.length) {
      sentences.push(minimalCapabilityDetail);
    }

    return sentences;
  }

  $: capabilitySentences = buildCapabilitySentences();
  $: introDetail = hasCaps ? capabilitySentences.join(' ') : noCapabilityDetail;
  $: metaDescription = `${baseDescription} ${
    hasCaps ? capabilitySentences.join(' ') : 'Connect to a LED Node to confirm available features.'
  }`.trim();
  $: footerDetail = hasCaps
    ? capabilitySentences.join(' ')
    : 'Connect to a LED Node to confirm which features your firmware enables.';
</script>

<svelte:head>
  <title>LumiGrid LED Node — lighting controller for signage</title>
  <meta name="description" content={metaDescription} />
  <link rel="icon" href={`${base}/favicon.svg`} />
</svelte:head>

<Header />

<main id="main" tabindex="-1">
  <Hero />

  <section id="what" class="section container">
    <h2 style="font-size:var(--fs-h2); margin:0 0 1rem">What is LED Node?</h2>
    <p class="lead" style="max-width:640px">
      LED Node is a controller for LED lighting. It is made by <strong>Reclame Fabriek R&amp;D</strong> for signage makers and
      display teams. {introDetail}
    </p>
    {#if $caps}
      <p class="hint" style="margin-top:.75rem; color:var(--muted)">
        Connected to {$caps.device} firmware {$caps.fw} from {$caps.maker}.
      </p>
    {/if}
  </section>

  <section id="features" class="section container" aria-labelledby="features-h">
    <h2 id="features-h" style="font-size:var(--fs-h2); margin:0 0 1rem">What can it do?</h2>
    {#if $capsError}
      <p class="lead" style="color:#ffb4a2">{$capsError}</p>
    {/if}
    <div class="cards" style="margin-bottom:1rem">
      {#if hasCaps}
        {#if availableClaims.length}
          {#each availableClaims as item}
            <article class="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          {/each}
        {:else}
          <article class="card" data-state="feature-off">
            <h3>Optional features are off</h3>
            <p>This firmware build only exposes base lighting control. Scenes, sync, and scheduling are disabled.</p>
          </article>
        {/if}
      {:else}
        <article class="card" style="opacity:.75">
          <h3>Features load from the node</h3>
          <p>Connect to a LED Node on your network to see supported features.</p>
        </article>
      {/if}
    </div>
  </section>

  <EffectEditor />
  {#if $caps?.features.pixels !== false}
    <LedDemo />
  {:else}
    <WhiteOnlyDemo />
  {/if}
  <NodeViz />

  <section class="section container" aria-labelledby="lights-h">
    <h2 id="lights-h" style="font-size:var(--fs-h2); margin:0 0 1rem">Light types it can drive</h2>
    <div class="cards">
      {#if hasCaps}
        {#if availableLightTypes.length}
          {#each availableLightTypes as item}
            <article class="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          {/each}
        {:else}
          <article class="card" data-state="feature-off">
            <h3>Outputs are disabled</h3>
            <p>This firmware build does not expose white channels, pixel lanes, or blend control.</p>
          </article>
        {/if}
      {:else}
        <article class="card" style="opacity:.75">
          <h3>Waiting for a node</h3>
          <p>Connect to LED Node firmware to list available LED outputs.</p>
        </article>
      {/if}
    </div>
  </section>

  <section class="section container" aria-labelledby="placements-h">
    <h2 id="placements-h" style="font-size:var(--fs-h2); margin:0 0 1rem">Where it fits</h2>
    <div class="cards">
      {#each placements as item}
        <article class="card">
          <h3>{item.heading}</h3>
          <p>{item.text}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section container" aria-labelledby="faq-h">
    <h2 id="faq-h" style="font-size:var(--fs-h2);margin:0 0 1rem">FAQ</h2>
    <div class="faq">
      {#each faqs as entry}
        {#if entry.featureKey}
          {#if featureSet.has(entry.featureKey)}
            <details>
              <summary>{entry.q}</summary>
              <p class="lead">{entry.a}</p>
            </details>
          {:else if hasCaps}
            <details data-state="feature-off" aria-disabled="true">
              <summary>{entry.q}</summary>
              <p class="lead">{entry.fallback ?? 'This firmware build does not include this feature.'}</p>
            </details>
          {:else}
            <details data-state="pending" aria-disabled="true">
              <summary>{entry.q}</summary>
              <p class="lead">{entry.pending ?? 'Connect to a LED Node to confirm availability.'}</p>
            </details>
          {/if}
        {:else}
          <details>
            <summary>{entry.q}</summary>
            <p class="lead">{entry.a}</p>
          </details>
        {/if}
      {/each}
    </div>
  </section>

  <section class="section container" id="contact" aria-labelledby="contact-h">
    <h2 id="contact-h" style="font-size:var(--fs-h2);margin:0 0 1rem">Contact</h2>
    <div class="contact">
      <p class="lead" style="margin:0 0 1rem">Tell us about your signage project and we will reply with next steps.</p>
      <ContactForm />
    </div>
  </section>

  <footer class="container" style="display:grid; gap:1rem; padding-bottom:3rem">
    <div>
      <strong>About LED Node</strong>
      <p style="margin:.25rem 0 0">
        LED Node is a small controller by Reclame Fabriek R&amp;D. It runs LED lighting for signs, windows, and façades.{' '}{footerDetail}
      </p>
    </div>
    <p style="margin:0">© {new Date().getFullYear()} Reclame Fabriek R&amp;D.</p>
  </footer>
</main>
