// Offline fallback for the app shell. Network-first: every request for a precached
// file goes to the network (revalidating past the browser's HTTP cache), and the
// cached copy is only used when the network request fails outright.
//
// Bump CACHE_VERSION whenever the PRECACHE list changes (files added, removed, or
// renamed) — the activate step deletes every cache that doesn't match it.
const CACHE_VERSION = 'marlay-v3';

const PRECACHE = [
  'index.html',
  'styles.css',
  'data/config.js',
  'data/season.js',
  'data/dancers.js',
  'manifest.json',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png',
  'assets/tate-logo-full.png',
  'assets/hero-bg.jpg',
  'assets/dancer-white.png',
  'assets/dancer-mark.png'
];

const scopePath = new URL(self.registration.scope).pathname;

// Cache entries are keyed by path without the ?v= query string, so a version bump
// replaces the stored copy instead of piling up one entry per version.
function cacheKeyFor(request) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(scopePath)) return null;
  let rel = url.pathname.slice(scopePath.length);
  if (request.mode === 'navigate' && (rel === '' || rel === 'index.html')) rel = 'index.html';
  return PRECACHE.includes(rel) ? new URL(rel, self.registration.scope).href : null;
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE.map(path => new Request(path, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const key = cacheKeyFor(event.request);
  if (!key) return; // fonts, Calendar API, map/calendar embeds, etc. go straight to the network

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);
    try {
      const response = await fetch(event.request, { cache: 'no-cache' });
      if (response.ok) cache.put(key, response.clone());
      return response;
    } catch (err) {
      const cached = await cache.match(key);
      if (cached) return cached;
      throw err;
    }
  })());
});
