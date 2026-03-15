/**
 * generate-og.mjs — Zeraus DS
 * ─────────────────────────────────────────────────────────────────────────────
 * Genera OG images (1200×630 px) usando Playwright (ya instalado en el proyecto).
 *
 * EJECUTAR:
 *   npm run generate:og
 *
 * REQUISITO (solo 1 vez):
 *   npx playwright install chromium
 *
 * RESULTADO:
 *   public/og-image.png     ← imagen por defecto (home)
 *   public/og-projects.png  ← proyectos
 *   public/og-about.png     ← sobre mí
 *   public/og-contact.png   ← contacto
 *
 * CÓMO PERSONALIZAR:
 *   1. Edita el array PAGES de abajo (title, subtitle, accentWord).
 *   2. Corre `npm run generate:og` de nuevo.
 *   3. Las imágenes se sobreescriben automáticamente en public/.
 *
 * PESO OBJETIVO: < 300 KB por imagen (calidad 85 % JPEG → ~90-150 KB típico).
 */

import { chromium }     from "@playwright/test";
import { readFileSync }  from "fs";
import { fileURLToPath } from "url";
import path              from "path";

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const publicDir  = path.resolve(__dirname, "../public");
const templatePath = path.resolve(__dirname, "og-template.html");
const templateHTML = readFileSync(templatePath, "utf-8");

// ── Variaciones por página ────────────────────────────────────────────────────
// Edita aquí para cambiar el copy de cada OG image.
const PAGES = [
  {
    output:      "og-image.png",        // archivo de salida en /public
    label:       "Design System Lead · UI Designer",
    title:       "Zeraus DS",
    accentWord:  "Design System",
    titleSuffix: "Lead & UI",
    subtitle:    "Sistemas, interfaces y productos SaaS",
  },
  {
    output:      "og-projects.png",
    label:       "Portafolio",
    title:       "Proyectos",
    accentWord:  "Seleccionados",
    titleSuffix: "",
    subtitle:    "Cases de Design System, UI/UX y productos digitales",
  },
  {
    output:      "og-about.png",
    label:       "Sobre mí",
    title:       "Cristian",
    accentWord:  "Suarez",
    titleSuffix: "",
    subtitle:    "Lead de Design System · +5 años en SaaS y UI",
  },
  {
    output:      "og-contact.png",
    label:       "Contacto",
    title:       "Hablemos",
    accentWord:  "con amor",
    titleSuffix: "",
    subtitle:    "¿Tienes un proyecto en mente? Me encantaría escucharte.",
  },
];

// ── Runner ────────────────────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  await page.setViewportSize({ width: 1200, height: 630 });

  for (const p of PAGES) {
    // Inyecta el copy dinámico en la plantilla HTML
    let html = templateHTML
      .replace(/id="og-label">[^<]*/, `id="og-label">${p.label}`)
      .replace(/id="og-title-accent">[^<]*/, `id="og-title-accent">${p.accentWord}`)
      .replace(/id="og-subtitle">[^<]*/, `id="og-subtitle">${p.subtitle}`);

    // Reemplaza la primera línea del título con el valor de `title`
    html = html.replace(
      /(<h1[^>]*>)\s*([^<]+)<br/,
      `$1 ${p.title} —<br`
    );
    if (p.titleSuffix) {
      html = html.replace(/Lead &amp; UI/, p.titleSuffix);
    } else {
      // Quita la tercera línea si no hay suffix
      html = html.replace(/<br\/>\s*<\/h1>/, "</h1>");
    }

    await page.setContent(html, { waitUntil: "networkidle" });

    const outPath = path.join(publicDir, p.output);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`✓ ${p.output}`);
  }

  await browser.close();
  console.log("\n✅ OG images generadas en /public");
})();
