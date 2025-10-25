import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const repo = process.env.BASE_PATH || '/lumigrid-lander';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build' }),
    paths: { base: repo, relative: true },
    prerender: { entries: ['*'] },
    alias: { $lib: 'src/lib' }
  }
};

export default config;
