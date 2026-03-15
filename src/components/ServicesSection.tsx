/**
 * ServicesSection — tab wizard minimalista
 * ──────────────────────────────────────────
 * Desktop : lista numerada izquierda + panel animado derecha
 * Mobile  : acordeón vertical con click
 * Soporta modo claro y oscuro automáticamente.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ── Datos ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "ui",
    number: "01",
    label: "UI Design",
    color: "#F75010",
    headline: "Interfaces que comunican y se sienten bien",
    description:
      "Diseño cada pantalla con jerarquía clara, propósito definido y una estética que refleja la identidad real del producto. No solo se ve bonito — funciona.",
    includes: [
      "Diseño de pantallas y flujos completos",
      "Componentes UI listos para desarrollo",
      "Prototipos interactivos en Figma",
      "Guías de estilo visual",
    ],
    forWho: "Startups, productos SaaS, apps móviles y web",
  },
  {
    id: "ux",
    number: "02",
    label: "UX & Experiencia",
    color: "#DB1E3F",
    headline: "Flujos que guían sin que el usuario lo note",
    description:
      "Diseño la experiencia pensando en cómo se mueve el usuario, qué necesita encontrar y cómo reducir cada punto de fricción. El resultado: productos que la gente entiende y vuelve a usar.",
    includes: [
      "Mapas de flujo y arquitectura de información",
      "Wireframes y prototipos de baja fidelidad",
      "Análisis de usabilidad y puntos de quiebre",
      "Pruebas de concepto y validación",
    ],
    forWho: "Productos con problemas de conversión o retención",
  },
  {
    id: "ds",
    number: "03",
    label: "Design Systems",
    color: "#D00952",
    headline: "La columna vertebral de tu producto digital",
    description:
      "Construyo sistemas escalables de componentes, tokens y documentación que aceleran el trabajo del equipo y garantizan consistencia en cada pantalla — sin depender de la memoria de nadie.",
    includes: [
      "Librería de componentes en Figma",
      "Tokens de diseño (colores, tipografía, espaciado)",
      "Documentación y guía de uso",
      "Handoff limpio a desarrollo",
    ],
    forWho: "Empresas SaaS que necesitan escalar sin perder consistencia",
  },
  {
    id: "escalabilidad",
    number: "04",
    label: "Escalabilidad",
    color: "#920087",
    headline: "Diseño que soporta el crecimiento",
    description:
      "Estructuro el diseño pensando en el mañana: nuevas features, cambios de dirección y equipos que crecen — sin tener que rediseñar desde cero cada vez.",
    includes: [
      "Auditoría y diagnóstico de diseño existente",
      "Arquitectura de componentes reutilizables",
      "Estrategia de design tokens",
      "Documentación para equipos en crecimiento",
    ],
    forWho: "Productos en etapa de crecimiento o con deuda de diseño acumulada",
  },
  {
    id: "branding",
    number: "05",
    label: "Branding",
    color: "#6E00A3",
    headline: "Identidades con personalidad propia",
    description:
      "Creo marcas que funcionan en cualquier contexto digital: coherentes, memorables y con un carácter visual que las diferencia de inmediato.",
    includes: [
      "Logotipo y variantes",
      "Paleta de colores y tipografía",
      "Guía de marca y usos correctos",
      "Assets digitales listos para usar",
    ],
    forWho: "Nuevas marcas o empresas que necesitan un rebranding",
  },
  {
    id: "ilustracion",
    number: "06",
    label: "Ilustración",
    color: "#FDB100",
    headline: "Ilustraciones que dan vida al producto",
    description:
      "Creo ilustraciones con carácter propio que añaden personalidad a interfaces, campañas y materiales de marca — sin verse genéricas ni sacadas de un stock.",
    includes: [
      "Ilustraciones para UI (onboarding, estados vacíos, errores)",
      "Iconografía personalizada",
      "Personajes e ilustraciones de marca",
      "Assets optimizados para web y app",
    ],
    forWho: "Marcas que buscan diferenciarse con un toque visual único",
  },
] as const;

// ── Icono geométrico por servicio (consistente con las piezas Z) ──────────────
const ServiceIcon = ({ color, id }: { color: string; id: string }) => {
  const props = { fill: "none", className: "w-full h-full", "aria-hidden": true as const };
  const icons: Record<string, JSX.Element> = {
    ui: (
      <svg viewBox="0 0 48 48" {...props}>
        <rect x="4" y="4" width="40" height="28" rx="4" stroke={color} strokeWidth="2" />
        <rect x="16" y="36" width="16" height="4" rx="2" fill={color} />
        <rect x="10" y="44" width="28" height="2" rx="1" fill={color} />
        <rect x="10" y="14" width="28" height="2" rx="1" fill={color} opacity="0.5" />
        <rect x="10" y="20" width="18" height="2" rx="1" fill={color} opacity="0.3" />
      </svg>
    ),
    ux: (
      <svg viewBox="0 0 48 48" {...props}>
        <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" />
        <path d="M16 24 C16 20 20 16 24 16 C28 16 32 20 32 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill={color} />
        <path d="M24 27 L24 32" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    ds: (
      <svg viewBox="0 0 48 48" {...props}>
        <rect x="4" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
        <rect x="26" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
        <rect x="4" y="26" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
        <rect x="26" y="26" width="18" height="18" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
      </svg>
    ),
    escalabilidad: (
      <svg viewBox="0 0 48 48" {...props}>
        <path d="M8 40 L8 28 L18 28 L18 40" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 40 L20 20 L30 20 L30 40" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M32 40 L32 12 L42 12 L42 40" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <line x1="6" y1="40" x2="44" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 22 L20 14 L30 18 L42 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" />
      </svg>
    ),
    branding: (
      <svg viewBox="0 0 48 48" {...props}>
        <path d="M24 6 L28 18 L42 18 L31 26 L35 38 L24 30 L13 38 L17 26 L6 18 L20 18 Z"
          stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    ilustracion: (
      <svg viewBox="0 0 48 48" {...props}>
        <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="2" />
        <path d="M26 22 L44 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 30 C14 26 22 28 28 34 C34 40 38 42 44 40" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="16" r="3" fill={color} opacity="0.3" />
      </svg>
    ),
  };
  return <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">{icons[id]}</div>;
};

// ── Panel de contenido (derecha en desktop) ────────────────────────────────────
const ServicePanel = ({ service }: { service: (typeof SERVICES)[number] }) => (
  <motion.div
    key={service.id}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col gap-6"
  >
    {/* Icon + headline */}
    <div className="flex items-start gap-4">
      <ServiceIcon color={service.color} id={service.id} />
      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
        {service.headline}
      </h3>
    </div>

    {/* Description */}
    <p className="text-base text-muted-foreground leading-relaxed">
      {service.description}
    </p>

    {/* Includes */}
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 mb-3">
        Qué incluye
      </p>
      <ul className="space-y-2.5">
        {service.includes.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: service.color }}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* For who */}
    <div
      className="rounded-xl px-4 py-3 border text-sm text-foreground/70 leading-relaxed"
      style={{ borderColor: `${service.color}33`, background: `${service.color}0d` }}
    >
      <span className="font-semibold" style={{ color: service.color }}>Ideal para: </span>
      {service.forWho}
    </div>

    {/* CTA */}
    <Link
      to={`/contacto?servicio=${encodeURIComponent(service.label)}`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold
                 transition-colors duration-200 w-fit"
      style={{ color: service.color }}
    >
      Cotizar este servicio
      <span aria-hidden="true" className="text-base leading-none">→</span>
    </Link>
  </motion.div>
);

// ── Componente principal ───────────────────────────────────────────────────────
const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section
      role="region"
      aria-labelledby="services-title"
      className="section-spacing bg-background"
    >
      <div className="container-portfolio">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 mb-2">
            Servicios
          </p>
          <h2
            id="services-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            ¿En qué puedo ayudarte?
          </h2>
        </motion.div>

        {/* ── DESKTOP: dos columnas ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:grid grid-cols-[38%_62%] gap-0
                     rounded-3xl border border-border overflow-hidden"
        >
          {/* Lista de servicios — izquierda */}
          <div className="bg-secondary border-r border-border py-2">
            {SERVICES.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="w-full flex items-center gap-4 px-8 py-5
                             text-left group transition-colors duration-200
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-inset focus-visible:ring-primary/40"
                  style={{ background: isActive ? `${s.color}10` : "transparent" }}
                >
                  {/* Indicador de color */}
                  <span
                    className="w-0.5 h-8 rounded-full shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? s.color : "transparent",
                      opacity: isActive ? 1 : 0,
                    }}
                    aria-hidden="true"
                  />
                  {/* Número */}
                  <span
                    className="text-xs font-bold tabular-nums transition-colors duration-200"
                    style={{ color: isActive ? s.color : "var(--muted-foreground)" }}
                  >
                    {s.number}
                  </span>
                  {/* Label */}
                  <span
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    {s.label}
                  </span>
                  {/* Flecha — solo activo */}
                  <span
                    className="ml-auto transition-all duration-200"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(-4px)",
                      color: s.color,
                    }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel de contenido — derecha */}
          <div className="bg-background p-10 min-h-[420px] flex items-start">
            <AnimatePresence mode="wait">
              <ServicePanel key={active} service={SERVICES[active]} />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── MOBILE: acordeón vertical ─────────────────────────────────── */}
        <div className="lg:hidden space-y-2">
          {SERVICES.map((s, i) => {
            const isOpen = openMobile === i;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border overflow-hidden"
                style={{ background: isOpen ? `${s.color}08` : "var(--card)" }}
              >
                {/* Header clickeable */}
                <button
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-inset focus-visible:ring-primary/40"
                >
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: s.color }}
                  >
                    {s.number}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-foreground">
                    {s.label}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2 }}
                    className="text-muted-foreground text-lg leading-none"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                {/* Contenido expandible */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-6 pt-1">
                        <ServicePanel service={s} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
