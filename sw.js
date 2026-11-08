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

/* ---- phone alerts: the server sends a small data message through Firebase; here it becomes the notification ---- */
self.addEventListener('push', function (e) {
  var j = {}; try { j = e.data ? e.data.json() : {}; } catch (x) { try { j = { data: { body: e.data.text() } }; } catch (y) {} }
  var d = (j && (j.data || j.notification)) || j || {};
  if (!d.title && !d.body) return;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    /* the app is open in front of the person: it already shows its own bell, no second notification (the "test alert" button is the one exception: the person wants to see it) */
    if (d.tag !== 'test' && cs.some(function (c) { return c.visibilityState === 'visible'; })) { cs.forEach(function (c) { try { c.postMessage({ mzpush: 'refresh' }); } catch (x) {} }); return; }
    return self.registration.showNotification(String(d.title || 'MEZBAAN'), { body: String(d.body || ''), icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: String(d.tag || 'mz'), renotify: true, data: { open: String(d.open || '') } });
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var open = (e.notification.data && e.notification.data.open) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    var c = cs.filter(function (x) { return 'focus' in x; })[0];
    if (c) { try { c.postMessage({ mzpush: 'open', open: open }); } catch (x) {} return c.focus(); }
    return self.clients.openWindow('./' + (open ? '?pn=' + encodeURIComponent(open) : ''));
  }));
});
