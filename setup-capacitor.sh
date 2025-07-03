#!/bin/bash

# Instalar dependencias necesarias
npm install @capacitor/core @capacitor/android @capacitor/cli @capacitor/splash-screen

# Crear un archivo para manejar el Service Worker
cat > public/sw.js << 'EOL'
// Este es un Service Worker mínimo para habilitar PWA
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  return self.clients.claim();
});
EOL

# Crear un script de registro de SW
cat > public/sw-register.js << 'EOL'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Service Worker registrado con éxito:', registration.scope);
    }, function(err) {
      console.log('Error al registrar el Service Worker:', err);
    });
  });
}
EOL

# Crear carpeta de recursos Android necesarios
mkdir -p android/app/src/main/res/drawable

# Construir la aplicación
echo "Construyendo la aplicación Next.js..."
npm run build

# Inicializar Capacitor
npx cap init StreamScape com.streamscape.app --web-dir=out

# Añadir plataforma Android
npx cap add android

# Copiar los archivos web actualizados a la aplicación
npx cap copy android

# Abrir el proyecto en Android Studio
echo "Para abrir el proyecto en Android Studio, ejecuta:"
echo "npx cap open android"
echo ""
echo "Luego en Android Studio, ve a Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo "El archivo APK se generará en android/app/build/outputs/apk/debug/app-debug.apk"
