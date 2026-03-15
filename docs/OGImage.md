# OG Images — Zeraus DS

> Guía para generar y mantener las imágenes de Open Graph (preview en redes sociales).

---

## Qué es una OG image

Cuando compartes un link de tu portafolio en LinkedIn, WhatsApp o Twitter, aparece una tarjeta con imagen. Esa imagen es el OG image (1200 × 630 px).

---

## Imágenes generadas

| Archivo | Usado en |
|---|---|
| `/public/og-image.png` | Home (`/`) — imagen por defecto |
| `/public/og-projects.png` | Página Proyectos (`/proyectos`) |
| `/public/og-about.png` | Sobre mí (`/sobre-mi`) |
| `/public/og-contact.png` | Contacto (`/contacto`) |

---

## Cómo generar / regenerar las imágenes

### Paso 1 — Instalar Chromium (solo la primera vez)
```bash
npx playwright install chromium
```

### Paso 2 — Generar todas las imágenes
```bash
npm run generate:og
```

Las imágenes se guardan automáticamente en `/public/`.

---

## Cómo cambiar el copy

Edita el array `PAGES` en `scripts/generate-og.mjs`:

```js
const PAGES = [
  {
    output:      "og-image.png",
    label:       "Design System Lead · UI Designer",  // ← texto pequeño arriba
    title:       "Zeraus DS",                          // ← título grande
    accentWord:  "Design System",                      // ← palabra con gradiente
    titleSuffix: "Lead & UI",                          // ← tercera línea (o "" para omitir)
    subtitle:    "Sistemas, interfaces y productos SaaS", // ← bajada
  },
  // ... más páginas
];
```

Luego corre `npm run generate:og` de nuevo.

---

## Cómo cambiar el diseño visual

Edita `scripts/og-template.html`:
- **Colores** → variables CSS en `:root { --accent-1, --accent-2, --accent-3 }`
- **Tipografía** → propiedad `font-family` en `body`
- **Logo** → `.logo-z` (actualmente es la letra Z en marca de agua)
- **Franja de color izquierda** → `.stripe { background: linear-gradient(...) }`

---

## Cómo añadir una nueva página con su OG image

1. Añade una entrada en `PAGES` dentro de `scripts/generate-og.mjs`
2. Corre `npm run generate:og`
3. En `SEOHead.tsx` de esa página, pasa el prop `image`:
```tsx
<SEOHead
  title="Mi Nueva Página — Zeraus DS"
  image="/og-mi-pagina.png"
  url="https://zerausds.com/mi-pagina"
/>
```

---

## Peso objetivo

- **< 300 KB** por imagen (PNG)
- Para reducir más: en `scripts/generate-og.mjs` cambia `type: "png"` a `type: "jpeg"` y añade `quality: 85`
