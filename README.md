# LumiGrid — SvelteKit Landing

Ultra‑modern, glassy, depthy landing for creative signage makers. Truthful, simple language for all ages. Background 3D flares with safe motion, WCAG‑minded contrast, soft parallax, and interactive demos.

## Dev

```bash
npm install
npm run dev -- --open
```

Open http://localhost:5173. Run `npm run check` for a quick Svelte/TypeScript sanity check before committing changes.
Execute `npm run test` to exercise the contact endpoint unit tests.

## Deploy to Google Cloud Run

```bash
# Build and push using Cloud Build (updates LOCATION/PROJECT/REPOSITORY as needed)
gcloud builds submit --config=cloudbuild.yaml --region=LOCATION \
  --substitutions=_SERVICE=lumigrid-lander

# Deploy the freshly built image (replace placeholders to match your project)
gcloud run deploy lumigrid-lander \
  --image=LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/lumigrid-lander:$COMMIT_SHA \
  --platform=managed \
  --region=LOCATION \
  --allow-unauthenticated
```

The Dockerfile produces a Node 20 image that runs `node build`, and `cloudbuild.yaml`
encodes a reproducible build. If you prefer a local build, run `npm run build`, then
`docker build --tag lumigrid-lander:local .` and deploy that image instead.

### Contact form webhooks

The `/api/contact` endpoint will forward submissions to any HTTPS webhook you
expose via the `CONTACT_WEBHOOK_URL` (or legacy `CONTACT_WEBHOOK`) environment
variable. Configure the variable during `gcloud run deploy` to hand messages off
to Slack, Email, or Pub/Sub:

```bash
gcloud run deploy lumigrid-lander \
  --image=... \
  --region=LOCATION \
  --allow-unauthenticated \
  --set-env-vars=CONTACT_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

When no webhook is configured, submissions are logged to the service console so
Cloud Run logs retain the message payloads for manual follow-up.

#### Built-in abuse defences

- A hidden honeypot field quietly rejects basic bot submissions.
- Submissions filled in suspiciously fast (under ~3 seconds) are throttled with a `429` response.
- Payloads are clipped to 2000 characters to protect downstream webhooks.

These checks run server-side, so even if the front-end is bypassed the API still enforces them.

## Structure

- `src/routes/+layout.svelte` — global FX canvas + global hooks
- `src/routes/+page.svelte` — landing content
- `src/lib/styles.css` — tokens, gradients, glass, grids, animations
- `src/lib/fx.bundle.js` — 3D flares, reveals, parallax, ripple, theme, TTS
- `src/lib/components/*` — Header, SideTimeline, Gallery, LEDDemo, ContactForm
- `static/*` — favicon, robots, sitemap, placeholder images




Perfect — you want something that reads less like a datasheet and more like a **project whitepaper / technical-PR overview**: it should tell the story of LumiGrid as a coherent modular lighting and control ecosystem, with personality and clarity.

Below is a fully rewritten and expanded version divided into **Part I – The LumiGrid System** and **Part II – The LumiGrid LED Node**.
It’s designed to double as documentation, investor/press briefing, and onboarding text for collaborators.

---

## **Part I – The LumiGrid System**

### A living network of light

LumiGrid is a distributed control architecture for **modular, intelligent lighting and kinetic systems**.
At its core it turns light into a **networked medium** — each node thinking for itself, yet synchronized in a collective rhythm.

Instead of one controller fanning out to passive fixtures, LumiGrid builds a **mesh of equal peers**: compact nodes that can drive LEDs, motors, sensors, or mixed loads.
Any node can become the **master clock**; others align automatically over Wi-Fi or Ethernet multicast.
Together they behave like a single, tempo-synchronized organism—perfect for interactive signage, stage visuals, ambient architecture, or experimental robotics.

### Design philosophy

* **Distributed intelligence:** computation sits next to the hardware it controls.
* **Deterministic sync:** every node follows the same timeline, even across wireless networks.
* **Openness:** each module exposes its state through open REST / MQTT APIs and serves its own web UI.
* **Human-centered UX:** installation, mapping, and show control happen from any browser—no proprietary app required.
* **Hardware pragmatism:** built around inexpensive, readily available ESP-class MCUs and a few precision analog helpers.

### The system in motion

Imagine a retail façade covered in addressable LED panels, a few kinetic logo elements, and a line of ambient wall-washers.
A single LumiGrid master broadcasts the global clock and cues.
Every LED Node interprets that timeline locally: gradients ripple in sync, servos swing at the beat, and PWM fixtures fade precisely on the downbeat.
The choreography is data-light—just timestamps and preset names—yet the visual result is tightly unified.

### Core software layers

1. **Sync Protocol** – UDP multicast “ticks” and “cues” keep all nodes aligned to the same millisecond grid.
2. **Trigger Engine** – interprets incoming actions (“play preset”, “blackout”, “beat”) and routes them to the right subsystem.
3. **Effect Engine** – renders visual or kinetic effects in real time, respecting frame-rate, power, and timing constraints.
4. **Scheduler** – executes time-based scenes, daily schedules, or show playlists.
5. **Networking & APIs** – REST + MQTT endpoints expose every parameter to higher-level controllers or creative tools.
6. **Web UI** – a self-hosted control panel served by each node for configuration, diagnostics, and live sequencing.

### Planned family of nodes

| Node                  | Core Function                                                            | Typical Hardware                 |
| --------------------- | ------------------------------------------------------------------------ | -------------------------------- |
| **LED Node**          | Drives “dumb” PWM and addressable LEDs, effects engine, sync participant | ESP32 + PCA9685 + SN74HCT245     |
| **Kinetic Node**      | Motor/servo driver with motion profiles synced to grid                   | ESP32 + DRV8833 / servo expander |
| **Sensor Node**       | Aggregates ambient, motion, or proximity sensors; publishes events       | ESP32 + I²C sensor hub           |
| **Hub Node / Master** | Acts as time-base, playlist server, and cloud bridge                     | ESP32-S3 / Raspberry Pi gateway  |
| **Light Bar Module**  | Linear LED Node variant for architectural strips                         | Slim ESP32 + MOSFET array        |
| **Logic Node**        | Headless compute module running choreography or AI inference             | Jetson Nano / Pi 5 companion     |

Each shares the same firmware skeleton and API language; only the hardware profile and effect libraries differ.
The modularity allows installations to scale from a single DIY sculpture to a building-wide lighting grid.

### Human interaction

* **Browser Sequencer:** every node can open a timeline view to assemble cues visually.
* **Mobile Setup Portal:** on first power-up, nodes create an AP and captive portal for Wi-Fi onboarding.
* **MQTT / OSC Bridge (optional):** allows real-time control from DAWs, game engines, or show controllers.
* **SSE Telemetry:** live feedback of playhead, FPS, temperature, and power-limit state.

### Technology stack in one breath

**ESP-IDF v5 + FreeRTOS**, **LittleFS**, **esp_http_server**, **LWIP UDP multicast**, **RMT driver**, **I²C**, **MQTT client**, **cJSON**, and a **pure-HTML + vanilla JS UI** served directly from flash.
Development happens in VS Code / PlatformIO, with unit tests under the IDF Unity framework and GitHub CI for builds.

---

## **Part II – The LumiGrid LED Node**

### Purpose

The LED Node is the reference member of the LumiGrid family—the one that paints light.
It bridges two worlds:

* precise **PWM control** for high-power “dumb” LED channels, and
* smooth **addressable LED** animation for pixel-based fixtures.

Each node can perform solo, join an ensemble, or lead as a sync master.

### Hardware at a glance

* **Controller:** ESP32-WROOM-32U
* **PWM driver:** PCA9685 (12-bit, 1 kHz) → 8 MOSFET channels
* **Addressable outputs:** 8 × level-shifted 5 V via SN74HCT245DWR
* **I²C bus:** SDA 21 / SCL 22 @ 400 kHz
* **OE / Blackout:** GPIO 25
* **ALED GPIOs:** 16, 4, 17, 18, 19, 23, 26, 27
* **Power:** 5 V bus with fuse and thermal feedback
* **Expansion slot:** 8 extra PWM lines for future servo or relay use

### Personality

Every LED Node runs the same firmware stack as its siblings, but its “brain” specializes in light rendering.
It can:

* blend complex color effects in real time,
* maintain precise phase alignment with the grid,
* enforce power and thermal limits automatically, and
* expose its full state through human-friendly APIs.

### The firmware in layers

1. **Board Init:** sets GPIO, I²C, mounts LittleFS, reads config.
2. **PWM Driver:** wraps PCA9685 with fade curves, soft-start, and OE safety.
3. **RMT Driver:** outputs WS2812 / SK6812 data streams with 100 ns precision.
4. **Effect Engine:** modular renderer supporting base + overlay, blend modes, and virtual segments.
5. **Scheduler / Cue Player:** interprets JSON timelines into real-time sequences.
6. **Sync Protocol:** keeps phase with the master clock via multicast tick/cue.
7. **REST / SSE Server:** exposes status and accepts triggers from the UI.
8. **MQTT Bridge:** optional cloud/control-room integration.

### Visual intelligence

The Effect Engine is both painter and conductor.
It hosts a library of real-time shaders in C:

| Category     | Example Effects                     | Notes                     |
| ------------ | ----------------------------------- | ------------------------- |
| **Base**     | Solid, Gradient, Chase, Twinkle     | foundational FX           |
| **Spectral** | Rainbow (palette-aware), Noise Flow | animated color fields     |
| **Organic**  | Fire, Waves                         | procedural, beat-reactive |
| **Utility**  | Blackout, Flash, SyncPulse          | cue-driven transitions    |
| **PWM FX**   | Breath, Candle, Warm-Dim            | smooth analog dimming     |

Each effect consumes a shared `effect_params_t` describing speed, intensity, colors, palette, blend, opacity, and segment range.
A power-budget module estimates current draw and automatically scales brightness to stay within hardware limits.

### Web experience

Opening the node’s IP in any browser reveals the **LumiGrid UI**:

* **Dashboard:** status, health, quick test controls.
* **Nodes:** discover peers, view RSSI and firmware.
* **Sequencer:** interactive canvas timeline with zoom and live playhead.
* **Presets:** local library, instant preview, editable JSON.
* **Schedules:** calendar view (in progress).
* **Settings:** network, MQTT, and theme preferences.

Everything is local, responsive, and accessible; the same UI scales from phone to desktop without external servers.

### Connectivity & APIs

| Endpoint                       | Description                                                   |
| ------------------------------ | ------------------------------------------------------------- |
| `GET /api/status`              | Returns node info, role, mode, uptime, heap, FPS              |
| `POST /api/config`             | Merge or overwrite configuration JSON                         |
| `GET/POST/DELETE /api/presets` | Manage stored presets                                         |
| `POST /api/trigger`            | Execute actions: `play_preset`, `set_pwm`, `blackout`, `beat` |
| `POST /api/cue`                | Schedule time-bound clips                                     |
| `GET /events`                  | Server-Sent Events stream (status, playhead, power limit)     |

The same schema works across all LumiGrid devices, so a central web dashboard or show controller can talk to dozens of nodes uniformly.

### Reliability and safety

* **Fail-safe blackout:** PCA9685 OE pin cuts power on fault or command.
* **Thermal / voltage watch:** automatic derate under stress.
* **Watchdog & diagnostics:** continuous heap and task monitoring.
* **Offline autonomy:** local schedules run even without the master.

### Developer & maker friendliness

* ESP-IDF v5 toolchain, CMake project structure.
* Firmware upgrades over USB or OTA.
* All endpoints documented; simulator for effect testing on desktop.
* Unit tests for every effect (CRC-checked frame outputs).
* Web UI open-source and editable in any HTML editor.

### Typical applications

* Interactive signage and ambient installations.
* Stage lighting with precise tempo lock.
* Architectural façades with power budgeting.
* Educational kits for embedded lighting control.
* Art projects blending light, motion, and sound.

### Vision forward

LumiGrid is evolving toward a **multi-node creative OS**:
future releases will bring adaptive color calibration, distributed audio analysis for beat detection, and a shared cloud timeline for installations spanning cities.
The LED Node is just the first spark—the foundation on which an ecosystem of intelligent, responsive light will grow.

---

**LumiGrid – A network where light, code, and rhythm move together.**

