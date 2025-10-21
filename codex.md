# LumiGrid Landing Audit

## Repository Overview
- **Tech stack**: SvelteKit 2 with the Node adapter, Vite 6, Vitest, and TypeScript tooling; styling is handcrafted CSS fed through `$lib/styles.css` and interactive effects are orchestrated via `$lib/fx.bundle.js`.【F:package.json†L1-L21】【F:src/lib/styles.css†L1-L120】【F:src/lib/fx.bundle.js†L1-L120】
- **Structure**: Global layout and FX bootstrap live in `src/routes/+layout.svelte`, the landing content resides in `src/routes/+page.svelte`, and the only backend surface is the `/api/contact` endpoint under `src/routes/api/contact`.【F:src/routes/+layout.svelte†L1-L27】【F:src/routes/+page.svelte†L1-L120】【F:src/routes/api/contact/+server.js†L1-L77】
- **Docs alignment**: README instructions for setup, testing, and Cloud Run deployment match the project scripts and Docker/Cloud Build assets present in the repo.【F:README.md†L1-L56】【F:Dockerfile†L1-L24】【F:cloudbuild.yaml†L1-L12】

## Tooling & Test Runs
| Command | Result |
| --- | --- |
| `npm run check` | Passed (svelte-check clean).【0918c9†L1-L6】【bea63f†L1-L4】【1206b2†L1-L1】 |
| `npm run test` | Passed (15 Vitest assertions).【fe78a3†L1-L7】【3a599e†L1-L8】 |
| `npm run build` | Succeeds but emits CSS syntax warnings from esbuild due to unmatched braces in `src/lib/styles.css`.【17739e†L1-L6】【ccebc0†L1-L14】【19b754†L1-L18】 |

## Backend: `/api/contact`
- **Normalization pipeline**: `normalizePayload` trims strings, lowercases emails, enforces a 2000-character message ceiling, records a honeypot field, and rate-limits by fill duration. The returned metadata includes the computed `startedAt` and `fillDurationMs` when available.【F:src/routes/api/contact/validation.js†L1-L47】
- **Spam defenses**: Honeypot hits and sub-`MIN_FILL_DURATION_MS` submissions are flagged and produce `429` responses with console warnings, mirroring README claims about abuse defenses.【F:src/routes/api/contact/validation.js†L27-L35】【F:src/routes/api/contact/+server.js†L16-L32】【F:README.md†L29-L43】
- **Webhook forwarding**: Successful payloads are augmented with receipt metadata and optionally forwarded to the webhook configured via `CONTACT_WEBHOOK_URL`/`CONTACT_WEBHOOK`, with robust error handling and logging on failures.【F:src/routes/api/contact/+server.js†L34-L76】
- **Test coverage**: Vitest suites cover JSON parsing failures, validation errors, spam handling, webhook happy path, and webhook failures; environment mutations are sandboxed per test.【F:src/routes/api/contact/server.test.js†L1-L110】

### Backend Gaps & Risks
- **Validation feedback leak**: When the backend rejects a long message (`>2000` chars) it returns `{ error: 'Validation failed.', details: { message: 'Please keep your message under 2000 characters.' } }`, but the UI only surfaces the generic `error` string and discards `details`. Users therefore get no hint about the length limit despite the server sending an actionable reason.【F:src/routes/api/contact/validation.js†L15-L24】【F:src/lib/components/ContactForm.svelte†L39-L75】
- **Static-only hosting incompatibility**: The top-level layout opts into `prerender = true`, which works for Node/SSR deployments but would break contact form submissions on purely static hosts because the server endpoint would disappear. This should be documented or guarded via adapter-specific configuration.【F:src/routes/+layout.js†L1-L1】【F:README.md†L15-L28】

## Frontend Components
- **Header & theme controls**: `Header.svelte` wires brand palette selection and color-scheme toggling through `bindBrandSelect`/`bindThemeToggle`, handles responsive navigation with inert overlays, and restores body scroll on teardown.【F:src/lib/components/Header.svelte†L1-L120】
- **Side timeline**: `SideTimeline.svelte` normalizes the section list, synchronizes active sections via the `timelineSpy` observer, and reflects the active icon/label in an accessible header cluster.【F:src/lib/components/SideTimeline.svelte†L1-L80】
- **Mesh Navigator depth effect**: `MeshNavigator.svelte` animates depth based on scroll proximity unless `prefers-reduced-motion` is set, respecting media query changes at runtime.【F:src/lib/components/MeshNavigator.svelte†L1-L120】
- **Contact form UX**: Client-side validation checks for empty fields and basic email structure, posts JSON with the honeypot + timestamp, and resets on success. Errors revert the `note` banner but, as noted, do not relay backend field-specific details such as the 2000-character cap.【F:src/lib/components/ContactForm.svelte†L1-L90】

### Frontend Gaps & Risks
- **Missing max-length enforcement**: The `<textarea>` lacks a `maxlength` attribute mirroring the server’s 2000-character ceiling. Combined with the generic error handling above, users can enter arbitrarily long text and only see “Validation failed.” after submission.【F:src/lib/components/ContactForm.svelte†L55-L74】【F:src/routes/api/contact/validation.js†L15-L24】
- **Narrative FX gap**: The FX bundle exposes helpers for speech synthesis (`bindTTS`) and section flares, but no component currently invokes `bindTTS`, so the advertised “text-to-speech” helper described in comments/docs never surfaces in the UI.【F:src/lib/fx.bundle.js†L200-L288】【F:src/lib/fx.js†L1-L2】【F:README.md†L46-L53】

## Styling & Visual Systems
- **Global token sheet**: `src/lib/styles.css` defines theme tokens, responsive spacing, glassmorphism effects, and brand variants via `[data-theme]` attributes, providing the base for every component.【F:src/lib/styles.css†L1-L240】
- **Critical syntax bug**: The `.section` rule at line 296 is missing its closing brace before `.section > .container`, which causes the rest of the stylesheet to be parsed incorrectly and triggers esbuild warnings during `npm run build`. This can lead to selectors silently ignored by browsers.【F:src/lib/styles.css†L296-L315】【ccebc0†L1-L14】
- **Effects runtime**: `backgroundFlares` and `sectionFlares` read CSS custom properties to repaint the canvas and orbit highlights when sections come into view, honoring `prefers-reduced-motion` and color scheme changes.【F:src/lib/fx.bundle.js†L120-L400】

## Deployment & Ops
- **Docker pipeline**: Multi-stage Dockerfile installs dev dependencies for the build, copies the compiled SvelteKit output into a slim runtime image, and launches via `node build`. Cloud Build config wraps the image build/push with substitution-driven naming.【F:Dockerfile†L1-L24】【F:cloudbuild.yaml†L1-L12】
- **Runtime footprint**: The Node adapter output (`build/`) includes server and client bundles ready for Cloud Run; no runtime dependencies beyond Node 20 are declared, aligning with the minimal `package.json` contents.【F:build/index.js†L1-L120】【F:package.json†L1-L21】

## Recommended Fixes & Follow-ups
1. **Repair stylesheet braces** – close the `.section` block in `src/lib/styles.css` to silence the production build warnings and restore predictable styling for downstream selectors.【F:src/lib/styles.css†L296-L315】【ccebc0†L1-L14】
2. **Surface validation details** – update the contact form to honor the 2000-character limit locally (e.g., `maxlength` + client-side messaging) and propagate backend `details` responses so users see specific guidance when validation fails.【F:src/lib/components/ContactForm.svelte†L55-L74】【F:src/routes/api/contact/validation.js†L15-L24】
3. **Clarify dynamic hosting requirement** – note in docs (or adjust adapters) that the contact endpoint requires a server runtime despite global prerendering, preventing static hosting misconfigurations.【F:src/routes/+layout.js†L1-L1】【F:README.md†L15-L43】
4. **Decide on TTS helper** – either integrate `bindTTS` into a component (exposing the read-aloud control) or remove it to avoid dead code and mismatched documentation claims.【F:src/lib/fx.bundle.js†L200-L288】【F:README.md†L46-L53】
