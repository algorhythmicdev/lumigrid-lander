<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

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
    content="Discover LumiGrid, the distributed lighting OS and LED Node launching in 2026. Synchronised PWM and pixel control, web-first UX, mesh-ready sync, and a glassy Apple-like experience for creative signage makers."
  >
  <meta name="keywords" content="LumiGrid LED Node, distributed lighting control, signage lighting system, 2026 launch, PWM and addressable LEDs">
  <meta property="og:title" content="LumiGrid LED Node — Intelligent Lighting Control Arriving 2026">
  <meta property="og:description" content="Discover LumiGrid, the distributed lighting OS and LED Node launching in 2026. Synchronised PWM and pixel control, web-first UX, mesh-ready sync, and a glassy Apple-like experience for creative signage makers.">
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
          A distributed lighting brain for façades, signage, and kinetic art. LumiGrid’s LED Node blends PWM power with pixel-perfect motion, synchronised across every installation — and it ships in 2026.
        </p>
        <div class="hero-cta reveal">
          <a class="btn primary" href="#system">Explore the ecosystem</a>
          <a class="btn outline" href="#contact">Join the launch list</a>
        </div>
        <div class="hero-highlights glass reveal">
          <ul>
            <li><strong>Distributed by design:</strong> every node thinks locally but plays in sync.</li>
            <li><strong>Web-native control:</strong> nothing to install — just open a browser.</li>
            <li><strong>Made for storytellers:</strong> map motion, rhythm, and ambience with ease.</li>
          </ul>
        </div>
        <div class="hero-specs reveal" role="list">
          <article class="card hero-spec" role="listitem">
            <h3>Sync mesh core</h3>
            <p>UDP multicast ticks and cues keep every node on the same beat, even over wireless links.</p>
          </article>
          <article class="card hero-spec" role="listitem">
            <h3>Dual-output engine</h3>
            <p>PWM power channels and addressable LED lanes blend seamlessly for pixels, washers, or kinetic props.</p>
          </article>
          <article class="card hero-spec" role="listitem">
            <h3>Browser-first control</h3>
            <p>Self-hosted UI plus open REST and MQTT APIs let any team orchestrate shows from a browser.</p>
          </article>
        </div>
        <p class="lead reveal">Crafted by <a href="https://reclamefabriek.eu" target="_blank" rel="noopener">Reclame Fabriek R&amp;D</a></p>
      </div>
    </header>
    <main id="main" tabindex="-1">
  <section id="system" class="section halo">
    <div class="container narrow">
      <p class="eyebrow">Part I — The LumiGrid System</p>
      <h2 class="h2" data-parallax="0.12">A living network of light</h2>
      <p class="big reveal">
        LumiGrid is a distributed control architecture for modular, intelligent lighting and kinetic systems. It turns light into a networked medium where each node thinks for itself yet moves in a shared rhythm — ideal for immersive retail, architectural façades, stage visuals, and experimental robotics.
      </p>
      <div class="system-pillars reveal" role="list">
        <article class="card system-card" role="listitem">
          <h3>Mesh of equal peers</h3>
          <p>Compact nodes drive LEDs, motors, or sensors and any can assume the master clock.</p>
        </article>
        <article class="card system-card" role="listitem">
          <h3>Tempo-locked timelines</h3>
          <p>Lightweight cues keep gradients, servos, and PWM fades phase-aligned without bulky data streams.</p>
        </article>
        <article class="card system-card" role="listitem">
          <h3>Open automation stack</h3>
          <p>REST and MQTT endpoints plus shared schemas make LumiGrid easy to plug into creative toolchains.</p>
        </article>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="philosophy" class="section halo">
    <div class="container">
      <div class="grid grid-2">
        <div>
          <h2 class="h2" data-parallax="0.1">Design philosophy</h2>
          <p class="lead reveal">The LumiGrid ethos keeps hardware pragmatic while letting creators focus on emotion, not wiring.</p>
        </div>
        <ul class="list reveal">
          <li><strong>Distributed intelligence:</strong> computation sits right beside the fixtures it drives.</li>
          <li><strong>Deterministic sync:</strong> mesh-aware timing keeps scenes aligned to the millisecond.</li>
          <li><strong>Open APIs:</strong> REST and MQTT endpoints expose every parameter for custom tools.</li>
          <li><strong>Human-centered UX:</strong> configuration and sequencing happen in any standards-based browser.</li>
          <li><strong>Hardware pragmatism:</strong> built around proven ESP-class MCUs and precision analog helpers.</li>
        </ul>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="motion" class="section halo">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">The system in motion</h2>
      <p class="lead reveal">
        Picture a retail façade dressed in addressable panels, kinetic logo elements, and ambient wall washers. One LumiGrid master broadcasts tempo and cues. Every LED Node interprets the shared timeline locally, so gradients ripple in sync, servos swing on beat, and PWM fixtures fade with pinpoint timing using only lightweight data.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="layers" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Core software layers</h2>
      <ol class="stack reveal">
        <li><strong>Sync Protocol:</strong> UDP multicast ticks and cues keep every node phase-aligned.</li>
        <li><strong>Trigger Engine:</strong> Routes actions like <em>play preset</em>, <em>blackout</em>, or <em>beat</em> to the correct subsystem.</li>
        <li><strong>Effect Engine:</strong> Renders visuals in real time while respecting frame rate, power, and timing budgets.</li>
        <li><strong>Scheduler:</strong> Automates daily scenes, playlists, and time-based triggers.</li>
        <li><strong>Networking & APIs:</strong> Unified REST and MQTT endpoints for external tools and dashboards.</li>
        <li><strong>Web UI:</strong> Self-hosted control panel for configuration, diagnostics, and live sequencing.</li>
      </ol>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="family" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Planned family of nodes</h2>
      <div class="table-wrap reveal">
        <table>
          <thead>
            <tr>
              <th>Node</th>
              <th>Core function</th>
              <th>Typical hardware</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>LED Node</strong></td>
              <td>Drives PWM and addressable LEDs, participates in sync</td>
              <td>ESP32 + PCA9685 + SN74HCT245</td>
            </tr>
            <tr>
              <td><strong>Kinetic Node</strong></td>
              <td>Motion profiles for servos and motors</td>
              <td>ESP32 + DRV8833 / servo expander</td>
            </tr>
            <tr>
              <td><strong>Sensor Node</strong></td>
              <td>Aggregates ambient, motion, or proximity data</td>
              <td>ESP32 + I²C sensor hub</td>
            </tr>
            <tr>
              <td><strong>Hub Node / Master</strong></td>
              <td>Time-base, playlist server, and cloud bridge</td>
              <td>ESP32-S3 or Raspberry Pi gateway</td>
            </tr>
            <tr>
              <td><strong>Light Bar Module</strong></td>
              <td>Linear LED variant for architectural strips</td>
              <td>Slim ESP32 + MOSFET array</td>
            </tr>
            <tr>
              <td><strong>Logic Node</strong></td>
              <td>Headless compute for choreography or AI inference</td>
              <td>Jetson Nano / Pi 5 companion</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="interaction" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.1">Human interaction built in</h2>
        <p class="lead reveal">Every LumiGrid node ships with intuitive tooling so teams can tune shows without proprietary software.</p>
      </div>
      <ul class="list reveal">
        <li><strong>Browser Sequencer:</strong> Assemble cues visually on any device.</li>
        <li><strong>Mobile Setup Portal:</strong> Instant Wi-Fi onboarding via captive portal.</li>
        <li><strong>MQTT / OSC bridge:</strong> Optional real-time link to DAWs, game engines, or show controllers.</li>
        <li><strong>SSE Telemetry:</strong> Monitor playhead, FPS, and power limits in real time.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="stack" class="section halo">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">Technology stack in one breath</h2>
      <p class="lead reveal">
        ESP-IDF v5 with FreeRTOS, LittleFS storage, esp_http_server, UDP multicast, RMT drivers, I²C, MQTT, cJSON, and a pure HTML + vanilla JS interface. Development lives in VS Code and PlatformIO, backed by automated builds and IDF Unity tests.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-overview" class="section halo">
    <div class="container">
      <p class="eyebrow">Part II — The LumiGrid LED Node</p>
      <div class="grid grid-2">
        <div>
          <h2 class="h2" data-parallax="0.12">Purpose</h2>
          <p class="lead reveal">
            The LED Node is LumiGrid’s reference module — the one that paints with light. It bridges precise PWM control for high-power fixtures with smooth animation for addressable pixels, ready to lead or join any synchronized grid.
          </p>
          <div class="badge reveal">Launching 2026 · Join the early access circle below</div>
        </div>
        <div class="card reveal">
          <h3>Why it matters</h3>
          <ul>
            <li>Per-zone intelligence keeps looks tight even on wireless links.</li>
            <li>Real-time blending means gradients stay silky under load.</li>
            <li>Open APIs invite agencies, integrators, and makers to extend it.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-hardware" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Hardware at a glance</h2>
        <p class="lead reveal">Built on proven components so installs stay dependable and serviceable.</p>
      </div>
      <ul class="list reveal">
        <li><strong>Controller:</strong> ESP32-WROOM-32U</li>
        <li><strong>PWM driver:</strong> PCA9685 (12-bit, 1 kHz) feeding eight MOSFET channels</li>
        <li><strong>Addressable outputs:</strong> 8 × level-shifted 5 V lines via SN74HCT245DWR</li>
        <li><strong>I²C bus:</strong> SDA 21 / SCL 22 @ 400 kHz</li>
        <li><strong>OE / Blackout:</strong> Dedicated GPIO 25 safety pin</li>
        <li><strong>Power:</strong> 5 V bus with fuse and thermal feedback</li>
        <li><strong>Expansion:</strong> Slot for eight additional PWM lines</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-firmware" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Firmware in layers</h2>
      <ol class="stack reveal">
        <li><strong>Board Init:</strong> Configures GPIO, I²C, mounts LittleFS, and loads profiles.</li>
        <li><strong>PWM Driver:</strong> Wraps PCA9685 with fade curves, soft start, and OE safety.</li>
        <li><strong>RMT Driver:</strong> Streams WS2812 / SK6812 data with 100 ns precision.</li>
        <li><strong>Effect Engine:</strong> Modular renderer with base/overlay structure and blend modes.</li>
        <li><strong>Scheduler & Cue Player:</strong> Turns JSON timelines into real-time sequences.</li>
        <li><strong>Sync Protocol:</strong> Aligns phase with the master clock via multicast.</li>
        <li><strong>REST / SSE Server:</strong> Exposes status and accepts triggers.</li>
        <li><strong>MQTT Bridge:</strong> Optional cloud and control-room integration.</li>
      </ol>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-effects" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Visual intelligence</h2>
      <p class="lead reveal">The Effect Engine acts as both painter and conductor, balancing drama with safety.</p>
      <div class="table-wrap reveal">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Example effects</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Base</strong></td>
              <td>Solid, Gradient, Chase, Twinkle</td>
              <td>Foundational looks for any installation</td>
            </tr>
            <tr>
              <td><strong>Spectral</strong></td>
              <td>Rainbow (palette-aware), Noise Flow</td>
              <td>Animated colour fields with beat awareness</td>
            </tr>
            <tr>
              <td><strong>Organic</strong></td>
              <td>Fire, Waves</td>
              <td>Procedural, beat-reactive scenes</td>
            </tr>
            <tr>
              <td><strong>Utility</strong></td>
              <td>Blackout, Flash, SyncPulse</td>
              <td>Precision transitions for cues</td>
            </tr>
            <tr>
              <td><strong>PWM FX</strong></td>
              <td>Breath, Candle, Warm-Dim</td>
              <td>Smooth analog dimming profiles</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="lead reveal">
        Shared <code>effect_params_t</code> descriptors define speed, intensity, colours, blend, and segment ranges, while a power-budget module estimates current draw and auto-scales brightness to stay safe.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-ui" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Glassy web experience</h2>
        <p class="lead reveal">Every node serves its own UI, responsive from phone to studio monitor.</p>
        <ul class="list reveal">
          <li><strong>Dashboard:</strong> Health, quick tests, and launch status.</li>
          <li><strong>Nodes view:</strong> Discover peers, monitor RSSI, manage firmware.</li>
          <li><strong>Sequencer:</strong> Timeline canvas with live playhead.</li>
          <li><strong>Presets & Schedules:</strong> JSON-editable library and calendar planning.</li>
          <li><strong>Settings:</strong> Network, MQTT, and visual themes.</li>
        </ul>
      </div>
      <LEDDemo class="reveal" />
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="led-apis" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Connectivity & APIs</h2>
      <div class="table-wrap reveal">
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>GET /api/status</code></td><td>Returns node role, mode, uptime, heap, FPS, and health</td></tr>
            <tr><td><code>POST /api/config</code></td><td>Merge or overwrite configuration JSON</td></tr>
            <tr><td><code>GET/POST/DELETE /api/presets</code></td><td>Manage stored looks and playlists</td></tr>
            <tr><td><code>POST /api/trigger</code></td><td>Execute <em>play_preset</em>, <em>set_pwm</em>, <em>blackout</em>, or <em>beat</em></td></tr>
            <tr><td><code>POST /api/cue</code></td><td>Schedule time-bound clips</td></tr>
            <tr><td><code>GET /events</code></td><td>Server-sent events stream with playhead and power limit data</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="reliability" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Reliability and safety</h2>
        <p class="lead reveal">Mission-critical shows stay calm thanks to layered safeguards.</p>
      </div>
      <ul class="list reveal">
        <li><strong>Fail-safe blackout:</strong> PCA9685 OE pin cuts power on fault or command.</li>
        <li><strong>Thermal & voltage watch:</strong> Automatic derating when stress is detected.</li>
        <li><strong>Watchdog diagnostics:</strong> Continuous heap and task monitoring.</li>
        <li><strong>Offline autonomy:</strong> Local schedules keep playing even without the master.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="makers" class="section halo">
    <div class="container grid grid-2">
      <div>
        <h2 class="h2" data-parallax="0.12">Developer & maker friendly</h2>
        <p class="lead reveal">Engineers, agencies, and hobbyists can iterate quickly on LumiGrid.</p>
      </div>
      <ul class="list reveal">
        <li>ESP-IDF v5 toolchain with CMake structure.</li>
        <li>USB and OTA firmware upgrades.</li>
        <li>Documented endpoints plus a desktop simulator for effects.</li>
        <li>Unit tests validating every effect with CRC-checked frames.</li>
        <li>Open-source web UI editable in any HTML editor.</li>
      </ul>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="applications" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Applications in the wild</h2>
      <div class="grid grid-3">
        <article class="card reveal"><h3>Interactive signage</h3><p>Animate window displays with zone-aware ambience, brand reveals, and event-driven sparkle.</p></article>
        <article class="card reveal"><h3>Stage & live events</h3><p>Keep tempo-locked visuals spanning LED panels, kinetic props, and power-limited fixtures.</p></article>
        <article class="card reveal"><h3>Architectural façades</h3><p>Scale from a single light bar to a building-wide grid, all orchestrated in the cloud or on-site.</p></article>
      </div>
      <p class="lead reveal" style="margin-top:1.5rem;">Need inspiration? Explore recent creative studies below.</p>
      <Gallery />
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="ideas" class="section halo">
    <div class="container">
      <h2 class="h2" data-parallax="0.12">Modern ideas we’re preparing</h2>
      <p class="lead reveal">The roadmap doubles down on the LumiGrid promise with thoughtful additions that deepen sync, craft, and reach.</p>
      <div class="ideas-grid">
        <article class="card idea-card reveal">
          <h3>Adaptive colour calibration</h3>
          <p>Future releases are slated to auto-balance hues across every LumiGrid node so large canvases glow consistently.</p>
        </article>
        <article class="card idea-card reveal">
          <h3>Distributed audio analysis</h3>
          <p>Edge nodes will collaborate on beat detection, letting motion and light stay locked to music without a central processor.</p>
        </article>
        <article class="card idea-card reveal">
          <h3>City-scale timelines</h3>
          <p>A shared cloud scheduler is planned to synchronise installations that span multiple venues or even whole districts.</p>
        </article>
        <article class="card idea-card reveal">
          <h3>Calendar-first scheduling</h3>
          <p>The built-in Schedules view evolves into a rich calendar planner so touring teams can pre-program cues visually.</p>
        </article>
      </div>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="vision" class="section halo">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">Vision forward</h2>
      <p class="lead reveal">
        LumiGrid is evolving into a multi-node creative OS. The roadmap includes adaptive colour calibration, distributed audio analysis for beat detection, and a shared cloud timeline for installations that span cities. The LED Node arriving in 2026 is the spark powering that ecosystem.
      </p>
    </div>
  </section>
  <div class="section-separator" aria-hidden="true"><span class="separator-glow"></span><span class="separator-strip"></span></div>
  <section id="contact" class="section halo center">
    <div class="container narrow">
      <h2 class="h2" data-parallax="0.12">Join the launch list</h2>
      <p class="lead reveal">Tell us about your 2026 lighting ambitions. We’ll help plan zones, power budgets, and show control for LumiGrid LED Nodes.</p>
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
