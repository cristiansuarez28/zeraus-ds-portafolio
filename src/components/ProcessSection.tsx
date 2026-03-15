/**
 * ProcessSection — "Así trabajo"
 * ──────────────────────────────
 * Reemplaza los testimonios. Sin necesitar clientes previos,
 * muestra metodología y profesionalismo real.
 * Desktop : 3 columnas conectadas por línea
 * Mobile  : lista vertical con acento de color
 */

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Entiendo",
    description:
      "Antes de diseñar una sola pantalla, investigo. Entiendo el producto, quién lo usa, qué problema real hay que resolver y qué espera el negocio.",
    color: "#F75010",
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Wireframes, prototipos y sistemas visuales construidos con criterio. Cada decisión tiene un porqué — nada es decoración.",
    color: "#D00952",
  },
  {
    number: "03",
    title: "Entrego",
    description:
      "Componentes documentados, handoff limpio y listo para desarrollo. Sin fricción entre diseño y código, sin re-trabajo.",
    color: "#6E00A3",
  },
] as const;

const ProcessSection = () => (
  <section
    role="region"
    aria-labelledby="process-title"
    className="section-spacing bg-secondary overflow-hidden"
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
          Proceso
        </p>
        <h2
          id="process-title"
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
        >
          Así trabajo
        </h2>
      </motion.div>

      {/* ── Desktop: 3 columnas con línea conectora ── */}
      <div className="hidden md:grid grid-cols-3 gap-0 relative">

        {/* Línea horizontal que conecta los números */}
        <div
          className="absolute top-[22px] left-[calc(16.67%+16px)] right-[calc(16.67%+16px)]
                     h-px bg-border z-0"
          aria-hidden="true"
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col px-8 first:pl-0 last:pr-0"
          >
            {/* Número con círculo */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center
                         text-xs font-bold text-white mb-6 shrink-0"
              style={{ background: step.color }}
              aria-hidden="true"
            >
              {step.number}
            </div>

            {/* Contenido */}
            <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Mobile: lista vertical con acento de color ── */}
      <div className="md:hidden space-y-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-5 py-6 border-b border-border last:border-0"
          >
            {/* Línea vertical + número */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center
                           text-[11px] font-bold text-white shrink-0"
                style={{ background: step.color }}
                aria-hidden="true"
              >
                {step.number}
              </div>
              {/* Línea vertical conectora */}
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 w-px mt-1"
                  style={{ background: `${step.color}30` }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Texto */}
            <div className="pb-2">
              <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default ProcessSection;
