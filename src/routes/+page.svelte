<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  const ids = ['hero','system','deep','led','gallery','implement','trust','faq','contact'];
</script>
<svelte:head>
  <title>LumiGrid — Creative Lighting & Signage Control</title>
  <meta name="description" content="LumiGrid helps signage makers choreograph light: multi-zone LED control, presets, timelines, schedules, and silky-smooth sync — all from a simple web app. Developed by Reclame Fabriek R&D.">
  <meta name="color-scheme" content="dark light">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
</svelte:head>
<SideTimeline {ids} />
<header id="hero" class="section container has-sidebar">
  <Header />
  <h1 class="h1 text-gradient" data-parallax="0.18">Light that tells your story.</h1>
  <p class="lead reveal">Design signs that breathe, windows that glow, and façades that move together — all from a calm, simple app.</p>
  <div class="reveal" style="margin-top:1rem;">
    <a class="btn primary" href="#system">See how it works</a>
    <a class="btn outline" href="#led">Try LED control</a>
  </div>
  <p class="lead reveal" style="margin-top:.5rem;">Developed by <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">Reclame Fabriek R&amp;D</a></p>
</header>
<main class="has-sidebar" id="main" tabindex="-1">
  <section id="system" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">What is LumiGrid?</h2>
      <p class="big reveal">It’s a friendly way to choreograph light. Choose a mood, place it on a simple timeline, and watch every part of your sign move in harmony.</p>
      <div class="pills reveal" role="list">
        <button class="pill" aria-pressed="true">Sync</button>
        <button class="pill">Presets</button>
        <button class="pill">Schedule</button>
        <button class="pill">Quick Override</button>
        <button class="pill">Live Status</button>
      </div>
      <div class="grid grid-3 reveal" style="margin-top:1rem;">
        <figure class="card"><img src="/images/screen-scenes.svg" alt="LumiGrid web app showing saved lighting scenes" style="width:100%;height:auto"/><figcaption class="lead">Web app — Scenes</figcaption></figure>
        <figure class="card"><img src="/images/screen-timeline.svg" alt="LumiGrid timeline editor arranging scenes across the day" style="width:100%;height:auto"/><figcaption class="lead">Timeline editor</figcaption></figure>
        <figure class="card"><img src="/images/photo-window.svg" alt="Shop window lit by a LumiGrid installation" style="width:100%;height:auto"/><figcaption class="lead">Shop window install</figcaption></figure>
      </div>
    </div>
  </section>
  <section id="deep" class="section halo soft">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">How it works (in plain words)</h2>
      <div class="grid grid-2">
        <div class="card reveal"><h3>Zones</h3><p>Think of zones like instruments in a band. Tune each or play together.</p></div>
        <div class="card reveal"><h3>Scenes</h3><p>Favourite looks you can name and reuse: colours, motion, brightness.</p></div>
        <div class="card reveal"><h3>Timeline</h3><p>Lay scenes on a strip of time. Morning calm, midday clean, evening flow.</p></div>
        <div class="card reveal"><h3>Triggers</h3><p>Start when doors open or when it gets dark. You set the rules.</p></div>
        <div class="card reveal"><h3>Sync</h3><p>Everything steps together. Chases and sparkles align end to end.</p></div>
        <div class="card reveal"><h3>Control</h3><p>A web app on your phone or laptop. Tap a scene, nudge a colour.</p></div>
      </div>
    </div>
  </section>
  <section id="led" class="section halo focus">
    <div class="container grid grid-2">
      <LEDDemo class="reveal" />
      <div class="card reveal">
        <h3>Simple, useful controls</h3>
        <ul>
          <li><strong>Many zones</strong> — control several LED runs separately or link them.</li>
          <li><strong>Colour + white</strong> — set gentle ambience or clean brand lighting, or both.</li>
          <li><strong>Scenes & schedules</strong> — name your favourites and set them for the day.</li>
          <li><strong>Web app</strong> — open in a browser; no extra software.</li>
          <li><strong>Always in step</strong> — when one moves, the others move with it.</li>
        </ul>
      </div>
    </div>
  </section>
  <section id="gallery" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Project gallery</h2>
      <p class="big reveal">A few ways light can feel: calm, crisp, or delightfully animated.</p>
      <Gallery />
    </div>
  </section>
  <section id="implement" class="section halo soft">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Where it fits (quick examples)</h2>
      <div class="grid grid-3">
        <article class="card reveal"><h3>Window displays</h3><p>Two colour zones + soft white backlight. Daytime flow, evening halo, periodic sweep.</p></article>
        <article class="card reveal"><h3>Logo letters</h3><p>Clean white for brand clarity. Add a soft halo on weekends. Short sparkle for launches.</p></article>
        <article class="card reveal"><h3>Façade moments</h3><p>Multiple strips act as one stage. Start, applaud, fade back — one tap.</p></article>
      </div>
    </div>
  </section>
  <section id="trust" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Reliable by design</h2>
      <div class="grid grid-2">
        <div class="card reveal"><h3>Keeps running</h3><p>Scenes continue even if your phone is offline. Power returns? It remembers the plan.</p></div>
        <div class="card reveal"><h3>Private control</h3><p>You control your own lights. The web app talks directly on your local network.</p></div>
      </div>
    </div>
  </section>
  <section id="faq" class="section halo soft">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Common questions</h2>
      <details class="card reveal"><summary>Can I use my existing LED strips?</summary><p>Yes — most common addressable RGB/RGBW strips and standard white channels are supported.</p></details>
      <details class="card reveal"><summary>Do I need special software?</summary><p>No. Open a browser on your phone or laptop. That’s it.</p></details>
      <details class="card reveal"><summary>Will it sync across a long shopfront?</summary><p>Yes. Zones share timing so chases and sparkles line up from end to end.</p></details>
      <details class="card reveal"><summary>What happens after a power cut?</summary><p>The system picks up the planned scene automatically when power returns.</p></details>
    </div>
  </section>
  <section id="contact" class="section halo soft center">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Bring your light to life</h2>
      <p class="lead reveal">Tell us what you’re building. We’ll help plan the zones, the looks, and the show.</p>
      <ContactForm />
      <a class="btn outline big" href="https://reclamefabriek.eu" target="_blank" rel="noopener">Visit Reclame Fabriek</a>
    </div>
  </section>
</main>
<footer class="section center" style="padding-top:1rem;">
  <div class="container"><p>© Reclame Fabriek — R&amp;D • <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">reclamefabriek.eu</a></p></div>
</footer>
