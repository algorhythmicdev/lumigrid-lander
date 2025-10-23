<script>
  import Header from '$lib/components/Header.svelte';
  import SideTimeline from '$lib/components/SideTimeline.svelte';
  import LEDDemo from '$lib/components/LEDDemo.svelte';
  import MeshNavigator from '$lib/components/MeshNavigator.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

  const sections = [
    { id: 'hero', label: 'Welcome', icon: 'sparkles' },
    { id: 'platform', label: 'Platform', icon: 'globeAlt' },
    { id: 'experience', label: 'Experience', icon: 'commandLine' },
    { id: 'led-node', label: 'LED Node', icon: 'sun' },
    { id: 'launch', label: 'Launch', icon: 'rocketLaunch' },
    { id: 'contact', label: 'Connect', icon: 'envelope' }
  ];

  const heroHighlights = [
    'Living lighting mesh',
    'Operator-ready controls',
    'LED Node pilot open',
    'Daugavpils studio tours'
  ];

  const heroIntro = [
    'LumiGrid transforms architecture and public space into a single living canvas.',
    'Every production is rehearsed inside Reclame Fabriek in Daugavpils, Latvija before it lights your venue.',
    'The first LED Node is almost here—join the pilot wave, walk the studio floor, and co-author the launch story.'
  ];

  const platformStory = [
    'LumiGrid keeps hospitality lobbies, skyline façades, and stage cues in one rhythm.',
    'One platform retires extra controllers while every doorway, plaza, and show moment stays aligned.',
    'Reclame Fabriek in Daugavpils is our calibration lab where each choreography is fine-tuned before travel.'
  ];

  const platformHighlights = [
    { title: 'Single lighting language', detail: 'Nodes coordinate façades, rooms, and installations as one story.' },
    { title: 'Architectural + show lighting', detail: 'Blend ambience with motion without layering extra gear.' },
    { title: 'Control from anywhere', detail: 'Shape looks and cues from any modern browser in minutes.' },
    { title: 'Reclame Fabriek rehearsal', detail: 'Every roll-out is staged in Daugavpils so your team steps into a proven playbook.' }
  ];

  const platformMoments = [
    'Flagship unveilings pulsing with every guest arrival.',
    'Suites gliding from sunrise calm to nightlife energy on cue.',
    'Pop-up stories rehearsed remotely and launched in a tap.'
  ];

  const experienceHighlights = [
    { title: 'Situational clarity', detail: 'Dashboards surface tempo, looks, and lead nodes at a glance.' },
    { title: 'Browser rehearsals', detail: 'Preview transitions online before the room ever shifts.' },
    { title: 'Shared showfiles', detail: 'Invite designers, operators, and partners into the same cues.' }
  ];

  const experienceMoments = [
    'Blend ambience with statement looks in seconds.',
    'Drop into quiet mode instantly when the mood needs a reset.',
    'Pass leadership across the mesh gracefully during longer runs.',
    'Host remote and on-site run-throughs direct from Reclame Fabriek.'
  ];

  const ledPromises = [
    'Opens the LumiGrid hardware family with a purpose-built lighting brain.',
    'Leads or follows the LumiGrid beat so fixtures stay in harmony.',
    'Ships with an onboard console and intuitive status glow for quick reads.'
  ];

  const ledHighlights = [
    {
      title: 'Launch-ready looks',
      detail: 'Curated scenes and schedules for retail, hospitality, and cultural spaces land out of the box.'
    },
    {
      title: 'Guided setup',
      detail: 'Remote onboarding, on-call support, and smart defaults make day one effortless.'
    },
    {
      title: 'Built at Reclame Fabriek',
      detail: 'Prototyped and burned in at our Daugavpils, Latvija light lab so every node ships stage-tested.'
    },
    {
      title: 'Open for partners',
      detail: 'APIs and partner programmes invite designers and integrators to extend the experience.'
    }
  ];

  const ledSupport = [
    'Pilot members receive white-glove deployment and monitoring.',
    'Early feedback shapes firmware updates and accessories.',
    'Book in-person walk-throughs at Reclame Fabriek to see what is next.',
    'Join a Daugavpils city tour previewing waterfront and plaza tests.',
    'Access remote rehearsals streamed direct from the Daugavpils studio.',
    'Sensor, kinetic, and hub nodes follow the LED Node cadence.'
  ];

  const launchMilestones = [
    {
      stage: 'Today',
      title: 'Start the conversation',
      detail: 'Share your venue goals and we will map the pilot fit together.'
    },
    {
      stage: 'Studio visit',
      title: 'Reclame Fabriek sessions',
      detail: 'Experience LumiGrid firsthand in Daugavpils and tune your story alongside the team.'
    },
    {
      stage: 'Open studio',
      title: 'Immersion weeks',
      detail: 'Reserve private time inside the studio to choreograph your launch among full-scale prototypes.'
    },
    {
      stage: 'City preview',
      title: 'Daugavpils after dark',
      detail: 'Walk the skyline with us and watch LumiGrid frame plazas, façades, and waterfront scenes.'
    },
    {
      stage: 'Pilot wave',
      title: 'LED Node activations',
      detail: 'Selected spaces receive hardware, rehearsals, and co-created stories.'
    },
    {
      stage: 'Launch window',
      title: 'General availability',
      detail: 'Production nodes, curated looks, and partner resources roll out globally.'
    }
  ];

  const contactHighlights = [
    'Schedule a LumiGrid walkthrough tailored to your venue.',
    'See how the LED Node layers into your lighting today.',
    'Line up a Reclame Fabriek lab visit in Daugavpils to preview prototypes.',
    'Secure your spot on the pilot list for early hardware and co-design time.',
    'Arrange a guided tour through Daugavpils cultural quarters with the team.'
  ];

  const studioHighlights = [
    {
      title: 'Reclame Fabriek base',
      detail: 'Tour the Daugavpils, Latvija workshop where the LED Node is staged, tested, and polished.'
    },
    {
      title: 'Historic quarter backdrop',
      detail: 'Explore the creative district around the former print house that now anchors our studio.'
    },
    {
      title: 'Immersive walk-throughs',
      detail: 'Preview façade, plaza, and waterfront scenes in person before they travel to your venue.'
    },
    {
      title: 'Bring your crew',
      detail: 'Host designers and operators on-site for co-creation without disrupting your live space.'
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
                <p class="hero-intro">{paragraph}</p>
              {/each}
              <div class="hero-actions">
                <a class="btn primary" href="#led-node">Meet the LED Node</a>
                <a class="btn ghost" href="#launch">Join the launch wave</a>
              </div>
              <div class="hero-highlights" aria-label="Promises">
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
                <p class="journey-summary">{paragraph}</p>
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
            <p class="eyebrow">Flagship hardware</p>
            <h2 class="h2" data-parallax="0.12">Meet the LumiGrid LED Node</h2>
            <p class="lead">Our first node is almost here, crafted to paint light, stay calm under pressure, and welcome every teammate.</p>
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
          <div class="section-header">
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
