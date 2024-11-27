const CACHE_NAME = "secretaria-medica-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/offline.html" // Página de erro offline
];

// Instalar o Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache aberto!");
      return cache.addAll(urlsToCache); // Adicionando todos os arquivos ao cache
    })
  );
});

// Buscar recursos no cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se o recurso estiver no cache, retorna ele
      if (response) {
        return response;
      }

      // Se o recurso não estiver no cache, tenta buscar da rede
      return fetch(event.request).catch(() => {
        // Se a rede falhar, retorna o fallback de offline.html
        if (event.request.mode === "navigate") { // Se a requisição for para uma página
          return caches.match("/offline.html");
        }
      });
    })
  );
});

// Ativar e limpar caches antigos
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME]; // Manter apenas o cache atual
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Remove caches antigos
          }
        })
      );
    })
  );
});
