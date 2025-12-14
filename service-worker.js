// Service Worker pour la PWA
const CACHE_NAME = 'tables-multiplication-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('⚠️ Erreur lors de la mise en cache:', err);
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Ancien cache supprimé:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner la version en cache si disponible
        if (response) {
          return response;
        }

        // Sinon, faire la requête réseau
        return fetch(event.request)
          .then(response => {
            // Vérifier la réponse
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse
            const responseToCache = response.clone();

            // Mettre en cache la nouvelle ressource
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si la requête échoue et que la ressource n'est pas en cache,
            // retourner une page offline (optionnel)
            console.log('❌ Requête échouée pour:', event.request.url);
            return new Response('Offline - Impossible de charger cette ressource');
          });
      })
  );
});

console.log('✅ Service Worker chargé');
