<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import MeshNavigator from '$lib/components/MeshNavigator.svelte';
  import DualOutputConfigurator from '$lib/components/DualOutputConfigurator.svelte';
  import EffectPaletteCarousel from '$lib/components/EffectPaletteCarousel.svelte';
  import RoadmapMicroInteractions from '$lib/components/RoadmapMicroInteractions.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import DeploymentLaunchPad from '$lib/components/DeploymentLaunchPad.svelte';
  import IntegrationMatrix from '$lib/components/IntegrationMatrix.svelte';
  import OperationsObservatory from '$lib/components/OperationsObservatory.svelte';

  const sections = [
    { id: 'hero', label: 'Welcome', icon: 'sparkles' },
    { id: 'system', label: 'Story', icon: 'cubeTransparent' },
    { id: 'mesh', label: 'Friendship', icon: 'globeAlt' },
    { id: 'console', label: 'Play Console', icon: 'commandLine' },
    { id: 'philosophy', label: 'Promise', icon: 'lightBulb' },
    { id: 'layers', label: 'Story Layers', icon: 'serverStack' },
    { id: 'nodes', label: 'Node Family', icon: 'users' },
    { id: 'led-node', label: 'LED Node', icon: 'sun' },
    { id: 'firmware', label: 'Inside', icon: 'cpuChip' },
    { id: 'experience', label: 'Web Home', icon: 'cog6Tooth' },
    { id: 'effects', label: 'Light Stories', icon: 'swatch' },
    { id: 'deployment', label: 'Launch Pad', icon: 'shieldCheck' },
    { id: 'operations', label: 'Showtime', icon: 'cloud' },
    { id: 'integration', label: 'Bridges', icon: 'codeBracketSquare' },
    { id: 'applications', label: 'Places', icon: 'rectangleGroup' },
    { id: 'gallery', label: 'Showreel', icon: 'window' },
    { id: 'contact', label: 'Hello', icon: 'envelope' },
    { id: 'vision', label: 'Future', icon: 'rocketLaunch' }
  ];

  const heroHighlights = ['LED Node leads kindly', 'Easy-peasy controls', 'Stories that glow'];

  const systemOverview = [
    'LumiGrid is a family of little light helpers led by the LED Node. They hum the same song, chat softly, and keep every wall, floor, and ceiling glowing as one story.',
    'Instead of one bossy box, the mesh is a circle of friends. The LED Node can lead the parade, clap along, or rest, and the room still feels smooth and welcoming.'
  ];

  const systemMotion = [
    'Imagine a shop window at sunset. Soft colour pours across the glass, tiny sparkles dance on the edges, and the LED Node whispers hello when someone walks close.',
    'When the music swells, every node follows the same heartbeat. Waves of light glide around the space like a choreographed dance that feels magical, not mechanical.'
  ];

  const meshHighlights = [
    { title: 'Glow baton', detail: 'Any friend can say “I’ve got this” while the rest hum along without missing a beat.' },
    {
      title: 'Shared heartbeat',
      detail: 'Warm dimmers and playful pixels breathe in the same gentle tempo.'
    },
    {
      title: 'Window of feelings',
      detail: 'A bright dashboard shows who is leading, what scene is next, and how the team feels.'
    }
  ];

  const meshReassurance = [
    'Leadership hand-offs feel like passing a glowing baton—guests only notice a steady show.',
    'Teams practice swaps in Mesh Navigator first, so the real performance stays calm.',
    'Friendly status lights bloom across the glass window for crews near and far.'
  ];

  const consoleHighlights = [
    {
      title: 'One cosy remote',
      detail: 'Blend soft wall light and sparkly strips with a single, gentle swipe.'
    },
    {
      title: 'Practice makes playful',
      detail: 'Save favourite looks like storybook pages and rehearse them anytime.'
    },
    {
      title: 'Changes in the moment',
      detail: 'Tap glowing buttons on the glass console to brighten, slow, or surprise.'
    }
  ];

  const designPhilosophy = [
    'Light is a character: each node adds its own glow to the scene.',
    'People first: the browser becomes a friendly stage manager, no downloads needed.',
    'Honest sharing: whatever the mesh feels, the crew sees in clear colours.',
    'Soft recoveries: if one friend gets tired, another steps in without a hiccup.',
    'Open doors: partners can join the story with simple, welcoming tools.'
  ];

  const systemLayers = [
    { step: '01', title: 'Heartbeat hum', detail: 'A gentle pulse keeps every friend moving together like dancers.' },
    { step: '02', title: 'Story beats', detail: 'Scenes line up like comic panels, ready to play in order.' },
    { step: '03', title: 'Canvas brush', detail: 'Light, colour, and motion paint the room in real time.' },
    { step: '04', title: 'Daily chapters', detail: 'Morning, afternoon, and evening moments glide in on cue.' },
    { step: '05', title: 'Sharing signals', detail: 'Dashboards and helpers show the same cheerful status.' },
    { step: '06', title: 'Glass console', detail: 'A friendly control room that lives right on each node.' }
  ];

  const humanInteraction = [
    'Timeline Studio: doodle chapters that spring to life on-screen.',
    'Quickstart Portal: first power-up feels like a guided tour with bubbly tips.',
    'Bridge Modes: invite music friends without tangled wires.',
    'Story Whispers: playful charts share health, power, and tempo in real time.'
  ];

  const techStack = [
    'Quick-thinking glow brain that wakes instantly to host the show.',
    'Velvet slider that makes walls blush without a flicker.',
    'Sparkle painter that sprinkles ribbon trails on cue.',
    'Cozy memory shelf that keeps favourite looks tucked in tight.',
    'Always-on glass console ready for quick chats with the crew.',
    'Mesh hug over Wi-Fi or tidy cables when the room prefers.',
    'Gentle updates that add new tricks while everyone keeps glowing.'
  ];

  const nodeFamily = [
    {
      name: 'LED Node',
      superpower: 'Flagship light painter mixing cosy glows with playful sparkles.',
      loves: 'Feels happiest leading big rooms and matching every helper’s beat.'
    },
    {
      name: 'Kinetic Node',
      superpower: 'Helps moving pieces sway and twirl in time with the lights.',
      loves: 'Pairs with motors and moving art that need gentle choreography.'
    },
    {
      name: 'Sensor Node',
      superpower: 'Listens for footsteps, sunshine, or sound and turns them into stories.',
      loves: 'Befriends sensors and turns their chatter into calm cues.'
    },
    {
      name: 'Hub Node',
      superpower: 'Waves the conductor wand and keeps the mesh connected to helpers in the cloud.',
      loves: 'Steps in to lead, mirror the show, or call for reinforcements.'
    },
    {
      name: 'Light Bar',
      superpower: 'Slim partner that washes shelves, coves, and trim with even glow.',
      loves: 'Snaps in beside the LED Node for tidy hardware loops.'
    },
    {
      name: 'Logic Node',
      superpower: 'Dreams up interactive surprises and playful reactions.',
      loves: 'Shares LumiGrid timing with extra imagination power.'
    }
  ];

  const ledPurpose = [
    'LED Node mixes warm glow and pixel sparkle from the same friendly heart.',
    'It can lead the dance, join the chorus, or shine solo while staying in step.'
  ];

  const hardwareSpecs = [
    'Quick-thinking glow brain that loves telling light stories.',
    'Velvet slider that makes walls blush without a flicker.',
    'Eight sparkle paths ready for ribbons, dots, and halos.',
    'Gentle guardian watching power and temperature all night.',
    'One-tap calm-down button for instant hush moments.',
    'Secret side door waiting for future sensors or surprise tricks.',
    'Cozy memory nest that holds scenes even when the lights snooze.',
    'Tidy connectors arranged for neat loops and easy visits.'
  ];

  const personalityPoints = [
    'Speaks in cosy glows and sparkles at the same time.',
    'Keeps steady rhythm even when another friend leads.',
    'Looks after power and temperature without being asked.',
    'Shares feelings through a friendly on-board window.'
  ];

  const firmwareLayers = [
    { step: '01', title: 'Morning stretch', detail: 'The node yawns awake, checks every light, and smiles at the crew.' },
    { step: '02', title: 'Glow painter', detail: 'Velvet curves keep each fade dreamy and slow.' },
    { step: '03', title: 'Sparkle stream', detail: 'Colourful doodles flow out to ribbons like animated story pages.' },
    { step: '04', title: 'Memory shelf', detail: 'Favourite looks sit on a tidy shelf ready to mix and match.' },
    { step: '05', title: 'Story player', detail: 'Scenes play in order like tracks on a mixtape.' },
    { step: '06', title: 'Beat hug', detail: 'Keeps time with whichever friend is leading right now.' },
    { step: '07', title: 'Glass postcards', detail: 'Sends friendly updates to the console and helpers.' },
    { step: '08', title: 'Cloud wave', detail: 'Waves hello to remote support when the adventure grows.' }
  ];

  const effectCategories = [
    { title: 'Foundations', examples: 'Fade, Glow, Spark', notes: 'Gentle moods that set the stage.' },
    { title: 'Spectra', examples: 'Aurora, Driftwave', notes: 'Colour journeys that sway with the beat.' },
    { title: 'Organic', examples: 'Ember, Tide', notes: 'Patterns that feel alive, like nature in light.' },
    { title: 'Transitions', examples: 'Blackout, Flash, Sweep', notes: 'Quick changes to reset the story softly.' },
    { title: 'Analog Aura', examples: 'Warm-Dim, Candle', notes: 'Hand-crafted glows for cosy corners.' }
  ];

  const effectHighlights = [
    {
      title: 'Heartbeat buddies',
      detail: 'Every effect listens to the LED Node’s pulse so walls and sparkles stay together.'
    },
    {
      title: 'Colour-cozy',
      detail: 'Colours pick from your palette tokens so everything feels instantly on-theme.'
    },
    {
      title: 'Energy kind',
      detail: 'If power gets tight, effects gently slow down instead of popping.'
    }
  ];

  const webExperience = [
    'Home: the LED Node waves hello with its glow, beat, and mood.',
    'Story tracks: drag cheerful scene cards like stickers on a timeline.',
    'Preset shelf: tuck favourite chapters away for instant play.',
    'Schedules: sketch sunrise to moonlight with gentle prompts.',
    'Helper roster: peek at every node’s colour, name, and heartbeat lights.',
    'Settings: wrap themes, bridges, and support pings in one tidy spot.'
  ];

  const connectivityEndpoints = [
    { endpoint: 'Glow pulse postcard', description: 'See who is leading and the mood they are sharing right now.' },
    { endpoint: 'Story mixer', description: 'Blend colours and timing while the show keeps smiling.' },
    { endpoint: 'Preset shelf', description: 'Browse shared looks and gift them to friends.' },
    { endpoint: 'Magic button', description: 'Send gentle cues, hugs, or surprises in real time.' },
    { endpoint: 'Story timeline', description: 'Lay out chapters that roll while you rest.' },
    { endpoint: 'Whisper stream', description: 'Follow heartbeat, power, and temperature whispers.' }
  ];

  const reliabilityPoints = [
    'One calm button hushes the room and keeps guests feeling safe.',
    'Friendly sensors whisper before things get too warm.',
    'If a leader naps, another node catches the beat without fuss.',
    'Offline mode carries the evening if the internet daydreams.'
  ];

  const integrationTelemetry = [
    { label: 'Glow pulse', value: '60 heartbeats · content and steady' },
    { label: 'Wave ripple', value: 'Soft shimmer gliding across the floor' },
    { label: 'Headroom', value: 'Plenty of space for surprise crescendos' }
  ];

  const opsScenarios = [
    {
      time: '17:15',
      title: 'Doors soon',
      detail: 'Nodes warm the room, line up the beat, and whisper a welcome glow.'
    },
    {
      time: '18:00',
      title: 'Show handoff',
      detail: 'Another node catches the baton and guests simply feel the music lift.'
    },
    {
      time: '21:45',
      title: 'Evening wind-down',
      detail: 'The mesh eases into night mode and saves notes for tomorrow.'
    }
  ];

  const opsSignals = [
    { label: 'Glow mood', value: 'Balanced · Leader Nova A2' },
    { label: 'Heartbeat', value: '60 bpm · smooth and gentle' },
    { label: 'Support friends', value: 'Friendly humans ready within minutes' },
    { label: 'Sparkle sync', value: 'Latest sparkle shared across every node' }
  ];

  const opsPlaybooks = [
    {
      title: 'Halo open',
      summary: 'Bring the venue to life with calm confidence.',
      steps: [
        'Power flows in gentle waves while sensors nod along.',
        'The mesh chooses a leader and hums through a quick rehearsal.',
        'Signature welcome look blooms just as doors open.'
      ]
    },
    {
      title: 'Mid-show baton pass',
      summary: 'Swap leadership without breaking the beat.',
      steps: [
        'Shadow leader mirrors cues inside the console.',
        'Warm-start sync keeps dimmers and pixels breathing together.',
        'Crew watches the glow stay steady before waving to the former lead.'
      ]
    }
  ];

  const opsRoster = [
    { role: 'Lead storyteller', person: 'Sia · Front-of-house' },
    { role: 'Mesh guardian', person: 'Noel · Remote room' },
    { role: 'Experience guide', person: 'Aria · On-site roam' }
  ];

  const opsEscalations = [
    'Warm guardrails ease output gently and ping support.',
    'If the heartbeat pauses, the mesh plays a safe, calm playlist.',
    'Manual quiet mode stays one tap away inside the glass console.'
  ];

  const developerPoints = [
    'Guides feel like a friendly chat right inside the glass console.',
    'Updates roll out softly with a cosy safety net.',
    'Simulator scenes let teams rehearse from anywhere.',
    'Shared UI tokens invite partners to tint the glow their way.'
  ];

  const applications = [
    'Flagship stores that greet guests with light that follows the day’s story.',
    'Atrium sculptures where moving pieces and colours sway together.',
    'Hotels and lounges that slip from sunrise breakfast to moonlit calm.',
    'Museums that explain exhibits with gentle light chapters.',
    'Studios that sketch big ideas in light before sharing them with the world.'
  ];

  const visionForward = [
    'LumiGrid is growing into a creative playground—smarter colours, cloud story timelines, and shared imagination are on the horizon.',
    'The LED Node is the first storybook hero; more friends will join to make every space feel warm, responsive, and alive.'
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
    'Captured straight from LumiGrid pilots—no filters, no extras.',
    'Shown through breezy Northern seasons to prove the glow lasts all year.'
  ];

  const contactHighlights = [
    'Book a gentle walkthrough to dream up your first glowing adventure.',
    'Request the LED Node story kit with sketches and planning tips.',
    'Join the pilot family for early hardware and remote show support.'
  ];

  const contactSignals = [
    { label: 'Reply rhythm', value: 'Replies within two business days.' },
    { label: 'Pilot care', value: 'Hands-on mapping and rehearsal support.' },
    { label: 'Bridge help', value: 'Friendly guidance for bridges and custom flows.' }
  ];
</script>

<svelte:head>
  <title>LumiGrid — A living network of light</title>
  <meta
    name="description"
    content="Meet LumiGrid, a storybook family of light helpers led by the LED Node. Explore playful chapters, shiny glass UI, and gentle tools that keep every space glowing together."
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
            <p class="eyebrow">Story heartbeat</p>
            <h2 class="h2" data-parallax="0.1">How the mesh keeps smiling</h2>
            <p class="lead">Every LumiGrid helper follows the LED Node’s gentle beat, so rooms feel like one friendly creature.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface journey-stage stage-solo reveal">
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
            <p class="eyebrow">Mesh friendships</p>
            <h2 class="h2" data-parallax="0.12">Practice passing the glow</h2>
            <p class="lead">Before visitors arrive, the LED Node and friends rehearse glow handoffs so the show never hiccups.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface mesh-stage stage-wide reveal">
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
        id="console"
        class="section halo section-console"
        style="--orbit-a: color-mix(in oklab, var(--a) 40%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--a) 40%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--c) 42%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container console-wrap">
          <div class="section-header">
            <p class="eyebrow">Console playground</p>
            <h2 class="h2" data-parallax="0.12">Mix cosy glow and sparkle</h2>
            <p class="lead">One shiny panel lets you swirl warm washes and playful pixels like stirring paint.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface console-stage stage-wide reveal">
            <article class="glass-panel console-brief">
              <span class="console-badge">Why crews smile</span>
              <h3>Mix both light friends without code words</h3>
              <p class="console-summary">Guided presets help the LED Node rehearse cosy wall light and joyful pixel trails before doors open.</p>
              <ul class="console-points">
                {#each consoleHighlights as item}
                  <li>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </li>
                {/each}
              </ul>
              <p class="console-foot">Every tip echoes the LumiGrid storybook, keeping rehearsals and show nights in harmony.</p>
            </article>
            <DualOutputConfigurator />
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
            <p class="eyebrow">Guiding promises</p>
            <h2 class="h2" data-parallax="0.12">Promises that steer LumiGrid</h2>
            <p class="lead">These guiding stars keep LumiGrid friendly, welcoming, and full of wonder.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface system-stage stage-tight reveal">
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
            <p class="eyebrow">Story layers</p>
            <h2 class="h2" data-parallax="0.12">Layers of the LumiGrid tale</h2>
            <p class="lead">Each layer plays like a relay of friends, passing the beat and the story along together.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface architecture-stage stage-wide reveal">
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
            <p class="lead">Every planned friend follows the same gentle rules and glassy interface.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface nodes-stage stage-wide reveal">
            <div class="nodes-grid" role="list">
              {#each nodeFamily as node (node.name)}
                <article class="node-card glass-card" role="listitem">
                  <header class="node-head">
                    <h3>{node.name}</h3>
                  </header>
                  <dl class="node-meta">
                    <div>
                      <dt>Superpower</dt>
                      <dd>{node.superpower}</dd>
                    </div>
                    <div>
                      <dt>Loves to help</dt>
                      <dd>{node.loves}</dd>
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
            <p class="lead">A tiny flagship made to paint light and stay in step with every friend in the mesh.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface led-stage stage-wide reveal">
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
            <p class="eyebrow">Inside the node</p>
            <h2 class="h2" data-parallax="0.12">Daily routine behind the glow</h2>
            <p class="lead">Peek inside the LED Node’s daily routine and how it keeps the show humming softly.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface firmware-stage stage-wide reveal">
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
                <p class="firmware-effects-summary">The Effect Engine keeps a shelf of ready-to-play stories for any room.</p>
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
            <h2 class="h2" data-parallax="0.12">Web home on every node</h2>
            <p class="lead">Every node hosts a shiny web console that opens in your browser like magic.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface experience-stage stage-narrow reveal">
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
        id="effects"
        class="section halo section-effects"
        style="--orbit-a: color-mix(in oklab, var(--halo-glow) 44%, transparent); --orbit-b: color-mix(in oklab, var(--b) 40%, transparent); --orbit-strength:.48;"
        data-flare-primary="color-mix(in oklab, var(--halo-glow) 44%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--b) 40%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--a) 38%, transparent)"
        data-flare-strength=".48"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container effects">
          <div class="section-header">
            <p class="eyebrow">Light storybook</p>
            <h2 class="h2" data-parallax="0.12">Light stories ready to play</h2>
            <p class="lead">Flip through the same light tales tucked inside every LED Node.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface effects-stage stage-wide reveal">
            <EffectPaletteCarousel />
            <aside class="glass-panel effects-notes">
              <h3>Why creators trust it</h3>
              <ul class="effects-points">
                {#each effectHighlights as item}
                  <li>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </li>
                {/each}
              </ul>
              <p class="effects-foot">All scenes live inside each node, so live shows match what crews rehearse.</p>
            </aside>
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="deployment"
        class="section halo section-deployment"
        style="--orbit-a: color-mix(in oklab, var(--a) 40%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 44%, transparent); --orbit-strength:.52;"
        data-flare-primary="color-mix(in oklab, var(--a) 40%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 44%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--c) 42%, transparent)"
        data-flare-strength=".52"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container deployment">
          <div class="section-header">
            <p class="eyebrow">Launch ready</p>
            <h2 class="h2" data-parallax="0.12">Launch pad on glass</h2>
            <p class="lead">Power up, rehearse, and launch using the same glowing console that lives on every LED Node.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface deployment-stage stage-wide reveal">
            <DeploymentLaunchPad />
          </div>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="operations"
        class="section halo section-operations"
        style="--orbit-a: color-mix(in oklab, var(--c) 38%, transparent); --orbit-b: color-mix(in oklab, var(--a) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--c) 38%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--a) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 46%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container operations">
          <div class="section-header">
            <p class="eyebrow">Showtime care</p>
            <h2 class="h2" data-parallax="0.12">Showtime helpers on standby</h2>
            <p class="lead">Peek at the LED Node’s show, pass the baton softly, and open helpful playbooks with a tap.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface operations-stage stage-wide reveal">
            <OperationsObservatory
              scenarios={opsScenarios}
              signals={opsSignals}
              playbooks={opsPlaybooks}
              roster={opsRoster}
              escalations={opsEscalations}
            />
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
            <p class="eyebrow">Bridges & safety</p>
            <h2 class="h2" data-parallax="0.12">Friendly bridges and safety hugs</h2>
            <p class="lead">Gentle bridges, caring monitoring, and safety nets keep the LED Node feeling brave from the very first plug-in.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface support-stage stage-wide reveal">
            <IntegrationMatrix
              endpoints={connectivityEndpoints}
              safeguards={reliabilityPoints}
              telemetry={integrationTelemetry}
            />
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
            <h2 class="h2" data-parallax="0.14">Places LumiGrid already plays</h2>
            <p class="lead">Peek at spaces already glowing with the LED Node and how makers stay cared for.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface updates-stage stage-tight reveal">
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
            <h2 class="h2" data-parallax="0.12">Scenes already shining today</h2>
            <p class="lead">Every tile below comes from real spaces already glowing with the LED Node.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface gallery-stage stage-wide reveal">
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
            <h2 class="h2" data-parallax="0.12">Invite LumiGrid to your place</h2>
            <p class="lead">Tell us about your space and we’ll map how the LED Node can glow there, step by friendly step.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface contact-stage stage-wide reveal">
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
            <h2 class="h2" data-parallax="0.12">Where LumiGrid wanders next</h2>
            <p class="lead">This is only the first chapter—more playful updates already sparkle on the horizon.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface launch-stage stage-tight reveal">
            <div class="launch-timeline vision-copy">
              <span class="vision-badge">Next chapters</span>
              {#each visionForward as paragraph}
                <article class="launch-stop glass-card">
                  <p>{paragraph}</p>
                </article>
              {/each}
            </div>
            <RoadmapMicroInteractions />
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
        <h2 class="footer-headline">A family where light, rhythm, and stories move together.</h2>
        <p class="footer-copy">
          Every section is written to feel like a storybook for LumiGrid and its shining LED Node.
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
      <p>© LumiGrid — Crafted with glow, care, and plenty of friendly stories.</p>
    </div>
  </div>
</footer>
