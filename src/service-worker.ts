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
  const url = new URL(event.request.url);
  if (event.request.method === 'GET' && url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(
        (response) =>
          response ||
          fetch(event.request)
            .then((networkResponse) => {
              const copy = networkResponse.clone();
              caches.open(CACHE).then((cache) => cache.put(event.request, copy));
              return networkResponse;
            })
            .catch(() =>
              caches.match(`${location.origin}${(self as any).base || ''}/offline.html`)
            )
      )
    );
  }
});
