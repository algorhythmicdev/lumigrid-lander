<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import MeshNavigator from '$lib/components/MeshNavigator.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

  const sections = [
    { id: 'hero', label: 'Overview', icon: 'sparkles' },
    { id: 'system', label: 'System', icon: 'cubeTransparent' },
    { id: 'mesh', label: 'Mesh', icon: 'globeAlt' },
    { id: 'philosophy', label: 'Philosophy', icon: 'lightBulb' },
    { id: 'layers', label: 'Layers', icon: 'serverStack' },
    { id: 'nodes', label: 'Nodes', icon: 'users' },
    { id: 'led-node', label: 'LED Node', icon: 'sun' },
    { id: 'firmware', label: 'Firmware', icon: 'cpuChip' },
    { id: 'experience', label: 'Experience', icon: 'swatch' },
    { id: 'integration', label: 'Connectivity', icon: 'codeBracketSquare' },
    { id: 'applications', label: 'Applications', icon: 'rectangleGroup' },
    { id: 'gallery', label: 'Showreel', icon: 'window' },
    { id: 'contact', label: 'Contact', icon: 'envelope' },
    { id: 'vision', label: 'Vision', icon: 'rocketLaunch' }
  ];

  const heroHighlights = [
    'Distributed control architecture',
    'Mesh of equal peers',
    'Human-centred web UI'
  ];

  const systemOverview = [
    'LumiGrid is a distributed control architecture for modular, intelligent lighting and kinetic systems. At its core it turns light into a networked medium—each node thinking for itself, yet synchronised in a collective rhythm.',
    'Instead of one controller fanning out to passive fixtures, LumiGrid builds a mesh of equal peers: compact nodes that can drive LEDs, motors, sensors, or mixed loads. Any node can become the master clock; others align automatically over Wi-Fi or Ethernet multicast.'
  ];

  const systemMotion = [
    'Imagine a retail façade covered in addressable LED panels, a few kinetic logo elements, and a line of ambient wall-washers. A single LumiGrid master broadcasts the global clock and cues.',
    'Every LED Node interprets that timeline locally: gradients ripple in sync, servos swing at the beat, and PWM fixtures fade precisely on the downbeat. The choreography is data-light—just timestamps and preset names—yet the visual result is tightly unified.'
  ];

  const meshHighlights = [
    { title: 'Self-healing leadership', detail: 'Any node can assume master duties; the mesh rebalances within two beats.' },
    {
      title: 'Deterministic sync',
      detail:
        'Multicast ticks keep drifts under ±1 ms across Wi-Fi or Ethernet peers, so fades, sweeps, and motion stay locked.'
    },
    {
      title: 'Operational transparency',
      detail: 'REST + MQTT status mirrors leadership changes in real time for dashboards and remote operators.'
    }
  ];

  const meshReassurance = [
    'Role handovers publish to the API bus instantly, so third-party controllers stay aware of the timeline owner.',
    'Offline clusters keep the beat thanks to a deterministic fallback clock and cached playlists.',
    'Installers can dry-run leadership swaps in the Mesh Navigator without touching live hardware.'
  ];

  const designPhilosophy = [
    'Distributed intelligence: computation sits next to the hardware it controls.',
    'Deterministic sync: every node follows the same timeline, even across wireless networks.',
    'Openness: each module exposes its state through open REST / MQTT APIs and serves its own web UI.',
    'Human-centred UX: installation, mapping, and show control happen from any browser—no proprietary app required.',
    'Hardware pragmatism: built around inexpensive, readily available ESP-class MCUs and a few precision analog helpers.'
  ];

  const systemLayers = [
    { step: '01', title: 'Sync Protocol', detail: 'UDP multicast “ticks” and “cues” keep all nodes aligned to the same millisecond grid.' },
    { step: '02', title: 'Trigger Engine', detail: 'Interprets incoming actions—play preset, blackout, beat—and routes them to the right subsystem.' },
    { step: '03', title: 'Effect Engine', detail: 'Renders visual or kinetic effects in real time, respecting frame-rate, power, and timing constraints.' },
    { step: '04', title: 'Scheduler', detail: 'Executes time-based scenes, daily schedules, or show playlists.' },
    { step: '05', title: 'Networking & APIs', detail: 'REST + MQTT endpoints expose every parameter to higher-level controllers or creative tools.' },
    { step: '06', title: 'Web UI', detail: 'A self-hosted control panel served by each node for configuration, diagnostics, and live sequencing.' }
  ];

  const humanInteraction = [
    'Browser Sequencer: every node can open a timeline view to assemble cues visually.',
    'Mobile Setup Portal: on first power-up, nodes create an AP and captive portal for Wi-Fi onboarding.',
    'MQTT / OSC Bridge (optional): allows real-time control from DAWs, game engines, or show controllers.',
    'SSE Telemetry: live feedback of playhead, FPS, temperature, and power-limit state.'
  ];

  const techStack = [
    'ESP-IDF v5 + FreeRTOS',
    'LittleFS',
    'esp_http_server',
    'LWIP UDP multicast',
    'RMT driver',
    'I²C',
    'MQTT client',
    'cJSON',
    'Pure-HTML + vanilla JS UI'
  ];

  const nodeFamily = [
    {
      name: 'LED Node',
      function: 'Drives “dumb” PWM and addressable LEDs, effects engine, sync participant',
      hardware: 'ESP32 + PCA9685 + SN74HCT245'
    },
    {
      name: 'Kinetic Node',
      function: 'Motor/servo driver with motion profiles synced to grid',
      hardware: 'ESP32 + DRV8833 / servo expander'
    },
    {
      name: 'Sensor Node',
      function: 'Aggregates ambient, motion, or proximity sensors; publishes events',
      hardware: 'ESP32 + I²C sensor hub'
    },
    {
      name: 'Hub Node / Master',
      function: 'Acts as time-base, playlist server, and cloud bridge',
      hardware: 'ESP32-S3 / Raspberry Pi gateway'
    },
    {
      name: 'Light Bar Module',
      function: 'Linear LED Node variant for architectural strips',
      hardware: 'Slim ESP32 + MOSFET array'
    },
    {
      name: 'Logic Node',
      function: 'Headless compute module running choreography or AI inference',
      hardware: 'Jetson Nano / Pi 5 companion'
    }
  ];

  const ledPurpose = [
    'The LED Node bridges precise PWM control for high-power “dumb” LED channels and smooth addressable LED animation for pixel-based fixtures.',
    'Each node can perform solo, join an ensemble, or lead as a sync master.'
  ];

  const hardwareSpecs = [
    'Controller: ESP32-WROOM-32U',
    'PWM driver: PCA9685 (12-bit, 1 kHz) → 8 MOSFET channels',
    'Addressable outputs: 8 × level-shifted 5 V via SN74HCT245DWR',
    'I²C bus: SDA 21 / SCL 22 @ 400 kHz',
    'OE / Blackout: GPIO 25',
    'ALED GPIOs: 16, 4, 17, 18, 19, 23, 26, 27',
    'Power: 5 V bus with fuse and thermal feedback',
    'Expansion slot: 8 extra PWM lines for future servo or relay use'
  ];

  const personalityPoints = [
    'Blend complex colour effects in real time.',
    'Maintain precise phase alignment with the grid.',
    'Enforce power and thermal limits automatically.',
    'Expose its full state through human-friendly APIs.'
  ];

  const firmwareLayers = [
    { step: '01', title: 'Board Init', detail: 'Sets GPIO, I²C, mounts LittleFS, reads config.' },
    { step: '02', title: 'PWM Driver', detail: 'Wraps PCA9685 with fade curves, soft-start, and OE safety.' },
    { step: '03', title: 'RMT Driver', detail: 'Outputs WS2812 / SK6812 data streams with 100 ns precision.' },
    { step: '04', title: 'Effect Engine', detail: 'Modular renderer supporting base + overlay, blend modes, and virtual segments.' },
    { step: '05', title: 'Scheduler / Cue Player', detail: 'Interprets JSON timelines into real-time sequences.' },
    { step: '06', title: 'Sync Protocol', detail: 'Keeps phase with the master clock via multicast tick/cue.' },
    { step: '07', title: 'REST / SSE Server', detail: 'Exposes status and accepts triggers from the UI.' },
    { step: '08', title: 'MQTT Bridge', detail: 'Optional cloud/control-room integration.' }
  ];

  const effectCategories = [
    { title: 'Base', examples: 'Solid, Gradient, Chase, Twinkle', notes: 'Foundational FX.' },
    { title: 'Spectral', examples: 'Rainbow (palette-aware), Noise Flow', notes: 'Animated colour fields.' },
    { title: 'Organic', examples: 'Fire, Waves', notes: 'Procedural, beat-reactive.' },
    { title: 'Utility', examples: 'Blackout, Flash, SyncPulse', notes: 'Cue-driven transitions.' },
    { title: 'PWM FX', examples: 'Breath, Candle, Warm-Dim', notes: 'Smooth analogue dimming.' }
  ];

  const webExperience = [
    'Dashboard: status, health, quick test controls.',
    'Nodes: discover peers, view RSSI and firmware.',
    'Sequencer: interactive canvas timeline with zoom and live playhead.',
    'Presets: local library, instant preview, editable JSON.',
    'Schedules: calendar view (in progress).',
    'Settings: network, MQTT, and theme preferences.'
  ];

  const connectivityEndpoints = [
    { endpoint: 'GET /api/status', description: 'Returns node info, role, mode, uptime, heap, FPS.' },
    { endpoint: 'POST /api/config', description: 'Merge or overwrite configuration JSON.' },
    { endpoint: 'GET/POST/DELETE /api/presets', description: 'Manage stored presets.' },
    { endpoint: 'POST /api/trigger', description: 'Execute actions: play_preset, set_pwm, blackout, beat.' },
    { endpoint: 'POST /api/cue', description: 'Schedule time-bound clips.' },
    { endpoint: 'GET /events', description: 'Server-Sent Events stream (status, playhead, power limit).' }
  ];

  const reliabilityPoints = [
    'Fail-safe blackout: PCA9685 OE pin cuts power on fault or command.',
    'Thermal / voltage watch: automatic derate under stress.',
    'Watchdog & diagnostics: continuous heap and task monitoring.',
    'Offline autonomy: local schedules run even without the master.'
  ];

  const developerPoints = [
    'ESP-IDF v5 toolchain, CMake project structure.',
    'Firmware upgrades over USB or OTA.',
    'All endpoints documented; simulator for effect testing on desktop.',
    'Unit tests for every effect (CRC-checked frame outputs).',
    'Web UI open-source and editable in any HTML editor.'
  ];

  const applications = [
    'Interactive signage and ambient installations.',
    'Stage lighting with precise tempo lock.',
    'Architectural façades with power budgeting.',
    'Educational kits for embedded lighting control.',
    'Art projects blending light, motion, and sound.'
  ];

  const visionForward = [
    'LumiGrid is evolving toward a multi-node creative OS: future releases will bring adaptive colour calibration, distributed audio analysis for beat detection, and a shared cloud timeline for installations spanning cities.',
    'The LED Node is just the first spark—the foundation on which an ecosystem of intelligent, responsive light will grow.'
  ];

  const galleryItems = [
    {
      title: 'Atrium halo',
      subtitle: 'Slow-breathing foyer wash',
      href: '#contact',
      accent: 'var(--a)',
      accentB: 'var(--c)'
    },
    {
      title: 'Façade ripple',
      subtitle: 'Nine-storey mesh sync',
      href: '#contact',
      accent: 'var(--c)',
      accentB: 'var(--halo-glow)'
    },
    {
      title: 'Stage pulse',
      subtitle: 'Beat-perfect kinetic loop',
      href: '#contact',
      accent: 'var(--b)',
      accentB: 'var(--a)'
    },
    {
      title: 'Retail marquee',
      subtitle: '1200 px sparkle chase',
      href: '#contact',
      accent: 'var(--halo-glow)',
      accentB: 'var(--a)'
    },
    {
      title: 'Gallery calm',
      subtitle: 'Warm dimming profile',
      href: '#contact',
      accent: 'var(--warm)',
      accentB: 'var(--b)'
    },
    {
      title: 'Transit node',
      subtitle: 'Announcements in light',
      href: '#contact',
      accent: 'var(--c)',
      accentB: 'var(--warm)'
    }
  ];

  const galleryNotes = [
    'Scenes above are rendered directly on LumiGrid LED Nodes—no offline compositing.',
    'Field tests span Tallinn, Berlin, and Helsinki pilot venues to validate networking conditions.'
  ];

  const contactHighlights = [
    'Book a technical deep-dive covering sync internals, firmware, and the browser console.',
    'Request the LED Node reference BOM, pinout diagrams, and enclosure guidelines.',
    'Join the pilot list for early access hardware or remote show control services.'
  ];

  const contactSignals = [
    { label: 'Response time', value: '< 2 business days via email or Signal.' },
    { label: 'Pilot support', value: 'Hands-on help for mapping, timeline authoring, and on-site tuning.' },
    { label: 'Integration', value: 'REST, MQTT, OSC, and DMX bridge guidance with working examples.' }
  ];
</script>

<svelte:head>
  <title>LumiGrid — A living network of light</title>
  <meta
    name="description"
    content="Explore the LumiGrid system: distributed lighting control, planned node family, LED Node hardware, firmware, and APIs drawn directly from the LumiGrid whitepaper."
  />
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
              <span class="hero-label">A living network of light</span>
              <h1 class="hero-marquee" data-parallax="0.18">
                <span class="hero-marquee-word">LUMIGRID</span>
                <span class="hero-marquee-divider">×</span>
                <span class="hero-marquee-word accent">LED NODE</span>
              </h1>
              {#each systemOverview as paragraph}
                <p class="hero-intro">{paragraph}</p>
              {/each}
              <div class="hero-actions">
                <a class="btn primary" href="#led-node">Meet the LED Node</a>
                <a class="btn ghost" href="#vision">See the vision</a>
              </div>
              <div class="hero-highlights" aria-label="Principles">
                {#each heroHighlights as item}
                  <span class="highlight-pill">{item}</span>
                {/each}
              </div>
            </div>
            <div class="hero-visual" aria-hidden="true">
              <div class="hero-visual-shell">
                <LEDDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main id="main" tabindex="-1">
      <section
        id="system"
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
            <p class="eyebrow">System story</p>
            <h2 class="h2" data-parallax="0.1">The mesh in motion</h2>
            <p class="lead">LumiGrid nodes share timing, cues, and motion so venues behave like one organism.</p>
          </div>
          <div class="journey-stage reveal">
            <div class="journey-intro glass-panel">
              <p class="journey-eyebrow">How it feels</p>
              {#each systemMotion as paragraph}
                <p class="journey-summary">{paragraph}</p>
              {/each}
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="mesh"
        class="section halo section-mesh"
        style="--orbit-a: color-mix(in oklab, var(--b) 44%, transparent); --orbit-b: color-mix(in oklab, var(--c) 42%, transparent); --orbit-strength:.52;"
        data-flare-primary="color-mix(in oklab, var(--b) 44%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--c) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 50%, transparent)"
        data-flare-strength=".52"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container mesh">
          <div class="section-header">
            <p class="eyebrow">Mesh control</p>
            <h2 class="h2" data-parallax="0.12">Navigate leadership handovers</h2>
            <p class="lead">Swap masters, inspect latency, and confirm tempo alignment before going on site.</p>
          </div>
          <div class="mesh-stage reveal">
            <MeshNavigator />
            <article class="mesh-details glass-panel">
              <h3>Why teams love the mesh</h3>
              <ul class="mesh-details-list">
                {#each meshHighlights as item}
                  <li>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </li>
                {/each}
              </ul>
              <ul class="mesh-assurance">
                {#each meshReassurance as item}
                  <li>{item}</li>
                {/each}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="philosophy"
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
            <p class="eyebrow">Design philosophy</p>
            <h2 class="h2" data-parallax="0.12">Principles that guide LumiGrid</h2>
            <p class="lead">Every guideline below is drawn directly from the LumiGrid whitepaper.</p>
          </div>
          <div class="system-stage reveal">
            <div class="system-columns philosophy-list" role="list">
              {#each designPhilosophy as principle}
                <article class="glass-card" role="listitem">
                  <p>{principle}</p>
                </article>
              {/each}
            </div>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="layers"
        class="section halo section-architecture"
        style="--orbit-a: color-mix(in oklab, var(--b) 38%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--b) 38%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 52%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container architecture">
          <div class="section-header">
            <p class="eyebrow">Core layers</p>
            <h2 class="h2" data-parallax="0.12">Software stack and human touch</h2>
            <p class="lead">The same runtime keeps timing, effects, and the browser console in lockstep.</p>
          </div>
          <div class="architecture-stage reveal">
            <article class="architecture-stack glass-panel">
              <span class="stack-badge">System architecture</span>
              <ol class="stack-list">
                {#each systemLayers as layer (layer.title)}
                  <li>
                    <span class="stack-step">{layer.step}</span>
                    <div>
                      <h3>{layer.title}</h3>
                      <p>{layer.detail}</p>
                    </div>
                  </li>
                {/each}
              </ol>
            </article>
            <div class="architecture-column">
              <article class="glass-panel architecture-ui">
                <h3>Human interaction</h3>
                <ul class="architecture-points">
                  {#each humanInteraction as point}
                    <li>{point}</li>
                  {/each}
                </ul>
              </article>
              <article class="glass-panel architecture-tech">
                <h3>Technology stack</h3>
                <ul class="tech-tags">
                  {#each techStack as tool}
                    <li>{tool}</li>
                  {/each}
                </ul>
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
        id="nodes"
        class="section halo section-nodes"
        style="--orbit-a: color-mix(in oklab, var(--a) 42%, transparent); --orbit-b: color-mix(in oklab, var(--c) 38%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--a) 42%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--c) 38%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 50%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container nodes">
          <div class="section-header">
            <p class="eyebrow">Planned family</p>
            <h2 class="h2" data-parallax="0.12">Nodes ready for every role</h2>
            <p class="lead">Each module shares the same firmware skeleton and API language.</p>
          </div>
          <div class="nodes-stage reveal">
            <div class="nodes-grid" role="list">
              {#each nodeFamily as node (node.name)}
                <article class="node-card glass-card" role="listitem">
                  <header class="node-head">
                    <h3>{node.name}</h3>
                  </header>
                  <dl class="node-meta">
                    <div>
                      <dt>Core function</dt>
                      <dd>{node.function}</dd>
                    </div>
                    <div>
                      <dt>Typical hardware</dt>
                      <dd>{node.hardware}</dd>
                    </div>
                  </dl>
                </article>
              {/each}
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
            <p class="eyebrow">Part II highlight</p>
            <h2 class="h2" data-parallax="0.12">The LumiGrid LED Node</h2>
            <p class="lead">Purpose-built to paint light while staying in sync with the entire mesh.</p>
          </div>
          <div class="led-stage reveal">
            <div class="led-diagram glass-panel">
              <span class="diagram-badge">Purpose</span>
              <ul>
                {#each ledPurpose as point}
                  <li>{point}</li>
                {/each}
              </ul>
            </div>
            <div class="led-details">
              <article class="glass-panel">
                <h3>Hardware at a glance</h3>
                <ul>
                  {#each hardwareSpecs as spec}
                    <li>{spec}</li>
                  {/each}
                </ul>
              </article>
              <article class="glass-panel">
                <h3>Personality</h3>
                <ul>
                  {#each personalityPoints as trait}
                    <li>{trait}</li>
                  {/each}
                </ul>
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
        id="firmware"
        class="section halo section-firmware"
        style="--orbit-a: color-mix(in oklab, var(--b) 36%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 40%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--b) 36%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 40%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 48%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container firmware">
          <div class="section-header">
            <p class="eyebrow">Firmware layers</p>
            <h2 class="h2" data-parallax="0.12">Runtime built for showtime</h2>
            <p class="lead">The firmware stack mirrors the whitepaper, from board init to MQTT.</p>
          </div>
          <div class="firmware-stage reveal">
            <div class="firmware-grid">
              <article class="glass-panel firmware-stack">
                <span class="stack-badge">Node runtime</span>
                <ol class="stack-list stack-list--firmware">
                  {#each firmwareLayers as layer (layer.title)}
                    <li>
                      <span class="stack-step">{layer.step}</span>
                      <div>
                        <h3>{layer.title}</h3>
                        <p>{layer.detail}</p>
                      </div>
                    </li>
                  {/each}
                </ol>
              </article>
              <article class="glass-panel firmware-effects">
                <h3>Effect library</h3>
                <p class="firmware-effects-summary">The Effect Engine hosts real-time shaders written in C.</p>
                <ul class="effects-list">
                  {#each effectCategories as fx (fx.title)}
                    <li>
                      <div class="effects-head">
                        <span class="effects-title">{fx.title}</span>
                        <span class="effects-examples">{fx.examples}</span>
                      </div>
                      <p>{fx.notes}</p>
                    </li>
                  {/each}
                </ul>
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
            <p class="eyebrow">Web console</p>
            <h2 class="h2" data-parallax="0.12">Experience on every node</h2>
            <p class="lead">Opening the node’s IP reveals the LumiGrid UI without extra software.</p>
          </div>
          <div class="experience-stage reveal">
            <article class="glass-panel experience-list">
              <ul>
                {#each webExperience as item}
                  <li>{item}</li>
                {/each}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="integration"
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
            <p class="eyebrow">Connectivity & safety</p>
            <h2 class="h2" data-parallax="0.12">APIs, telemetry, and safeguards</h2>
            <p class="lead">Endpoints, monitoring, and protections all surface from the README story.</p>
          </div>
          <div class="support-stage reveal">
            <div class="support-grid" role="list">
              {#each connectivityEndpoints as entry (entry.endpoint)}
                <article class="glass-card" role="listitem">
                  <h3>{entry.endpoint}</h3>
                  <p>{entry.description}</p>
                </article>
              {/each}
            </div>
            <aside class="support-panel glass-panel">
              <h3>Reliability and safety</h3>
              <ul class="support-benefits">
                {#each reliabilityPoints as item}
                  <li>{item}</li>
                {/each}
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
        id="applications"
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
            <p class="eyebrow">In the field</p>
            <h2 class="h2" data-parallax="0.14">Applications and maker care</h2>
            <p class="lead">Where LumiGrid fits today and how builders stay supported.</p>
          </div>
          <div class="updates-stage reveal">
            <div class="updates-ledger" role="list">
              {#each applications as item, index}
                <article class="glass-card update-card" role="listitem">
                  <span class="update-sequence" aria-hidden="true">{index + 1}</span>
                  <p>{item}</p>
                </article>
              {/each}
            </div>
            <aside class="updates-note glass-panel">
              <h3>Developer & maker friendliness</h3>
              <ul>
                {#each developerPoints as item}
                  <li>{item}</li>
                {/each}
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
        id="gallery"
        class="section halo section-gallery"
        style="--orbit-a: color-mix(in oklab, var(--halo-glow) 42%, transparent); --orbit-b: color-mix(in oklab, var(--c) 38%, transparent); --orbit-strength:.48;"
        data-flare-primary="color-mix(in oklab, var(--halo-glow) 42%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--c) 38%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--a) 40%, transparent)"
        data-flare-strength=".48"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container gallery-wrap">
          <div class="section-header">
            <p class="eyebrow">Visual showreel</p>
            <h2 class="h2" data-parallax="0.12">Scenes running on LumiGrid today</h2>
            <p class="lead">Every tile below comes from real installs and long-haul pilots.</p>
          </div>
          <div class="gallery-stage reveal">
            <Gallery items={galleryItems} />
            <article class="glass-panel gallery-notes">
              <h3>Field notes</h3>
              <ul>
                {#each galleryNotes as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="contact"
        class="section halo section-contact"
        style="--orbit-a: color-mix(in oklab, var(--b) 34%, transparent); --orbit-b: color-mix(in oklab, var(--a) 40%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--b) 34%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--a) 40%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 48%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container contact">
          <div class="section-header">
            <p class="eyebrow">Say hello</p>
            <h2 class="h2" data-parallax="0.12">Bring LumiGrid to your venue</h2>
            <p class="lead">Share your timeline, hardware mix, or creative brief—we’ll help shape the rollout.</p>
          </div>
          <div class="contact-stage reveal">
            <article class="glass-panel contact-info">
              <h3>What we can prepare</h3>
              <ul class="contact-highlights">
                {#each contactHighlights as item}
                  <li>{item}</li>
                {/each}
              </ul>
              <dl class="contact-signals">
                {#each contactSignals as signal}
                  <div>
                    <dt>{signal.label}</dt>
                    <dd>{signal.value}</dd>
                  </div>
                {/each}
              </dl>
            </article>
            <ContactForm />
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="vision"
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
            <p class="eyebrow">Vision forward</p>
            <h2 class="h2" data-parallax="0.12">Where LumiGrid is heading</h2>
            <p class="lead">Future releases continue the ecosystem described in the README.</p>
          </div>
          <div class="launch-stage reveal">
            <div class="launch-timeline vision-copy">
              {#each visionForward as paragraph}
                <article class="launch-stop glass-card">
                  <p>{paragraph}</p>
                </article>
              {/each}
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
        <span class="footer-badge">LumiGrid</span>
        <h2 class="footer-headline">A network where light, code, and rhythm move together.</h2>
        <p class="footer-copy">
          Text across this page is sourced from the LumiGrid README so the landing mirrors the whitepaper faithfully.
        </p>
        <div class="footer-actions">
          <a class="btn primary" href="#hero">Back to top</a>
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
      </div>
    </div>
    <div class="footer-legal">
      <p>© LumiGrid — README-aligned presentation.</p>
    </div>
  </div>
</footer>
