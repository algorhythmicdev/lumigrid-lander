# LumiGrid Landing Audit

## Repository Overview
- **Tech stack**: SvelteKit 2 with the static adapter, Vite 6, Vitest, and TypeScript tooling; styling lives in `$lib/styles.css` and interactive effects in `$lib/fx.bundle.js`.【F:package.json†L1-L24】【F:src/lib/styles.css†L1-L120】【F:src/lib/fx.bundle.js†L1-L120】
- **Structure**: Global layout and FX bootstrap live in `src/routes/+layout.svelte`, the landing content resides in `src/routes/+page.svelte`, and reusable UI pieces live under `src/lib/components`.【F:src/routes/+layout.svelte†L1-L27】【F:src/routes/+page.svelte†L1-L120】【F:src/lib/components/Header.svelte†L1-L40】
- **Static contact workflow**: `ContactForm.svelte` validates input locally and opens a mailto link to `hello@lumigrid.dev`, keeping the build fully static-friendly.【F:src/lib/components/ContactForm.svelte†L1-L94】

## Tooling & Test Runs
| Command | Result |
| --- | --- |
| `npm run check` | Runs `svelte-check` via `svelte-kit sync`; treat warnings as failures.【F:package.json†L6-L14】 |
| `npm run test` | Executes Vitest in run mode. (No suites ship today, so it completes instantly.)【F:package.json†L6-L14】 |
| `npm run build` | Produces a static export in `build/` through `@sveltejs/adapter-static`.【F:package.json†L6-L14】【F:svelte.config.js†L1-L29】 |

## Frontend Components
- **Header & theme controls**: `Header.svelte` wires brand palette selection, color-scheme toggling, speech synthesis controls, and responsive navigation with inert overlays and scroll locking.【F:src/lib/components/Header.svelte†L1-L220】
- **Contact form UX**: Client-side validation enforces required fields and the 2000-character limit before launching the visitor’s email client, with accessible status messaging for success or correction prompts.【F:src/lib/components/ContactForm.svelte†L1-L120】
- **Hero timeline**: `SideTimeline.svelte`, `MeshNavigator.svelte`, and other feature modules provide the scroll-driven storytelling showcased on the landing page.【F:src/lib/components/SideTimeline.svelte†L1-L80】【F:src/lib/components/MeshNavigator.svelte†L1-L120】

## Styling & Visual Systems
- **Global token sheet**: `src/lib/styles.css` defines theme tokens, responsive spacing, glassmorphism effects, and brand variants via `[data-theme]` attributes.【F:src/lib/styles.css†L1-L240】
- **Effects runtime**: `backgroundFlares` and related helpers in `fx.bundle.js` manage canvas-based flares, section highlights, parallax, ripple effects, and speech-synthesis bindings with `prefers-reduced-motion` safeguards.【F:src/lib/fx.bundle.js†L120-L400】

## Deployment & Ops
- **GitHub Pages workflow**: `.github/workflows/pages.yml` builds on Node 20 with `npm ci`, exports the static site, and publishes it through `actions/deploy-pages`, honoring the repository subpath via `BASE_PATH`.【F:.github/workflows/pages.yml†L1-L53】
- **Static adapter config**: `svelte.config.js` enables `paths.base`, `paths.relative`, and prerenders all entries, generating build artifacts under `build/` for any static host.【F:svelte.config.js†L1-L29】
- **Docker pipeline**: The Dockerfile still supports containerized deploys (`node build` entrypoint) for environments beyond GitHub Pages, with `ali-deploy.sh` as a template for Alibaba Cloud pushes.【F:Dockerfile†L1-L24】【F:ali-deploy.sh†L1-L40】

## Recommended Follow-ups
1. **Close stylesheet brace gap** – The `.section` rule in `src/lib/styles.css` is still missing a closing brace before `.section > .container`, triggering build warnings and unpredictable CSS parsing.【F:src/lib/styles.css†L296-L315】
2. **Refresh testing story** – Add end-to-end or component-level tests now that the backend surface is gone, keeping the Vitest target meaningful.【F:package.json†L6-L14】
3. **Document speech feature** – Expose the read-aloud helper in README or UI so visitors understand the TTS control surfaced in the header.【F:README.md†L17-L23】【F:src/lib/components/Header.svelte†L1-L220】
