// Cache static assets
const CACHE_NAME = 'portfolio-cache-v4';
const urlsToCache = [
    '/',
    '/css/stylesheet.css',
    '/js/analytics.js',
    '/js/projects.js',
    '/js/main.js',
    
    // Add other critical assets
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
}); 