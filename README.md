# 🚀 Fabrizio Castro - Portfolio Personal

Portfolio profesional moderno construido con Angular 17+, TailwindCSS y animaciones premium.

## 📋 Características

- ✅ Angular 17+ con Standalone Components
- ✅ TailwindCSS para estilos modernos
- ✅ Nueva sintaxis de control flow (@if, @for, @defer)
- ✅ Dark/Light mode con toggle animado
- ✅ Animaciones de revelación al scroll (Intersection Observer)
- ✅ Efecto 3D Tilt en tarjetas
- ✅ Typewriter effect en hero
- ✅ Contadores animados
- ✅ Totalmente responsive
- ✅ Optimizado para AWS S3 + CloudFront

## 🎨 Paleta de Colores

- **Primario:** #6366F1 (Indigo)
- **Acento:** #06B6D4 (Cyan)
- **Fondo Oscuro:** #0F172A (Slate)
- **Fondo Claro:** #F8FAFC

## 🛠️ Instalación Local

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Angular CLI 17+

### Pasos

```bash
# 1. Clonar o navegar al proyecto
cd portafolio-web

# 2. Instalar dependencias
npm install

# 3. Servir en modo desarrollo
npm start
# o
ng serve

# 4. Abrir navegador
http://localhost:4200
```

## 📦 Build de Producción

```bash
# Build optimizado
ng build --configuration production

# O usando el script npm
npm run build:prod
```

Los archivos compilados estarán en `dist/fabrizio-castro-portfolio/`

## ☁️ Despliegue en AWS (S3 + CloudFront)

### Paso 1: Crear Bucket S3

```bash
# Crear bucket (reemplazar 'tu-dominio' con tu nombre)
aws s3 mb s3://fabriziocastro-portfolio --region us-east-1

# Configurar bucket como sitio web estático
aws s3 website s3://fabriziocastro-portfolio --index-document index.html --error-document index.html
```

### Paso 2: Política del Bucket (CORS)

Crear archivo `bucket-policy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::fabriziocastro-portfolio/*"
        }
    ]
}
```

Aplicar política:

```bash
aws s3api put-bucket-policy --bucket fabriziocastro-portfolio --policy file://bucket-policy.json
```

### Paso 3: Subir Archivos

```bash
# Subir build a S3
aws s3 sync dist/fabrizio-castro-portfolio/ s3://fabriziocastro-portfolio/ --delete

# Configurar headers para cache
aws s3 sync dist/fabrizio-castro-portfolio/ s3://fabriziocastro-portfolio/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "index.html" \
  --exclude "*.html"

# HTML files con cache corto
aws s3 sync dist/fabrizio-castro-portfolio/ s3://fabriziocastro-portfolio/ \
  --cache-control "max-age=0,no-cache,no-store,must-revalidate" \
  --exclude "*" \
  --include "*.html"
```

### Paso 4: Crear Distribución CloudFront

```bash
# Crear distribución CloudFront (ejemplo con AWS CLI)
aws cloudfront create-distribution \
  --origin-domain-name fabriziocastro-portfolio.s3.amazonaws.com \
  --default-root-object index.html \
  --no-cache-behaviors
```

O usar la consola de AWS:

1. Ir a **CloudFront** → **Create Distribution**
2. **Origin Domain:** Seleccionar el bucket S3
3. **Viewer Protocol Policy:** Redirect HTTP to HTTPS
4. **Allowed HTTP Methods:** GET, HEAD, OPTIONS
5. **Compress Objects Automatically:** Yes
6. **Default Root Object:** `index.html`
7. **Error Pages:** Configurar 404 y 403 para redirigir a index.html (SPA)

### Paso 5: Configurar Dominio Personalizado (Opcional)

Si tienes dominio propio:

```bash
# Crear zona hospedada en Route 53
aws route53 create-hosted-zone --name fabriziocastro.com --caller-reference $(date +%s)

# Crear registro ALIAS apuntando a CloudFront
# (Hacerlo desde la consola AWS por simplicidad)
```

### Paso 6: Script de Deploy Automatizado

Crear `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🏗️  Building for production..."
npm run build:prod

echo "📤  Uploading to S3..."
aws s3 sync dist/fabrizio-castro-portfolio/ s3://fabriziocastro-portfolio/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "index.html" \
  --exclude "*.html"

aws s3 sync dist/fabrizio-castro-portfolio/ s3://fabriziocastro-portfolio/ \
  --cache-control "max-age=0,no-cache,no-store,must-revalidate" \
  --exclude "*" \
  --include "*.html"

echo "🔄  Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "✅  Deployment complete!"
echo "🌐  Website URL: https://YOUR_CLOUDFRONT_DOMAIN.cloudfront.net"
```

Hacer ejecutable y usar:

```bash
chmod +x deploy.sh
./deploy.sh
```

## 📝 Personalización

### Cambiar Información Personal

Editar archivos en `src/app/components/`:

- **Hero:** `hero.component.ts` - Nombre, títulos, redes sociales
- **About:** `about.component.ts` - Descripción, estadísticas
- **Skills:** `skills.component.ts` - Tecnologías y niveles
- **Experience:** `experience.component.ts` - Experiencia laboral
- **Projects:** `projects.component.ts` - Proyectos
- **Education:** `education.component.ts` - Formación académica
- **Contact:** `contact.component.ts` - Información de contacto

### Agregar Foto de Perfil

1. Reemplazar `src/assets/images/profile.jpg` con tu foto
2. Recomendado: imagen cuadrada, 500x500px o mayor
3. El CSS ya tiene efecto circular con borde animado

### Agregar CV

1. Colocar tu CV en `src/assets/cv.pdf`
2. El botón "Descargar CV" funcionará automáticamente

### Configurar Formulario de Contacto

Por defecto usa `mailto:`. Para servicios externos:

**Formspree (Gratuito):**
1. Crear cuenta en formspree.io
2. Crear nuevo formulario, copiar endpoint
3. Reemplazar en `contact.component.ts`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**EmailJS:**
1. Crear cuenta en emailjs.com
2. Configurar servicio y plantilla
3. Integrar con SDK de EmailJS (requiere modificar el componente)

## 🔧 Estructura del Proyecto

```
src/
├── app/
│   ├── components/           # Componentes de sección
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── education/
│   │   ├── services/
│   │   ├── contact/
│   │   └── footer/
│   ├── shared/               # Componentes reutilizables
│   │   ├── loader/
│   │   ├── back-to-top/
│   │   └── animated-counter/
│   ├── directives/           # Directivas personalizadas
│   │   ├── tilt.directive.ts
│   │   └── reveal.directive.ts
│   ├── services/             # Servicios
│   │   ├── theme.service.ts
│   │   └── scroll.service.ts
│   └── app.component.ts       # Componente raíz
├── assets/
│   └── images/               # Imágenes
├── styles.scss               # Estilos globales
tailwind.config.js            # Configuración Tailwind
angular.json                  # Configuración Angular
```

## 🎯 Comandos Útiles

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run build            # Build de desarrollo
npm run build:prod       # Build de producción

# AWS Deploy
aws s3 sync dist/ s3://tu-bucket/ --delete
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎨 Temas

El sitio soporta Dark/Light mode automáticamente:
- Guarda preferencia en localStorage
- Detecta preferencia del sistema
- Transición suave entre modos

## 📄 Licencia

© 2024-2025 Fabrizio Castro Barrientos. Todos los derechos reservados.

---

**¿Preguntas o sugerencias?** Contáctame: castrobarrientosfabriziojamed@gmail.com
