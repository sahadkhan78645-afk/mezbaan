/* MEZBAAN service worker: keeps the app itself on the phone so it opens (and shows the last saved data) without internet.
   The server (Google Apps Script) is never cached here: its answers are always live. Change V when you want every phone to drop its old copy. */
var V = 'mz-v1';
var SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
function networkFirst(req, key) {
  var saved = function () { return caches.match(key || req, { ignoreSearch: true }); };
  return fetch(req).then(function (res) {
    if (res && res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(key || req, cp); }); return res; }
    return saved().then(function (hit) { return hit || res; });                    /* site answered with an error page: use the saved copy */
  }).catch(saved);
}
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin !== location.origin) return;                                       /* the server and fonts: straight to the network */
  if (r.mode === 'navigate') { e.respondWith(networkFirst(r, 'index.html')); return; }       /* newest app when online, saved copy when not */
  if (/\/config\.js$/.test(u.pathname)) { e.respondWith(networkFirst(r)); return; }
  e.respondWith(caches.match(r).then(function (hit) {                              /* icons etc: saved copy first, refreshed quietly */
    var net = fetch(r).then(function (res) { if (res && res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); } return res; }).catch(function () { return hit; });
    return hit || net;
  }));
});
