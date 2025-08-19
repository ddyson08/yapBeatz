const CACHE_NAME = 'yapbeatz-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './fyav.png',
  './offline.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    // Handle navigation requests
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('./offline.html')
      )
    );
  } else {
    // Handle other requests
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});