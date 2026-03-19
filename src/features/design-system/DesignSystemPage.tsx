import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

// ─────────────────────────────────────────────
// BRAND COLORS
// ─────────────────────────────────────────────
const ORANGE = "#FF6B2B";
const PINK   = "#E91E8C";
const PURPLE = "#7C3AED";

// ─────────────────────────────────────────────
// CIRCULAR PROGRESS
// ─────────────────────────────────────────────
const CircularProgress = ({
  value,
  description,
  uid,
}: {
  value: number;
  description: string;
  uid: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const radius = 45;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  const gradId = `circ-grad-${uid}`;

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="7" className="stroke-muted/20" />
          <motion.circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={`url(#${gradId})`} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: inView ? offset : circ }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ORANGE} />
              <stop offset="100%" stopColor={PINK} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-3xl font-bold"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center max-w-[160px] leading-relaxed">{description}</p>
    </div>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const DSHero = () => (
  <section className="container-portfolio pt-32 pb-24">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0, background: `linear-gradient(90deg, ${ORANGE}, ${PINK}, ${PURPLE})` }}
      className="h-px w-24 mb-10"
    />

    <motion.h1
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="text-6xl md:text-8xl font-bold leading-tight mb-6"
    >
      Design{" "}
      <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        System
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-16"
    >
      Creando experiencias unificadas en ecosistemas de producto complejos — sistemas que escalan sin caos.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="grid grid-cols-3 gap-8 pt-8 border-t border-border max-w-md"
    >
      {[
        { label: "ROL", value: "Design Systems Lead" },
        { label: "EXPERIENCIA", value: "5+ años" },
        { label: "PRODUCTOS", value: "6+ empresas" },
      ].map((item) => (
        <div key={item.label}>
          <p className="text-[10px] tracking-[0.18em] text-muted-foreground mb-1">{item.label}</p>
          <p className="font-semibold text-sm">{item.value}</p>
        </div>
      ))}
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────
// SHOWCASE CAROUSEL
// ─────────────────────────────────────────────
const slides = [
  { id: 0, label: "Tokens", title: "Fundamentos del Sistema", description: "Colores, tipografía y espaciado como lenguaje común entre diseño y desarrollo.", accent: `${ORANGE}, ${PINK}` },
  { id: 1, label: "Componentes", title: "Librería de Componentes", description: "Átomos reutilizables: botones, inputs, tarjetas — consistentes en todo el producto.", accent: `${PINK}, ${PURPLE}` },
  { id: 2, label: "Patrones", title: "Patrones de Interfaz", description: "Soluciones recurrentes documentadas: formularios, navegación, estados vacíos.", accent: `${PURPLE}, ${ORANGE}` },
  { id: 3, label: "Documentación", title: "Documentación Viva", description: "Cada componente con uso, variantes, DO/DON'T y código listo para desarrolladores.", accent: `${ORANGE}, ${PURPLE}` },
  { id: 4, label: "Temas", title: "Sistema de Temas", description: "Dark/Light mode a nivel de tokens — un cambio, todo el sistema se actualiza.", accent: `${PINK}, ${ORANGE}` },
  { id: 5, label: "Accesibilidad", title: "Accesibilidad por Diseño", description: "Contraste WCAG AA garantizado, navegación por teclado y aria en cada componente.", accent: `${PURPLE}, ${PINK}` },
];

const DSShowcase = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const s = slides[active];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="container-portfolio pb-28"
    >
      <div className="relative rounded-2xl border border-border overflow-hidden min-h-[400px] md:min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end"
            style={{ background: `radial-gradient(ellipse at top right, ${s.accent.split(",")[0]}18, transparent 60%)` }}
          >
            {/* Dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />
            {/* Vertical accent */}
            <div
              className="absolute top-10 left-10 w-1.5 h-14 rounded-full"
              style={{ background: `linear-gradient(180deg, ${s.accent})` }}
            />
            {/* Text */}
            <div className="relative">
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ background: `linear-gradient(90deg, ${s.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {s.label}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{s.title}</h3>
              <p className="text-muted-foreground max-w-xl">{s.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              background: i === active ? `linear-gradient(90deg, ${ORANGE}, ${PINK})` : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Tab labels */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-5">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${i === active ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────
// ATOMIC DESIGN
// ─────────────────────────────────────────────
const atomicLevels = [
  {
    name: "ÁTOMOS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <circle cx="24" cy="24" r="4" />
        <ellipse cx="24" cy="24" rx="18" ry="7" />
        <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" />
      </svg>
    ),
  },
  {
    name: "MOLÉCULAS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <circle cx="24" cy="14" r="5" />
        <circle cx="13" cy="33" r="5" />
        <circle cx="35" cy="33" r="5" />
        <line x1="24" y1="19" x2="13" y2="28" />
        <line x1="24" y1="19" x2="35" y2="28" />
        <line x1="18" y1="33" x2="30" y2="33" />
      </svg>
    ),
  },
  {
    name: "ORGANISMOS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <circle cx="12" cy="12" r="4" /><circle cx="36" cy="12" r="4" />
        <circle cx="12" cy="36" r="4" /><circle cx="36" cy="36" r="4" />
        <circle cx="24" cy="24" r="4" />
        <line x1="16" y1="12" x2="32" y2="12" /><line x1="12" y1="16" x2="12" y2="32" />
        <line x1="36" y1="16" x2="36" y2="32" /><line x1="16" y1="36" x2="32" y2="36" />
        <line x1="16" y1="20" x2="24" y2="24" /><line x1="32" y1="20" x2="24" y2="24" />
        <line x1="16" y1="28" x2="24" y2="24" /><line x1="32" y1="28" x2="24" y2="24" />
      </svg>
    ),
  },
  {
    name: "PLANTILLAS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="5" y="5" width="38" height="38" rx="3" />
        <line x1="5" y1="16" x2="43" y2="16" />
        <line x1="18" y1="16" x2="18" y2="43" />
        <rect x="22" y="21" width="16" height="7" rx="1" />
        <rect x="22" y="32" width="16" height="4" rx="1" />
      </svg>
    ),
  },
  {
    name: "PÁGINAS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="4" y="6" width="40" height="36" rx="3" />
        <line x1="4" y1="15" x2="44" y2="15" />
        <circle cx="10" cy="10.5" r="1.5" fill="currentColor" />
        <circle cx="16" cy="10.5" r="1.5" fill="currentColor" />
        <circle cx="22" cy="10.5" r="1.5" fill="currentColor" />
        <rect x="9" y="20" width="30" height="3" rx="1" />
        <rect x="9" y="27" width="20" height="2" rx="1" />
        <rect x="9" y="32" width="26" height="2" rx="1" />
        <rect x="9" y="37" width="15" height="2" rx="1" />
      </svg>
    ),
  },
];

const DSAtomicDesign = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="container-portfolio pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-border p-10 md:p-16"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "30px 30px" }}
      >
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">METODOLOGÍA</p>
          <h2 className="text-3xl md:text-4xl font-bold">Principios de Diseño Atómico</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          {atomicLevels.map((level, i) => (
            <div key={level.name} className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col items-center gap-3 px-6 py-4 group cursor-default"
              >
                <div className="text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300">
                  {level.icon}
                </div>
                <span className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground/60 group-hover:text-foreground transition-colors duration-300">
                  {level.name}
                </span>
              </motion.div>
              {i < atomicLevels.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.12 + 0.25 }}
                  className="text-muted-foreground/20 text-2xl rotate-90 md:rotate-0 my-1 md:my-0"
                >
                  ›
                </motion.span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-border">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">METODOLOGÍA</span>
          <span className="text-muted-foreground/30">/</span>
          <span className="text-xs font-medium text-muted-foreground">Arquitectura basada en componentes con Atomic Design</span>
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOUNDATIONS
// ─────────────────────────────────────────────
const colorTokens = [
  { name: "--ds-color-primary", hex: ORANGE, label: "Primary" },
  { name: "--ds-color-secondary", hex: PINK, label: "Secondary" },
  { name: "--ds-color-tertiary", hex: PURPLE, label: "Tertiary" },
  { name: "--ds-neutral-900", hex: "#0A0A0A", label: "Neutral 900" },
  { name: "--ds-neutral-700", hex: "#1A1A1A", label: "Neutral 700" },
  { name: "--ds-neutral-500", hex: "#525252", label: "Neutral 500" },
  { name: "--ds-neutral-300", hex: "#A3A3A3", label: "Neutral 300" },
  { name: "--ds-neutral-100", hex: "#F5F5F5", label: "Neutral 100" },
];

const typographyScale = [
  { name: "Display XL", size: "72px", weight: "700", class: "text-6xl font-bold", sample: "Zeraus DS" },
  { name: "Display L", size: "56px", weight: "700", class: "text-5xl font-bold", sample: "Design System" },
  { name: "Heading 1", size: "40px", weight: "700", class: "text-4xl font-bold", sample: "Componentes" },
  { name: "Heading 2", size: "32px", weight: "600", class: "text-3xl font-semibold", sample: "Fundamentos" },
  { name: "Heading 3", size: "24px", weight: "600", class: "text-2xl font-semibold", sample: "Tokens" },
  { name: "Body L", size: "18px", weight: "400", class: "text-lg", sample: "Sistemas escalables y consistentes" },
  { name: "Body", size: "16px", weight: "400", class: "text-base", sample: "Interfaz diseñada con propósito y criterio" },
  { name: "Caption", size: "12px", weight: "500", class: "text-xs font-medium tracking-widest uppercase", sample: "ETIQUETA DE COMPONENTE" },
];

const spacingTokens = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

const DSFoundations = () => {
  const [tab, setTab] = useState<"colors" | "typography" | "spacing">("colors");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>FUNDAMENTOS</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Tokens del Sistema</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          La capa más profunda — variables que conectan las decisiones de diseño con el código de forma trazable y escalable.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 bg-muted/10 p-1 rounded-lg w-fit border border-border">
          {(["colors", "typography", "spacing"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${t === tab ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "colors" ? "Colores" : t === "typography" ? "Tipografía" : "Espaciado"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "colors" && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3"
            >
              {colorTokens.map((c) => (
                <div key={c.name} className="group">
                  <div
                    className="w-full aspect-square rounded-xl mb-2 border border-white/5 group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-[10px] font-mono text-muted-foreground/70 truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground/40">{c.hex}</p>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "typography" && (
            <motion.div
              key="typography"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              {typographyScale.map((t) => (
                <div key={t.name} className="flex items-baseline gap-6 py-4 border-b border-border group">
                  <div className="w-28 shrink-0">
                    <p className="text-xs text-muted-foreground">{t.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/50">{t.size} / {t.weight}w</p>
                  </div>
                  <p className={`flex-1 truncate text-muted-foreground group-hover:text-foreground transition-colors ${t.class}`}>
                    {t.sample}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "spacing" && (
            <motion.div
              key="spacing"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {spacingTokens.map((s) => (
                <div key={s} className="flex items-center gap-5">
                  <span className="text-xs font-mono text-muted-foreground w-12 shrink-0">{s}px</span>
                  <div
                    className="h-5 rounded-md opacity-70"
                    style={{ width: s * 1.5, background: `linear-gradient(90deg, ${ORANGE}, ${PINK})` }}
                  />
                  <span className="text-[11px] font-mono text-muted-foreground/50">--ds-spacing-{s}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
const DSComponents = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>COMPONENTES</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Librería de Componentes</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Cada componente documentado con variantes, estados y guías de uso — listo para diseñadores y desarrolladores.
        </p>

        <div className="space-y-8">
          {/* Botones */}
          <div className="rounded-2xl border border-border p-8">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Botones</h3>
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}>
                Primario
              </button>
              <button className="px-6 py-2.5 rounded-lg border border-foreground text-sm font-medium hover:bg-foreground/5 transition-colors">
                Secundario
              </button>
              <button className="px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/20 transition-colors">
                Ghost
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium hover:bg-red-500/20 transition-colors">
                Destructivo
              </button>
              <button disabled className="px-6 py-2.5 rounded-lg bg-muted/10 text-muted-foreground text-sm font-medium cursor-not-allowed opacity-40">
                Desactivado
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-xs font-bold text-green-400 tracking-widest mb-2">✓ HACER</p>
                <p className="text-sm text-muted-foreground">Un solo botón primario por vista. El gradiente solo para la acción principal.</p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <p className="text-xs font-bold text-red-400 tracking-widest mb-2">✕ NO HACER</p>
                <p className="text-sm text-muted-foreground">Dos botones primarios al mismo nivel crean jerarquía ambigua y confunden al usuario.</p>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="rounded-2xl border border-border p-8">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Inputs</h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Default</label>
                <input type="text" placeholder="Escribe aquí..." readOnly
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/10 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: ORANGE }}>Focus</label>
                <input type="text" placeholder="Campo activo" readOnly
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/10 text-sm focus:outline-none"
                  style={{ border: `1px solid ${ORANGE}` }} />
              </div>
              <div>
                <label className="text-xs text-red-400 mb-1.5 block">Error</label>
                <input type="text" defaultValue="texto inválido" readOnly
                  className="w-full px-4 py-2.5 rounded-lg bg-red-500/5 text-sm focus:outline-none border border-red-500" />
                <p className="text-xs text-red-400 mt-1">Este campo es requerido</p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="rounded-2xl border border-border p-8">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Tarjetas</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border p-5 hover:border-[#FF6B2B]/40 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-lg mb-4" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }} />
                <h4 className="font-semibold mb-1">Tarjeta Base</h4>
                <p className="text-sm text-muted-foreground">Contenedor con hover state y border transition.</p>
              </div>
              <div className="rounded-xl border border-[#E91E8C]/30 bg-[#E91E8C]/5 p-5 cursor-default">
                <div className="w-8 h-8 rounded-lg mb-4" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }} />
                <h4 className="font-semibold mb-1">Tarjeta Destacada</h4>
                <p className="text-sm text-muted-foreground">Variante con acento para contenido prioritario.</p>
              </div>
              <div className="rounded-xl border border-white/5 p-5 cursor-default"
                style={{ background: `linear-gradient(135deg, ${ORANGE}15, ${PINK}08, ${PURPLE}12)` }}>
                <div className="w-8 h-8 rounded-lg mb-4" style={{ background: `linear-gradient(135deg, ${PURPLE}, ${ORANGE})` }} />
                <h4 className="font-semibold mb-1">Tarjeta Premium</h4>
                <p className="text-sm text-muted-foreground">Variante con fondo degradado para CTAs especiales.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// DOCUMENTATION
// ─────────────────────────────────────────────
const DSDocumentation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>DOCUMENTACIÓN</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Estilo de Documentación</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Estructura estandarizada para garantizar claridad entre diseño y desarrollo — sin fricción en el handoff.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="border-b border-border px-8 py-4 flex items-center gap-3 bg-muted/5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
            <span className="ml-4 text-sm text-muted-foreground font-mono">Button.docs.tsx</span>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-8">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">ESTRUCTURA</p>
              <div className="space-y-4 text-sm">
                {[
                  { k: "Nombre", v: "Button" },
                  { k: "Categoría", v: "Átomo" },
                  { k: "Versión", v: "v2.3.0" },
                  { k: "Estado", v: "Estable ✓" },
                  { k: "Accesible", v: "WCAG AA ✓" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex gap-4">
                    <span className="text-muted-foreground w-24 shrink-0">{k}</span>
                    <span className="font-mono" style={{ color: ORANGE }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">PROPS</p>
              <div className="space-y-0 text-xs font-mono">
                {[
                  { prop: "variant", type: '"primary" | "secondary" | "ghost"', def: '"primary"' },
                  { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"' },
                  { prop: "disabled", type: "boolean", def: "false" },
                  { prop: "onClick", type: "() => void", def: "—" },
                  { prop: "children", type: "ReactNode", def: "—" },
                ].map(({ prop, type, def }) => (
                  <div key={prop} className="grid grid-cols-3 gap-2 py-3 border-b border-border/40 last:border-0">
                    <span style={{ color: ORANGE }}>{prop}</span>
                    <span className="text-muted-foreground truncate">{type}</span>
                    <span className="text-muted-foreground/50">{def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// GOVERNANCE
// ─────────────────────────────────────────────
const DSGovernance = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const phases = [
    { num: "01", title: "Identificar", desc: "Se detecta una necesidad o componente recurrente en el producto." },
    { num: "02", title: "Proponer", desc: "Un diseñador documenta la propuesta con variantes y contexto de uso." },
    { num: "03", title: "Revisar", desc: "El equipo valida: accesibilidad, consistencia e impacto en el sistema." },
    { num: "04", title: "Implementar", desc: "Desarrollo implementa con los tokens del sistema y documentación lista." },
    { num: "05", title: "Publicar", desc: "Se versiona, se comunica al equipo y se actualiza la documentación viva." },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>GOBERNANZA</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo Evoluciona el Sistema</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Un sistema sin gobernanza se convierte en caos. Este proceso garantiza que cada cambio sea intencional y trazable.
        </p>

        <div className="grid md:grid-cols-5 gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-xl border border-border p-5 hover:border-[#FF6B2B]/30 transition-colors duration-300 group"
            >
              <span className="text-xs font-mono text-muted-foreground/30">{phase.num}</span>
              <div className="w-6 h-px my-3" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})` }} />
              <h3 className="font-bold mb-2">{phase.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{phase.desc}</p>
              {i < phases.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-3 z-10 text-muted-foreground/20 text-lg">›</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// IMPACT
// ─────────────────────────────────────────────
const DSImpact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const outcomes = [
    "Experiencia visual unificada en todos los productos digitales",
    "Reducción del 80% en la recreación de componentes duplicados",
    "Handoff de diseño a desarrollo sin fricción ni reprocesos",
    "Gobernanza establecida con versionado semántico y changelog",
    "Onboarding de nuevos diseñadores en días, no semanas",
  ];

  return (
    <section ref={ref} className="container-portfolio pb-32">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>IMPACTO</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Resultados e Impacto</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          El sistema transformó cómo los equipos construyen y escalan — resultados medibles en eficiencia, consistencia y calidad.
        </p>

        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <CircularProgress value={40} description="Reducción en tiempo de diseño a desarrollo" uid="m1" />
          <CircularProgress value={80} description="Menos reprocesos por inconsistencias visuales" uid="m2" />
          <CircularProgress value={90} description="Adopción del sistema por los equipos de producto" uid="m3" />
        </div>

        <div className="rounded-2xl border border-border p-8">
          <h3 className="font-bold mb-6">Resultados Adicionales</h3>
          <ul className="space-y-4">
            {outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-muted-foreground">
                <span
                  className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
                >
                  ✓
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
const DesignSystemPage = () => (
  <>
    <Helmet>
      <title>Design System — Zeraus DS</title>
      <meta name="description" content="Sistema de diseño escalable — tokens, componentes y patrones para productos digitales." />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <main>
      <DSHero />
      <DSShowcase />
      <DSAtomicDesign />
      <DSFoundations />
      <DSComponents />
      <DSDocumentation />
      <DSGovernance />
      <DSImpact />
    </main>
  </>
);

export default DesignSystemPage;
