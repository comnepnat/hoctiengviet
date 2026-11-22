const CACHE_NAME = 'bi-bo-v5';
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
  './js/data/fairytales.js',
  './js/data/fairytalesExtra.js',
  './js/data/parentTips.js',
  './js/illustrations/art.js',
  './js/services/storage.js',
  './js/services/audio.js',
  './js/services/voice.js',
  './js/services/intent.js',
  './js/views/home.js',
  './js/views/cards.js',
  './js/views/listenGame.js',
  './js/views/stories.js',
  './js/views/fairytales.js',
  './js/views/parents.js',
  './assets/icon.svg',
  './assets/images/mascot-bear.jpg',
  './assets/images/mascot-sleepy.jpg',
  './assets/images/scene-morning.jpg',
  './assets/images/scene-park.jpg',
  './assets/images/scene-mealtime.jpg',
  './assets/images/scene-bedtime.jpg',
  './assets/images/fairy-cay-khe.jpg',
  './assets/images/fairy-chu-cuoi.jpg',
  './assets/images/fairy-tho-rua.jpg',
  './assets/images/fairy-cu-cai.jpg',
  './assets/images/fairy-tam-cam.jpg',
  './assets/images/fairy-ba-chu-heo.jpg',
  './assets/images/fairy-banh-chung.jpg',
  './assets/images/fairy-cay-tre.jpg',
  './assets/images/fairy-hoa-cuc-trang.jpg',
  './assets/images/fairy-thanh-giong.svg',
  './assets/images/fairy-dua-hau.svg',
  './assets/images/fairy-khan-do.svg',
  './assets/images/fairy-vit-con.svg',
  './assets/images/fairy-meo-di-hia.svg',
  './assets/images/fairy-bach-tuyet.svg',
  './assets/images/fairy-kien-ve-sau.svg'
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
