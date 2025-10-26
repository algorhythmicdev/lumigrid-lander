<script>
  import { base } from '$app/paths';
  import '$lib/styles.css';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import EffectEditor from '$lib/components/EffectEditor.svelte';
  import LedDemo from '$lib/components/LedDemo.svelte';
  import NodeViz from '$lib/components/NodeViz.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

  const howTiles = [
    { title: 'Zones', copy: 'Control parts of a sign separately or together.' },
    { title: 'Scenes', copy: 'Save favourite looks and reuse them.' },
    { title: 'Schedule', copy: 'Plan the day: morning calm, daytime clean, evening halo.' },
    { title: 'Sync', copy: 'Chases and fades line up end to end.' },
    { title: 'Web app', copy: 'Open in your browser; no extra software.' },
    { title: 'Reliable', copy: 'If power returns, the plan resumes.' }
  ];

  const gallery = [
    { heading: 'Retail frontage', text: 'Invite passers-by with subtle halo shifts that mirror window signage.' },
    { heading: 'Hospitality lobbies', text: 'Ease from day brightness to evening ambience while screens echo the change.' },
    { heading: 'Venue reveals', text: 'Run countdown pulses, copy takeovers, and exterior light from one place.' }
  ];

  const faqs = [
    {
      q: 'Does LumiGrid work on reduced-motion devices?',
      a: 'Yes. Animations pause automatically for visitors who prefer reduced motion, and scenes fall back to gentle fades.'
    },
    {
      q: 'How do teams collaborate?',
      a: 'Invite designers, operators, and signage partners into the same web console with role-based access.'
    },
    {
      q: 'What if the network drops?',
      a: 'Nodes keep their active scene locally and resync when the connection returns, so the story never freezes.'
    }
  ];
</script>

<svelte:head>
  <title>LumiGrid — LED Node for signage</title>
  <meta
    name="description"
    content="Design and run light for windows, logos, and façades. Scenes, schedules, and sync in a simple web app."
  />
  <link rel="icon" href={`${base}/favicon.svg`} />
</svelte:head>

<Header />

<main id="main" tabindex="-1">
  <Hero />

  <section id="what" class="section container">
    <h2 style="font-size:var(--fs-h2); margin:0 0 1rem">How it works</h2>
    <div class="tiles">
      {#each howTiles as tile}
        <article>
          <h3>{tile.title}</h3>
          <p class="lead">{tile.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <EffectEditor />
  <LedDemo />
  <NodeViz />

  <section class="section container" aria-labelledby="gallery-h">
    <h2 id="gallery-h" style="font-size:var(--fs-h2);margin:0 0 1rem">Gallery &amp; use cases</h2>
    <div class="cards">
      {#each gallery as item}
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
        <details>
          <summary>{entry.q}</summary>
          <p class="lead">{entry.a}</p>
        </details>
      {/each}
    </div>
  </section>

  <section class="section container" id="contact" aria-labelledby="contact-h">
    <h2 id="contact-h" style="font-size:var(--fs-h2);margin:0 0 1rem">Contact</h2>
    <div class="contact">
      <p class="lead" style="margin:0 0 1rem">
        Tell us where LumiGrid should glow next. We’ll open your email client with all the details bundled.
      </p>
      <ContactForm />
    </div>
  </section>

  <footer class="container">© {new Date().getFullYear()} LumiGrid. All rights reserved.</footer>
</main>
