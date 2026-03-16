/**
 * AboutTabsSection — Acordeón estilo Lokal
 * ─────────────────────────────────────────
 * Desktop : foto izquierda + acordeón horizontal con hover suave.
 * Mobile  : acordeón vertical con click.
 *
 * FOTO REAL → busca el comentario "FOTO REAL" y reemplaza el div por <img>.
 * COPY      → edita array TABS.
 * VELOCIDAD → cambia EASE_DURATION y EASE_FN.
 */

import { useState, useRef, useCallback, type PointerEvent as ReactPointerEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import sobreMiImg from "@/assets/sobre-mi.jpeg";

// ── Transición del acordeón ──────────────────────────────────────────────────
// Sube EASE_DURATION para más lento, baja para más rápido.
const EASE_DURATION = "0.38s";
const EASE_FN       = "cubic-bezier(0.4, 0, 0.2, 1)";   // suave, sin rebote

// ── Datos ────────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "perfil",
    label: "Perfil",
    color: "#6500AA",
    // Icono SVG inline (geométrico, estilo Lokal)
    Icon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill="currentColor" />
      </svg>
    ),
    title: "Perfil",
    summary: "Lead de Design System con +5 años diseñando productos SaaS y cualquier producto digital.",
    detail:  "Creo sistemas, interfaces y patrones que hacen el trabajo más fácil y más claro. Amante del minimalismo y de las soluciones que con poco pero con criterio se sienten premium, confiables y con intención. No diseño solo para que se vea bonito: diseño con lógica, propósito y foco en el usuario, sin sacrificar estética, porque es lo que realmente marca la diferencia. Y, si hace falta… también se le cocina.",
  },
  {
    id: "enfoque",
    label: "Enfoque",
    color: "#FDB100",
    Icon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="6" fill="currentColor" transform="rotate(45 32 32)" />
      </svg>
    ),
    title: "Enfoque",
    summary: "Experiencias intuitivas con metodología y creatividad controlada.",
    detail:  "Diseño para el hoy, pensando en el mañana: componentes claros, decisiones consistentes y handoff sin fricción.",
  },
  {
    id: "herramientas",
    label: "Herramientas",
    color: "#CB005B",
    Icon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <path d="M32 4 L60 56 H4 Z" fill="currentColor" />
      </svg>
    ),
    title: "Herramientas",
    summary: "Figma, FigJam, Notion, Illustrator y Procreate.",
    detail:  "Apoyo el proceso con IA (Claude, GPT, Copilot) para explorar y acelerar tareas sin perder criterio de diseño.",
  },
  {
    id: "hoy",
    label: "Hoy",
    color: "#FD5C05",
    Icon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <path d="M32 8 C18 8 8 18 8 32 C8 46 18 56 32 56 C46 56 56 46 56 32 C56 18 46 8 32 8Z
                 M32 16 C20 16 16 28 16 32 C16 36 20 48 32 48 C44 48 48 36 48 32 C48 28 44 16 32 16Z"
              fill="currentColor" fillRule="evenodd" />
      </svg>
    ),
    title: "Hoy",
    summary: "Hoy sigo construyendo sistemas, puliendo interfaces y dándole forma a ideas que valen la pena.",
    detail:  "Y sí, estoy abierto a camellarle a cualquier idea loca, retadora o diferente. Si tu proyecto necesita orden, claridad o un diseño con intención, camellemos y saquemos esa vuelta adelante. Hablemos y lo armamos.",
  },
] as const;

// ── Componente ────────────────────────────────────────────────────────────────
const AboutTabsSection = () => {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const tablistRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Usa la posición real del cursor para determinar qué tab está activo,
  // evitando el flicker que causan los eventos enter/leave cuando el flex
  // transition mueve los elementos bajo el cursor.
  const handlePointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!tablistRef.current) return;
    const children = tablistRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      ) {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setActive(i), 160);
        break;
      }
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  return (
    <section
      role="region"
      aria-labelledby="about-title"
      className="section-spacing bg-secondary overflow-hidden"
    >
      <div className="container-portfolio">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 mb-2">
            Acerca de mí
          </p>
          <h2
            id="about-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            Sobre mí
          </h2>
        </motion.div>

        {/* ── Main card ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border bg-background overflow-hidden
                     flex flex-col lg:flex-row
                     lg:h-[640px]"
        >

          {/* ── FOTO ─────────────────────────────────────────────────────── */}
          <div className="relative flex-none overflow-hidden
                          w-full h-72 sm:h-96
                          lg:w-[300px] xl:w-[340px] lg:h-full">
            <img
              src={sobreMiImg}
              alt="Cristian Suárez"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Label en la base */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5
                            bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Cristian Suárez
              </p>
              <p className="text-sm font-medium text-white mt-0.5">
                Design Systems · UI/UX
              </p>
            </div>
          </div>

          {/* ── ACORDEÓN ─────────────────────────────────────────────────── */}
          {/* Desktop: tiras de color que se expanden al hover              */}
          {/* Activo: fondo blanco + texto oscuro (igual que Lokal)         */}
          {/* Mobile:  secciones verticales que se expanden al click        */}
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Acerca de Cristian"
            className="flex flex-col lg:flex-row flex-1"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {TABS.map((t, i) => {
              const isActive = active === i;
              const TabIcon  = t.Icon;

              return (
                <div
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-controls={`panel-${t.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); }
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") setActive((i + 1) % TABS.length);
                    if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   setActive((i - 1 + TABS.length) % TABS.length);
                  }}
                  style={{
                    transition: reduced ? "none" : `flex ${EASE_DURATION} ${EASE_FN}`,
                    // Active → transparent (muestra el bg-background blanco del card)
                    // Inactive → color sólido de la tira
                    background: isActive ? "transparent" : t.color,
                    flex: isActive ? "4 4 0%" : "0 0 72px",
                  }}
                  className="relative cursor-pointer overflow-hidden outline-none
                             focus-visible:ring-2 focus-visible:ring-inset
                             focus-visible:ring-primary/40"
                >

                  {/* ── INACTIVE: icono outline arriba + label vertical ── */}
                  <div
                    className="absolute inset-0 flex flex-col items-start lg:items-center pointer-events-none
                               pt-3 pl-4 pb-3 lg:pt-8 lg:pl-0 lg:pb-8"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: reduced ? "none" : `opacity 0.25s ${EASE_FN}`,
                    }}
                    aria-hidden="true"
                  >
                    {/* Icono pequeño outline arriba */}
                    <div className="w-7 h-7 text-white/75 shrink-0">
                      <TabIcon />
                    </div>
                    {/* Label vertical — desktop */}
                    <span className="hidden lg:block text-white font-bold text-[14px]
                                     whitespace-nowrap tracking-[0.18em] uppercase
                                     [writing-mode:vertical-rl] rotate-180 mt-auto">
                      {t.label}
                    </span>
                    {/* Label horizontal — mobile */}
                    <span className="lg:hidden text-white font-bold text-xs
                                     uppercase tracking-widest mt-auto w-full px-5 pb-1">
                      {t.label}
                    </span>
                  </div>

                  {/* ── ACTIVE: fondo blanco, texto oscuro, icono color ── */}
                  <div
                    role="tabpanel"
                    id={`panel-${t.id}`}
                    aria-labelledby={`tab-${t.id}`}
                    className="relative z-10 h-full flex flex-col justify-between
                               p-6 sm:p-8 lg:p-10
                               min-h-[300px] lg:min-h-0 overflow-y-auto"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: reduced ? "none" : `opacity 0.35s ${EASE_FN} ${isActive ? "0.18s" : "0s"}`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Icono coloreado — arriba izquierda */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 shrink-0"
                      style={{ color: t.color }}
                      aria-hidden="true"
                    >
                      <TabIcon />
                    </div>

                    {/* Título arriba, descripción debajo — sin overflow */}
                    <div className="flex flex-col gap-3 mt-6 lg:mt-0">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <>
                            <motion.h3
                              key={`title-${t.id}`}
                              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.38, delay: 0.14 }}
                              className="text-3xl sm:text-5xl lg:text-6xl font-black
                                         text-foreground leading-[1.05]"
                            >
                              {t.title}
                            </motion.h3>

                            <motion.div
                              key={`desc-${t.id}`}
                              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.38, delay: 0.24 }}
                              className="space-y-2"
                            >
                              <p className="text-base font-semibold
                                             text-foreground/80 leading-snug">
                                {t.summary}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {t.detail}
                              </p>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutTabsSection;
