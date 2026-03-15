# A11y Checklist — Zeraus DS

> Auditoría de accesibilidad del portafolio. **No se modificó ningún estilo visual.**

---

## Estado actual (audit 2026-03-12)

### ✅ Ya implementado

| Elemento | Dónde | Detalle |
|---|---|---|
| `role="tablist/tab/tabpanel"` | `AboutTabsSection` | Navegación con teclado (←→↑↓), `aria-selected`, `aria-controls`, `aria-labelledby` |
| `role="dialog"` modal | `ProjectsSection` | `aria-modal="true"`, `aria-labelledby="modal-title"`, cierre con ESC |
| `aria-label` en links | `ProjectsSection` | "Abrir proyecto X en Behance" |
| `aria-label` en botón cerrar | `ProjectModal` | "Cerrar modal" |
| `aria-hidden="true"` en SVGs decorativos | Todo el sitio | Todos los íconos inline |
| `loading="lazy"` en imágenes | `ProjectCard` | Fuera del viewport |
| `alt` en imágenes de proyectos | `ProjectCard`, `ProjectModal` | Alt = nombre del proyecto |
| `alt` en foto de perfil | `AboutTabsSection` | `alt="Cristian Suárez"` |
| `focus-visible:ring` | Botones, tabs, links | Ring violeta/primario visible |
| `prefers-reduced-motion` | `TransitionOverlay`, `AboutTabsSection`, `ProjectsSection` | Animaciones desactivadas si el usuario lo prefiere |
| Landmarks: `<section>` + `aria-labelledby` | `ProjectsSection`, `AboutTabsSection`, `ContactSection` | Correctos |
| `<main>` landmark | Pendiente — ver abajo | — |
| `lang="es"` en `<html>` | `index.html` + `SEOHead` | Correcto |
| Un solo `<h1>` por página | Todas las páginas | Correcto |

---

### ⚠️ Pendientes / mejoras recomendadas

#### 1. Añadir `<main>` landmark en `App.tsx`
```tsx
// En AppContent, envuelve las Routes:
<main id="main-content">
  <Routes>...</Routes>
</main>
```
**Por qué:** Lectores de pantalla usan `<main>` para saltar al contenido principal.

#### 2. Skip-link (saltar al contenido)
```tsx
// En App.tsx, antes del Navbar:
<a href="#main-content"
   className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
              focus:z-[9999] focus:px-4 focus:py-2 focus:bg-background
              focus:text-foreground focus:rounded-lg focus:border focus:border-border">
  Saltar al contenido
</a>
```
**Por qué:** Usuarios de teclado pueden saltarse el navbar en cada página.

#### 3. Focus trap en modal de Proyectos
El modal cierra con ESC ✅, pero el foco no está atrapado dentro del modal.
Considera usar `@radix-ui/react-dialog` (ya instalado) en lugar del modal custom,
o añadir un focus trap manual con `tabIndex` en el primer/último elemento.

#### 4. Alt text en `LETRA_Z.jpg` en `TransitionOverlay` / `Preloader`
```tsx
// Actual:
<img src="/LETRA_Z.jpg" alt="Z" ... />
// Recomendado:
<img src="/LETRA_Z.jpg" alt="Zeraus DS" ... />
```

#### 5. Color contrast
- Verifica que el texto `text-muted-foreground` sobre `bg-secondary` cumple WCAG AA (ratio ≥ 4.5:1).
- Herramienta: https://webaim.org/resources/contrastchecker/

---

## Cómo mantener este checklist

1. Cada vez que añadas un componente nuevo, verifica:
   - ¿Tiene `alt` si tiene imágenes?
   - ¿Tiene `aria-label` si el texto del botón no es descriptivo?
   - ¿Respeta `prefers-reduced-motion`?
   - ¿Se puede operar solo con teclado?

2. Corre `npx axe-core` o usa la extensión **axe DevTools** en Chrome para auditar.

3. Usa el lector de pantalla de tu SO:
   - macOS: VoiceOver (`Cmd+F5`)
   - Windows: Narrador (`Win+Ctrl+Enter`) o NVDA (gratis)
