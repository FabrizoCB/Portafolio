# 🚀 Despliegue en Netlify

## Pasos para subir tu portfolio

### Opción 1: Drag & Drop (Más fácil)

1. Ejecuta el build local:
```bash
npm run build -- --configuration production
```

2. Ve a [Netlify Drop](https://app.netlify.com/drop)

3. Arrastra la carpeta `dist/fabrizio-castro-portfolio` al área de drop

4. ¡Listo! Tu sitio estará online en segundos

### Opción 2: Conexión Git (Recomendado)

1. Sube tu código a GitHub:
```bash
git init
git add .
git commit -m "Portfolio listo para despliegue"
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main
```

2. Ve a [Netlify](https://app.netlify.com/) → "Add new site" → "Import an existing project"

3. Selecciona tu repositorio de GitHub

4. Configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/fabrizio-castro-portfolio`

5. Click "Deploy site"

## Configuración del sitio

### Configurar dominio personalizado (opcional)
1. En Netlify: Site settings → Domain management
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de DNS

### Habilitar HTTPS
- Netlify automáticamente habilita HTTPS con Let's Encrypt
- No requiere configuración adicional

## Verificación pre-despliegue

✅ Build exitoso localmente
✅ Sin errores de compilación
✅ Todas las imágenes en `src/assets/images/`
✅ Archivo `netlify.toml` configurado
✅ `angular.json` con outputPath correcto

## Solución de problemas

### Error 404 al refrescar
El archivo `netlify.toml` ya incluye las redirecciones SPA necesarias.

### Imágenes no cargan
Verifica que las imágenes estén en:
- `src/assets/images/profile-photo.png`
- `src/assets/images/projects/` (para proyectos)

### GSAP no funciona
Asegúrate de instalar la dependencia:
```bash
npm install gsap --save
```

## Estructura del proyecto

```
portafolio web/
├── dist/                           # Build de producción
│   └── fabrizio-castro-portfolio/  # ← Esta carpeta se sube
├── src/
│   ├── app/
│   │   ├── components/            # Componentes Angular
│   │   ├── services/              # Servicios (GSAP, Scroll, Theme)
│   │   └── directives/            # Directivas personalizadas
│   ├── assets/
│   │   └── images/                # Imágenes del portfolio
│   └── styles.scss                # Estilos globales
├── angular.json                   # Configuración Angular
├── netlify.toml                   # Configuración Netlify
└── package.json                   # Dependencias
```

## Checklist antes de deploy

- [ ] Foto de perfil actualizada
- [ ] Links de LinkedIn y GitHub correctos
- [ ] Textos revisados sin errores
- [ ] Experiencia laboral actualizada
- [ ] Proyectos agregados (si aplica)
- [ ] Build local exitoso (`npm run build`)
- [ ] Sitio funciona en `http://localhost:4200`

## Recursos

- [Netlify Docs](https://docs.netlify.com/)
- [Angular Deployment](https://angular.io/guide/deployment)

---

💡 **Tip:** Usa la opción 2 (Git) para despliegues automáticos cada vez que hagas push al repositorio.
