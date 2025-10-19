<script>
  import { onMount, onDestroy } from 'svelte';
  import { initLandingPage } from '$lib/init-landing-page.js';


  let destroy = () => {};
  onMount(() => {
    destroy = initLandingPage();
  });
  onDestroy(() => {
    destroy && destroy();
  });
</script>

<svelte:head>
  <title>LumiGrid — Creative Lighting &amp; Signage Control</title>
  <meta
    name="description"
    content="LumiGrid helps signage makers choreograph light: multi-zone LED control, presets, timelines, schedules, and silky-smooth sync — all from a simple web app. Developed by Reclame Fabriek R&amp;D."
  />
  <meta name="color-scheme" content="dark light" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
    rel="stylesheet"
  />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<a class="sr-only" href="#main">Skip to content</a>

    <!-- Background FX canvas -->
    <canvas id="lg-fx" aria-hidden="true"></canvas>

    <div class="page-shell">
      <div class="page-main">
        <header id="hero" class="section hero has-sidebar">
          <div class="container">
            <nav class="top-nav glass" aria-label="Primary">
              <a href="/" class="brand-mark" aria-label="LumiGrid home"
                >LumiGrid</a
              >
              <div class="nav-controls">
                <label class="sr-only" for="uiTheme">Interface theme</label>
                <select id="uiTheme" class="nav-select">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="contrast">High contrast</option>
                </select>
                <label class="sr-only" for="brandTheme">Accent palette</label>
                <select id="brandTheme" class="nav-select">
                  <option value="rf">RF Default</option>
                  <option value="contrast">High-Contrast Cyan</option>
                  <option value="warm">Warm Magenta</option>
                </select>
                <button
                  id="ttsToggle"
                  class="btn ghost"
                  aria-pressed="false"
                  aria-label="Read text aloud"
                >
                  Read
                </button>
              </div>
              <a class="btn primary" href="#contact">Contact</a>
            </nav>

            <div class="hero-shell">
              <div class="hero-copy">
                <p class="hero-eyebrow reveal">Creative lighting suite</p>
                <h1 class="h1 text-gradient" data-parallax="0.18">
                  Light that tells your story.
                </h1>
                <p class="lead reveal">
                  Design signs that breathe, windows that glow, and façades that
                  move together — all from a calm, simple app.
                </p>
                <div class="hero-actions reveal">
                  <a class="btn primary" href="#system">See how it works</a>
                  <a class="btn outline" href="#led">Try LED control</a>
                </div>
                <p class="lead reveal">
                  Developed by
                  <a
                    href="https://reclamefabriek.eu"
                    target="_blank"
                    rel="noopener"
                    >Reclame Fabriek R&amp;D</a
                  >
                </p>
              </div>

              <div class="hero-visual" aria-hidden="true">
                <div class="hero-orb orb-a"></div>
                <div class="hero-orb orb-b"></div>
                <div class="hero-device glass reveal">
                  <div class="hero-device-header">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="hero-device-title">LumiGrid Live</span>
                  </div>
                  <div class="hero-timeline" data-hero-timeline>
                    <div class="hero-timeline-track"></div>
                    <div class="hero-timeline-progress"></div>
                    <div class="hero-keyframes" role="list" aria-label="Scene timeline">
                      <span class="hero-keyframe" role="listitem">
                        <svg
                          class="hero-keyframe-icon"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 22v-2M12 4V2m10 10h-2M4 12H2m15.364 6.364-1.414-1.414M6.05 6.05 4.636 4.636m12.728 0L16.95 6.05M6.05 17.95l-1.414 1.414" />
                        </svg>
                        <span class="sr-only">Dawn Calm</span>
                      </span>
                      <span class="hero-keyframe" role="listitem">
                        <svg
                          class="hero-keyframe-icon"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m9 6.75.969 2.906c.098.296.33.528.626.626L13.5 11.25l-2.905.969a1.125 1.125 0 0 0-.626.626L9 15.75l-.969-2.905a1.125 1.125 0 0 0-.626-.626L4.5 11.25l2.905-.969c.296-.098.528-.33.626-.626L9 6.75Zm7.5-3v3m0 9v3m2.25-7.5H21m-4.5 4.5H21M12 3v2.25m0 13.5V21" />
                        </svg>
                        <span class="sr-only">Open Glow</span>
                      </span>
                      <span class="hero-keyframe" role="listitem">
                        <svg
                          class="hero-keyframe-icon"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 12.79A9 9 0 1 1 11.21 3a7.5 7.5 0 0 0 9.79 9.79Z" />
                        </svg>
                        <span class="sr-only">Evening Flow</span>
                      </span>
                    </div>
                  </div>
                  <div class="hero-glass-card">
                    <p class="hero-glass-label">Zones in sync</p>
                    <div class="hero-strip-set">
                      <span class="hero-strip"></span>
                      <span class="hero-strip"></span>
                      <span class="hero-strip"></span>
                    </div>
                  </div>
                </div>
                <div class="hero-floating-card glass reveal">
                  <p class="hero-floating-title">Auto schedule</p>
                  <p class="hero-floating-copy">
                    Scenes fade throughout the day with precise colour balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div class="section-divider" aria-hidden="true"></div>

        <main id="main" class="has-sidebar" tabindex="-1">
          <section id="system" class="section halo">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">What is LumiGrid?</h2>
              <p class="big reveal">
                It’s a friendly way to choreograph light. Choose a mood, place
                it on a simple timeline, and watch every part of your sign move
                in harmony.
              </p>

              <div class="pills reveal" role="list">
                <button class="pill" data-info="sync">Sync</button>
                <button class="pill" data-info="presets">Presets</button>
                <button class="pill" data-info="schedule">Schedule</button>
                <button class="pill" data-info="override">
                  Quick Override
                </button>
                <button class="pill" data-info="status">Live Status</button>
              </div>

              <div class="card-stack">
                <div class="card reveal" data-info-card="sync">
                  <h3>Everything moves together</h3>
                  <p>
                    Front letters, window strips, logo halo — when you press
                    play, they stay in step.
                  </p>
                </div>
                <div class="card reveal" data-info-card="presets">
                  <h3>Looks you can save</h3>
                  <p>
                    “Calm Evening,” “Bright Day,” “Promo Sparkle.” Save once,
                    reuse forever. Swap with a tap.
                  </p>
                </div>
                <div class="card reveal" data-info-card="schedule">
                  <h3>Set and forget</h3>
                  <p>
                    Morning to evening, weekday to holiday — your sign follows
                    the plan.
                  </p>
                </div>
                <div class="card reveal" data-info-card="override">
                  <h3>One-tap spotlight</h3>
                  <p>
                    Need attention now? Tap Quick Override for a short show; it
                    fades back on its own.
                  </p>
                </div>
                <div class="card reveal" data-info-card="status">
                  <h3>See what’s happening</h3>
                  <p>
                    Open the web app to check zones, brightness, and the
                    current scene. Change anything instantly.
                  </p>
                </div>
              </div>

              <div class="grid grid-3 reveal mt-md">
                <figure class="card">
                  <img
                    src="/assets/images/screen-1.svg"
                    alt="Screenshot placeholder — Scenes" />
                  <figcaption class="lead">
                    Screenshot: Web app — Scenes
                  </figcaption>
                </figure>
                <figure class="card">
                  <img
                    src="/assets/images/screen-2.svg"
                    alt="Screenshot placeholder — Timeline" />
                  <figcaption class="lead">
                    Screenshot: Timeline editor
                  </figcaption>
                </figure>
                <figure class="card">
                  <img
                    src="/assets/images/photo-1.svg"
                    alt="Shop window install placeholder" />
                  <figcaption class="lead">
                    Photo: Shop window install
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="deep" class="section halo soft">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">
                How it works (in plain words)
              </h2>
              <div class="grid grid-2">
                <div class="card reveal">
                  <h3>Zones</h3>
                  <p>
                    Think of zones like instruments in a band. Tune each or play
                    together.
                  </p>
                </div>
                <div class="card reveal">
                  <h3>Scenes</h3>
                  <p>
                    Favourite looks you can name and reuse: colours, motion,
                    brightness.
                  </p>
                </div>
                <div class="card reveal">
                  <h3>Timeline</h3>
                  <p>
                    Lay scenes on a strip of time. “Morning Calm”, “Midday
                    Clean”, “Evening Flow”.
                  </p>
                </div>
                <div class="card reveal">
                  <h3>Triggers</h3>
                  <p>
                    Start when doors open or when it gets dark. You set the
                    rules.
                  </p>
                </div>
                <div class="card reveal">
                  <h3>Sync</h3>
                  <p>
                    Everything steps together. Chases and sparkles align end to
                    end.
                  </p>
                </div>
                <div class="card reveal">
                  <h3>Control</h3>
                  <p>
                    A web app on your phone or laptop. Tap a scene, nudge a
                    colour.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="led" class="section halo focus">
            <div class="container grid grid-2">
              <div class="glass reveal pad-md">
                <div class="led-preview">
                  <div class="led-ambient" data-led-pattern="chase" aria-hidden="true"></div>
                  <div class="led-field" data-led-pattern="chase" aria-hidden="true">
                    <div class="led-field-mesh"></div>
                    <div class="led-field-dots">
                      <span style="--i:0"></span>
                      <span style="--i:1"></span>
                      <span style="--i:2"></span>
                      <span style="--i:3"></span>
                      <span style="--i:4"></span>
                      <span style="--i:5"></span>
                      <span style="--i:6"></span>
                      <span style="--i:7"></span>
                      <span style="--i:8"></span>
                    </div>
                  </div>
                </div>
                <div class="led-controls">
                  <div class="led-control-group">
                    <span class="led-label">Palette</span>
                    <div
                      class="led-palette-group"
                      role="group"
                      aria-label="Choose palette"
                    >
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-palette="rf"
                        aria-pressed="false"
                      >
                        RF
                      </button>
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-palette="neon"
                        aria-pressed="false"
                      >
                        Neon
                      </button>
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-palette="sunset"
                        aria-pressed="false"
                      >
                        Sunset
                      </button>
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-palette="mint"
                        aria-pressed="false"
                      >
                        Mint
                      </button>
                    </div>
                  </div>
                  <div class="led-control-group">
                    <span class="led-label">Pattern</span>
                    <div
                      class="led-pattern-group"
                      role="group"
                      aria-label="Choose motion pattern"
                    >
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-pattern-btn="chase"
                        aria-pressed="false"
                      >
                        Chase
                      </button>
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-pattern-btn="pulse"
                        aria-pressed="false"
                      >
                        Pulse
                      </button>
                      <button
                        class="btn ghost"
                        type="button"
                        data-led-pattern-btn="wave"
                        aria-pressed="false"
                      >
                        Wave
                      </button>
                    </div>
                  </div>
                  <div class="led-speed mt-xs" data-led-speed>
                    <span aria-hidden="true">Speed</span>
                    <label class="sr-only" for="ledSpeed"
                      >LED animation speed</label
                    >
                    <input
                      id="ledSpeed"
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value="1" />
                    <span class="led-speed-value" data-led-speed-value
                      >1.0×</span
                    >
                  </div>
                  <div class="led-intensity mt-xs" data-led-intensity>
                    <span aria-hidden="true">Glow</span>
                    <label class="sr-only" for="ledIntensity"
                      >LED glow intensity</label
                    >
                    <input
                      id="ledIntensity"
                      type="range"
                      min="0.4"
                      max="1.2"
                      step="0.05"
                      value="1" />
                    <span class="led-intensity-value" data-led-intensity-value
                      >100%</span
                    >
                  </div>
                </div>
                <div class="lead mt-xs">
                  Mix palette, pattern, and glow to preview different atmospheres.
                </div>
              </div>
              <div class="card reveal">
                <h3>Simple, useful controls</h3>
                <ul>
                  <li>
                    <strong>Many zones</strong> — control several LED runs
                    separately or link them.
                  </li>
                  <li>
                    <strong>Colour + white</strong> — set gentle ambience or
                    clean brand lighting, or both.
                  </li>
                  <li>
                    <strong>Scenes & schedules</strong> — name your favourites
                    and set them for the day.
                  </li>
                  <li>
                    <strong>Web app</strong> — open in a browser; no extra
                    software.
                  </li>
                  <li>
                    <strong>Always in step</strong> — when one moves, the others
                    move with it.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="dayflow" class="section halo soft" data-dayflow>
            <div class="container">
              <div class="section-head">
                <h2 class="h2" data-parallax="0.12">Plan a day of glow</h2>
                <p class="big reveal">
                  Sweep from dawn to nightlife — the strip updates as you slide through the playlist.
                </p>
              </div>
              <div class="dayflow-grid">
                <div class="dayflow-preview glass reveal">
                  <div class="dayflow-preview-halo" aria-hidden="true"></div>
                  <div class="dayflow-preview-strips">
                    <span class="dayflow-preview-strip" data-dayflow-strip></span>
                    <span class="dayflow-preview-strip" data-dayflow-strip></span>
                    <span class="dayflow-preview-strip" data-dayflow-strip></span>
                  </div>
                  <div class="dayflow-preview-pulse" aria-hidden="true"></div>
                  <div class="dayflow-preview-info">
                    <span class="dayflow-time" data-dayflow-time>06:00</span>
                    <div class="dayflow-title-row">
                      <span class="dayflow-icon" data-dayflow-icon aria-hidden="true"></span>
                      <h3 class="dayflow-name" data-dayflow-name>Dawn unveil</h3>
                    </div>
                    <p class="dayflow-copy" data-dayflow-copy>Warm wave • storefront wake-up</p>
                  </div>
                </div>
                <div class="dayflow-controls reveal">
                  <div class="dayflow-slider" data-dayflow-slider>
                    <label for="dayflowRange" class="dayflow-label">Timeline</label>
                    <div class="dayflow-track" aria-hidden="true">
                      <span class="dayflow-track-fill" data-dayflow-track></span>
                    </div>
                    <input
                      id="dayflowRange"
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      value="0"
                      data-dayflow-range
                      aria-valuemin="0"
                      aria-valuemax="3"
                      aria-valuenow="0"
                      aria-valuetext="Dawn unveil" />
                    <ol class="dayflow-markers" aria-hidden="true">
                      <li class="dayflow-marker" data-dayflow-marker data-dayflow-index="0" style="--dayflow-index:0">
                        <span class="dayflow-marker-icon"
                          ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4.5v3m-3.536 1.036-2.121-2.12m12.727 2.12-2.12-2.12M18 15a6 6 0 0 1-12 0" />
                          </svg>
                        </span>
                        <span class="dayflow-marker-label">Dawn</span>
                      </li>
                      <li class="dayflow-marker" data-dayflow-marker data-dayflow-index="1" style="--dayflow-index:1">
                        <span class="dayflow-marker-icon"
                          ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
                          </svg>
                        </span>
                        <span class="dayflow-marker-label">Midday</span>
                      </li>
                      <li class="dayflow-marker" data-dayflow-marker data-dayflow-index="2" style="--dayflow-index:2">
                        <span class="dayflow-marker-icon"
                          ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 12.75a9 9 0 0 1-9 9 9 9 0 1 1 9-9Z" />
                          </svg>
                        </span>
                        <span class="dayflow-marker-label">Afternoon</span>
                      </li>
                      <li class="dayflow-marker" data-dayflow-marker data-dayflow-index="3" style="--dayflow-index:3">
                        <span class="dayflow-marker-icon"
                          ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 12.79A9 9 0 1 1 11.21 3 7.5 7.5 0 0 0 21 12.79Z" />
                          </svg>
                        </span>
                        <span class="dayflow-marker-label">Night</span>
                      </li>
                    </ol>
                  </div>
                  <p class="lead">
                    Stop on a point to load its scene. Adjust palette, pattern, or glow to shape your own mix.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="scenes" class="section halo soft">
            <div class="container">
              <div class="section-head">
                <h2 class="h2" data-parallax="0.12">Preset scenes you can tap</h2>
                <p class="big reveal">
                  Try a full-day playlist — each scene loads straight into the live LED preview.
                </p>
              </div>
              <div
                class="scene-deck reveal"
                role="group"
                aria-label="Preset lighting scenes"
              >
                <button
                  type="button"
                  class="scene-card"
                  data-led-scene
                  data-scene-palette="sunset"
                  data-scene-pattern="wave"
                  data-scene-speed="0.9"
                  data-scene-intensity="0.95"
                  data-scene-time="06:00"
                  data-scene-title="Dawn unveil"
                  data-scene-copy="Warm wave • storefront wake-up"
                  aria-pressed="false"
                >
                  <span class="scene-card-bg" aria-hidden="true"></span>
                  <span class="scene-card-halo" aria-hidden="true"></span>
                  <span class="scene-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3v1.5m5.657.843-1.06 1.06M21 12h-1.5m-.843 5.657-1.06-1.06M12 21v-1.5m-5.657-.843 1.06-1.06M3 12h1.5m.843-5.657 1.06 1.06M8.25 12a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" />
                    </svg>
                  </span>
                  <span class="scene-copy">
                    <span class="scene-title">Dawn unveil</span>
                    <span class="scene-meta">Warm wave • storefront wake-up</span>
                  </span>
                </button>
                <button
                  type="button"
                  class="scene-card"
                  data-led-scene
                  data-scene-palette="rf"
                  data-scene-pattern="chase"
                  data-scene-speed="1.2"
                  data-scene-intensity="1"
                  data-scene-time="11:00"
                  data-scene-title="Midday motion"
                  data-scene-copy="Energetic chase • high footfall"
                  aria-pressed="false"
                >
                  <span class="scene-card-bg" aria-hidden="true"></span>
                  <span class="scene-card-halo" aria-hidden="true"></span>
                  <span class="scene-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5.25h5.25M3 9h2.25M3 12.75h5.25M3 16.5h2.25M11.25 5.25H21M11.25 9H21M11.25 12.75H21M11.25 16.5H21M8.25 4.5v1.5m0 2.25v1.5m0 2.25v1.5m0 2.25v1.5" />
                    </svg>
                  </span>
                  <span class="scene-copy">
                    <span class="scene-title">Midday motion</span>
                    <span class="scene-meta">Energetic chase • high footfall</span>
                  </span>
                </button>
                <button
                  type="button"
                  class="scene-card"
                  data-led-scene
                  data-scene-palette="mint"
                  data-scene-pattern="pulse"
                  data-scene-speed="0.7"
                  data-scene-intensity="0.85"
                  data-scene-time="15:30"
                  data-scene-title="Afternoon drift"
                  data-scene-copy="Soft pulse • calm browsing"
                  aria-pressed="false"
                >
                  <span class="scene-card-bg" aria-hidden="true"></span>
                  <span class="scene-card-halo" aria-hidden="true"></span>
                  <span class="scene-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.75c-2.9 0-5.25 2.35-5.25 5.25S9.1 17.25 12 17.25 17.25 14.9 17.25 12 14.9 6.75 12 6.75Zm0-4.5v3m0 12v3m-7.5-7.5h3m9 0h3" />
                    </svg>
                  </span>
                  <span class="scene-copy">
                    <span class="scene-title">Afternoon drift</span>
                    <span class="scene-meta">Soft pulse • calm browsing</span>
                  </span>
                </button>
                <button
                  type="button"
                  class="scene-card"
                  data-led-scene
                  data-scene-palette="neon"
                  data-scene-pattern="wave"
                  data-scene-speed="1.5"
                  data-scene-intensity="1.1"
                  data-scene-time="21:00"
                  data-scene-title="After-hours halo"
                  data-scene-copy="Vivid wave • nightlife draw"
                  aria-pressed="false"
                >
                  <span class="scene-card-bg" aria-hidden="true"></span>
                  <span class="scene-card-halo" aria-hidden="true"></span>
                  <span class="scene-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 6.75h15m-15 4.5h15m-15 4.5h15M7.5 3v18" />
                    </svg>
                  </span>
                  <span class="scene-copy">
                    <span class="scene-title">After-hours halo</span>
                    <span class="scene-meta">Vivid wave • nightlife draw</span>
                  </span>
                </button>
              </div>
              <p class="scene-note lead reveal">
                Each recipe updates palette, motion, and glow — tweak the sliders to fine-tune your own variant.
              </p>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="layout" class="section halo" data-layout-root>
            <div class="container">
              <div class="section-head">
                <h2 class="h2" data-parallax="0.12">Plot your layout on glass</h2>
                <p class="big reveal">
                  Preview how LumiGrid’s gradient runs across each fixture group — toggle zones to see coverage and glow levels
                  respond instantly.
                </p>
              </div>
              <div class="layout-grid">
                <div class="layout-map glass reveal" data-layout-map>
                  <span class="layout-floor" aria-hidden="true"></span>
                  <span class="layout-ambient" aria-hidden="true"></span>
                  <span class="layout-gridlines" aria-hidden="true"></span>
                  <span class="layout-orbit layout-orbit--outer" aria-hidden="true"></span>
                  <span class="layout-orbit layout-orbit--inner" aria-hidden="true"></span>
                  <span class="layout-zone layout-zone--window is-active" data-layout-zone="window" aria-hidden="true"></span>
                  <span class="layout-zone layout-zone--halo is-active" data-layout-zone="halo" aria-hidden="true"></span>
                  <span class="layout-zone layout-zone--counter is-active" data-layout-zone="counter" aria-hidden="true"></span>
                  <span class="layout-zone layout-zone--ceiling is-active" data-layout-zone="ceiling" aria-hidden="true"></span>
                  <div class="layout-overlay">
                    <span class="layout-mood" data-layout-mood>Covering 4 zones</span>
                    <p class="layout-status" data-layout-status role="status" aria-live="polite">
                      Window wash • Logo halo • Counter spark • Ceiling sweep highlighted
                    </p>
                  </div>
                </div>
                <div class="layout-controls">
                  <div class="layout-toggle-group reveal" role="group" aria-label="Toggle fixture zones">
                    <button
                      type="button"
                      class="layout-chip is-active"
                      data-layout-zone-btn="window"
                      data-layout-zone-label="Window wash"
                      aria-pressed="true"
                    >
                      <span class="layout-chip-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 6.75h15m-15 10.5h15M7.5 3v18m9-18v18" />
                        </svg>
                      </span>
                      Window wash
                    </button>
                    <button
                      type="button"
                      class="layout-chip is-active"
                      data-layout-zone-btn="halo"
                      data-layout-zone-label="Logo halo"
                      aria-pressed="true"
                    >
                      <span class="layout-chip-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 3v2.25m0 13.5V21m9-9h-2.25m-13.5 0H3" />
                        </svg>
                      </span>
                      Logo halo
                    </button>
                    <button
                      type="button"
                      class="layout-chip is-active"
                      data-layout-zone-btn="counter"
                      data-layout-zone-label="Counter spark"
                      aria-pressed="true"
                    >
                      <span class="layout-chip-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 8.25h16.5M6 8.25v9.75m12-9.75v9.75M8.25 6V3.75m7.5 2.25V3.75" />
                        </svg>
                      </span>
                      Counter spark
                    </button>
                    <button
                      type="button"
                      class="layout-chip is-active"
                      data-layout-zone-btn="ceiling"
                      data-layout-zone-label="Ceiling sweep"
                      aria-pressed="true"
                    >
                      <span class="layout-chip-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 5.25h15m-15 13.5h15M4.5 9.75h6m3 0h6" />
                        </svg>
                      </span>
                      Ceiling sweep
                    </button>
                  </div>
                  <dl class="layout-stats reveal">
                    <div class="layout-stat">
                      <dt>Active zones</dt>
                      <dd data-layout-count>4</dd>
                    </div>
                    <div class="layout-stat">
                      <dt>Current palette</dt>
                      <dd data-layout-palette>Signature spectrum</dd>
                    </div>
                    <div class="layout-stat">
                      <dt>Pattern</dt>
                      <dd data-layout-pattern>Chase ribbon</dd>
                    </div>
                    <div class="layout-stat">
                      <dt>Motion</dt>
                      <dd data-layout-speed>1.0×</dd>
                    </div>
                    <div class="layout-stat">
                      <dt>Glow</dt>
                      <dd data-layout-intensity>100%</dd>
                    </div>
                  </dl>
                  <p class="layout-note lead reveal">
                    Switch fixtures on or off to map coverage — palette, pattern, motion, and glow stay synced with the LED
                    controls, scenes, and aura tweaks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="aura" class="section halo soft" data-aura-lab>
            <div class="container">
              <div class="section-head">
                <h2 class="h2" data-parallax="0.12">Shape the reactive aura</h2>
                <p class="big reveal">
                  Layer spark, halo, and scan effects onto any preset — the glass preview responds to your glow and speed tweaks in real time.
                </p>
              </div>
              <div class="aura-grid">
                <div class="aura-preview glass reveal" data-aura-preview data-aura-mode="ambient">
                  <span class="aura-preview-layer aura-grid-lines" aria-hidden="true"></span>
                  <span class="aura-preview-layer aura-scan" aria-hidden="true"></span>
                  <span class="aura-preview-layer aura-halo" aria-hidden="true"></span>
                  <span class="aura-preview-layer aura-sparks" aria-hidden="true"></span>
                  <div class="aura-meter" aria-hidden="true">
                    <span style="--i:0"></span>
                    <span style="--i:1"></span>
                    <span style="--i:2"></span>
                    <span style="--i:3"></span>
                    <span style="--i:4"></span>
                    <span style="--i:5"></span>
                  </div>
                  <div class="aura-label">
                    <span class="tiny">Live blend</span>
                    <span class="aura-status" data-aura-status>Ambient wash</span>
                  </div>
                </div>
                <div class="aura-controls reveal">
                  <div class="aura-group">
                    <h3>Base mood</h3>
                    <div class="aura-modes" role="group" aria-label="Aura base mood">
                      <button
                        type="button"
                        class="aura-chip"
                        data-aura-mode="ambient"
                        data-aura-label="Ambient wash"
                        aria-pressed="false"
                      >
                        <span class="aura-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 6.75h15m-15 4.5h15m-15 4.5h15M7.5 3v18" />
                          </svg>
                        </span>
                        Ambient
                      </button>
                      <button
                        type="button"
                        class="aura-chip"
                        data-aura-mode="pulse"
                        data-aura-label="Pulse bloom"
                        aria-pressed="false"
                      >
                        <span class="aura-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6Z" />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          </svg>
                        </span>
                        Pulse
                      </button>
                      <button
                        type="button"
                        class="aura-chip"
                        data-aura-mode="burst"
                        data-aura-label="Burst prism"
                        aria-pressed="false"
                      >
                        <span class="aura-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m12 3 7.5 4.5v9L12 21l-7.5-4.5v-9L12 3Z" />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 8.25v7.5m3.75-5.25-7.5 3" />
                          </svg>
                        </span>
                        Burst
                      </button>
                    </div>
                  </div>
                  <div class="aura-group">
                    <h3>Layered effects</h3>
                    <div class="aura-effects" role="group" aria-label="Aura overlays">
                      <button
                        type="button"
                        class="aura-chip"
                        data-aura-effect="spark"
                        data-aura-label="Spark shower"
                        aria-pressed="false"
                      >
                        <span class="aura-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m9 6 1.145 3.812a1.2 1.2 0 0 0 .781.781L14.75 12l-3.824 1.406a1.2 1.2 0 0 0-.78.781L9 18l-1.145-3.812a1.2 1.2 0 0 0-.781-.781L3.25 12l3.824-1.406a1.2 1.2 0 0 0 .781-.781L9 6Zm9-3v2.25m0 13.5V21m3-9h-2.25M5.25 12H3" />
                          </svg>
                        </span>
                        Spark shower
                      </button>
                      <button
                        type="button"
                        class="aura-chip"
                        data-aura-effect="halo"
                        data-aura-label="Halo bloom"
                        aria-pressed="false"
                      >
                        <span class="aura-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Z" />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 3v2.25m0 13.5V21m9-9h-2.25m-13.5 0H3m15.364 6.364-1.59-1.59m-9.548-9.548-1.59-1.59m12.728 0-1.59 1.59m-9.548 9.548-1.59 1.59" />
                          </svg>
                        </span>
                        Halo bloom
                      </button>
                      <button
                        type="button"
                        class="aura-chip"
                        data-aura-effect="scan"
                        data-aura-label="Scanner sweep"
                        aria-pressed="false"
                      >
                        <span class="aura-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 5.25h15m-15 13.5h15M4.5 9h9m-9 6h9" />
                          </svg>
                        </span>
                        Scanner sweep
                      </button>
                    </div>
                  </div>
                  <p class="aura-note">
                    Combine aura layers with preset scenes and the glow slider — the live meter reacts to your intensity and the scan follows your speed.
                  </p>
                  <ul class="aura-legend">
                    <li><strong>Scene link</strong> mirrors the active preset gradient.</li>
                    <li><strong>Meter bars</strong> climb as you raise glow intensity.</li>
                    <li><strong>Scanner sweep</strong> accelerates with animation speed.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="gallery" class="section halo">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">Project gallery</h2>
              <p class="big reveal">
                A few ways light can feel: calm, crisp, or delightfully
                animated.
              </p>
              <div class="gallery">
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Window glow</strong><span>Evening flow</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Logo halo</strong><span>Clean white + edge</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Façade sweep</strong><span>Left to right</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Promo sparkle</strong><span>15 s burst</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Calm morning</strong><span>Low-key ambience</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Midday clean</strong><span>Bright, readable</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Weekend halo</strong><span>Warm vibe</span>
                  </div>
                </button>
                <button type="button" class="g-item reveal">
                  <div class="g-ph" aria-hidden="true"></div>
                  <div class="g-cap">
                    <strong>Seasonal sparkle</strong><span>Reusable scene</span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="implement" class="section halo soft">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">
                Where it fits (quick examples)
              </h2>
              <div class="grid grid-3">
                <article class="card reveal">
                  <h3>Window displays</h3>
                  <p>
                    Two colour zones + soft white backlight. Daytime flow,
                    evening halo, periodic sweep.
                  </p>
                </article>
                <article class="card reveal">
                  <h3>Logo letters</h3>
                  <p>
                    Clean white for brand clarity. Add a soft halo on weekends.
                    Short sparkle for launches.
                  </p>
                </article>
                <article class="card reveal">
                  <h3>Façade moments</h3>
                  <p>
                    Multiple strips act as one stage. Start, applaud, fade back
                    — one tap.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="trust" class="section halo">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">Reliable by design</h2>
              <div class="grid grid-2">
                <div class="card reveal">
                  <h3>Keeps running</h3>
                  <p>
                    Scenes continue even if your phone is offline. Power
                    returns? It remembers the plan.
                  </p>
                </div>
                <div class="card reveal">
                  <h3>Private control</h3>
                  <p>
                    You control your own lights. The web app talks directly on
                    your local network.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="faq" class="section halo soft">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">Common questions</h2>
              <details class="card reveal">
                <summary>Can I use my existing LED strips?</summary>
                <p>
                  Yes — most common addressable RGB/RGBW strips and standard
                  white channels are supported.
                </p>
              </details>
              <details class="card reveal">
                <summary>Do I need special software?</summary>
                <p>No. Open a browser on your phone or laptop. That’s it.</p>
              </details>
              <details class="card reveal">
                <summary>Will it sync across a long shopfront?</summary>
                <p>
                  Yes. Zones share timing so chases and sparkles line up from
                  end to end.
                </p>
              </details>
              <details class="card reveal">
                <summary>What happens after a power cut?</summary>
                <p>
                  The system picks up the planned scene automatically when power
                  returns.
                </p>
              </details>
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>

          <section id="contact" class="section halo soft center">
            <div class="container">
              <h2 class="h2" data-parallax="0.12">Bring your light to life</h2>
              <p class="lead reveal">
                Tell us what you’re building. We’ll help plan the zones, the
                looks, and the show.
              </p>
              <form class="form glass reveal" id="contactForm" novalidate>
                <div class="f-row">
                  <label for="name">Name</label
                  ><input
                    id="name"
                    name="name"
                    autocomplete="name"
                    required /><small class="error" id="err-name" role="alert"></small>
                </div>
                <div class="f-row">
                  <label for="email">Email</label
                  ><input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required /><small class="error" id="err-email" role="alert"></small>
                </div>
                <div class="f-row">
                  <label for="msg">Message</label
                  ><textarea
                    id="msg"
                    name="message"
                    rows="4"
                    required
                  ></textarea
                  ><small class="error" id="err-msg" role="alert"></small>
                </div>
                <div class="f-row inline">
                  <button type="submit" class="btn primary big">Send</button
                  ><span
                    class="form-note"
                    aria-live="polite"
                    id="formNote"
                  ></span>
                </div>
              </form>
              <a
                class="btn outline big"
                href="https://reclamefabriek.eu"
                target="_blank"
                rel="noopener"
                >Visit Reclame Fabriek</a
              >
            </div>
          </section>

          <div class="section-divider" aria-hidden="true"></div>
        </main>

        <footer class="section center pt-md">
          <div class="container">
            <p>
              © Reclame Fabriek — R&amp;D •
              <a href="https://reclamefabriek.eu" target="_blank" rel="noopener"
                >reclamefabriek.eu</a
              >
            </p>
          </div>
        </footer>
      </div>
      <!-- Sticky timeline (desktop) -->
      <aside class="timeline-side glass" aria-label="Page sections">
        <ol id="lg-tl" class="tl">
          <li>
            <a href="#hero">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </span>
              <span class="sr-only">Hero</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#system">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </span>
              <span class="sr-only">What is LumiGrid</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#deep">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                </svg>
              </span>
              <span class="sr-only">How it works</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#led">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </span>
              <span class="sr-only">LED control</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#dayflow">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m0 13.5V21m9-9h-2.25m-13.5 0H3m15.364 6.364-1.59-1.59m-9.548-9.548-1.59-1.59m12.728 0-1.59 1.59m-9.548 9.548-1.59 1.59M5.25 15A6.75 6.75 0 0 0 12 21a6.75 6.75 0 0 0 6.75-6 6.75 6.75 0 0 0-13.5 0Z" />
                </svg>
              </span>
              <span class="sr-only">Day playlist</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#scenes">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 6.75h15m-15 4.5h15m-15 4.5h15M8.25 3v18" />
                </svg>
              </span>
              <span class="sr-only">Scene presets</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#layout">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 5.25h15m-15 0A1.5 1.5 0 0 0 3 6.75v10.5a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5m-15 0V5.25m4.5 0v13.5m6-13.5v13.5m0-7.5h6m-12 3h-6" />
                </svg>
              </span>
              <span class="sr-only">Layout lab</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#aura">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v3m0 9v3m7.5-7.5h-3m-9 0H4.5m12.864-6.864-2.121 2.121m-6.486 6.486-2.121 2.121m0-10.728 2.121 2.121m6.486 6.486 2.121 2.121" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
                </svg>
              </span>
              <span class="sr-only">Aura lab</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#gallery">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </span>
              <span class="sr-only">Projects</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#implement">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
              </span>
              <span class="sr-only">Implementation examples</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#trust">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </span>
              <span class="sr-only">Reliability</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#faq">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </span>
              <span class="sr-only">FAQ</span>
            </a>
            <span class="bar"></span>
          </li>
          <li>
            <a href="#contact">
              <span class="tl-icon" aria-hidden="true"
                ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <span class="sr-only">Contact</span>
            </a>
            <span class="bar"></span>
          </li>
        </ol>
        <span id="lg-tl-progress" class="tl-progress"></span>
      </aside>
    </div>

