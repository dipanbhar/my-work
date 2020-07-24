//self.addEventListener('fetch', function(event) {});
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
        caches.open('my-pwa-store').then(function (cache) {
            return cache.addAll(cached_urls);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            console.log("response -- ",response);
            console.log("e.request -- ",e.request);
            return response || fetch(e.request);
        })
    );
});
