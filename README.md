# LumiGrid — SvelteKit Landing

Ultra‑modern, glassy, depthy landing for creative signage makers. Truthful, simple language for all ages. Background 3D flares with safe motion, WCAG‑minded contrast, soft parallax, and interactive demos.

## Dev

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

Open http://localhost:5173

## Deploy to Vercel

```bash
pnpm i
pnpm build
npx vercel deploy --prod
```

Uses `@sveltejs/adapter-vercel` (no extra config needed).

## Structure

- `src/routes/+layout.svelte` — global FX canvas + global hooks
- `src/routes/+page.svelte` — landing content
- `src/lib/styles.css` — tokens, gradients, glass, grids, animations
- `src/lib/fx.bundle.js` — 3D flares, reveals, parallax, ripple, theme, TTS
- `src/lib/components/*` — Header, SideTimeline, Gallery, LEDDemo, ContactForm
- `static/*` — favicon, robots, sitemap, placeholder images
