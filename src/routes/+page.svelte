<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

  const sections = [
    { id: 'hero', label: 'Story', icon: 'sparkles' },
    { id: 'journey', label: 'Journey', icon: 'bolt' },
    { id: 'system', label: 'System', icon: 'cubeTransparent' },
    { id: 'led-node', label: 'LED Node', icon: 'sun' },
    { id: 'experience', label: 'Experience', icon: 'cpuChip' },
    { id: 'launch', label: 'Launch', icon: 'rocketLaunch' },
    { id: 'contact', label: 'Contact', icon: 'envelope' }
  ];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'LumiGrid LED Node',
    description:
      'Distributed LED control node with PWM and addressable outputs for signage, façades, and experiential lighting. Part of the LumiGrid creative lighting OS, launching in 2026.',
    url: 'https://reclamefabriek.eu',
    brand: {
      '@type': 'Brand',
      name: 'LumiGrid'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Reclame Fabriek R&D',
      url: 'https://reclamefabriek.eu'
    },
    releaseDate: '2026-01-01',
    productLine: 'LumiGrid System',
    offers: {
      '@type': 'AggregateOffer',
      availabilityStarts: '2026-01-01',
      priceCurrency: 'EUR'
    },
    isSimilarTo: [
      'Modular LED controllers',
      'Stage lighting sync engines',
      'Architectural lighting control systems'
    ]
  };
</script>

<svelte:head>
  <title>LumiGrid LED Node — Light, orchestrated</title>
  <meta
    name="description"
    content="Discover how the LumiGrid ecosystem crescendos into the LED Node hero, presented in a lighter glassy layout ahead of the 2026 launch."
  />
  <meta
    name="keywords"
    content="LumiGrid LED Node, lighting controller, distributed lighting system, 2026 launch"
  />
  <meta property="og:title" content="LumiGrid LED Node — Light, orchestrated" />
  <meta
    property="og:description"
    content="A refined, story-led journey from the LumiGrid system to the LED Node spotlight."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://reclamefabriek.eu" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="LumiGrid LED Node — Light, orchestrated" />
  <meta
    name="twitter:description"
    content="Follow the quiet build-up of LumiGrid before the LED Node takes the stage."
  />
  <meta name="theme-color" content="#05060d" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#f6f7fb" media="(prefers-color-scheme: light)" />
  <meta name="color-scheme" content="dark light" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
    rel="stylesheet"
  />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
</svelte:head>

<div class="page-shell">
  <div class="page-main">
    <header id="hero" class="section hero-shell">
      <div class="container hero">
        <Header />
        <div class="hero-topline">
          <div class="hero-badge reveal">LumiGrid System · 2026 reveal</div>
          <p class="hero-whisper reveal">An ambient glass layer for real-world light.</p>
        </div>
        <h1 class="display" data-parallax="0.2">LED Node takes the stage.</h1>
        <div class="hero-summary reveal">
          <p class="hero-intro">
            LumiGrid thins away the rack room. A calm mesh wakes façades, pop-ups, and runways—until the LED
            Node steps forward with power, pixels, and a translucent dashboard that feels native to the space.
          </p>
          <div class="hero-pillars" aria-label="Highlights of the page">
            <span class="pill">System flow</span>
            <span class="pill">Hero hardware</span>
            <span class="pill">Launch path</span>
          </div>
        </div>
        <div class="hero-cta reveal">
          <a class="btn primary" href="#led-node">Preview the node</a>
          <a class="btn ghost" href="#launch">Follow the launch</a>
        </div>
        <div class="hero-media reveal" aria-hidden="true">
          <LEDDemo />
        </div>
        <p class="hero-subtle reveal">Scroll to watch the system soften around the LED Node.</p>
      </div>
    </header>

    <main id="main" tabindex="-1">
      <section id="journey" class="section halo">
        <div class="container narrow">
          <div class="section-header">
            <p class="eyebrow">Narrative arc</p>
            <h2 class="h2" data-parallax="0.1">From quiet groundwork to centre stage</h2>
            <p class="lead">Three quiet acts, each one easing the spotlight onto the LED Node.</p>
          </div>
          <div class="story-rail reveal" role="list">
            <article class="glass-card" role="listitem">
              <h3>Act I · Canvas</h3>
              <p>Satellite nodes listen close to every zone, learning the building’s pulse.</p>
              <span class="card-foot">Invisible groundwork</span>
            </article>
            <article class="glass-card" role="listitem">
              <h3>Act II · Choreography</h3>
              <p>The LumiGrid OS sketches motion with translucent controls instead of racks of gear.</p>
              <span class="card-foot">Calm creative tools</span>
            </article>
            <article class="glass-card" role="listitem">
              <h3>Act III · Spotlight</h3>
              <p>The LED Node arrives, blending power and pixels with a single glass dial.</p>
              <span class="card-foot">Hero moment</span>
            </article>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section id="system" class="section halo">
        <div class="container system">
          <div class="section-header">
            <p class="eyebrow">Ecosystem</p>
            <h2 class="h2" data-parallax="0.12">A calm network of tiny directors</h2>
            <p class="lead">A mesh of quiet directors keeps every façade, runway, and stage in the same breath.</p>
          </div>
          <div class="system-deck reveal">
            <article class="glass-panel system-intro">
              <h3>Signals instead of servers</h3>
              <p>
                Nodes live beside the fixtures, trading timing cues at the edge so the show keeps breathing
                even when the uplink rests. LED Node is the face visitors meet.
              </p>
            </article>
            <div class="flow-grid" role="list">
              <article class="glass-card" role="listitem">
                <h3>Local instincts</h3>
                <p>Onboard smoothing keeps fades intact, no matter the network rush.</p>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Shared rhythm</h3>
                <p>A lightweight sync mesh aligns tempo across city blocks and pop-ups.</p>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Open bridges</h3>
                <p>Simple links and APIs welcome designers, integrators, and makers alike.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section id="led-node" class="section halo">
        <div class="container led">
          <div class="section-header">
            <p class="eyebrow">Hero hardware</p>
            <h2 class="h2" data-parallax="0.12">Meet the LED Node</h2>
            <p class="lead">A palm-sized conductor for power, pixels, and timing inside one glass enclosure.</p>
          </div>
          <div class="led-highlight reveal">
            <div class="glass-panel">
              <h3>Why it shines</h3>
              <ul>
                <li>Dual outputs drive voltage fixtures and addressable strips in sync.</li>
                <li>Instant glass UI shows health, cues, and safe limits seconds after power-on.</li>
                <li>Mesh timing keeps motion flowing even if the uplink dips.</li>
              </ul>
              <p class="panel-foot">All wrapped in a smoked acrylic shell sized for DIN or wall niches.</p>
            </div>
            <div class="spec-callout glass-panel">
              <h3>Essentials</h3>
              <dl>
                <div>
                  <dt>Core</dt>
                  <dd>ESP32 dual-core radio tuned for sub-millisecond timing.</dd>
                </div>
                <div>
                  <dt>Power</dt>
                  <dd>Eight 12-bit PWM channels with smoothing filters on-board.</dd>
                </div>
                <div>
                  <dt>Pixels</dt>
                  <dd>Eight level-shifted data lanes ready for long architectural runs.</dd>
                </div>
              </dl>
              <div class="spec-foot">
                <p>Works with 12–48 VDC supplies, with onboard protection and thermal watch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section id="experience" class="section halo">
        <div class="container experience">
          <div class="section-header">
            <p class="eyebrow">Experience</p>
            <h2 class="h2" data-parallax="0.12">A gentle interface for live light</h2>
            <p class="lead">Glass panels, live feedback, and presets that crews can trust in a rush.</p>
          </div>
          <div class="experience-grid reveal" role="list">
            <article class="glass-card" role="listitem">
              <h3>Immediate status</h3>
              <p>Live power, temperature, and pixel health with colour-coded comfort zones.</p>
              <span class="card-foot">Always-on, even on mobile</span>
            </article>
            <article class="glass-card" role="listitem">
              <h3>Scene studio</h3>
              <p>Sketch moods with layered gradients, fades, and tempo-driven sequences.</p>
              <span class="card-foot">Drag, blend, and handoff cues instantly</span>
            </article>
            <article class="glass-card" role="listitem">
              <h3>Open bridges</h3>
              <p>REST and MQTT hooks invite show control, signage CMS, or custom art tools.</p>
              <span class="card-foot">Friendly to integrators and makers</span>
            </article>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section id="launch" class="section halo center">
        <div class="container narrow">
          <div class="section-header">
            <p class="eyebrow">Road to release</p>
            <h2 class="h2" data-parallax="0.12">2026 is the opening night</h2>
            <p class="lead">Final hardware, pilot venues, and the founding batch are already in motion.</p>
          </div>
          <div class="timeline reveal" role="list">
            <article class="glass-card" role="listitem">
              <h3>Now</h3>
              <p>Design freeze and endurance testing with architectural partners.</p>
            </article>
            <article class="glass-card" role="listitem">
              <h3>Mid 2025</h3>
              <p>Pilot installs, creative labs, and firmware polish with early crews.</p>
            </article>
            <article class="glass-card" role="listitem">
              <h3>2026 Launch</h3>
              <p>LED Node release bundled with LumiGrid OS, docs, and maker kits.</p>
            </article>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section id="contact" class="section halo center">
        <div class="container narrow">
          <div class="section-header">
            <p class="eyebrow">Stay close</p>
            <h2 class="h2" data-parallax="0.12">Join the launch list</h2>
            <p class="lead">Tell us what you want to light in 2026 and we’ll set the scene together.</p>
          </div>
          <ContactForm />
          <a class="btn outline big" href="https://reclamefabriek.eu" target="_blank" rel="noopener"
            >Visit Reclame Fabriek</a
          >
        </div>
      </section>
    </main>
  </div>
  <SideTimeline items={sections} />
</div>

<footer class="section center" style="padding-top:1rem;">
  <div class="container">
    <p>
      © Reclame Fabriek — R&D •
      <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">reclamefabriek.eu</a>
    </p>
  </div>
</footer>
