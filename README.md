# CVRápido — Generador de CV online

Plataforma web para crear CVs profesionales en PDF. Gratis, sin registro, con preview en tiempo real.

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router) |
| Estilos | Tailwind CSS |
| Estado | Zustand + localStorage |
| PDF | html2pdf.js (client-side) |
| Fuentes | DM Serif Display + Plus Jakarta Sans |
| Deploy | Vercel (recomendado) |

---

## Instalación y desarrollo local

### Requisitos
- Node.js 18+
- npm 9+ (o pnpm / yarn)

### Pasos

```bash
# 1. Clonar / descomprimir el proyecto
cd cv-generator

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

---

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo en :3000
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # ESLint
```

---

## Estructura del proyecto

```
cv-generator/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.js              # Root layout (fonts, metadata global)
│   │   ├── page.js                # Landing page (/)
│   │   ├── globals.css            # Tailwind + estilos globales
│   │   ├── sitemap.js             # XML sitemap para SEO
│   │   ├── robots.js              # robots.txt
│   │   ├── not-found.js           # Página 404 personalizada
│   │   └── builder/
│   │       └── page.js            # Editor de CV (/builder)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx         # Navbar fija
│   │   │   └── Footer.jsx         # Pie de página
│   │   ├── landing/
│   │   │   ├── Hero.jsx           # Sección hero
│   │   │   ├── Benefits.jsx       # Beneficios (4 cards)
│   │   │   ├── HowItWorks.jsx     # Cómo funciona (3 pasos)
│   │   │   ├── TemplatesPreview.jsx # Preview de plantillas
│   │   │   └── CTA.jsx            # Call to action final
│   │   └── builder/
│   │       ├── BuilderClient.jsx  # Layout del editor (client)
│   │       ├── CVPreview.jsx      # Preview del CV en tiempo real
│   │       ├── PDFExportButton.jsx # Botón de descarga PDF
│   │       ├── TemplateSelector.jsx # Selector de plantilla
│   │       ├── PersonalInfoForm.jsx # Formulario datos personales
│   │       ├── ExperienceForm.jsx  # Formulario experiencia laboral
│   │       ├── EducationForm.jsx   # Formulario educación
│   │       └── SkillsForm.jsx      # Formulario habilidades (tag input)
│   │
│   ├── templates/
│   │   ├── ModernTemplate.jsx     # Plantilla: sidebar oscuro bicolor
│   │   ├── ClassicTemplate.jsx    # Plantilla: columna única formal
│   │   └── MinimalistTemplate.jsx # Plantilla: tipografía protagonista
│   │
│   ├── store/
│   │   └── useCVStore.js          # Zustand store (datos + template)
│   │
│   └── utils/
│       └── pdfExport.js           # Lógica de exportación a PDF
│
├── public/                        # Assets estáticos
├── package.json
├── tailwind.config.js
├── next.config.js
└── jsconfig.json
```

---

## Deploy en Vercel (recomendado)

```bash
# Opción A: desde CLI
npx vercel

# Opción B: desde GitHub
# 1. Subir el código a un repo
# 2. Ir a vercel.com → New Project → importar repo
# 3. Sin configuración extra necesaria — Vercel detecta Next.js automáticamente
```

No se necesitan variables de entorno para la versión básica.

---

## Personalización rápida

### Cambiar nombre del sitio
- `src/app/layout.js` → campo `metadata.title`
- `src/components/layout/Header.jsx` → texto del logo
- `src/components/layout/Footer.jsx` → copyright

### Agregar una nueva plantilla
1. Crear `src/templates/MiPlantilla.jsx` (recibe `{ data }` como prop)
2. Registrarla en `src/components/builder/CVPreview.jsx` en `TEMPLATE_MAP`
3. Agregarla al array en `src/components/builder/TemplateSelector.jsx`

### Cambiar colores de marca
- Editar `tailwind.config.js` → `theme.extend.colors`

---

## Monetización futura (ya preparado)

El proyecto está estructurado para escalar hacia:

- **Autenticación**: integrar NextAuth.js o Clerk (login con Google)
- **Plantillas premium**: agregar `isPremium: true` en el array de plantillas y mostrar modal de upgrade si el usuario no tiene plan
- **Sin marca de agua**: el PDF actual no tiene marca de agua — al agregar, mostrarla sólo en plan free
- **Anuncios**: reservar espacio en la landing (sección inferior de Benefits o CTA)
- **Base de datos**: reemplazar localStorage por Supabase / Prisma para guardar CVs por usuario

---

## Notas técnicas importantes

- **Generación de PDF**: ocurre 100% en el cliente (browser). `html2pdf.js` captura el elemento `#cv-preview` y lo convierte con `html2canvas` + `jsPDF`. La escala `2x` asegura calidad retina.

- **Preview en tiempo real**: el componente `CVPreview` recibe datos del store Zustand. Cualquier cambio en el formulario actualiza el store → re-render instantáneo del template.

- **Persistencia**: Zustand `persist` middleware guarda todo en `localStorage` con la key `cv-generator-data`. El usuario puede cerrar el browser y retomar.

- **`id="cv-preview"`**: este id está en `CVPreview.jsx`, NO dentro de las plantillas. Esto permite que `pdfExport.js` siempre encuentre el elemento correcto.

- **SEO**: la landing (`/`) está completamente indexada. El builder (`/builder`) tiene `robots: { index: false }` para evitar contenido delgado.
