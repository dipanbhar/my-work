var cacheName = 'my-pwa-app' + Math.random();
// var cached_urls = [
//     'index.html',
//     './css/style.css',
//     './css/bootstrap.css',
//     './css/navbar.css',
//     './tpl/list.tpl',
//     './tpl/add.tpl',
//     './tpl/contact.tpl',
//     './tpl/aboutus.tpl',
//     './js/utils.js',
//     './js/lib/jquery.min.js',
//     './js/lib/bootstrap.bundle.js'

// ];
var cached_urls = ['./',
                  './assets/img',
                  './assets/img/portfolio',
                  './css'];
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
