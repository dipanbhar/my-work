var cacheName = 'my-pwa-app' + Math.random();
var cached_urls = [
    'index.html',
    './css/styles.css',
    './index.js',
    './js/lib/jquery-3.1.1.min.js',
    './js/lib/bootstrap.bundle.min.js',
    './js/lib/jquery.easing.min.js',
    './js/lib/jquery.magnific-popup.min.js',
    './js/scripts.js',
    './assets/img/portfolio/thumbnails/1.jpg',
    './assets/img/portfolio/thumbnails/2.jpg',
    './assets/img/portfolio/thumbnails/3.jpg',
    './assets/img/portfolio/thumbnails/4.jpg',
    './assets/img/portfolio/thumbnails/5.jpg',
    './assets/img/portfolio/thumbnails/6.jpg',
    './manifest.webmanifest',
    './assets/img/favicon.ico'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(cached_urls);
        }).then(function () { self.skipWaiting() })
    );
});

self.addEventListener('activate', function (e) {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

});

self.addEventListener('fetch', function (e) {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener('push', function (event) {
    var promiseChain = self.registration.showNotification('Hello, World.');
});
