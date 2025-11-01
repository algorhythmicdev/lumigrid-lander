/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

const CACHE = `lg-v${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  const req = event.request;
  const url = new URL(req.url);
  
  // Ignore range requests and cross-origin requests
  if (req.headers.get('range') || url.origin !== location.origin) {
    return;
  }
  
  if (req.method === 'GET') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          // Only cache 200 OK responses (not 206 partial content)
          if (res.status === 200) {
            const cache = await caches.open(CACHE);
            cache.put(req, res.clone());
          }
          return res;
        } catch (e) {
          const match = await caches.match(req);
          if (match) return match;
          // Fallback to offline page
          const offline = await caches.match(`${location.origin}${(self as any).base || ''}/offline.html`);
          if (offline) return offline;
          throw e;
        }
      })()
    );
  }
});
