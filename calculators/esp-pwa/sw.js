const CACHE="esp-calc-v3";
const SHELL=["./esp.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-192.png","./icons/maskable-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res&&res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return res}).catch(()=>e.request.mode==="navigate"?caches.match("./esp.html"):undefined)));
});
