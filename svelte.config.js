import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
const repo = process.env.BASE_PATH || '/lumigrid-lander';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build' }),
    paths: { base: dev ? '' : repo, relative: true },
    prerender: { 
      entries: ['/'],
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404 errors for removed routes
        if (path.endsWith('/cases') || path.endsWith('/contact')) {
          return;
        }
        throw new Error(message);
      }
    },
    alias: { $lib: 'src/lib' }
  }
};

export default config;
