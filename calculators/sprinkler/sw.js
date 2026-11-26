const CACHE="sprinkler-v1";
const SHELL=["./", "./index.html", "./manifest.webmanifest", "../esp-pwa/icons/icon-192.png", "../esp-pwa/icons/icon-512.png", "../esp-pwa/icons/maskable-192.png", "../esp-pwa/icons/maskable-512.png", "../esp-pwa/icons/apple-touch-icon.png"];
const MEDIA=/\.(mp4|m4v|webm|mov|ogv|mp3|m4a|aac|wav|ogg)(\?.*)?$/i;
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)))});
self.addEventListener("message",e=>{if(e.data==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.indexOf("sprinkler-v")===0&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET")return; const url=new URL(e.request.url); if(url.origin!==location.origin||MEDIA.test(url.pathname))return; e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return res}).catch(()=>e.request.mode==="navigate"?caches.match("./index.html"):undefined))); });
