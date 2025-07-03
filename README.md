# StreamScape - Virtual Dating App

Una aplicación de citas virtual moderna con chat en tiempo real, videollamadas y sistema de suscripciones.

## 🚀 Características

- ✅ Autenticación con Supabase
- ✅ Chat en tiempo real
- ✅ Videollamadas WebRTC
- ✅ Sistema de suscripciones con Stripe
- ✅ PWA (Progressive Web App)
- ✅ Responsive design
- ✅ Dashboard interactivo

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Pagos**: Stripe
- **Deployment**: Vercel

## 📦 Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <tu-repositorio>
cd streamscape
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita `.env.local` con tus claves reales.

4. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en Vercel
3. Despliega automáticamente

## 📱 PWA

La aplicación es una PWA completa:
- Instalable en dispositivos móviles
- Funciona offline
- Notificaciones push

## 🔧 Configuración

### Supabase
1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta los scripts SQL en `/scripts/`
3. Configura las variables de entorno

### Stripe
1. Crea una cuenta en [stripe.com](https://stripe.com)
2. Configura los productos y precios
3. Configura webhooks para `/api/stripe/webhook`

## 📄 Licencia

MIT License
