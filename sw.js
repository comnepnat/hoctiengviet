const CACHE_NAME = 'bi-bo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles/tokens.css',
  './styles/base.css',
  './styles/components.css',
  './js/app.js',
  './js/data/curriculum.js',
  './js/data/stories.js',
  './js/data/parentTips.js',
  './js/illustrations/art.js',
  './js/services/storage.js',
  './js/services/audio.js',
  './js/services/voice.js',
  './js/views/home.js',
  './js/views/cards.js',
  './js/views/listenGame.js',
  './js/views/stories.js',
  './js/views/parents.js',
  './assets/icon.svg',
  './assets/images/mascot-bear.jpg',
  './assets/images/mascot-sleepy.jpg',
  './assets/images/scene-morning.jpg',
  './assets/images/scene-park.jpg',
  './assets/images/scene-mealtime.jpg',
  './assets/images/scene-bedtime.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
