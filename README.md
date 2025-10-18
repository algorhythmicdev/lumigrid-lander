# LumiGrid — Landing Page

Creative lighting & signage control — end-user friendly landing.
Developed by **Reclame Fabriek R&D**.

## Live demo locally

```bash
# any static server works; example with Python
python3 -m http.server 3000
# then open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a new Git repo.
2. In the Vercel dashboard, **New Project** → Import your repo.
3. Framework preset: **Other** (static).
4. Build & Output: (leave empty). Vercel serves `/index.html` via `vercel.json` routes.

Or via CLI:

```bash
npm i -g vercel
vercel deploy --prod
```

## Files

- `index.html` — the page
- `css/lumigrid.css` — design system: tokens, glass, gradients, grids, animations
- `js/lumigrid.js` — FX: 3D flares, reveals, parallax, timeline spy, LED helpers
- `assets/images/*.svg` — placeholders for screenshots/photos
- `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`
- `vercel.json` — static routing + caching headers

## Notes

- Background FX respects `prefers-reduced-motion` and pauses on hidden tabs.
- All text maintains high contrast against backgrounds (AAA-leaning).
- Replace placeholder images with real screenshots/photos as you iterate.
