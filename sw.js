const CACHE="vamos-v3";const FILES=["./","./index.html","./manifest.json","./lessons.json"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// Сначала сеть (чтобы новые уроки приходили сразу), кэш — если нет интернета
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request.url.split("?")[0],cp));return r}).catch(()=>caches.match(e.request.url.split("?")[0]).then(r=>r||caches.match("./index.html"))))});
