# 🚀 Configuración de Variables de Entorno para StreamScape

## 📋 Pasos para configurar las variables de entorno

### 1. Crear archivo de variables de entorno
\`\`\`bash
cp .env.example .env.local
\`\`\`

### 2. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a **Settings** → **API**
4. Copia los siguientes valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurar Stripe

1. Ve a [stripe.com](https://stripe.com) y crea una cuenta
2. Ve a **Developers** → **API keys**
3. Copia los siguientes valores:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
4. Para el webhook:
   - Ve a **Developers** → **Webhooks**
   - Crea un nuevo webhook apuntando a `https://tu-dominio.com/api/stripe/webhook`
   - Copia el **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 4. Generar NEXTAUTH_SECRET

Ejecuta este comando para generar un secret aleatorio:

\`\`\`bash
openssl rand -base64 32
\`\`\`

O usa este generador online: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

### 5. Verificar configuración

Ejecuta el proyecto y verifica que no hay errores:

\`\`\`bash
npm run dev
\`\`\`

## 🔒 Seguridad

- **NUNCA** subas el archivo `.env.local` a Git
- El archivo `.env.local` ya está en `.gitignore`
- Solo las variables que empiezan con `NEXT_PUBLIC_` son visibles en el frontend
- Las demás variables solo están disponibles en el servidor

## 🧪 Variables para desarrollo vs producción

### Desarrollo (local)
\`\`\`
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
\`\`\`

### Producción
\`\`\`
NEXTAUTH_URL=https://tu-dominio.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
\`\`\`

## ❓ Problemas comunes

### Error: "Missing env.NEXT_PUBLIC_SUPABASE_URL"
- Verifica que el archivo `.env.local` existe
- Verifica que la variable está escrita correctamente
- Reinicia el servidor de desarrollo

### Error de conexión a Supabase
- Verifica que la URL de Supabase es correcta
- Verifica que las claves no tienen espacios extra
- Verifica que el proyecto de Supabase está activo

### Error de Stripe
- Verifica que estás usando las claves de test (sk_test_, pk_test_)
- Para producción, cambia a las claves live (sk_live_, pk_live_)
