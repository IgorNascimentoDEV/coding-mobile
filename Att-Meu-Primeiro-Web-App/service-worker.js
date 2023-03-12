// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "Cofee";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([

      './index.html',

      './products.html',

      './css/styles.css',

      './js/scripts.js',

      './assets/img/128.png',
      './assets/img/144.png',
      './assets/img/152.png',
      './assets/img/167.png',
      './assets/img/172.png',
      './assets/img/180.png',
      './assets/img/192.png',
      './assets/img/196.png',
      './assets/img/256.png',
      './assets/img/512.png',
      './assets/img/bg.jpg',
      './assets/favicon.ico',
      './assets/img/cafe-organico.png',
      './assets/img/platancao-cafe.png',
      './assets/img/intro.webp',
      './assets/img/products-01.jpg',
      './assets/img/products-03.jpg',

    ]))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});