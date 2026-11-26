/* site update detector, version 0.3. No caching, no fetch handler. */
const V="0.3";
self.addEventListener("install",()=>{});
self.addEventListener("message",e=>{if(e.data==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});
