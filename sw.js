const CACHE_NAME = "streamscape-v1.0.0"
const urlsToCache = [
  "/",
  "/index.html",
  "/signup.html",
  "/login.html",
  "/dashboard.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// Instalar Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...")
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Archivos en caché")
        return cache.addAll(urlsToCache)
      })
      .then(() => {
        console.log("Service Worker: Instalación completa")
        return self.skipWaiting()
      }),
  )
})

// Activar Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activando...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Eliminando caché antigua", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activación completa")
        return self.clients.claim()
      }),
  )
})

// Interceptar peticiones
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Devolver desde caché si existe
      if (response) {
        return response
      }

      // Clonar la petición
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Verificar si es una respuesta válida
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clonar la respuesta
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Fallback para páginas offline
          if (event.request.destination === "document") {
            return caches.match("/index.html")
          }
        })
    }),
  )
})

// Manejar mensajes del cliente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

// Notificaciones push (para futuras implementaciones)
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push recibido")

  const options = {
    body: event.data ? event.data.text() : "Nueva notificación de StreamScape",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver",
        icon: "/icon-192x192.png",
      },
      {
        action: "close",
        title: "Cerrar",
        icon: "/icon-192x192.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("StreamScape", options))
})

// Manejar clics en notificaciones
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Clic en notificación")

  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/dashboard.html"))
  }
})
