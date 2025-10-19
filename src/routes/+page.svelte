<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import MeshNavigator from '$lib/components/MeshNavigator.svelte';
  import DualOutputConfigurator from '$lib/components/DualOutputConfigurator.svelte';
  import EffectPaletteCarousel from '$lib/components/EffectPaletteCarousel.svelte';
  import RoadmapMicroInteractions from '$lib/components/RoadmapMicroInteractions.svelte';

  const sections = [
    { id: 'hero', label: 'Overview', icon: 'sparkles' },
    { id: 'system', label: 'System', icon: 'cubeTransparent' },
    { id: 'philosophy', label: 'Philosophy', icon: 'lightBulb' },
    { id: 'motion', label: 'Motion', icon: 'bolt' },
    { id: 'layers', label: 'Software', icon: 'serverStack' },
    { id: 'family', label: 'Nodes', icon: 'rectangleGroup' },
    { id: 'interaction', label: 'Interaction', icon: 'users' },
    { id: 'stack', label: 'Stack', icon: 'cpuChip' },
    { id: 'led-overview', label: 'LED Node', icon: 'sun' },
    { id: 'led-hardware', label: 'Hardware', icon: 'cog6Tooth' },
    { id: 'led-firmware', label: 'Firmware', icon: 'commandLine' },
    { id: 'led-effects', label: 'Effects', icon: 'swatch' },
    { id: 'led-ui', label: 'Web UI', icon: 'window' },
    { id: 'led-apis', label: 'Connectivity', icon: 'cloud' },
    { id: 'reliability', label: 'Reliability', icon: 'shieldCheck' },
    { id: 'makers', label: 'Makers', icon: 'codeBracketSquare' },
    { id: 'applications', label: 'Use cases', icon: 'globeAlt' },
    { id: 'ideas', label: 'Ideas', icon: 'sparkles' },
    { id: 'vision', label: 'Vision', icon: 'rocketLaunch' },
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
  <title>LumiGrid LED Node — Intelligent Lighting Control Arriving 2026</title>
  <meta
    name="description"
    content="Meet LumiGrid, the friendly lighting OS and LED Node launching in 2026. Follow the story from networked helpers to the hero controller that keeps pixels and power lights moving in sync."
  >
  <meta name="keywords" content="LumiGrid LED Node, distributed lighting control, signage lighting system, 2026 launch, PWM and addressable LEDs">
  <meta property="og:title" content="LumiGrid LED Node — Intelligent Lighting Control Arriving 2026">
  <meta property="og:description" content="Meet LumiGrid, the friendly lighting OS and LED Node launching in 2026. Follow the story from networked helpers to the hero controller that keeps pixels and power lights moving in sync.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://reclamefabriek.eu">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="LumiGrid LED Node — Intelligent Lighting Control Arriving 2026">
  <meta name="twitter:description" content="Discover LumiGrid, the distributed lighting OS and LED Node launching in 2026. Synchronised PWM and pixel control, web-first UX, mesh-ready sync, and a glassy Apple-like experience for creative signage makers.">
  <meta name="theme-color" content="#05060d" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f6f7fb" media="(prefers-color-scheme: light)">
  <meta name="color-scheme" content="dark light">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
</svelte:head>
<div class="page-shell">
  <div class="page-main">
    <header id="hero" class="section">
      <div class="container hero">
        <Header />
        <p class="eyebrow reveal">Launch window · 2026</p>
        <div class="badge reveal">LED Node · Launching 2026</div>
        <h1 class="h1 text-gradient" data-parallax="0.18">LumiGrid LED Node</h1>
        <p class="lead reveal">
          Meet the tiny box that lets light tell stories. The LumiGrid LED Node keeps chunky stage lights and sparkly strips dancing in step, like a band that practised for weeks — arriving in 2026.
        </p>
        <div class="hero-cta reveal">
          <a class="btn primary" href="#system">Explore the ecosystem</a>
          <a class="btn outline" href="#contact">Join the launch list</a>
        </div>
        <div class="hero-highlights glass reveal">
          <ul>
            <li><strong>Built to play together:</strong> every node has its own brain but still follows the beat.</li>
            <li><strong>Open a browser, walk in:</strong> grab a laptop or phone and the control room appears like a magic doorway.</li>
            <li><strong>Made for storytellers:</strong> paint moods, rhythm, and glow without wrestling with wiring.</li>
          </ul>
        </div>
        <div class="hero-specs reveal" role="list">
          <article class="card hero-spec" role="listitem">
            <h3>Sync mesh core</h3>
            <p>Tiny timing pings keep every LumiGrid box swaying together, on cables or Wi-Fi alike.</p>
          </article>
          <article class="card hero-spec" role="listitem">
            <h3>Dual-output engine</h3>
            <p>One side feeds big floods, the other side paints pixels, and both follow the same song.</p>
          </article>
          <article class="card hero-spec" role="listitem">
            <h3>Browser-first control</h3>
            <p>Open a web page and you’re running the show — friendly APIs stay open for custom tricks.</p>
          </article>
        </div>
        <div class="reveal">
          <DualOutputConfigurator />
        </div>
        <p class="lead reveal">Crafted by <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">Reclame Fabriek R&amp;D</a></p>
        <p class="story-transition reveal">Scroll to see how the LumiGrid world sets the stage before the LED Node steps into the spotlight.</p>
      </div>
    </header>
    <main id="main" tabindex="-1">
  <section id="system" class="section halo">
    <div class="container narrow">
      <p class="eyebrow">Part I — The LumiGrid story</p>
      <h2 class="h2" data-parallax="0.12">A friendly network of light helpers</h2>
      <p class="big reveal">
        LumiGrid is a family of small controllers that chat politely. Each one looks after its own lights or motors, yet they all listen to the same beat, like dancers following the same song. That makes shop windows, stages, and building façades feel alive without bulky control rooms.
      </p>
      <div class="system-pillars reveal" role="list">
        <article class="card system-card" role="listitem">
          <h3>Small brains everywhere</h3>
          <p>Every box makes quick choices for the lights plugged into it, so shows stay smooth even when Wi-Fi dips.</p>
        </article>
        <article class="card system-card" role="listitem">
          <h3>One shared rhythm</h3>
          <p>A gentle stream of timing pings keeps colour waves, moving signs, and dimmers stepping in time.</p>
        </article>
        <article class="card system-card" role="listitem">
          <h3>Open doors</h3>
          <p>Simple web links and apps mean anyone can plug LumiGrid into their favourite creative tools.</p>
        </article>
      </div>
      <div class="reveal">
        <MeshNavigator />
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="philosophy" class="section halo">
    <div class="container">
      <div class="grid grid-2">
        <div>
          <h2 class="h2" data-parallax="0.1">Why we build it this way</h2>
          <p class="lead reveal">We want light shows that feel magical without needing a toolbox full of secrets.</p>
        </div>
        <ul class="list reveal">
          <li><strong>Brains near the bulbs:</strong> the thinking happens right next to the lights, so reactions are quick.</li>
          <li><strong>Timing that never panics:</strong> every node listens for the same beat and keeps the groove.</li>
          <li><strong>Open invites:</strong> clear web links and messages let anyone tinker, remix, or automate.</li>
          <li><strong>Friendly setup:</strong> everything runs inside a normal browser, no locked-down apps needed.</li>
          <li><strong>Trusted parts:</strong> we pick chips you can actually buy and replace.</li>
        </ul>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="motion" class="section halo">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">See it in your head</h2>
      <p class="lead reveal">
        Imagine a street window glowing with colour, a logo gently breathing, and a halo of wall lights changing mood together. One LumiGrid node taps the tempo. The rest follow the rhythm, so every pixel, motor, and dimmer moves like one big instrument.
      </p>
      <p class="story-transition reveal">That orchestra needs a shining soloist, and the LED Node is warming up backstage.</p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="layers" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">What happens inside</h2>
      <ol class="stack reveal">
        <li><strong>Beat keeper:</strong> tiny timing messages make sure everyone claps together.</li>
        <li><strong>Action router:</strong> when you tap “play” or “fade”, the right part of the brain reacts instantly.</li>
        <li><strong>Light painter:</strong> colour mixes stay smooth and safe, even when the show gets loud.</li>
        <li><strong>Day planner:</strong> automatic schedules wake the lights up for sunrise sales or evening gigs.</li>
        <li><strong>Shared language:</strong> open web addresses let other tools talk to LumiGrid politely.</li>
        <li><strong>Built-in control room:</strong> each node serves a shiny dashboard you can open in any browser.</li>
      </ol>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="family" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Meet the LumiGrid crew</h2>
      <div class="table-wrap reveal">
        <table>
          <thead>
            <tr>
              <th>Node</th>
              <th>Favourite move</th>
              <th>Brains inside</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>LED Node</strong></td>
              <td>Splashes colour and powers strips while keeping the beat</td>
              <td>ESP32 + PCA9685 + SN74HCT245</td>
            </tr>
            <tr>
              <td><strong>Kinetic Node</strong></td>
              <td>Moves motors and servos so signs wave hello</td>
              <td>ESP32 + DRV8833 / servo expander</td>
            </tr>
            <tr>
              <td><strong>Sensor Node</strong></td>
              <td>Listens for touch, motion, or daylight and shares the news</td>
              <td>ESP32 + I²C sensor hub</td>
            </tr>
            <tr>
              <td><strong>Hub Node / Master</strong></td>
              <td>Starts the clock, stores playlists, and bridges to the cloud</td>
              <td>ESP32-S3 or Raspberry Pi gateway</td>
            </tr>
            <tr>
              <td><strong>Light Bar Module</strong></td>
              <td>Snaps into long architectural lines for smooth fades</td>
              <td>Slim ESP32 + MOSFET array</td>
            </tr>
            <tr>
              <td><strong>Logic Node</strong></td>
              <td>Runs heavy brains like choreography or AI cues</td>
              <td>Jetson Nano / Pi 5 companion</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <p class="story-transition reveal" style="text-align:center;">Among all these helpers, the LED Node takes centre stage next.</p>
  <section id="interaction" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.1">Control from anywhere</h2>
        <p class="lead reveal">If you can open a web page, you can steer LumiGrid. No secret software, no dongles.</p>
      </div>
      <ul class="list reveal">
        <li><strong>Browser sequencer:</strong> sketch scenes with drag-and-drop blocks on a phone, tablet, or desktop.</li>
        <li><strong>First-time helper:</strong> new nodes make their own Wi-Fi bubble so setup feels like connecting new headphones.</li>
        <li><strong>Pro bridges:</strong> link into music tools and show controllers when you need extra sparkle.</li>
        <li><strong>Live heartbeat:</strong> watch temperature, power, and playhead numbers pulse in real time.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="stack" class="section halo">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">Built on trusted tech</h2>
      <p class="lead reveal">
        Under the glassy visuals lives solid engineering: ESP-IDF firmware (our toolkit), FreeRTOS scheduling (a tidy chore chart), fast file storage, and open web code. Think of it as a well-organised backpack that always has spare batteries. We build and test everything with everyday tools like VS Code so future makers can jump in with confidence.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-overview" class="section halo">
    <div class="container">
      <p class="eyebrow">Part II — Spotlight on the LED Node</p>
      <div class="grid grid-2">
        <div>
          <h2 class="h2" data-parallax="0.12">The hero of the show</h2>
          <p class="lead reveal">
            The LumiGrid LED Node is the star performer. It powers bright fixtures, animates pixel strips, and keeps time with the rest of the crew so every scene feels like one flowing story. We’re polishing every cue so it can make a confident debut in 2026.
          </p>
          <div class="badge reveal">Launching 2026 · Join the early access circle below</div>
        </div>
          <div class="card reveal">
          <h3>Why it matters</h3>
          <ul>
            <li>Each node thinks for its own zone, so cues stay sharp even if the network gets busy.</li>
            <li>Smooth colour blends and fades keep the mood soft, bold, or wild on demand.</li>
            <li>Open connections invite agencies, integrators, and makers to script their own magic.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-hardware" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Solid parts, tiny shell</h2>
        <p class="lead reveal">We chose parts you can count on, so the hero stays calm night after night.</p>
      </div>
      <ul class="list reveal">
        <li><strong>Main brain:</strong> ESP32-WROOM-32U keeps Wi-Fi strong and code speedy — it’s the thinker inside the box.</li>
        <li><strong>Smooth dimming:</strong> PCA9685 driver feeds eight power channels with 12-bit finesse, like a dimmer fairy giving soft fades.</li>
        <li><strong>Pixel pals:</strong> Eight level-shifted 5 V lanes keep LED strips bright and happy, ready for long ribbons of colour.</li>
        <li><strong>Quick chatter:</strong> Fast I²C links hook into sensors and future add-ons, letting the node whisper with gadgets nearby.</li>
        <li><strong>Safety switch:</strong> A dedicated blackout pin can calm everything in a flash when you need a reset.</li>
        <li><strong>Power guard:</strong> Fuses and thermal feedback watch for trouble before you ever see it, like smoke detectors for circuits.</li>
        <li><strong>Room to grow:</strong> An expansion header leaves space for more PWM tricks when new ideas knock.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-firmware" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Software that sings</h2>
      <ol class="stack reveal">
        <li><strong>Wake-up ritual:</strong> the board boots, checks its memory card, and puts on the right outfit.</li>
        <li><strong>Dimmer coach:</strong> smart fades protect hardware while keeping the glow gentle.</li>
        <li><strong>Pixel drummer:</strong> super precise pulses feed addressable strips without flicker, sticking to the rhythm like a metronome.</li>
        <li><strong>Effect studio:</strong> layered shaders mix colours like a digital painter with a steady hand.</li>
        <li><strong>Show caller:</strong> saved timelines and cues keep events on schedule, like a stage manager with a clipboard.</li>
        <li><strong>Sync ears:</strong> the node listens for beat pings and locks in phase with friends.</li>
        <li><strong>Web doorway:</strong> live status, controls, and logs stream straight to your browser.</li>
        <li><strong>Cloud bridge:</strong> optional MQTT pipes let remote teams nudge the lights.</li>
      </ol>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-effects" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Looks that feel alive</h2>
      <p class="lead reveal">The effect engine is half artist, half conductor. It keeps the drama bright while protecting the hardware.</p>
      <div class="reveal">
        <EffectPaletteCarousel />
      </div>
      <p class="lead reveal">
        Behind the scenes, simple sliders for speed, colour, and sparkle all map to safe power budgets. If things get hot, the node quietly eases the brightness so the show can go on.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-ui" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">A control room in your pocket</h2>
        <p class="lead reveal">Every node hosts a glassy dashboard that scales from phone to studio screen.</p>
        <ul class="list reveal">
          <li><strong>Dashboard:</strong> instant health checks and big friendly buttons.</li>
          <li><strong>Nodes view:</strong> see nearby friends, their signal strength, and updates.</li>
          <li><strong>Sequencer:</strong> build scenes on a timeline and watch the live playhead glide.</li>
          <li><strong>Presets & schedules:</strong> save favourite looks and plan them on a calendar.</li>
          <li><strong>Settings:</strong> tweak network, cloud, and themes without leaving the browser.</li>
        </ul>
      </div>
      <LEDDemo class="reveal" />
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-apis" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Simple ways to talk to it</h2>
      <div class="table-wrap reveal">
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Plain words</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>GET /api/status</code></td><td>Peek at role, mode, uptime, and health numbers.</td></tr>
            <tr><td><code>POST /api/config</code></td><td>Send a simple JSON file to tweak settings.</td></tr>
            <tr><td><code>GET/POST/DELETE /api/presets</code></td><td>Save, list, or remove favourite light looks.</td></tr>
            <tr><td><code>POST /api/trigger</code></td><td>Ask the node to play a preset, fade, blackout, or tap the beat.</td></tr>
            <tr><td><code>POST /api/cue</code></td><td>Line up a moment in the future and let the node handle it.</td></tr>
            <tr><td><code>GET /events</code></td><td>Stream live playhead, power, and safety updates.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="reliability" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Safety nets everywhere</h2>
        <p class="lead reveal">Big shows need calm nerves. The LED Node keeps an eye on itself so you can focus on the story.</p>
      </div>
      <ul class="list reveal">
        <li><strong>Instant calm:</strong> a hardware pin can dim everything the moment something feels wrong.</li>
        <li><strong>Heat and voltage guard:</strong> the node softens brightness before parts get stressed, like a stage manager lowering the volume.</li>
        <li><strong>Watchful timers:</strong> background checks make sure memory and tasks stay healthy.</li>
        <li><strong>Show must go on:</strong> saved schedules keep running even if the main clock disappears.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="makers" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Ready for curious hands</h2>
        <p class="lead reveal">Whether you build stages or weekend art, the LED Node is easy to hack, test, and ship.</p>
      </div>
      <ul class="list reveal">
        <li>Use the ESP-IDF toolchain with clear project folders, like labelled drawers in a workshop.</li>
        <li>Update firmware over USB or wirelessly when ideas strike.</li>
        <li>Test effects on a desktop simulator before rolling cases.</li>
        <li>Lean on unit tests that check each animation frame so surprises stay on stage, not in code.</li>
        <li>Fork the open-source web UI and style it to match your show.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="applications" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Where it shines</h2>
      <div class="grid grid-3">
        <article class="card reveal"><h3>Interactive signage</h3><p>Turn shop windows into living stories that nod, glow, and wave at passers-by.</p></article>
        <article class="card reveal"><h3>Stage & live events</h3><p>Link LED walls, lasers, and props so the whole rig hits every beat together.</p></article>
        <article class="card reveal"><h3>Architectural façades</h3><p>Cover a building with gentle gradients that stay in sync from street to skyline.</p></article>
      </div>
      <p class="lead reveal" style="margin-top:1.5rem;">Need ideas? Browse the creative studies below and imagine your own scene — then picture the LED Node calling the shots.</p>
      <Gallery />
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="ideas" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">What’s cooking next</h2>
      <p class="lead reveal">We keep dreaming up upgrades that make LumiGrid smarter, kinder, and easier to share.</p>
      <div class="ideas-grid">
        <article class="card idea-card reveal">
          <h3>Adaptive colour balance</h3>
          <p>Let every light in a giant canvas match shades automatically, no ladder required.</p>
        </article>
        <article class="card idea-card reveal">
          <h3>Shared beat sensing</h3>
          <p>Nodes will listen to music together and agree on the groove without one big server.</p>
        </article>
        <article class="card idea-card reveal">
          <h3>City-scale timelines</h3>
          <p>Schedule shows for entire districts from one cloud calendar.</p>
        </article>
        <article class="card idea-card reveal">
          <h3>Calendar-first planning</h3>
          <p>Designers will soon drag scenes onto a colourful calendar and hit play.</p>
        </article>
      </div>
      <p class="lead reveal">Think of these as postcards from the future — each one keeps the LumiGrid story rolling.</p>
      <div class="reveal">
        <RoadmapMicroInteractions />
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="vision" class="section halo">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">Looking ahead</h2>
      <p class="lead reveal">
        LumiGrid is growing into a whole creative operating system. The LED Node is the first hero on stage, and future upgrades will link colours, beats, and buildings together like one big light orchestra. New characters — sensors, kinetic arms, whole façades — are lining up in the wings.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="contact" class="section halo center">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">Join the launch list</h2>
      <p class="lead reveal">Tell us what you want to light up in 2026. We’ll help sketch the zones, power, and show flow with LumiGrid LED Nodes so opening night feels effortless.</p>
      <ContactForm />
      <a class="btn outline big" href="https://reclamefabriek.eu" target="_blank" rel="noopener">Visit Reclame Fabriek</a>
    </div>
  </section>
    </main>
  </div>
  <SideTimeline items={sections} />
</div>
<footer class="section center" style="padding-top:1rem;">
  <div class="container"><p>© Reclame Fabriek — R&amp;D • <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">reclamefabriek.eu</a></p></div>
</footer>
