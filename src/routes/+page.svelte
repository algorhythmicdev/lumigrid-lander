<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import Gallery from '$lib/components/Gallery.svelte';

  const sections = [
    { id: 'hero', label: 'Story', icon: 'sparkles' },
    { id: 'journey', label: 'Journey', icon: 'bolt' },
    { id: 'system', label: 'System', icon: 'cubeTransparent' },
    { id: 'led-node', label: 'LED Node', icon: 'sun' },
    { id: 'experience', label: 'Experience', icon: 'cpuChip' },
    { id: 'integration', label: 'Sync', icon: 'codeBracketSquare' },
    { id: 'gallery', label: 'Gallery', icon: 'window' },
    { id: 'support', label: 'Support', icon: 'shieldCheck' },
    { id: 'updates', label: 'Updates', icon: 'commandLine' },
    { id: 'launch', label: 'Launch', icon: 'rocketLaunch' },
    { id: 'faq', label: 'FAQ', icon: 'lightBulb' },
    { id: 'contact', label: 'Contact', icon: 'envelope' }
  ];

  const galleryItems = [
    {
      title: 'Atrium shimmer',
      subtitle: 'Layered gradients for hospitality lobbies',
      href: '#gallery',
      accent: 'var(--a)',
      accentB: 'var(--halo-glow)',
      accentC: 'color-mix(in oklab, var(--c) 40%, transparent)'
    },
    {
      title: 'Skybridge wash',
      subtitle: 'Elevated path lit with airy pulses',
      href: '#gallery',
      accent: 'var(--c)',
      accentB: 'var(--b)',
      accentC: 'color-mix(in oklab, var(--a) 38%, transparent)'
    },
    {
      title: 'Show window loops',
      subtitle: 'Retail frames with sequenced halos',
      href: '#gallery',
      accent: 'var(--b)',
      accentB: 'var(--a)',
      accentC: 'color-mix(in oklab, var(--halo-glow) 45%, transparent)'
    },
    {
      title: 'Outdoor runway',
      subtitle: 'Evening reveals guided by calm sweeps',
      href: '#gallery',
      accent: 'var(--c)',
      accentB: 'var(--halo-glow)',
      accentC: 'color-mix(in oklab, var(--a) 42%, transparent)'
    },
    {
      title: 'Lobby lanterns',
      subtitle: 'Soft cubes breathing with visitors',
      href: '#gallery',
      accent: 'color-mix(in oklab, var(--halo-glow) 60%, transparent)',
      accentB: 'var(--a)',
      accentC: 'var(--c)'
    },
    {
      title: 'Festival canopy',
      subtitle: 'Ambient ribbons above pop-up venues',
      href: '#gallery',
      accent: 'var(--b)',
      accentB: 'var(--c)',
      accentC: 'var(--halo-glow)'
    },
    {
      title: 'Gallery drift',
      subtitle: 'Art walls kissed with responsive fades',
      href: '#gallery',
      accent: 'var(--a)',
      accentB: 'var(--b)',
      accentC: 'color-mix(in oklab, var(--c) 40%, transparent)'
    },
    {
      title: 'Night market pulse',
      subtitle: 'Clean sight-lines with subtle emphasis',
      href: '#gallery',
      accent: 'var(--halo-glow)',
      accentB: 'var(--a)',
      accentC: 'color-mix(in oklab, var(--b) 42%, transparent)'
    }
  ];

  const updates = [
    {
      tag: 'Addition',
      title: 'Halos sync with every section',
      summary:
        'Section flares now drive the global orbit palette so header glass, separators, and progress accents inherit the active gradient as you scroll.'
    },
    {
      tag: 'Improvement',
      title: 'Mobile navigation stays calm',
      summary:
        'The sticky glass bar locks scroll, dims the background, and exposes inert states so phones keep their layout intact when the hamburger opens.'
    },
    {
      tag: 'Update',
      title: 'Animated gallery placeholders',
      summary:
        'Gradient tiles pulse with orbit colours, giving clients a live preview slot for venue photography while preserving the airy light theme.'
    },
    {
      tag: 'Care',
      title: 'Age-friendly readability pass',
      summary:
        'Baseline text sizing now scales up sooner with viewport width and line-height, easing long-form reading for partners across generations.'
    },
    {
      tag: 'Roadmap',
      title: 'Launch timeline kept current',
      summary:
        'The 2026 rollout milestones highlight design freeze, pilot installs, and the founding batch so teams can align marketing and procurement.'
    }
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
    <header
      id="hero"
      class="section hero-shell"
      style="--orbit-a: color-mix(in oklab, var(--a) 58%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 48%, transparent); --orbit-strength:.58;"
      data-flare-primary="color-mix(in oklab, var(--a) 58%, transparent)"
      data-flare-secondary="color-mix(in oklab, var(--halo-glow) 48%, transparent)"
      data-flare-glow="color-mix(in oklab, var(--halo-glow) 60%, transparent)"
      data-flare-strength=".58"
    >
      <span class="section-orbit" aria-hidden="true"></span>
      <div class="container hero">
        <Header />
        <div class="hero-stage reveal">
          <div class="hero-aura" aria-hidden="true"></div>
          <div class="hero-frame">
            <div class="hero-copy">
              <span class="hero-label">2026 global premiere · LumiGrid OS</span>
              <h1 class="hero-marquee" data-parallax="0.18">
                <span class="hero-marquee-word">LUMIGRID</span>
                <span class="hero-marquee-divider">×</span>
                <span class="hero-marquee-word accent">LED NODE</span>
              </h1>
              <p class="hero-intro">
                The flagship controller erupts from the LumiGrid ecosystem with glass-smooth power, pixel-perfect
                choreography, and a halo built to drench architecture in story.
              </p>
              <div class="hero-actions">
                <a class="btn primary" href="#led-node">Experience the node</a>
                <a class="btn ghost" href="#launch">Join the launch constellation</a>
              </div>
              <div class="hero-highlights" aria-label="Key promises">
                <span class="highlight-pill">Zero rack chaos</span>
                <span class="highlight-pill">Epic architectural pulses</span>
                <span class="highlight-pill">Live glass interface</span>
              </div>
            </div>
            <div class="hero-visual" aria-hidden="true">
              <div class="hero-visual-shell">
                <LEDDemo />
                <div class="hero-stat-grid">
                  <div class="hero-stat-card">
                    <span class="stat-label">Pixels in sync</span>
                    <span class="stat-value">65K</span>
                    <span class="stat-foot">per node mesh burst</span>
                  </div>
                  <div class="hero-stat-card">
                    <span class="stat-label">Power envelope</span>
                    <span class="stat-value">48V</span>
                    <span class="stat-foot">wide headroom</span>
                  </div>
                  <div class="hero-stat-card">
                    <span class="stat-label">Glass UI boot</span>
                    <span class="stat-value">3s</span>
                    <span class="stat-foot">to status & cues</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-ribbon" aria-hidden="true">
            <span>LUMIGRID ECOSYSTEM</span>
            <span>LED NODE VANGUARD</span>
            <span>IMMERSIVE LIGHT ORCHESTRATION</span>
          </div>
        </div>
        <p class="hero-subtle reveal">Scroll to feel the orbit tighten around the LED Node crescendo.</p>
      </div>
    </header>

    <main id="main" tabindex="-1">
      <section
        id="journey"
        class="section halo section-journey"
        style="--orbit-a: color-mix(in oklab, var(--c) 44%, transparent); --orbit-b: color-mix(in oklab, var(--a) 38%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--c) 44%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--a) 38%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 45%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container journey-wrap">
          <div class="section-header">
            <p class="eyebrow">Narrative arc</p>
            <h2 class="h2" data-parallax="0.1">From quiet groundwork to centre stage</h2>
            <p class="lead">Three carefully staged acts prime the LED Node reveal and keep the crescendo smooth.</p>
          </div>
          <div class="journey-stage reveal">
            <div class="journey-intro glass-panel">
              <p class="journey-eyebrow">How we build the swell</p>
              <p class="journey-summary">
                LumiGrid’s story starts in the background—edge devices learn the venue, designers layer motion, then LED Node walks on with the confidence of a conductor.
              </p>
              <ul class="journey-pillars">
                <li>Every act inherits the previous palette and tempo.</li>
                <li>All cues test against real fixtures inside the lab.</li>
                <li>Clients feel the swell before hardware ships.</li>
              </ul>
            </div>
            <div class="journey-track" role="list">
              <article class="journey-act glass-card" role="listitem" data-step="I">
                <h3>Act I · Canvas</h3>
                <p>Satellite nodes listen close to every zone, learning the building’s pulse.</p>
                <span class="card-foot">Invisible groundwork</span>
              </article>
              <article class="journey-act glass-card" role="listitem" data-step="II">
                <h3>Act II · Choreography</h3>
                <p>The LumiGrid OS sketches motion with translucent controls instead of racks of gear.</p>
                <span class="card-foot">Calm creative tools</span>
              </article>
              <article class="journey-act glass-card" role="listitem" data-step="III">
                <h3>Act III · Spotlight</h3>
                <p>The LED Node arrives, blending power and pixels with a single glass dial.</p>
                <span class="card-foot">Hero moment</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="system"
        class="section halo section-system"
        style="--orbit-a: color-mix(in oklab, var(--c) 36%, transparent); --orbit-b: color-mix(in oklab, var(--b) 42%, transparent); --orbit-strength:.48;"
        data-flare-primary="color-mix(in oklab, var(--c) 36%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--b) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 48%, transparent)"
        data-flare-strength=".48"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container system">
          <div class="section-header">
            <p class="eyebrow">Ecosystem</p>
            <h2 class="h2" data-parallax="0.12">A calm network of tiny directors</h2>
            <p class="lead">A distributed mesh keeps façades, runways, and plazas breathing in sync without ever flashing a panic.</p>
          </div>
          <div class="system-stage reveal">
            <div class="system-map glass-panel">
              <p class="map-label">Live mesh snapshot</p>
              <p class="map-summary">
                Every node shares timing whispers with the next. LED Node surfaces it all in one glass console—no racks, no turbulence.
              </p>
              <div class="system-nodes" role="presentation">
                <span class="mesh-node core" aria-hidden="true"></span>
                <span class="mesh-node branch" aria-hidden="true"></span>
                <span class="mesh-node halo" aria-hidden="true"></span>
                <span class="mesh-node drift" aria-hidden="true"></span>
                <span class="mesh-node surge" aria-hidden="true"></span>
              </div>
            </div>
            <div class="system-columns" role="list">
              <article class="glass-card" role="listitem">
                <h3>Local instincts</h3>
                <p>Onboard smoothing keeps fades intact, no matter the network rush.</p>
                <span class="card-foot">Latency proofed</span>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Shared rhythm</h3>
                <p>A lightweight sync mesh aligns tempo across city blocks and pop-ups.</p>
                <span class="card-foot">Neighbour aware</span>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Open bridges</h3>
                <p>Simple links and APIs welcome designers, integrators, and makers alike.</p>
                <span class="card-foot">Plug-in friendly</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="led-node"
        class="section halo section-led"
        style="--orbit-a: color-mix(in oklab, var(--a) 46%, transparent); --orbit-b: color-mix(in oklab, var(--c) 38%, transparent); --orbit-strength:.52;"
        data-flare-primary="color-mix(in oklab, var(--a) 46%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--c) 38%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 52%, transparent)"
        data-flare-strength=".52"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container led">
          <div class="section-header">
            <p class="eyebrow">Hero hardware</p>
            <h2 class="h2" data-parallax="0.12">Meet the LED Node</h2>
            <p class="lead">A palm-sized conductor for power, pixels, and timing inside one glass enclosure.</p>
          </div>
          <div class="led-stage reveal">
            <div class="led-diagram glass-panel">
              <span class="diagram-badge">Node topology</span>
              <p class="diagram-summary">
                Dual domains share a single brain: constant-voltage fixtures and pixel tapes receive synchronized cues with zero rack gymnastics.
              </p>
              <div class="diagram-grid" role="presentation">
                <div class="diagram-slice power">
                  <h3>Power bus</h3>
                  <p>8× 12-bit PWM, smoothing filters, 48&nbsp;V headroom.</p>
                </div>
                <div class="diagram-core">
                  <span class="core-ring" aria-hidden="true"></span>
                  <span class="core-glow" aria-hidden="true"></span>
                  <p>ESP32 dual-core<br />Sub-ms sync</p>
                </div>
                <div class="diagram-slice pixels">
                  <h3>Pixel matrix</h3>
                  <p>8 level-shifted lanes ready for long runs.</p>
                </div>
              </div>
            </div>
            <div class="led-details">
              <article class="glass-panel">
                <h3>Why it shines</h3>
                <ul>
                  <li>Dual outputs drive voltage fixtures and addressable strips in sync.</li>
                  <li>Instant glass UI shows health, cues, and safe limits seconds after power-on.</li>
                  <li>Mesh timing keeps motion flowing even if the uplink dips.</li>
                </ul>
                <p class="panel-foot">All wrapped in a smoked acrylic shell sized for DIN or wall niches.</p>
              </article>
              <article class="spec-callout glass-panel">
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
              </article>
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="experience"
        class="section halo section-experience"
        style="--orbit-a: color-mix(in oklab, var(--c) 42%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 40%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--c) 42%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 40%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 50%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container experience">
          <div class="section-header">
            <p class="eyebrow">Experience</p>
            <h2 class="h2" data-parallax="0.12">A gentle interface for live light</h2>
            <p class="lead">Glass panels, live feedback, and presets that crews can trust in a rush.</p>
          </div>
          <div class="experience-stage reveal">
            <div class="experience-console glass-panel">
              <span class="console-badge">Operator console</span>
              <p class="console-summary">
                Operators ride a calm dashboard that mirrors every LED Node pulse. Palette swaps, FX triggers, and diagnostics cascade across the strip, modules, and signage in one gesture.
              </p>
              <div class="console-status" role="presentation">
                <div class="status-card">
                  <span class="status-label">Live palette</span>
                  <span class="status-value">Mythica Strand</span>
                </div>
                <div class="status-card">
                  <span class="status-label">Sync span</span>
                  <span class="status-value">12 venues</span>
                </div>
                <div class="status-card">
                  <span class="status-label">Confidence</span>
                  <span class="status-value">99.2%</span>
                </div>
              </div>
            </div>
            <div class="experience-grid" role="list">
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
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="integration"
        class="section halo section-integration"
        style="--orbit-a: color-mix(in oklab, var(--b) 40%, transparent); --orbit-b: color-mix(in oklab, var(--a) 44%, transparent); --orbit-strength:.52;"
        data-flare-primary="color-mix(in oklab, var(--b) 40%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--a) 44%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 52%, transparent)"
        data-flare-strength=".52"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container integration">
          <div class="section-header">
            <p class="eyebrow">Synchronisation</p>
            <h2 class="h2" data-parallax="0.12">One palette, every surface</h2>
            <p class="lead">LED Node bridges signage, strips, and architectural fixtures so the glow reads as one cue.</p>
          </div>
          <div class="integration-stage reveal">
            <div class="integration-sync glass-panel">
              <span class="integration-badge">Live link stack</span>
              <p class="integration-summary">
                Map content, palettes, and FX once—LED Node fans it out to Mythica Strand signage, linear strips, and halo modules without drift.
              </p>
              <ul class="integration-bridges">
                <li>Palette packets roll through DMX, Art-Net, and native LumiGrid APIs.</li>
                <li>Colour intent and tempo metadata stay intact from design tool to venue.</li>
                <li>Fallback scenes keep brand-safe looks humming if an uplink drops.</li>
              </ul>
            </div>
            <div class="integration-grid" role="list">
              <article class="glass-card" role="listitem">
                <h3>Design suites</h3>
                <p>Import cues straight from Unreal, Notch, or browser shaders.</p>
                <span class="card-foot">Creative-first workflow</span>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Control protocols</h3>
                <p>Blend DMX universes with websocket cues inside one timing mesh.</p>
                <span class="card-foot">No more competing clocks</span>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Safety rails</h3>
                <p>Thermal, voltage, and brightness guards keep installs within spec.</p>
                <span class="card-foot">Peace of mind for venues</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="gallery"
        class="section halo section-gallery"
        style="--orbit-a: color-mix(in oklab, var(--a) 38%, transparent); --orbit-b: color-mix(in oklab, var(--b) 46%, transparent); --orbit-strength:.48;"
        data-flare-primary="color-mix(in oklab, var(--a) 38%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--b) 46%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 54%, transparent)"
        data-flare-strength=".48"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container gallery-wrap">
          <div class="section-header">
            <p class="eyebrow">Scenes</p>
            <h2 class="h2" data-parallax="0.12">Glassy moodboard in motion</h2>
            <p class="lead">
              Animated placeholders hint at the installations our crews prototype ahead of the LED Node launch.
            </p>
          </div>
          <div class="gallery-stage reveal">
            <div class="gallery-frame glass-panel">
              <span class="frame-label">Palette sync demo</span>
              <p class="frame-summary">
                Strip, halo modules, and Mythica Strand signage follow the selected palette so clients can preview a cohesive show before a single bracket is drilled.
              </p>
            </div>
            <div class="gallery-viewport">
              <Gallery items={galleryItems} />
            </div>
          </div>
          <p class="gallery-note reveal">
            Each tile is a live gradient placeholder—swap in venue shots while keeping the halo rhythm in sync with your theme.
          </p>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="support"
        class="section halo section-support"
        style="--orbit-a: color-mix(in oklab, var(--c) 40%, transparent); --orbit-b: color-mix(in oklab, var(--b) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--c) 40%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--b) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 50%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container support">
          <div class="section-header">
            <p class="eyebrow">Partner care</p>
            <h2 class="h2" data-parallax="0.12">Crew, docs, and diagnostics in sync</h2>
            <p class="lead">Our launch network blends human guidance with always-on monitoring so your show never feels unattended.</p>
          </div>
          <div class="support-stage reveal">
            <div class="support-grid" role="list">
              <article class="glass-card" role="listitem">
                <h3>Concierge engineers</h3>
                <p>Design reviews, wiring plans, and FX choreography check-ins before hardware ships.</p>
                <span class="card-foot">Every pilot gets a named crew</span>
              </article>
              <article class="glass-card" role="listitem">
                <h3>Knowledge orbit</h3>
                <p>Interactive docs, presets, and venue-ready templates updated with each firmware drop.</p>
                <span class="card-foot">Learning stays lightweight</span>
              </article>
              <article class="glass-card" role="listitem">
                <h3>24/7 telemetry</h3>
                <p>Health dashboards mirror venue conditions, raising safe limits before guests notice.</p>
                <span class="card-foot">Alerts in Slack, Teams, or SMS</span>
              </article>
            </div>
            <aside class="support-panel glass-panel">
              <span class="support-badge">Crew signal</span>
              <h3>Concierge service window</h3>
              <ul class="support-benefits">
                <li>12-hour design response during build weeks.</li>
                <li>5-minute incident acknowledgement once live.</li>
                <li>Hardware advance replacements stocked regionally.</li>
              </ul>
              <p class="support-foot">All wrapped in the same rounded glass aesthetic—no sharp edges in product or service.</p>
            </aside>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="updates"
        class="section halo section-updates"
        style="--orbit-a: color-mix(in oklab, var(--a) 36%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--a) 36%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--c) 40%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container narrow">
          <div class="section-header">
            <p class="eyebrow">What changed</p>
            <h2 class="h2" data-parallax="0.14">Additions, improvements, updates</h2>
            <p class="lead">
              A quick ledger of the glow work completed for this pass—grounded in the LumiGrid story and tuned for calm, age-inclusive reading.
            </p>
          </div>
          <div class="updates-stage reveal">
            <div class="updates-ledger" role="list">
              {#each updates as entry, index}
                <article class="glass-card update-card" role="listitem">
                  <span class="update-sequence" aria-hidden="true">{index + 1}</span>
                  <span class="update-tag" aria-hidden="true">{entry.tag}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                </article>
              {/each}
            </div>
            <aside class="updates-note glass-panel">
              <p class="note-title">Why the ledger matters</p>
              <p>
                Each entry reflects the new sync between hero preview, copy rhythm, and accessibility polish. Stakeholders can scan the feed or dive deep without losing the thread.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="launch"
        class="section halo center section-launch"
        style="--orbit-a: color-mix(in oklab, var(--c) 34%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 38%, transparent); --orbit-strength:.46;"
        data-flare-primary="color-mix(in oklab, var(--c) 34%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 38%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 46%, transparent)"
        data-flare-strength=".46"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container narrow">
          <div class="section-header">
            <p class="eyebrow">Road to release</p>
            <h2 class="h2" data-parallax="0.12">2026 is the opening night</h2>
            <p class="lead">Final hardware, pilot venues, and the founding batch are already in motion.</p>
          </div>
          <div class="launch-stage reveal">
            <div class="launch-timeline" role="list">
              <article class="launch-stop glass-card" role="listitem">
                <span class="stop-node" aria-hidden="true"></span>
                <h3>Now</h3>
                <p>Design freeze and endurance testing with architectural partners.</p>
              </article>
              <article class="launch-stop glass-card" role="listitem">
                <span class="stop-node" aria-hidden="true"></span>
                <h3>Mid 2025</h3>
                <p>Pilot installs, creative labs, and firmware polish with early crews.</p>
              </article>
              <article class="launch-stop glass-card" role="listitem">
                <span class="stop-node" aria-hidden="true"></span>
                <h3>2026 Launch</h3>
                <p>LED Node release bundled with LumiGrid OS, docs, and maker kits.</p>
              </article>
            </div>
            <aside class="launch-burst glass-panel">
              <p class="burst-title">What the launch unlocks</p>
              <ul>
                <li>Founding partner installs across hospitality, retail, and transit.</li>
                <li>Developer SDK with palette, FX, and signage bridges.</li>
                <li>Global service mesh with 24/7 diagnostics.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="faq"
        class="section halo section-faq"
        style="--orbit-a: color-mix(in oklab, var(--a) 40%, transparent); --orbit-b: color-mix(in oklab, var(--c) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--a) 40%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--c) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 50%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container faq">
          <div class="section-header">
            <p class="eyebrow">Questions</p>
            <h2 class="h2" data-parallax="0.12">Answers for curious crews</h2>
            <p class="lead">Quick clarifications on how LumiGrid keeps every edge rounded and every cue in sync.</p>
          </div>
          <div class="faq-stage reveal">
            <div class="faq-grid">
              <details class="faq-item glass-panel">
                <summary>How do palettes stay matched across signage, strips, and modules?</summary>
                <p>
                  Palettes carry timing, hue, and brightness metadata. LED Node reads the packet and mirrors it to the Mythica Strand signage, strip, and module drivers so every surface flips together.
                </p>
              </details>
              <details class="faq-item glass-panel">
                <summary>Can we feed content from our own control systems?</summary>
                <p>
                  Yes—Art-Net, sACN, and LumiGrid’s websocket bridge all land in the same rounded console. Your cues flow through the mesh while our safety rails ensure fixtures stay within spec.
                </p>
              </details>
              <details class="faq-item glass-panel">
                <summary>What happens if the network link drops mid-show?</summary>
                <p>
                  Each LED Node caches the active scene, palette, and fallback looks. Mesh timing keeps motion smooth, and once the uplink returns the signage display rejoins without harsh jumps.
                </p>
              </details>
              <details class="faq-item glass-panel">
                <summary>How fast can support respond during a live activation?</summary>
                <p>
                  Concierge engineers watch the same telemetry you do. Incidents ping our crew within five minutes, with regional spares and remote tuning standing by to keep your glow uninterrupted.
                </p>
              </details>
            </div>
            <aside class="faq-note glass-panel">
              <p class="faq-note-title">Need a deeper dive?</p>
              <p>
                Bring us your wildest signage layout—LumiGrid will sketch rounded prototypes, align on palettes, and choreograph the LED Node reveal alongside your team.
              </p>
              <a class="btn ghost" href="#contact">Talk with LumiGrid</a>
            </aside>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="contact"
        class="section halo center section-contact"
        style="--orbit-a: color-mix(in oklab, var(--a) 42%, transparent); --orbit-b: color-mix(in oklab, var(--warm) 40%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--a) 42%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--warm) 40%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 48%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container narrow">
          <div class="section-header">
            <p class="eyebrow">Stay close</p>
            <h2 class="h2" data-parallax="0.12">Join the launch list</h2>
            <p class="lead">Tell us what you want to light in 2026 and we’ll set the scene together.</p>
          </div>
          <div class="contact-stage reveal">
            <aside class="contact-note glass-panel">
              <p class="contact-title">First-wave perks</p>
              <ul>
                <li>Invite-only previews of new palettes, FX, and signage scripts.</li>
                <li>Priority access to launch hardware and integration slots.</li>
                <li>Direct line to LumiGrid designers for co-creation.</li>
              </ul>
            </aside>
            <div class="contact-form-shell">
              <ContactForm />
              <a class="btn outline big" href="https://reclamefabriek.eu" target="_blank" rel="noopener"
                >Visit Reclame Fabriek</a
              >
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <SideTimeline items={sections} />
</div>

<footer class="section footer-shell">
  <div class="container footer">
    <div class="footer-stage glass-panel">
      <div class="footer-brand">
        <span class="footer-badge">LumiGrid × LED Node</span>
        <h2 class="footer-headline">Keep every beam in concert.</h2>
        <p class="footer-copy">
          Our strip, halo modules, and Mythica Strand signage pulse together across the entire page. Stay in the orbit so your
          venues launch with that same precision.
        </p>
        <div class="footer-actions">
          <a class="btn primary" href="#launch">Track the launch</a>
          <a class="btn ghost" href="#hero">Back to top</a>
        </div>
      </div>
      <div class="footer-grid">
        <div class="footer-column">
          <h3>Explore</h3>
          <ul class="footer-nav">
            {#each sections as section (section.id)}
              <li><a href={'#' + section.id}>{section.label}</a></li>
            {/each}
          </ul>
        </div>
        <div class="footer-column">
          <h3>Connect</h3>
          <ul class="footer-nav">
            <li><a href="#contact">Join the launch list</a></li>
            <li><a href="mailto:hello@reclamefabriek.eu">hello@reclamefabriek.eu</a></li>
            <li>
              <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">reclamefabriek.eu</a>
            </li>
          </ul>
        </div>
        <div class="footer-column footer-column--note">
          <h3>Signal path</h3>
          <p>
            LED Node pilots open with signage sync, mesh diagnostics, and palette drops. Tell us what needs light and we’ll lace
            the cues together.
          </p>
        </div>
      </div>
    </div>
    <div class="footer-ribbon" aria-hidden="true">
      <span>SYNCED STRIP</span>
      <span>HALO MODULES</span>
      <span>MYTHICA STRAND</span>
      <span>2026 LAUNCH</span>
    </div>
    <div class="footer-legal">
      <p>
        © Reclame Fabriek — R&D •
        <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">reclamefabriek.eu</a>
      </p>
      <a class="footer-scroll" href="#hero">Return to story</a>
    </div>
  </div>
</footer>
