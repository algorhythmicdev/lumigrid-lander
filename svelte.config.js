import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.BASE_PATH || '/lumigrid-lander';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build'
      // If you ever need SPA fallback, uncomment the next line:
      // fallback: 'index.html'
    }),
    paths: {
      base: isCI ? repo : '',
      relative: true
    },
    prerender: {
      entries: ['*']
    },
    alias: {
      $lib: 'src/lib'
    }
  }
};

export default config;
