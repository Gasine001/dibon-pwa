const dataCacheName = "pwa-dibon-data";
const cacheName = "pwa-dibon";
//let cacheName = "my-first-pwa";
//let filesToCache = ["/", "/index.html", "/css/style.css", "/js/main.js"];
const filesToCache = [
    "/",
    "/index.html",
    "/index1.html",
    "/icon.png",
    "/pages",
    "/favicons",
    "/images",
    "/css",
    "/js",
    "/video",
    "/manifest.json",
    "/package-lock.json",
    "/package.json",
    "/sw.js",
   
  ];


  //install the service worker to cache 
/**/self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

//Activate and delete Old Cache
/**/self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activate");
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log("[ServiceWorker] Removing old cache", key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

//Fetch Cache to serve when offline

/**/self.addEventListener("fetch", function (e) {
  console.log("[Service Worker] Fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
  
/* Start the service worker and cache all of the app's content
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
}); */

/* Serve cached content when offline
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});*/ 