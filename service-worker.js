const CACHE_NAME = 'app-cache-v1';
const ASSETS_TO_CACHE = [
  '/', // Página principal
  '/index.html', // Archivo HTML principal
  '/styles.css', // CSS
  '/script.js', // JS
  '/favicon.ico', // Ícono
  '/manifest.json', // Manifest
  '/icon-192x192.png', // Ícono 192x192
  '/icon-512x512.png', // Ícono 512x512
];

// Instalar el Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados correctamente');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Cache antiguo eliminado:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
