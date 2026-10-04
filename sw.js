const CACHE="carteras-v1";
const FILES=["./","./index.html","./manifest.json","./jspdf.umd.min.js",
"./icon-180.png","./icon-192.png","./icon-512.png",
"./geist-latin-400-normal.woff2","./geist-latin-500-normal.woff2","./geist-latin-600-normal.woff2","./geist-latin-700-normal.woff2",
"./geist-mono-latin-400-normal.woff2","./geist-mono-latin-500-normal.woff2","./geist-mono-latin-600-normal.woff2",
"./instrument-serif-latin-400-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
    return res}).catch(()=>caches.match("./index.html"))));
});
