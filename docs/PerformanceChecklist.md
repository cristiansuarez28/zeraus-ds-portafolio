# Performance Checklist — Zeraus DS

> Guía de optimización de rendimiento. **No modificar layout ni animaciones.**

---

## Estado actual (audit 2026-03-12)

### ✅ Ya implementado

| Optimización | Detalle |
|---|---|
| `loading="lazy"` en imágenes de proyectos | `ProjectCard.tsx` línea 213 |
| `will-change: transform` en piezas animadas | `ProjectsSection`, `TransitionOverlay` |
| `pointer-events: none` en overlays decorativos | Sin impacto de hit-testing |
| `useReducedMotion` + condicional en animaciones | Menos trabajo de GPU si el usuario lo prefiere |
| SWC compiler (`@vitejs/plugin-react-swc`) | Build más rápido que Babel |
| `once: true` en `whileInView` | Framer Motion solo anima una vez |

---

## ⚠️ Pendientes / mejoras recomendadas

### 1. Imágenes de proyectos — formato y tamaño

Las imágenes en `/public/Projects/*.jpg` deberían convertirse a **WebP** con máximo 1200px de ancho y calidad ~75.

**Cómo hacerlo (1 vez):**
```bash
# Instala sharp-cli si no lo tienes
npm install -g sharp-cli

# Convierte todas las imágenes de proyectos
npx sharp -i public/Projects/*.jpg -o public/Projects/ --format webp --quality 75 --resize 1200
```

**Impacto esperado:** 40–60 % menos peso de imagen → página carga más rápido.

**Después del paso anterior**, actualiza las rutas en `src/projects/projects.data.ts`:
```ts
// Antes:
image: "/Projects/design-system.jpg",
// Después:
image: "/Projects/design-system.webp",
```

### 2. Fuente Inter — preload

Inter se carga con `@import` en CSS o sistema. Si usas Google Fonts, añade en `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
```
`display=swap` previene FOIT (flash of invisible text).

### 3. Script `analyze` — visualizar bundle

```bash
npm run analyze
```

Genera un reporte visual del bundle en `dist/stats.html`.
Instalación ya está en `package.json` como script `analyze`.

### 4. Code splitting — carga dinámica de Recharts

`recharts` está en `dependencies` pero no se usa visiblemente en el portafolio.
Si no lo usas, elimínalo: `npm uninstall recharts` (ahorra ~300 KB en bundle).

### 5. Lazy load de páginas con React.lazy (opcional)

```tsx
// En App.tsx — carga páginas solo cuando se navega a ellas:
const Proyectos = React.lazy(() => import("./pages/Proyectos"));
const SobreMi   = React.lazy(() => import("./pages/SobreMi"));
const Contacto  = React.lazy(() => import("./pages/Contacto"));

// Envuelve Routes con:
<React.Suspense fallback={null}>
  <Routes>...</Routes>
</React.Suspense>
```

---

## Objetivos Lighthouse (target)

| Métrica | Objetivo |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

**Cómo medir:** Chrome DevTools → Lighthouse → "Analyze page load"

---

## Comandos útiles

```bash
npm run build          # build de producción
npm run analyze        # visualiza bundle (abre stats.html)
npm run generate:og    # regenera OG images
npx playwright install chromium  # (solo 1 vez, para generate:og)
```
