/* Splitedb service worker — keeps the app opening with no signal.
   App files: network first (so updates arrive), cached copy when offline.
   Fonts: cached on first use. Your data lives in the browser's storage, not here. */
const CACHE = 'splitedb-0.4.0';
const FONTS = 'splitedb-fonts';
const CORE = ['./', './index.html', './edb-brand.css', './manifest.webmanifest',
  './apple-touch-icon.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)); }

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await Promise.race([fetch(req), timeout(req.mode === 'navigate' ? 3500 : 6000)]);
        if (res && res.ok) cache.put(req.mode === 'navigate' ? './index.html' : req, res.clone());
        return res;
      } catch (err) {
        const hit = await cache.match(req.mode === 'navigate' ? './index.html' : req, { ignoreSearch: true });
        if (hit) return hit;
        throw err;
      }
    })());
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith((async () => {
      const cache = await caches.open(FONTS);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    })());
  }
});
