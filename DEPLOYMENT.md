# Vercel Deployment Guide

This project is a [SvelteKit](https://kit.svelte.dev/) app configured with `@sveltejs/adapter-vercel`. Vercel automatically
picks up the correct build output.

## Quick deploy via dashboard

1. Push the code to your Git provider.
2. In [vercel.com](https://vercel.com) choose **New Project**.
3. Import the repository; Vercel detects **SvelteKit** automatically.
4. Leave the defaults (`npm install`, `npm run build`).
5. Deploy.

## Deploy via CLI

```bash
npm install -g vercel
vercel --prod
```

## Environment variables

No environment variables are required.

## Useful commands

- `npm run dev` – local development server.
- `npm run build` – build for production (used by Vercel).
- `npm run preview` – preview the production build locally.

## Structure recap

```
src/app.css            # global styles
src/routes/+page.svelte  # landing page markup
src/lib/*.js           # DOM bindings and helper utilities
static/                # public assets served as-is
```

The build artifacts are generated inside `.svelte-kit/` and uploaded automatically by Vercel’s build pipeline.
