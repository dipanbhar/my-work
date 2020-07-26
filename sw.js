//self.addEventListener('fetch', function(event) {});
var cacheName = 'my-pwa-app' + Math.random();
var cached_urls = [
    './index.html',
    './tpl',
    './css/style.css',
    './css/bootstrap.css',
    './css/navbar.css',
    './tpl/list.tpl',
    './tpl/add.tpl',
    './tpl/contact.tpl',
    './tpl/aboutus.tpl',
    './js/utils.js',
    './js/lib/jquery.min.js',
    './js/lib/bootstrap.bundle.js'

];
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(cached_urls);
        })
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

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         caches.match(e.request).then(function (response) {
//             console.log("response -- ", response);
//             console.log("e.request -- ", e.request);
//             return response || fetch(e.request);
//         })
//     );
// });

self.addEventListener('fetch',function(e) {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(function (err) {
        caches.match(e.request)

    }));
});

self.addEventListener('push', function (event) {
    // if (event.data) {
    //     console.log('This push event has data: ', event.data.text());
    // } else {
    //     console.log('This push event has no data.');
    // }
    Notification.requestPermission().then(function (result) {
        console.log(result);
        const promiseChain = self.registration.showNotification('Hello, World.');

        event.waitUntil(promiseChain);
    });

});
