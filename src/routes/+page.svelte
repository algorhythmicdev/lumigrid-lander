<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import MeshNavigator from '$lib/components/MeshNavigator.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import DeploymentLaunchPad from '$lib/components/DeploymentLaunchPad.svelte';
  import DualOutputConfigurator from '$lib/components/DualOutputConfigurator.svelte';
  import EffectPaletteCarousel from '$lib/components/EffectPaletteCarousel.svelte';
  import IntegrationMatrix from '$lib/components/IntegrationMatrix.svelte';
  import OperationsObservatory from '$lib/components/OperationsObservatory.svelte';
  import RoadmapMicroInteractions from '$lib/components/RoadmapMicroInteractions.svelte';
  import SignageAssetBoard from '$lib/components/SignageAssetBoard.svelte';
  import SignageImplementationGuide from '$lib/components/SignageImplementationGuide.svelte';
  import SignageCommandCenter from '$lib/components/SignageCommandCenter.svelte';

  const sections = [
    { id: 'platform', label: 'What', icon: 'globeAlt' },
    { id: 'experience', label: 'Experience', icon: 'users' },
    { id: 'controller', label: 'Controller', icon: 'serverStack' },
    { id: 'led-node', label: 'Runbook', icon: 'rectangleGroup' },
    { id: 'launch', label: 'Launchpad', icon: 'rocketLaunch' },
    { id: 'contact', label: 'Connect', icon: 'envelope' }
  ];

  const heroHighlights = [
    'Signage + light stay in phase',
    'Placeholder assets validated',
    'Browser rehearsals anywhere',
    'Operations safeguards baked in'
  ];

  const heroIntro = [
    {
      lead: 'Synchronise signage and light from one console.',
      detail: 'Lighting and signage crews rehearse together so every cue and caption lands together.'
    },
    {
      lead: 'Prove every campaign frame before deployment.',
      detail:
        'Bring creative files — our Daugavpils team loads placeholders, checks contrast, and signs off the story before it travels.'
    },
    {
      lead: 'Walk the launch runbook with the LED Node team.',
      detail: 'Reserve a pilot slot to tour the studio floor and co-author the rollout narrative.'
    }
  ];

  const platformStory = [
    {
      lead: 'Keep signage, façades, and ambience on the same beat.',
      detail: 'Signage playlists, façade pixels, and architectural looks share one tempo so venues stay coherent and legible.'
    },
    {
      lead: 'Retire scattered controllers with one venue brain.',
      detail: 'Every doorway, plaza, and promo moment stays aligned and brand-safe inside a single platform.'
    },
    {
      lead: 'Stage the rollout at Reclame Fabriek first.',
      detail: 'Our Daugavpils calibration lab tunes each choreography, asset placeholder, and signage frame before it travels.'
    }
  ];

  const platformHighlights = [
    { title: 'Single lighting + signage language', detail: 'Nodes coordinate façades, menu boards, and installations as one story.' },
    { title: 'Architectural + show lighting', detail: 'Blend ambience with motion without layering extra gear or controllers.' },
    { title: 'Control from anywhere', detail: 'Shape looks, signage takeovers, and cues from any modern browser in minutes.' },
    { title: 'Reclame Fabriek rehearsal', detail: 'Every roll-out is staged in Daugavpils with campaign placeholders so your team steps into a proven playbook.' }
  ];

  const platformMoments = [
    'Flagship unveilings pulsing with every guest arrival and matching signage promos.',
    'Suites gliding from sunrise calm to nightlife energy while lobby screens follow the same tempo.',
    'Pop-up stories rehearsed remotely with placeholder assets and launched in a tap.'
  ];

  const experienceHighlights = [
    { title: 'Situational clarity', detail: 'Dashboards surface tempo, signage states, and lead nodes at a glance.' },
    { title: 'Browser rehearsals', detail: 'Preview lighting and signage transitions online before the room ever shifts.' },
    { title: 'Shared showfiles', detail: 'Invite designers, operators, and content teams into the same cues and asset slots.' }
  ];

  const experienceMoments = [
    'Blend ambience with statement looks and signage updates in seconds.',
    'Drop into quiet mode instantly when the mood or messaging needs a reset.',
    'Pass leadership across the mesh gracefully during longer runs with signage following suit.',
    'Host remote and on-site run-throughs direct from Reclame Fabriek with live asset swaps.'
  ];

  const signageImplementations = [
    {
      title: 'Asset ingest rituals',
      detail:
        'Upload posters, loops, captions, and translations into placeholders that auto-check contrast and timings before show day.'
    },
    {
      title: 'Controller choreography',
      detail:
        'PWM, pixel, and signage lanes share the same token-driven cues so brightness, colour, and copy stay readable.'
    },
    {
      title: 'Live safeguards',
      detail:
        'Dashboards and webhooks surface signage readiness, failover scenes, and CMS bridges alongside lighting health.'
    }
  ];

  const ledPromises = [
    'Opens the LumiGrid hardware family with a purpose-built lighting and signage brain.',
    'Leads or follows the LumiGrid beat so fixtures and canvases stay in harmony.',
    'Ships with an onboard console, asset placeholders, and intuitive status glow for quick reads.'
  ];

  const ledHighlights = [
    {
      title: 'Launch-ready looks',
      detail: 'Curated scenes, signage loops, and schedules for retail, hospitality, and cultural spaces land out of the box.'
    },
    {
      title: 'Guided setup',
      detail: 'Remote onboarding, on-call support, and smart defaults load assets, timelines, and safety cues effortlessly.'
    },
    {
      title: 'Built at Reclame Fabriek',
      detail: 'Prototyped, asset-tested, and burned in at our Daugavpils, Latvija light lab so every node ships stage-tested.'
    },
    {
      title: 'Open for partners',
      detail: 'APIs, signage bridges, and partner programmes invite designers and integrators to extend the experience.'
    }
  ];

  const assetPlaceholders = [
    {
      title: 'Campaign still frame',
      detail: 'Drop 4K promos into a responsive signage slot to test contrast and timing before opening night.'
    },
    {
      title: 'Motion loop container',
      detail: 'Stage 15-second MP4 loops alongside lighting cues so arena signage and chases stay in sync.'
    },
    {
      title: 'Dynamic menu layout',
      detail: 'Preview rotating pricing or programme cards without touching production CMS connections.'
    },
    {
      title: 'Localization set',
      detail: 'Swap translations and accessibility copy, verifying line lengths inside the signage frame.'
    },
    {
      title: 'Emergency override',
      detail: 'Stage a safety message placeholder that inherits the emergency palette and pushes live in one tap.'
    },
    {
      title: 'Data pulse overlay',
      detail: 'Reserve a data rail for live metrics that stay legible against any lighting look.'
    }
  ];

  const signageCollections = [
    {
      pill: 'Campaign kit',
      title: 'Campaign rehearsal kit',
      summary: 'Load creative assets into the placeholder board before playlists head to the venue.',
      items: [
        {
          label: 'Hero posters',
          detail:
            '4K stills and cinemagraphs auto-fit 16:9, 9:16, and 1:1 frames with safe-area and contrast lint.'
        },
        {
          label: 'Motion loops',
          detail: '15-second loops inherit timeline metadata so lighting chases and signage fades stay in phase.'
        },
        {
          label: 'CTA ticker',
          detail: 'Campaign copy validates pacing, translations, and fallback variants inside the signage band.'
        }
      ]
    },
    {
      pill: 'Operations pack',
      title: 'Operational safeguards',
      summary: 'Keep emergency, quiet-mode, and compliance messaging rehearsed beside the show look.',
      items: [
        {
          label: 'Emergency override',
          detail: 'Safety placeholders inherit the emergency palette tokens and pre-authorised timeline.'
        },
        {
          label: 'Quiet-hour slate',
          detail: 'Night calm templates dim to 60% luminance and swap accessibility copy automatically.'
        },
        {
          label: 'Escalation log',
          detail: 'Every signage swap captures acknowledgements for the operations observatory audit trail.'
        }
      ]
    },
    {
      pill: 'Data overlays',
      title: 'Live data overlays',
      summary: 'Blend data, arrival info, and sponsorship metrics into the signage lane without losing clarity.',
      items: [
        {
          label: 'Occupancy pulse',
          detail: 'Bind occupancy or ticketing feeds into a calibrated rail with adaptive contrast.'
        },
        {
          label: 'Transit relay',
          detail: 'Route shuttle ETAs and local transit updates through bilingual placeholder presets.'
        },
        {
          label: 'Sensor beacons',
          detail: 'Reserve iconography and short alerts that inherit accessibility copy tokens.'
        }
      ]
    },
    {
      pill: 'Partner lane',
      title: 'Partner + sponsor lane',
      summary: 'Give partners a safe lane for brand takeovers without risking compliance.',
      items: [
        {
          label: 'Palette snapshot',
          detail: 'Token mixer keeps partner colours WCAG-checked before the playlist goes live.'
        },
        {
          label: 'Localization pack',
          detail: 'Upload translations and legal copy into placeholders with per-language approvals.'
        },
        {
          label: 'Approval receipts',
          detail: 'Sign-offs sync to CMS webhooks and the operations observatory timeline.'
        }
      ]
    }
  ];

  const signageBoardNote =
    'Asset QA runs contrast, timing, and safe-area lint on every placeholder before operations unlock a playlist.';

  const signagePhases = [
    {
      title: 'Ingest & calibrate',
      summary:
        'Placeholder QA catches contrast gaps, pacing drift, and translation overruns before the assets leave your CMS.',
      steps: [
        'Upload stills, loops, captions, and alt-text into the signage asset board.',
        'Let token-driven lint flag luminance, safe-area, and duration issues instantly.',
        'Assign approvals so campaign, operations, and partner teams sign off together.'
      ]
    },
    {
      title: 'Studio rehearsal',
      summary:
        'Reclame Fabriek sessions sync signage placeholders with PWM and pixel presets so the full story breathes together.',
      steps: [
        'DualOutputConfigurator presets show how signage glow rides each lighting blend.',
        'Emergency override and quiet-mode slots inherit the emergency palette for drills.',
        'Partner lanes rehearse localization packs and sponsor palettes beside house looks.'
      ]
    },
    {
      title: 'Launch lock',
      summary:
        'Before hardware ships, playlists, backups, and telemetry webhooks get sealed with signage readiness baked in.',
      steps: [
        'Distribution kits bundle fallback signage packs for every node in the mesh.',
        'IntegrationMatrix webhooks validate CMS, data overlay, and signage state endpoints.',
        'Operations observatory timelines arm escalations and roster coverage for signage.'
      ]
    },
    {
      title: 'Live stewardship',
      summary:
        'During showtime the controller keeps signage health, overrides, and approvals in view so shifts feel confident.',
      steps: [
        'Observatory dashboards surface ingest health, drift, and acknowledgement logs.',
        'EffectPaletteCarousel presets showcase signage-friendly animations ready for deployment.',
        'Roadmap focus tracks signage intelligence releases and partner signage bridges.'
      ]
    }
  ];

  const signageChecklist = [
    {
      label: 'Placeholder coverage',
      detail: 'Campaign, safety, partner, and data overlays rehearsed against the signage asset board.'
    },
    {
      label: 'Override readiness',
      detail: 'Emergency signage, quiet-mode, and return-to-show scripts inherit the emergency palette tokens.'
    },
    {
      label: 'Integration sync',
      detail: 'CMS, webhook, and SSE bridges heartbeat signage payloads into the operations observatory.'
    },
    {
      label: 'Audit + acknowledgements',
      detail: 'Approvals log to the observatory while roster escalations confirm signage handoffs.'
    }
  ];

  const signageStreams = [
    {
      name: 'District marquee lane',
      status: 'Live',
      tone: 'good',
      detail:
        'Hero signage rides alongside the marquee pixel wash with caption lint and localisation packs verified at Reclame Fabriek.',
      metrics: [
        { label: 'Contrast', value: 'AA+ verified (demo)' },
        { label: 'Sync drift', value: '≈0.5 ms demo' },
        { label: 'Approvals', value: 'Campaign · Ops (sample)' }
      ]
    },
    {
      name: 'Promenade guidance rail',
      status: 'Syncing',
      tone: 'info',
      detail:
        'Wayfinding signage mirrors the mesh beat with adaptive brightness tuned from the promenade sensor bridge.',
      metrics: [
        { label: 'Ambient', value: '39% dimmed (demo sensor)' },
        { label: 'Heartbeat', value: 'demo heartbeat' },
        { label: 'Fallback', value: 'Ready (simulated)' }
      ]
    },
    {
      name: 'Emergency override slate',
      status: 'Armed',
      tone: 'alert',
      detail: 'Safety messaging inherits emergency palette tokens and pushes to every node during drills.',
      metrics: [
        { label: 'Palette', value: 'Emergency token (sample)' },
        { label: 'Drill', value: 'Drill cleared (demo)' },
        { label: 'Acknowledged', value: 'Roster A (sample)' }
      ]
    }
  ];

  const signageAlerts = [
    {
      title: 'CMS webhook heartbeat',
      status: 'Stable',
      tone: 'good',
      detail: 'Signage SSE channel streaming placeholders for campaign, quiet-mode, and sponsor lanes.',
      time: 'Demo 12s ago'
    },
    {
      title: 'Sponsor takeover approval',
      status: 'Action needed',
      tone: 'alert',
      detail: 'Partner localisation pack pending compliance sign-off before the playlist unlocks.',
      time: 'Awaiting review (demo)'
    },
    {
      title: 'Transit relay overlay',
      status: 'Monitoring',
      tone: 'info',
      detail: 'Metro feed mirrored into the data rail with adaptive typography tokens watching contrast.',
      time: 'Live (demo)'
    }
  ];

  const signagePlaybooks = [
    {
      title: 'Morning signage warm-up',
      summary: 'Run daypart rehearsals so lobby, promenade, and sponsor lanes feel proven before doors open.',
      steps: [
        'Load fresh campaign placeholders into the signage asset board and confirm approvals across teams.',
        'Trigger a DualOutputConfigurator blend to verify signage timing against the welcome lighting cue.',
        'Check CMS bridges, SSE heartbeats, and fallback signage packs inside the operations observatory.'
      ]
    },
    {
      title: 'Partner takeover rehearsal',
      summary: 'Give sponsor playlists a safe preview window with localisation, compliance, and signage guardrails.',
      steps: [
        'Route brand palettes through the token mixer to hold WCAG contrast before publishing.',
        'Stage sponsor copy inside the signage asset board to validate translations and pacing.',
        'Capture acknowledgements and escalation coverage so the takeover slot unlocks without delay.'
      ]
    },
    {
      title: 'Emergency override drill',
      summary: 'Keep roster handoffs calm by rehearsing signage overrides alongside lighting fail-safes.',
      steps: [
        'Launch the emergency signage preset and confirm palette tokens propagate across every node.',
        'Verify roster acknowledgements and signage audit logs in the operations observatory thread.',
        'Reset to quiet-mode placeholders and document the drill against the readiness checklist.'
      ]
    }
  ];

  const ledSupport = [
    'Pilot members receive white-glove deployment, signage ingest, and monitoring.',
    'Early feedback shapes firmware updates, asset tooling, and accessories.',
    'Book in-person walk-throughs at Reclame Fabriek to vet lighting and signage flow.',
    'Join a Daugavpils city tour previewing waterfront, plaza, and signage tests.',
    'Access remote rehearsals streamed direct from the Daugavpils studio with your assets loaded.',
    'Sensor, kinetic, signage, and hub nodes follow the LED Node cadence.'
  ];

  const launchMilestones = [
    {
      stage: 'Today',
      title: 'Start the conversation',
      detail: 'Share your venue goals and upload starter signage assets so we can map the pilot fit together.'
    },
    {
      stage: 'Studio visit',
      title: 'Reclame Fabriek sessions',
      detail: 'Experience LumiGrid firsthand in Daugavpils and tune your lighting + signage story alongside the team.'
    },
    {
      stage: 'Open studio',
      title: 'Immersion weeks',
      detail: 'Reserve private time inside the studio to choreograph your launch among full-scale prototypes and asset placeholders.'
    },
    {
      stage: 'City preview',
      title: 'Daugavpils after dark',
      detail: 'Walk the skyline with us and watch LumiGrid frame plazas, façades, and waterfront signage scenes.'
    },
    {
      stage: 'Pilot wave',
      title: 'LED Node activations',
      detail: 'Selected spaces receive hardware, rehearsals, and co-created stories with preflight signage assets.'
    },
    {
      stage: 'Launch window',
      title: 'General availability',
      detail: 'Production nodes, curated looks, signage frameworks, and partner resources roll out globally.'
    }
  ];

  const contactHighlights = [
    'Schedule a LumiGrid walkthrough tailored to your venue and signage footprint.',
    'See how the LED Node layers into your lighting and CMS today.',
    'Line up a Reclame Fabriek lab visit in Daugavpils to preview prototypes and asset placeholders.',
    'Secure your spot on the pilot list for early hardware, asset prep, and co-design time.',
    'Arrange a guided tour through Daugavpils cultural quarters and signage tests with the team.'
  ];

  const integrationEndpoints = [
    {
      endpoint: 'GET /api/signage/state',
      description: 'Mirror active placeholders, text lanes, and accessibility notes for dashboards or CMS partners.'
    },
    {
      endpoint: 'POST /api/signage/assets',
      description: 'Upload posters, loops, and captions into rehearsal slots with checksum + contrast validation.'
    },
    {
      endpoint: 'POST /api/mesh/cues',
      description: 'Trigger token-aware lighting and signage cues from show control or experiential timelines.'
    },
    {
      endpoint: 'GET /api/telemetry/live',
      description: 'Stream sync, power, and signage readiness metrics into your observability stack.'
    }
  ];

  const integrationSafeguards = [
    'Contrast linting and alt-text checks on every signage upload.',
    'Dual-write fallback signage packs distributed to all nodes.',
    'JWT scopes isolating signage CMS from lighting control.',
    'Heartbeat alarms for webhook or SSE playlist drift.',
    'Signage asset board approvals required before playlists publish.'
  ];

  const integrationTelemetry = [
    { label: 'Signage slots', value: '4 ready' },
    { label: 'CMS sync', value: 'OK · 14s ago' },
    { label: 'Asset contrast', value: 'AA+ verified' },
    { label: 'Fallback scene', value: 'Armed' }
  ];

  const opsScenarios = [
    {
      time: '18:00',
      title: 'Lobby welcome loop',
      detail: 'Warm-dim wash pairs with bilingual welcome signage validated in the asset placeholders.'
    },
    {
      time: '19:15',
      title: 'Promo cascade',
      detail: 'Surge FX ignites façade pixels while the signage playlist rotates hero promos and call-to-action strips.'
    },
    {
      time: '21:30',
      title: 'Quiet mode',
      detail: 'Cascade fades into calm PWM while the signage frame swaps to accessibility-first night messaging.'
    }
  ];

  const opsSignals = [
    { label: 'Mesh sync drift', value: '≈0.7 ms demo' },
    { label: 'Signage ingest', value: 'Sample placeholders live' },
    { label: 'CMS webhook', value: 'Healthy · demo retries spared' },
    { label: 'Fallback scene', value: 'Ready (simulated)' },
    { label: 'Asset QA board', value: 'Cleared · 18 placeholders (demo)' }
  ];

  const opsPlaybooks = [
    {
      title: 'Signage takeover rehearsal',
      summary: 'Dry-run the marquee playlist before guests arrive.',
      steps: [
        'Upload latest posters and captions into the placeholder kit.',
        'Run contrast + timing lint inside the LED Node signage frame.',
        'Trigger the DualOutput blend for the promo burst and verify balance.',
        'Log approvals in the observatory and arm fallback signage.'
      ]
    },
    {
      title: 'Emergency message drill',
      summary: 'Confirm the override scene deploys in under a beat.',
      steps: [
        'Signal the emergency override from the operations deck.',
        'Verify signage swaps to the safety placeholder and dims ambient light.',
        'Check SMS + Signal escalation acknowledgements.',
        'Reset to ambient drift and confirm CMS hooks resume.'
      ]
    },
    {
      title: 'District relay baton',
      summary: 'Coordinate plaza, transit, and marquee signage for a city handoff.',
      steps: [
        'Load district-specific assets into the signage asset board and lock approvals.',
        'Trigger the DualOutput configurator relay preset to balance PWM, pixels, and signage glow.',
        'Verify transit and venue data overlays through the integration matrix telemetry.',
        'Log the baton completion in the operations observatory and arm fallback signage packs.'
      ]
    }
  ];

  const opsRoster = [
    { role: 'Lighting lead', person: 'Nora V.' },
    { role: 'Signage tech', person: 'Elina P.' },
    { role: 'Content liaison', person: 'Maks T.' },
    { role: 'Integrator bridge', person: 'Rasa L.' }
  ];

  const opsEscalations = [
    'Signage ingest failure → Notify content liaison and load fallback placeholders.',
    'Sync drift > 1 ms (demo threshold) → Page lighting lead and hold pixel bursts.',
    'CMS webhook timeout → Reopen SSE bridge and alert integrator bridge.',
    'Asset QA regression → Freeze playlist publish until the signage board clears approvals.'
  ];

  const studioHighlights = [
    {
      title: 'Reclame Fabriek base',
      detail: 'Tour the Daugavpils, Latvija workshop where the LED Node is staged, signage is tested, and polished.'
    },
    {
      title: 'Historic quarter backdrop',
      detail: 'Explore the creative district around the former print house that now anchors our signage-friendly studio.'
    },
    {
      title: 'Immersive walk-throughs',
      detail: 'Preview façade, plaza, signage, and waterfront scenes in person before they travel to your venue.'
    },
    {
      title: 'Bring your crew',
      detail: 'Host designers, content teams, and operators on-site for co-creation without disrupting your live space.'
    }
  ];

  const contactSignals = [
    { label: 'Reply rhythm', value: 'We respond within two business days.' },
    { label: 'Pilot support', value: 'Onboarding, rehearsal, and remote monitoring included.' },
    { label: 'Partnerships', value: 'We welcome designers, integrators, and venues worldwide.' },
    { label: 'Studio visits', value: 'By appointment at Reclame Fabriek — Daugavpils, Latvija.' },
    { label: 'Home base', value: 'Reclame Fabriek — Daugavpils, Latvija.' }
  ];
</script>

<svelte:head>
  <title>LumiGrid — The living light platform</title>
  <meta
    name="description"
    content="LumiGrid turns spaces into living canvases and the LED Node is about to launch. Discover the platform, explore the experience, and join the release wave."
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
              {#each heroIntro as paragraph}
                <p class="hero-intro">
                  <span class="hero-intro-lead">{paragraph.lead}</span>
                  {paragraph.detail}
                </p>
              {/each}
              <div class="hero-actions">
                <a class="btn primary" href="#led-node">Explore the runbook</a>
                <a class="btn ghost" href="#launch">Join the launch wave</a>
              </div>
              <ul class="hero-highlights" aria-label="Benefits">
                {#each heroHighlights as item}
                  <li><span class="highlight-pill">{item}</span></li>
                {/each}
              </ul>
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
        id="platform"
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
            <p class="eyebrow">The platform</p>
            <h2 class="h2" data-parallax="0.1">Light that speaks the same language</h2>
            <p class="lead">LumiGrid helps entire venues glow as one story—from warm architectural light to animated pixels.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface journey-stage stage-wide reveal">
            <div class="journey-intro glass-panel">
              <p class="journey-eyebrow">How it feels</p>
              {#each platformStory as paragraph}
                <p class="journey-summary">
                  <span class="journey-summary-lead">{paragraph.lead}</span>
                  {paragraph.detail}
                </p>
              {/each}
            </div>
            <article class="glass-panel platform-highlights">
              <h3>Why LumiGrid feels different</h3>
              <ul class="mesh-details-list">
                {#each platformHighlights as item}
                  <li>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </li>
                {/each}
              </ul>
            </article>
          </div>
          <article class="platform-moments glass-panel">
            <h3>Moments we create together</h3>
            <ul class="mesh-assurance">
              {#each platformMoments as item}
                <li>{item}</li>
              {/each}
            </ul>
          </article>
        </div>
      </section>

      <div class="section-separator" aria-hidden="true">
        <span class="separator-glow"></span>
        <span class="separator-strip"></span>
      </div>

      <section
        id="experience"
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
            <p class="eyebrow">Experience</p>
            <h2 class="h2" data-parallax="0.12">Designed for the people running the room</h2>
            <p class="lead">Teams see everything in one glance, rehearse without risk, and share the spotlight with collaborators.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface mesh-stage stage-wide reveal">
            <MeshNavigator />
            <article class="mesh-details glass-panel">
              <h3>How crews use LumiGrid</h3>
              <ul class="mesh-details-list">
                {#each experienceHighlights as item}
                  <li>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </li>
                {/each}
              </ul>
              <ul class="mesh-assurance">
                {#each experienceMoments as item}
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
        id="controller"
        class="section halo section-controller"
        style="--orbit-a: color-mix(in oklab, var(--halo-primary) 46%, transparent); --orbit-b: color-mix(in oklab, var(--halo-secondary) 42%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--halo-primary) 46%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-secondary) 42%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 52%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container controller">
          <div class="section-header">
            <p class="eyebrow">The controller</p>
            <h2 class="h2" data-parallax="0.12">Everything for signage lives beside the light show</h2>
            <p class="lead">
              The LumiGrid console rehearses lighting, signage, and integrations together so every campaign asset feels proven
              before your audience steps inside.
            </p>
          </div>
          <div class="section-stage stage-surface controller-stage stage-wide reveal">
            <div class="controller-stack">
              <article class="glass-panel controller-brief">
                <h3>Signage implementation toolkit</h3>
                <p>Bring marketing, operations, and safety messaging into the same halo as your lighting cues.</p>
                <ul class="controller-list">
                  {#each signageImplementations as item}
                    <li>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </li>
                  {/each}
                </ul>
              </article>

              <SignageAssetBoard collections={signageCollections} note={signageBoardNote} />

              <SignageImplementationGuide phases={signagePhases} checklist={signageChecklist} />

              <SignageCommandCenter
                streams={signageStreams}
                alerts={signageAlerts}
                playbooks={signagePlaybooks}
              />

              <DeploymentLaunchPad />
              <DualOutputConfigurator />
              <IntegrationMatrix
                endpoints={integrationEndpoints}
                safeguards={integrationSafeguards}
                telemetry={integrationTelemetry}
              />
              <OperationsObservatory
                scenarios={opsScenarios}
                signals={opsSignals}
                playbooks={opsPlaybooks}
                roster={opsRoster}
                escalations={opsEscalations}
              />
              <EffectPaletteCarousel />
              <RoadmapMicroInteractions />
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
            <p class="eyebrow">Pilot runbook</p>
            <h2 class="h2" data-parallax="0.12">Runbook for the LumiGrid LED Node</h2>
            <p class="lead">The first node ships with a rehearsed signage and lighting playbook, built to keep teams calm and the story legible.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface led-stage stage-wide reveal">
            <div class="led-diagram glass-panel">
              <span class="diagram-badge">First release</span>
              <ul>
                {#each ledPromises as point}
                  <li>{point}</li>
                {/each}
              </ul>
            </div>
            <div class="led-details">
              <article class="glass-panel">
                <h3>Launch highlights</h3>
                <ul>
                  {#each ledHighlights as item}
                    <li>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </li>
                  {/each}
                </ul>
              </article>
              <article class="glass-panel">
                <h3>What early partners receive</h3>
                <ul>
                  {#each ledSupport as point}
                    <li>{point}</li>
                  {/each}
                </ul>
              </article>
              <article class="glass-panel asset-kit">
                <h3>Signage asset placeholders</h3>
                <ul class="asset-grid">
                  {#each assetPlaceholders as slot}
                    <li>
                      <strong>{slot.title}</strong>
                      <p>{slot.detail}</p>
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
        id="launch"
        class="section halo section-launch"
        style="--orbit-a: color-mix(in oklab, var(--c) 42%, transparent); --orbit-b: color-mix(in oklab, var(--halo-glow) 40%, transparent); --orbit-strength:.5;"
        data-flare-primary="color-mix(in oklab, var(--c) 42%, transparent)"
        data-flare-secondary="color-mix(in oklab, var(--halo-glow) 40%, transparent)"
        data-flare-glow="color-mix(in oklab, var(--halo-glow) 50%, transparent)"
        data-flare-strength=".5"
      >
        <span class="section-orbit" aria-hidden="true"></span>
        <div class="container narrow">
          <div class="section-header" id="vision">
            <p class="eyebrow">Launch journey</p>
            <h2 class="h2" data-parallax="0.12">Help us open the first chapter</h2>
            <p class="lead">The LED Node release is a guided rollout—designed so every early space feels supported and celebrated.</p>
          </div>
          <div class="section-stage section-stage-grid stage-surface launch-stage stage-tight reveal">
            <div class="launch-timeline glass-card">
              <span class="vision-badge">Release cadence</span>
              {#each launchMilestones as milestone}
                <article class="launch-stop glass-card">
                  <header>
                    <span class="launch-stage">{milestone.stage}</span>
                    <h3>{milestone.title}</h3>
                  </header>
                  <p>{milestone.detail}</p>
                </article>
              {/each}
            </div>
            <article class="glass-panel launch-invite">
              <h3>Be part of the pilot wave</h3>
              <p>
                Share your venue, installation, or idea. We will co-design the experience, schedule rehearsals, and ensure the LED
                Node debuts with confidence.
              </p>
              <a class="btn primary" href="#contact">Talk to us</a>
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
            <p class="lead">Tell us about your space and we will map how LumiGrid and the LED Node can bring it to life.</p>
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
            <article class="glass-panel studio-invite">
              <h3>Visit Reclame Fabriek</h3>
              <ul class="mesh-details-list">
                {#each studioHighlights as item}
                  <li>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </li>
                {/each}
              </ul>
            </article>
            <ContactForm />
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
        <h2 class="footer-headline">A platform built to make every space feel alive.</h2>
        <p class="footer-copy">
          LumiGrid unifies light, motion, and human moments—and the LED Node release is just the beginning.
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
      <p>© LumiGrid — Crafted for spaces that want to glow together.</p>
    </div>
  </div>
</footer>
