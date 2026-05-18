const CACHE_NAME = 'bloom-buddies-v1';
const ASSETS_TO_CACHE = [
    '/',
    'index.html',
    'programmer.html',
    'promo.html',
    'user.html',
    'css/style.css',
    'js/app.js',
    'data.json',
    'manifest.json',
    'assets/images/lily.jpg',
    'assets/images/tulip.jpg',
    'assets/images/heart.jpg',
    'assets/images/orchids.jpg',
    'assets/images/peonies.jpg',
    'assets/audio/lily.mp3',
    'assets/audio/tulip.mp3',
    'assets/audio/heart.mp3',
    'assets/audio/orchids.mp3',
    'assets/audio/peonies.mp3',
    'assets/icons/icon-192.png',
    'assets/icons/icon-512.png'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app assets...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
    self.skipWaiting();
});
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
    );
});