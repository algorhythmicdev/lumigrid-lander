# LumiGrid — Landing Page

Creative lighting & signage control — landing experience for LumiGrid by **Reclame Fabriek R&D**.

## Getting started

```bash
npm install
npm run dev -- --open
```

The site runs on [SvelteKit](https://kit.svelte.dev/) with Vite. All interactive behaviour lives in `src/lib/lumigrid.js` and is wired up on the landing page via `src/lib/init-landing-page.js`.

Global styles are defined in `src/app.css`. Static assets (favicon, images) live under `static/`.

## Available scripts

- `npm run dev` &mdash; start the development server.
- `npm run build` &mdash; create a production build in `.svelte-kit`/`build`.
- `npm run preview` &mdash; preview the production build locally.

## Deploying to Vercel

The project uses `@sveltejs/adapter-vercel`. To deploy:

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In the Vercel dashboard choose **New Project** and import the repo.
3. Vercel auto-detects SvelteKit. Keep the default build command (`npm run build`) and output.
4. Deploy.

For CLI deployments:

```bash
npm install -g vercel
vercel --prod
```

No extra configuration is required beyond the provided `vercel.json`.

## Project structure

```
src/
├── app.css                 # Global design system and layout styles
├── app.html                # Document template
├── lib/
│   ├── init-landing-page.js  # Sets up DOM bindings for the landing page
│   └── lumigrid.js            # UI helpers (themes, LED preview, FX)
└── routes/
    └── +page.svelte        # Landing page markup
static/                     # Public assets served at the site root
```

## Accessibility & performance

- Background FX respects `prefers-reduced-motion` and pauses when the tab is hidden.
- Tokens and components aim for high contrast (AA+).
- Replace placeholder imagery in `static/assets/images/` as production designs evolve.
