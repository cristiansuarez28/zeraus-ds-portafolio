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
  <section className="container-portfolio pt-28 md:pt-32 pb-20 md:pb-24">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0, background: `linear-gradient(90deg, ${ORANGE}, ${PINK}, ${PURPLE})` }}
      className="h-px w-24 mb-8 md:mb-10"
    />

    <motion.h1
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight mb-5 md:mb-6"
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
      className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-10 md:mb-14"
    >
      Creando experiencias unificadas en ecosistemas de producto complejos — sistemas que escalan sin caos.
    </motion.p>

    {/* Methodology badges */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-wrap gap-2 mb-10 md:mb-12"
    >
      {[
        { label: "Atomic Design", color: ORANGE },
        { label: "Pixel Perfect", color: PINK },
        { label: "Token-first", color: PURPLE },
        { label: "WCAG AA", color: ORANGE },
        { label: "Figma Variables", color: PINK },
        { label: "Style Dictionary", color: PURPLE },
      ].map((badge) => (
        <span
          key={badge.label}
          className="text-[11px] font-medium px-3 py-1.5 rounded-full border"
          style={{ color: badge.color, borderColor: `${badge.color}40`, background: `${badge.color}0D` }}
        >
          {badge.label}
        </span>
      ))}
    </motion.div>

    {/* Impact numbers */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border"
    >
      {[
        { num: "200+", label: "Componentes\ndocumentados" },
        { num: "500+", label: "Tokens\ndefinidos" },
        { num: "40%", label: "Reducción en\ntiempo de handoff" },
        { num: "6+", label: "Empresas\nimpactadas" },
      ].map((item) => (
        <div key={item.num}>
          <p
            className="text-3xl md:text-4xl font-bold mb-1"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {item.num}
          </p>
          <p className="text-xs text-muted-foreground leading-snug whitespace-pre-line">{item.label}</p>
        </div>
      ))}
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────
// SHOWCASE CAROUSEL — visual content per tab
// ─────────────────────────────────────────────

const SlideTokens = () => (
  <div className="grid grid-cols-2 gap-3 w-full">
    {[
      { name: "--ds-color-primary", hex: ORANGE },
      { name: "--ds-color-secondary", hex: PINK },
      { name: "--ds-color-tertiary", hex: PURPLE },
      { name: "--ds-neutral-900", hex: "#0A0A0A" },
      { name: "--ds-neutral-700", hex: "#1A1A1A" },
      { name: "--ds-neutral-500", hex: "#525252" },
    ].map((c) => (
      <div key={c.name} className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg shrink-0 border border-border" style={{ backgroundColor: c.hex }} />
        <span className="text-[10px] font-mono text-muted-foreground truncate">{c.name}</span>
      </div>
    ))}
    <div className="col-span-2 mt-1 pt-3 border-t border-border">
      <p className="text-[10px] font-mono text-muted-foreground/60">
        <span style={{ color: ORANGE }}>--ds-spacing-4</span>{" "}→ 4px &nbsp;|&nbsp;{" "}
        <span style={{ color: PINK }}>--ds-spacing-8</span>{" "}→ 8px &nbsp;|&nbsp;{" "}
        <span style={{ color: PURPLE }}>--ds-spacing-16</span>{" "}→ 16px
      </p>
    </div>
  </div>
);

const SlideComponentes = () => (
  <div className="space-y-4 w-full">
    <div className="flex flex-wrap gap-2">
      <button className="px-4 py-2 rounded-lg text-white text-xs font-medium" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}>Primario</button>
      <button className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground/80">Secundario</button>
      <button className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground">Ghost</button>
      <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium">Error</button>
    </div>
    <div className="flex gap-2">
      <input readOnly placeholder="Input default" className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted/20 text-xs text-muted-foreground focus:outline-none" />
      <input readOnly placeholder="Focus" className="flex-1 px-3 py-2 rounded-lg text-xs text-muted-foreground focus:outline-none" style={{ border: `1px solid ${ORANGE}` }} />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-lg border border-border p-3">
        <div className="w-5 h-5 rounded mb-2" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }} />
        <p className="text-xs font-semibold">Card Base</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">Hover state activo</p>
      </div>
      <div className="rounded-lg border border-border/50 p-3" style={{ background: `linear-gradient(135deg, ${ORANGE}10, ${PURPLE}08)` }}>
        <div className="w-5 h-5 rounded mb-2" style={{ background: `linear-gradient(135deg, ${PURPLE}, ${ORANGE})` }} />
        <p className="text-xs font-semibold">Card Premium</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">Fondo degradado</p>
      </div>
    </div>
  </div>
);

const SlidePatrones = () => (
  <div className="w-full space-y-2.5">
    {/* Mini navbar */}
    <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }} />
        <div className="flex gap-2">
          <div className="w-8 h-1.5 rounded bg-foreground/20" /><div className="w-8 h-1.5 rounded bg-foreground/10" /><div className="w-8 h-1.5 rounded bg-foreground/10" />
        </div>
      </div>
      <div className="w-12 h-5 rounded" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})`, opacity: 0.85 }} />
    </div>
    {/* Hero block */}
    <div className="rounded-lg border border-border bg-muted/20 px-3 py-3 space-y-2">
      <div className="w-3/4 h-3 rounded bg-foreground/20" />
      <div className="w-1/2 h-2 rounded bg-foreground/10" />
      <div className="w-24 h-5 rounded mt-2" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})`, opacity: 0.75 }} />
    </div>
    {/* Card grid */}
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-lg border border-border bg-muted/20 p-2 space-y-1.5">
          <div className="w-full h-6 rounded bg-muted/40" />
          <div className="w-3/4 h-1.5 rounded bg-foreground/15" />
          <div className="w-1/2 h-1.5 rounded bg-foreground/10" />
        </div>
      ))}
    </div>
    <p className="text-[10px] text-muted-foreground/60 font-mono">navbar · hero · card-grid · form · empty-state</p>
  </div>
);

const SlideDocumentacion = () => (
  <div className="w-full rounded-xl border border-border overflow-hidden text-xs font-mono">
    <div className="px-3 py-2 bg-muted/30 border-b border-border flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
      <span className="ml-2 text-muted-foreground/60">Button.docs.tsx</span>
    </div>
    <div className="p-4 space-y-1 text-[11px] bg-muted/10">
      <p className="text-foreground/80"><span style={{ color: PURPLE }}>interface</span> <span style={{ color: ORANGE }}>ButtonProps</span> {"{"}</p>
      <p className="pl-4 text-foreground/80"><span style={{ color: PINK }}>variant</span>: <span style={{ color: ORANGE }}>'primary'</span> | <span style={{ color: ORANGE }}>'secondary'</span> | <span style={{ color: ORANGE }}>'ghost'</span></p>
      <p className="pl-4 text-foreground/80"><span style={{ color: PINK }}>size</span>: <span style={{ color: ORANGE }}>'sm'</span> | <span style={{ color: ORANGE }}>'md'</span> | <span style={{ color: ORANGE }}>'lg'</span></p>
      <p className="pl-4 text-foreground/80"><span style={{ color: PINK }}>disabled</span>?: <span style={{ color: PURPLE }}>boolean</span></p>
      <p className="pl-4 text-foreground/80"><span style={{ color: PINK }}>onClick</span>?: <span style={{ color: PURPLE }}>() ={">"} void</span></p>
      <p className="text-foreground/80">{"}"}</p>
      <p className="mt-2 text-muted-foreground/50">{"// versión: v2.3.0 · estado: estable · WCAG AA ✓"}</p>
    </div>
  </div>
);

const SlideTemas = () => (
  <div className="w-full grid grid-cols-2 gap-3">
    {/* Dark — siempre dark, intencional */}
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="bg-[#0A0A0A] px-3 py-2 border-b border-white/10">
        <span className="text-[10px] text-white/40 font-mono">dark mode</span>
      </div>
      <div className="bg-[#0A0A0A] p-3 space-y-2">
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-4 rounded" style={{ background: ORANGE }} />
          <span className="text-[10px] font-mono text-white/50">--ds-bg: #0A0A0A</span>
        </div>
        <div className="w-full h-6 rounded bg-white/5 border border-white/10 flex items-center px-2">
          <span className="text-[10px] text-white/40">Texto claro</span>
        </div>
        <div className="w-16 h-5 rounded text-[10px] flex items-center justify-center text-white font-medium" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})` }}>CTA</div>
      </div>
    </div>
    {/* Light — siempre light, intencional */}
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="bg-[#F5F5F5] px-3 py-2 border-b border-black/10">
        <span className="text-[10px] text-black/40 font-mono">light mode</span>
      </div>
      <div className="bg-[#F5F5F5] p-3 space-y-2">
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-4 rounded" style={{ background: ORANGE }} />
          <span className="text-[10px] font-mono text-black/50">--ds-bg: #F5F5F5</span>
        </div>
        <div className="w-full h-6 rounded bg-black/5 border border-black/10 flex items-center px-2">
          <span className="text-[10px] text-black/40">Texto oscuro</span>
        </div>
        <div className="w-16 h-5 rounded text-[10px] flex items-center justify-center text-white font-medium" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})` }}>CTA</div>
      </div>
    </div>
    <p className="col-span-2 text-[10px] font-mono text-muted-foreground/60">Un cambio en el token → todo el sistema se actualiza</p>
  </div>
);

const SlideAccesibilidad = () => (
  <div className="w-full space-y-3">
    {[
      { label: "Primary / BG", ratio: "7.2:1", pass: "AAA", color: ORANGE, pct: 90 },
      { label: "Secondary / BG", ratio: "5.8:1", pass: "AA", color: PINK, pct: 72 },
      { label: "Muted text / BG", ratio: "4.6:1", pass: "AA", color: "#A3A3A3", pct: 58 },
      { label: "Disabled / BG", ratio: "2.1:1", pass: "FAIL", color: "#888", pct: 26 },
    ].map((item) => (
      <div key={item.label}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">{item.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold" style={{ color: item.color }}>{item.ratio}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.pass === "FAIL" ? "bg-red-500/15 text-red-500" : "bg-green-500/15 text-green-600"}`}>{item.pass}</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
        </div>
      </div>
    ))}
    <p className="text-[10px] text-muted-foreground/50 font-mono pt-1">WCAG 2.1 · AA = 4.5:1 · AAA = 7:1</p>
  </div>
);

const SlideAtomicDesign = () => (
  <div className="w-full">
    <div className="grid grid-cols-3 md:flex md:items-center md:justify-between gap-3 mb-4">
      {[
        { name: "Átomos", desc: "Botón, Input", colors: [ORANGE, PINK] },
        { name: "Moléculas", desc: "Search, Card", colors: [PINK, PURPLE] },
        { name: "Organismos", desc: "Navbar, Form", colors: [PURPLE, ORANGE] },
        { name: "Plantillas", desc: "Page layout", colors: [ORANGE, PINK] },
        { name: "Páginas", desc: "Home, Dash", colors: [PINK, PURPLE] },
      ].map((level, i, arr) => (
        <div key={level.name} className="flex md:flex-row items-center gap-1.5">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${level.colors[0]}20, ${level.colors[1]}20)`, color: level.colors[0] }}
            >
              {i + 1}
            </div>
            <span className="text-[9px] font-bold tracking-wider text-muted-foreground">{level.name}</span>
            <span className="text-[8px] text-muted-foreground/50 hidden md:block">{level.desc}</span>
          </div>
          {i < arr.length - 1 && <span className="text-muted-foreground/30 text-lg hidden md:block">›</span>}
        </div>
      ))}
    </div>
    <div className="border-t border-border pt-3 flex flex-wrap gap-3">
      {[
        { label: "grid", val: "8px", color: ORANGE },
        { label: "spacing", val: "4/8/16/24px", color: PINK },
        { label: "pixel perfect", val: "✓", color: PURPLE },
      ].map((t) => (
        <div key={t.label} className="text-[10px] font-mono text-muted-foreground/60">
          <span style={{ color: t.color }}>{t.label}:</span> {t.val}
        </div>
      ))}
    </div>
  </div>
);

const showcaseTabs = [
  {
    label: "Tokens",
    title: "Fundamentos del Sistema",
    description: "Variables de diseño que conectan cada decisión visual con el código — colores, tipografía y espaciado como lenguaje compartido.",
    accent: `${ORANGE}, ${PINK}`,
    content: <SlideTokens />,
  },
  {
    label: "Componentes",
    title: "Librería de Componentes",
    description: "Átomos reutilizables con variantes, estados y guías — botones, inputs y tarjetas consistentes en todo el producto.",
    accent: `${PINK}, ${PURPLE}`,
    content: <SlideComponentes />,
  },
  {
    label: "Patrones",
    title: "Patrones de Interfaz",
    description: "Soluciones recurrentes documentadas: navbar, hero, grids de cards, formularios y estados vacíos.",
    accent: `${PURPLE}, ${ORANGE}`,
    content: <SlidePatrones />,
  },
  {
    label: "Documentación",
    title: "Documentación Viva",
    description: "Cada componente con props, variantes, DO/DON'T y código listo para el handoff — sin fricción entre diseño y desarrollo.",
    accent: `${ORANGE}, ${PURPLE}`,
    content: <SlideDocumentacion />,
  },
  {
    label: "Temas",
    title: "Sistema de Temas",
    description: "Dark/Light mode gestionado 100% a nivel de token — un cambio en la variable y todo el sistema se actualiza automáticamente.",
    accent: `${PINK}, ${ORANGE}`,
    content: <SlideTemas />,
  },
  {
    label: "Accesibilidad",
    title: "Accesibilidad por Diseño",
    description: "Contraste WCAG AA verificado en cada token, navegación por teclado y roles ARIA en cada componente del sistema.",
    accent: `${PURPLE}, ${PINK}`,
    content: <SlideAccesibilidad />,
  },
  {
    label: "Atomic Design",
    title: "Arquitectura Modular",
    description: "Cinco niveles de composición — desde el átomo más simple hasta la página completa — garantizando consistencia y reutilización a escala.",
    accent: `${ORANGE}, ${PURPLE}`,
    content: <SlideAtomicDesign />,
  },
];

const DSShowcase = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const tab = showcaseTabs[active];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="container-portfolio pb-28"
    >
      <div className="rounded-2xl border border-border overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2"
            style={{
              backgroundImage: `radial-gradient(ellipse at top right, ${tab.accent.split(",")[0].trim()}14, transparent 55%), radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)`,
              backgroundSize: "auto, 28px 28px",
            }}
          >
            {/* Left: text */}
            <div className="flex flex-col justify-center p-7 md:p-12">
              <div
                className="w-1.5 h-8 rounded-full mb-5"
                style={{ background: `linear-gradient(180deg, ${tab.accent})` }}
              />
              <span
                className="text-[10px] font-bold tracking-[0.22em] uppercase mb-2"
                style={{ background: `linear-gradient(90deg, ${tab.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {tab.label}
              </span>
              <h3 className="text-xl md:text-3xl font-bold mb-3 leading-snug">{tab.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tab.description}</p>
            </div>

            {/* Right: visual content */}
            <div className="flex items-center justify-center p-5 md:p-10 border-t md:border-t-0 md:border-l border-border/40 min-h-[220px]">
              {tab.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {showcaseTabs.map((_, i) => (
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
      <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
        {showcaseTabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${i === active ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────
// OVERVIEW
// ─────────────────────────────────────────────
const DSOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>OVERVIEW</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">El Sistema detrás del Producto</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Durante más de 5 años liderando sistemas de diseño en diferentes empresas, construí y escalé la infraestructura visual que permite a los equipos de producto moverse rápido sin romper la consistencia.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Desde startups en etapa temprana hasta productos con millones de usuarios, el reto siempre es el mismo: crear un lenguaje compartido entre diseño y desarrollo que sobreviva al crecimiento del equipo y la complejidad del producto.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: "CONTEXTO", value: "Producto digital B2B/B2C con múltiples plataformas (web, mobile, desktop)" },
            { label: "EQUIPO", value: "5–20 diseñadores, 15–60 desarrolladores front-end trabajando en paralelo" },
            { label: "HERRAMIENTAS", value: "Figma (Variables + Auto Layout), Storybook, GitHub, Notion" },
            { label: "METODOLOGÍA", value: "Atomic Design · Pixel Perfect · Token-first · Accessibility-by-design" },
          ].map(({ label, value }) => (
            <div key={label} className="p-5 rounded-xl border border-border">
              <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground/60 mb-1.5">{label}</p>
              <p className="text-sm text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// THE CHALLENGE
// ─────────────────────────────────────────────
const DSChallenge = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const challenges = [
    { num: "01", title: "Fragmentación visual", desc: "Cada equipo construía componentes desde cero. El mismo botón tenía 12 variantes distintas distribuidas en el producto." },
    { num: "02", title: "Deuda de diseño acumulada", desc: "Sin una fuente de verdad, las inconsistencias crecían con cada sprint. El handoff era lento, manual y propenso a errores." },
    { num: "03", title: "Escala sin estructura", desc: "Al incorporar nuevos diseñadores o desarrolladores, no existía documentación clara. El onboarding tomaba semanas y dependía del conocimiento tribal." },
    { num: "04", title: "Dark/Light mode sin tokens", desc: "Cambiar temas requería intervención manual en cientos de archivos. No había un sistema de variables que propagara el cambio automáticamente." },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: PINK }}>THE CHALLENGE</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Los Problemas a Resolver</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Construir un Design System no es solo crear componentes bonitos — es resolver problemas organizacionales y técnicos profundos.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {challenges.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-6 rounded-xl border border-border group hover:border-[#E91E8C]/30 transition-colors duration-300"
            >
              <span className="text-5xl font-bold text-muted-foreground/8 absolute top-4 right-5 font-mono select-none">{c.num}</span>
              <div className="w-6 h-px mb-4" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }} />
              <h3 className="font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SOLUTION
// ─────────────────────────────────────────────
const DSSolution = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const solutions = [
    {
      title: "Foundation & Standards",
      color: ORANGE,
      points: [
        "Sistema de tokens con CSS custom properties + Figma Variables sincronizadas",
        "Escala tipográfica y de espaciado basada en grid de 8px (Pixel Perfect)",
        "Paleta semántica: primitivos → semánticos → componente",
      ],
    },
    {
      title: "Accesibilidad",
      color: PINK,
      points: [
        "Contraste WCAG AA verificado en cada token de color",
        "Navegación por teclado y roles ARIA en cada componente",
        "Estados: hover, focus, active, disabled, error — documentados y probados",
      ],
    },
    {
      title: "Cross-Platform Consistency",
      color: PURPLE,
      points: [
        "Tokens compartidos entre web (CSS), React Native y documentación",
        "Variables de Figma conectadas al repositorio vía Style Dictionary",
        "Dark/Light mode gestionado 100% a nivel de token — cero overrides manuales",
      ],
    },
    {
      title: "Organizational Buy-In",
      color: ORANGE,
      points: [
        "Workshops de adopción con diseñadores y desarrolladores",
        "Documentación viva en Storybook + Notion como fuente de verdad",
        "Versionado semántico (major.minor.patch) con changelog por componente",
      ],
    },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: PURPLE }}>THE SOLUTION</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo lo Resolvimos</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Un sistema con cuatro pilares que ataca los problemas desde la base — tokens, accesibilidad, consistencia entre plataformas y adopción organizacional.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-7 rounded-xl border border-border hover:border-opacity-50 transition-colors duration-300 group"
              style={{ "--accent": sol.color } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 rounded-full" style={{ background: sol.color }} />
                <h3 className="font-bold">{sol.title}</h3>
              </div>
              <ul className="space-y-3">
                {sol.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: sol.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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

const figmaTokens = [
  { collection: "Primitivos", name: "color/orange/500", value: "#FF6B2B", type: "COLOR" },
  { collection: "Primitivos", name: "color/pink/500", value: "#E91E8C", type: "COLOR" },
  { collection: "Primitivos", name: "spacing/4", value: "4px", type: "NUMBER" },
  { collection: "Semánticos", name: "color/brand/primary", value: "↳ color/orange/500", type: "ALIAS" },
  { collection: "Semánticos", name: "color/feedback/error", value: "↳ color/red/500", type: "ALIAS" },
  { collection: "Semánticos", name: "spacing/component/md", value: "↳ spacing/16", type: "ALIAS" },
  { collection: "Componente", name: "button/padding/x", value: "↳ spacing/component/md", type: "ALIAS" },
  { collection: "Componente", name: "button/color/bg", value: "↳ color/brand/primary", type: "ALIAS" },
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
  const [tab, setTab] = useState<"colors" | "figma" | "typography" | "spacing">("colors");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const typeColor: Record<string, string> = {
    COLOR: ORANGE,
    NUMBER: PURPLE,
    ALIAS: PINK,
  };

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>FUNDAMENTOS</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Tokens del Sistema</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          La capa más profunda — variables que conectan las decisiones de diseño con el código de forma trazable y escalable.
        </p>

        <div className="flex flex-wrap gap-1 mb-10 bg-muted/10 p-1 rounded-lg w-fit border border-border">
          {(["colors", "figma", "typography", "spacing"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${t === tab ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "colors" ? "Colores" : t === "figma" ? "Figma Variables" : t === "typography" ? "Tipografía" : "Espaciado"}
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

          {tab === "figma" && (
            <motion.div
              key="figma"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-2xl border border-border overflow-hidden">
                <div className="border-b border-border px-6 py-3 flex items-center gap-3 bg-muted/5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">Figma → Variables → Collections</span>
                </div>
                <div className="divide-y divide-border/50">
                  {figmaTokens.map((token, i) => (
                    <motion.div
                      key={token.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 md:px-6 py-3 text-xs font-mono hover:bg-muted/5 transition-colors"
                    >
                      {/* Mobile: stacked */}
                      <div className="flex items-start justify-between gap-2 md:hidden">
                        <div className="min-w-0">
                          <p className="text-muted-foreground/40 text-[10px] mb-0.5">{token.collection}</p>
                          <p className="text-muted-foreground truncate">{token.name}</p>
                          <p className="mt-0.5" style={{ color: typeColor[token.type] || ORANGE }}>{token.value}</p>
                        </div>
                        <span
                          className="shrink-0 px-1.5 py-0.5 rounded text-[9px] tracking-wider"
                          style={{ color: typeColor[token.type], background: `${typeColor[token.type]}15` }}
                        >
                          {token.type}
                        </span>
                      </div>
                      {/* Desktop: row */}
                      <div className="hidden md:grid grid-cols-12">
                        <span className="col-span-3 text-muted-foreground/40">{token.collection}</span>
                        <span className="col-span-4 text-muted-foreground">{token.name}</span>
                        <span className="col-span-4" style={{ color: typeColor[token.type] || ORANGE }}>{token.value}</span>
                        <span className="col-span-1 text-right">
                          <span
                            className="px-1.5 py-0.5 rounded text-[9px] tracking-wider"
                            style={{ color: typeColor[token.type], background: `${typeColor[token.type]}15` }}
                          >
                            {token.type}
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground/50 font-mono">
                * Primitivos → Semánticos → Componente. Los alias propagan cambios automáticamente a todo el sistema.
              </p>
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
// DESIGN PROCESS
// ─────────────────────────────────────────────
const DSProcess = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      num: "01",
      title: "Audit & Research",
      color: ORANGE,
      desc: "Inventario de patrones existentes, benchmarking competitivo y entrevistas con equipos de diseño y desarrollo para entender las fricciones reales.",
      tags: ["UI Audit", "Entrevistas", "Benchmarking"],
    },
    {
      num: "02",
      title: "Foundation & Principles",
      color: PINK,
      desc: "Definición de tokens de diseño: colores primitivos y semánticos, escala tipográfica, espaciado en grid de 8px y principios rectores del sistema.",
      tags: ["Tokens", "Figma Variables", "Pixel Perfect"],
    },
    {
      num: "03",
      title: "Component Development",
      color: PURPLE,
      desc: "Construcción de la librería de componentes en Figma y código — con variantes, estados, DO/DON'T y documentación técnica para handoff sin fricción.",
      tags: ["Atomic Design", "Storybook", "Accesibilidad"],
    },
    {
      num: "04",
      title: "Adoption & Governance",
      color: ORANGE,
      desc: "Onboarding del equipo, workshops de adopción, versionado semántico con changelog y gobernanza continua para garantizar la evolución ordenada del sistema.",
      tags: ["Versionado", "Workshops", "Documentación viva"],
    },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>PROCESO</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Design Process</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Cuatro fases que transforman el caos visual en un sistema coherente, mantenible y adoptado por el equipo completo.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-7 rounded-xl border border-border hover:border-opacity-50 transition-colors duration-300 group overflow-hidden"
            >
              <span
                className="absolute top-5 right-6 text-6xl font-bold font-mono select-none pointer-events-none"
                style={{ color: `${step.color}10` }}
              >
                {step.num}
              </span>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-sm font-bold font-mono"
                  style={{ color: step.color }}
                >
                  {step.num}
                </span>
                <div className="w-4 h-px" style={{ background: step.color }} />
                <h3 className="font-bold">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{step.desc}</p>
              <div className="flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{ color: step.color, background: `${step.color}15` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Results & Impact</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          El sistema transformó cómo los equipos construyen y escalan — resultados medibles en eficiencia, consistencia y calidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 mb-12 md:mb-16">
          <CircularProgress value={40} description="Reducción en tiempo de diseño a desarrollo" uid="m1" />
          <CircularProgress value={80} description="Menos reprocesos por inconsistencias visuales" uid="m2" />
          <CircularProgress value={90} description="Adopción del sistema por los equipos de producto" uid="m3" />
        </div>

        <div className="rounded-2xl border border-border p-8">
          <h3 className="font-bold mb-6">Additional Outcomes</h3>
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
      <DSOverview />
      <DSChallenge />
      <DSSolution />
      <DSFoundations />
      <DSComponents />
      <DSDocumentation />
      <DSProcess />
      <DSImpact />
    </main>
  </>
);

export default DesignSystemPage;
