/**
 * SEOHead — Zeraus DS
 * ─────────────────────────────────────────────────────────────
 * Componente de SEO premium para Vite + React (react-helmet-async).
 *
 * USO BÁSICO:
 *   <SEOHead
 *     title="Zeraus DS – Design System Lead"
 *     description="Portafolio de Cristian Suarez…"
 *     image="/og-image.png"
 *     url="https://zerausds.com/"
 *   />
 *
 * CAMPOS DISPONIBLES:
 *   title       → <title> + OG + Twitter (reemplaza el default)
 *   description → meta description + OG + Twitter
 *   image       → OG image + Twitter image  (usa ruta absoluta o /og-image.png)
 *   url         → canonical + og:url
 *   type        → og:type  (default: "website")
 *   keywords    → array de strings → <meta name="keywords">
 *   noindex     → true para páginas que NO deben indexarse (ej: 404)
 *
 * AGREGAR NUEVA PÁGINA SEO-READY:
 *   1. Importa SEOHead en tu página.
 *   2. Añade <SEOHead title="..." description="..." url="https://zerausds.com/tu-ruta" />.
 *   3. Listo — todas las meta tags se inyectan automáticamente.
 */

import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  BASE_URL,
  DEFAULT_IMG,
  THEME_COLOR,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  SOCIAL_LINKS,
} from "@/lib/config";

// ── JSON-LD Person (Google Rich Results) ────────────────────────────────────
const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cristian Suarez",
  jobTitle: "Lead Design System Designer",
  url: BASE_URL,
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.behance,
  ],
  description:
    "Lead de Design System con +5 años de experiencia en productos SaaS y diseño UI.",
  knowsAbout: [
    "Design Systems",
    "UI Design",
    "SaaS",
    "Web Design",
    "Component Libraries",
  ],
  image: DEFAULT_IMG,
};

// ── Props ────────────────────────────────────────────────────────────────────
interface SEOHeadProps {
  title?:       string;
  description?: string;
  image?:       string;
  url?:         string;
  type?:        string;
  keywords?:    string[];
  noindex?:     boolean;
}

// ── Componente ───────────────────────────────────────────────────────────────
const SEOHead = ({
  title       = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image       = DEFAULT_IMG,
  url         = BASE_URL,
  type        = "website",
  keywords    = DEFAULT_KEYWORDS,
  noindex     = false,
}: SEOHeadProps) => {
  // Si la imagen es relativa la hace absoluta
  const absoluteImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;
  const keywordsStr   = keywords.join(", ");

  return (
    <Helmet>
      {/* ── META BÁSICA ─────────────────────────────────────────────── */}
      <html lang="es" />
      <title>{title}</title>
      <meta name="description"  content={description} />
      <meta name="keywords"     content={keywordsStr} />
      <meta name="author"       content="Cristian Suarez" />
      <meta name="theme-color"  content={THEME_COLOR} />
      <meta name="robots"       content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical"     href={url} />

      {/* ── OPEN GRAPH (LinkedIn, Facebook, WhatsApp) ───────────────── */}
      {/* Cambia og:image por una imagen 1200×630 px para mejor preview  */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content={type} />
      <meta property="og:image"       content={absoluteImage} />
      <meta property="og:url"         content={url} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="es_ES" />

      {/* ── TWITTER CARDS ───────────────────────────────────────────── */}
      {/* Cambia twitter:site/@zerausds por tu handle real si tienes     */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={absoluteImage} />

      {/* ── JSON-LD: Person (Google Rich Results) ───────────────────── */}
      {/* Google usa esto para mostrar tu perfil en resultados          */}
      <script type="application/ld+json">
        {JSON.stringify(PERSON_JSONLD)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
