# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar StreamScape en Vercel paso a paso.

## Prerrequisitos

- Cuenta de GitHub
- Cuenta de Vercel (gratis)
- Proyecto configurado localmente

## Paso 1: Preparar el repositorio

### 1.1 Crear repositorio en GitHub

\`\`\`bash
# Inicializar git (si no lo has hecho)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: StreamScape app"

# Conectar con GitHub (reemplaza con tu usuario y repo)
git remote add origin https://github.com/tu-usuario/streamscape.git

# Subir código
git push -u origin main
\`\`\`

### 1.2 Verificar archivos importantes

Asegúrate de tener estos archivos:
- ✅ `package.json`
- ✅ `next.config.mjs`
- ✅ `.env.example`
- ✅ `.gitignore`

## Paso 2: Configurar Vercel

### 2.1 Conectar con GitHub

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign up" o "Login"
3. Conecta con tu cuenta de GitHub
4. Autoriza a Vercel

### 2.2 Importar proyecto

1. En el dashboard de Vercel, haz clic en "New Project"
2. Busca tu repositorio "streamscape"
3. Haz clic en "Import"

### 2.3 Configurar el proyecto

\`\`\`
Project Name: streamscape
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
\`\`\`

## Paso 3: Variables de entorno

### 3.1 En Vercel Dashboard

1. Ve a tu proyecto → Settings → Environment Variables
2. Agrega cada variable:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL = tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY = tu_clave_aqui
SUPABASE_SERVICE_ROLE_KEY = tu_clave_servicio_aqui
STRIPE_SECRET_KEY = tu_stripe_secret_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = tu_stripe_public_aqui
STRIPE_WEBHOOK_SECRET = tu_webhook_secret_aqui
NEXTAUTH_SECRET = tu_nextauth_secret_aqui
NEXTAUTH_URL = https://tu-app.vercel.app
\`\`\`

### 3.2 Generar NEXTAUTH_SECRET

\`\`\`bash
# En tu terminal local
openssl rand -base64 32
\`\`\`

## Paso 4: Configurar servicios externos

### 4.1 Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings → API
4. Copia URL y claves
5. Ejecuta los scripts SQL en SQL Editor

### 4.2 Stripe

1. Ve a [stripe.com](https://stripe.com)
2. Crea cuenta o inicia sesión
3. Ve a Developers → API keys
4. Copia las claves
5. Configura webhook: `https://tu-app.vercel.app/api/stripe/webhook`

## Paso 5: Desplegar

### 5.1 Primer despliegue

1. En Vercel, haz clic en "Deploy"
2. Espera a que termine el build
3. ¡Tu app estará en línea!

### 5.2 Despliegues automáticos

Cada vez que hagas push a GitHub, Vercel desplegará automáticamente:

\`\`\`bash
# Hacer cambios
git add .
git commit -m "Update: descripción del cambio"
git push

# Vercel desplegará automáticamente
\`\`\`

## Paso 6: Configuración post-despliegue

### 6.1 Actualizar NEXTAUTH_URL

1. Copia tu URL de Vercel (ej: `https://streamscape-abc123.vercel.app`)
2. Actualiza la variable `NEXTAUTH_URL` en Vercel
3. Redespliega

### 6.2 Configurar dominio personalizado (opcional)

1. En Vercel → Settings → Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones

## Paso 7: Verificar funcionamiento

### 7.1 Checklist de pruebas

- ✅ Página principal carga correctamente
- ✅ Registro de usuarios funciona
- ✅ Login funciona
- ✅ Dashboard es accesible
- ✅ PWA se puede instalar
- ✅ Pagos funcionan (modo test)

### 7.2 Monitoreo

- Ve a Vercel → Functions para ver logs
- Ve a Vercel → Analytics para métricas
- Configura alertas si es necesario

## 🎉 ¡Listo!

Tu aplicación StreamScape ya está en línea y funcionando en Vercel.

## Comandos útiles

\`\`\`bash
# Ver logs en tiempo real
vercel logs

# Desplegar manualmente
vercel --prod

# Ver información del proyecto
vercel ls
\`\`\`

## Solución de problemas

### Build falla
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel

### Variables de entorno
- Asegúrate de que todas las variables estén configuradas
- Verifica que no haya espacios extra

### 404 en rutas
- Verifica que `next.config.mjs` esté configurado correctamente
- Asegúrate de que las rutas existan en `/app/`
