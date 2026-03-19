import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";

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
    <div ref={ref} className="flex flex-col items-center gap-3 md:gap-5">
      <div className="relative w-20 h-20 md:w-36 md:h-36">
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
            className="text-lg md:text-3xl font-bold"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground text-center max-w-[120px] md:max-w-[160px] leading-relaxed">{description}</p>
    </div>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const DSHero = () => (
  <section className="container-portfolio pt-28 md:pt-32 pb-20 md:pb-24">
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
      {["Atomic Design", "Pixel Perfect", "Token-first", "WCAG AA", "Figma Variables", "Style Dictionary"].map((badge) => (
        <span
          key={badge}
          className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground/70 border border-border"
        >
          {badge}
        </span>
      ))}
    </motion.div>

    {/* Project context tag */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.38 }}
      className="flex flex-wrap items-center gap-2 mb-6"
    >
      <span className="text-xs font-mono text-muted-foreground/50">Caso de estudio principal →</span>
      <span
        className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground/70 border border-border"
      >
        Auditbrain
      </span>
      <span className="text-xs text-muted-foreground/40 font-mono">Suite de productos · construido desde cero · 2 años</span>
    </motion.div>

    {/* Brand divider — same as Index.tsx separator */}
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0 }}
      className="flex h-[3px] w-full overflow-hidden rounded-full my-8"
      aria-hidden="true"
    >
      <div className="flex-[2]" style={{ background: "#FDB100" }} />
      <div className="flex-[3]" style={{ background: "#F75010" }} />
      <div className="flex-[3]" style={{ background: "#D00952" }} />
      <div className="flex-[2]" style={{ background: "#6E00A3" }} />
    </motion.div>

    {/* Impact numbers */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-6"
    >
      {[
        { num: "200+", label: "Componentes\ndocumentados" },
        { num: "500+", label: "Tokens\ndefinidos" },
        { num: "40%", label: "Reducción en\ntiempo de handoff" },
        { num: "2 años", label: "Construcción\ndesde cero" },
      ].map((item) => (
        <div key={item.num}>
          <p className="text-3xl md:text-4xl font-bold mb-1 text-foreground">
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
        <span className="text-xs font-mono text-muted-foreground truncate">{c.name}</span>
      </div>
    ))}
    <div className="col-span-2 mt-1 pt-3 border-t border-border">
      <p className="text-xs font-mono text-muted-foreground/60">
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
        <p className="text-xs text-muted-foreground mt-0.5">Hover state activo</p>
      </div>
      <div className="rounded-lg border border-border/50 p-3" style={{ background: `linear-gradient(135deg, ${ORANGE}10, ${PURPLE}08)` }}>
        <div className="w-5 h-5 rounded mb-2" style={{ background: `linear-gradient(135deg, ${PURPLE}, ${ORANGE})` }} />
        <p className="text-xs font-semibold">Card Premium</p>
        <p className="text-xs text-muted-foreground mt-0.5">Fondo degradado</p>
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
    <p className="text-xs text-muted-foreground/60 font-mono">navbar · hero · card-grid · form · empty-state</p>
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
    <div className="p-4 space-y-1 text-xs bg-muted/10">
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
        <span className="text-xs text-white/40 font-mono">dark mode</span>
      </div>
      <div className="bg-[#0A0A0A] p-3 space-y-2">
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-4 rounded" style={{ background: ORANGE }} />
          <span className="text-xs font-mono text-white/50">--ds-bg: #0A0A0A</span>
        </div>
        <div className="w-full h-6 rounded bg-white/5 border border-white/10 flex items-center px-2">
          <span className="text-xs text-white/40">Texto claro</span>
        </div>
        <div className="w-16 h-6 rounded text-xs flex items-center justify-center text-white font-medium" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})` }}>CTA</div>
      </div>
    </div>
    {/* Light — siempre light, intencional */}
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="bg-[#F5F5F5] px-3 py-2 border-b border-black/10">
        <span className="text-xs text-black/40 font-mono">light mode</span>
      </div>
      <div className="bg-[#F5F5F5] p-3 space-y-2">
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-4 rounded" style={{ background: ORANGE }} />
          <span className="text-xs font-mono text-black/50">--ds-bg: #F5F5F5</span>
        </div>
        <div className="w-full h-6 rounded bg-black/5 border border-black/10 flex items-center px-2">
          <span className="text-xs text-black/40">Texto oscuro</span>
        </div>
        <div className="w-16 h-6 rounded text-xs flex items-center justify-center text-white font-medium" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${PINK})` }}>CTA</div>
      </div>
    </div>
    <p className="col-span-2 text-xs font-mono text-muted-foreground/60">Un cambio en el token → todo el sistema se actualiza</p>
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
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.ratio}</span>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${item.pass === "FAIL" ? "bg-red-500/15 text-red-500" : "bg-green-500/15 text-green-600"}`}>{item.pass}</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
        </div>
      </div>
    ))}
    <p className="text-xs text-muted-foreground/50 font-mono pt-1">WCAG 2.1 · AA = 4.5:1 · AAA = 7:1</p>
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
            <span className="text-xs font-bold tracking-wider text-muted-foreground">{level.name}</span>
            <span className="text-xs text-muted-foreground/50 hidden md:block">{level.desc}</span>
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
        <div key={t.label} className="text-xs font-mono text-muted-foreground/60">
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -400) {
                setActive((prev) => Math.min(prev + 1, showcaseTabs.length - 1));
              } else if (info.offset.x > 50 || info.velocity.x > 400) {
                setActive((prev) => Math.max(prev - 1, 0));
              }
            }}
            className="grid md:grid-cols-2 cursor-grab active:cursor-grabbing"
            style={{
              backgroundImage: `radial-gradient(ellipse at top right, ${tab.accent.split(",")[0].trim()}14, transparent 55%), radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)`,
              backgroundSize: "auto, 28px 28px",
            }}
          >
            {/* Left: text */}
            <div className="flex flex-col justify-center p-7 lg:p-12">
              <div
                className="w-1.5 h-8 rounded-full mb-5"
                style={{ background: `linear-gradient(180deg, ${tab.accent})` }}
              />
              <span
                className="text-xs font-bold tracking-[0.22em] uppercase mb-2"
                style={{ background: `linear-gradient(90deg, ${tab.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {tab.label}
              </span>
              <h3 className="text-xl md:text-3xl font-bold mb-3 leading-snug">{tab.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tab.description}</p>
            </div>

            {/* Right: visual content */}
            <div className="flex items-center justify-center p-5 lg:p-10 border-t md:border-t-0 md:border-l border-border/40 min-h-[220px]">
              {tab.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots — liquid stretch effect via layoutId */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {showcaseTabs.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative flex items-center justify-center p-2 -m-2"
          >
            {i === active ? (
              <motion.div
                layoutId="showcase-active-dot"
                className="h-2 rounded-full"
                style={{ width: 24, background: `linear-gradient(90deg, ${tab.accent})` }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            ) : (
              <div className="w-2 h-2 rounded-full bg-foreground/20" />
            )}
          </button>
        ))}
      </div>

      {/* Tab labels */}
      <div className="overflow-x-auto mt-5 pb-1">
        <div className="flex items-center justify-start md:justify-center gap-5 w-max md:w-full mx-auto px-1">
          {showcaseTabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${i === active ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">OVERVIEW</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">El Sistema detrás de Auditbrain</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Auditbrain es una suite de productos de auditoría empresarial. Cuando llegué, cada módulo tenía su propio estilo visual — sin tokens, sin componentes compartidos, sin documentación. El equipo de desarrollo duplicaba trabajo en cada sprint.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En 2 años construí el sistema de diseño desde cero: arquitectura de tokens, librería de componentes en Figma y código, documentación viva y un proceso de gobernanza que permitió al equipo escalar sin perder consistencia.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: "EMPRESA", value: "Auditbrain — suite de productos de auditoría empresarial" },
            { label: "TIMELINE", value: "2 años · sistema construido desde cero · entrega continua por sprints" },
            { label: "HERRAMIENTAS", value: "Figma (Variables + Auto Layout), Storybook, Style Dictionary, GitHub, Notion" },
            { label: "METODOLOGÍA", value: "Atomic Design · Pixel Perfect · Token-first · Accessibility-by-design" },
          ].map(({ label, value }) => (
            <div key={label} className="p-5 rounded-xl border border-border">
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground/60 mb-1.5">{label}</p>
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
    { num: "01", title: "4 módulos, 4 identidades visuales", desc: "Auditbrain tenía 4 módulos principales — Auditoría, Reportes, Dashboard y Configuración — cada uno con estilos distintos. Mismo producto, cuatro universos visuales sin relación." },
    { num: "02", title: "Handoff de 2 semanas por feature", desc: "Sin tokens ni fuente de verdad, cada sprint generaba nuevas inconsistencias. Diseño entregaba specs, desarrollo interpretaba a su criterio. El ciclo completo tomaba hasta 2 semanas por feature nuevo." },
    { num: "03", title: "Conocimiento tribal, cero documentación", desc: "Cada módulo de Auditbrain acumulaba decisiones de UI no documentadas. El onboarding de un nuevo developer requería leer el código completo de cada módulo para entender los patrones." },
    { num: "04", title: "Temas sin abstracción de tokens", desc: "Implementar Dark Mode en los 4 módulos requería modificar cientos de archivos CSS manualmente. No existía ninguna capa de abstracción entre el valor de color y el código." },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">THE CHALLENGE</p>
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
        "Arquitectura de tokens unificada para los 4 módulos de Auditbrain — CSS custom properties sincronizadas con Figma Variables",
        "Escala tipográfica y de espaciado basada en grid de 8px aplicada consistentemente en Auditoría, Reportes, Dashboard y Configuración",
        "Paleta semántica de 3 capas: primitivos → semánticos → componente — un cambio propaga a todo el sistema",
      ],
    },
    {
      title: "Accesibilidad",
      color: PINK,
      points: [
        "Contraste WCAG AA verificado en cada token de color del sistema de Auditbrain",
        "Navegación por teclado y roles ARIA en cada componente — requerimiento de los clientes enterprise del producto",
        "Estados: hover, focus, active, disabled, error — documentados, probados y parte del handoff",
      ],
    },
    {
      title: "Cross-Module Consistency",
      color: PURPLE,
      points: [
        "Un único Design System alimentando los 4 módulos del producto — cero duplicación de trabajo entre módulos",
        "Variables de Figma conectadas al repositorio de Auditbrain vía Style Dictionary — tokens como fuente de verdad",
        "Dark/Light mode implementado en todo el producto con un único cambio de token — eliminando 200+ overrides manuales",
      ],
    },
    {
      title: "Adoption & Governance",
      color: ORANGE,
      points: [
        "Workshops de adopción con los 4 squads de desarrollo de Auditbrain — de 0% a 90% de adopción en 6 meses",
        "Documentación viva en Storybook + Notion: cada componente con versión, estado y guía de uso",
        "Versionado semántico (major.minor.patch) con changelog — cada release del sistema comunicado al equipo completo",
      ],
    },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">THE SOLUTION</p>
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
  { name: "--ds-color-success", hex: "#16A34A", label: "Success" },
  { name: "--ds-color-error", hex: "#DC2626", label: "Error" },
  { name: "--ds-neutral-950", hex: "#0A0A0A", label: "Neutral 950" },
  { name: "--ds-neutral-600", hex: "#525252", label: "Neutral 600" },
  { name: "--ds-neutral-50", hex: "#F5F5F5", label: "Neutral 50" },
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
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">FUNDAMENTOS</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Tokens del Sistema</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          La capa más profunda — variables que conectan las decisiones de diseño con el código de forma trazable y escalable.
        </p>

        <div className="overflow-x-auto mb-10 pb-1">
          <div className="flex gap-1 bg-muted/10 p-1 rounded-lg border border-border w-max min-w-full sm:w-fit">
            {(["colors", "figma", "typography", "spacing"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 sm:px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${t === tab ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t === "colors" ? "Colores" : t === "figma" ? "Figma Variables" : t === "typography" ? "Tipografía" : "Espaciado"}
              </button>
            ))}
          </div>
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
                  <p className="text-xs font-mono text-muted-foreground/70 truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground/40">{c.hex}</p>
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
              {/* Token naming convention flow */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 mb-6">
                {[
                  { label: "Primitivos", desc: "color/orange/500 → #FF6B2B", color: ORANGE, note: "Valor concreto" },
                  { label: "Semánticos", desc: "color/brand/primary → ↳ color/orange/500", color: PINK, note: "Alias con significado" },
                  { label: "Componente", desc: "button/color/bg → ↳ color/brand/primary", color: PURPLE, note: "Uso específico" },
                ].map((layer, i, arr) => (
                  <div key={layer.label} className="flex sm:flex-row items-center gap-2 flex-1">
                    <div
                      className="flex-1 rounded-xl border p-4"
                      style={{ borderColor: `${layer.color}30`, background: `${layer.color}08` }}
                    >
                      <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: layer.color }}>{layer.label}</p>
                      <p className="text-xs font-mono text-muted-foreground leading-snug">{layer.desc}</p>
                      <p className="text-xs text-muted-foreground/40 mt-1.5">{layer.note}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-xl text-muted-foreground/30 shrink-0">›</span>
                    )}
                  </div>
                ))}
              </div>
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
                          <p className="text-muted-foreground/40 text-xs mb-0.5">{token.collection}</p>
                          <p className="text-muted-foreground truncate">{token.name}</p>
                          <p className="mt-0.5" style={{ color: typeColor[token.type] || ORANGE }}>{token.value}</p>
                        </div>
                        <span
                          className="shrink-0 px-2 py-0.5 rounded text-xs tracking-wider"
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
                            className="px-2 py-0.5 rounded text-xs tracking-wider"
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
                    <p className="text-xs font-mono text-muted-foreground/50">{t.size} / {t.weight}w</p>
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
                  <span className="text-xs font-mono text-muted-foreground/50">--ds-spacing-{s}</span>
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
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">COMPONENTES</p>
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
              <div className="rounded-xl border border-border p-5 cursor-default"
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
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">DOCUMENTACIÓN</p>
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

          {/* Token → Component connection */}
          <div className="border-t border-border px-8 py-6">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">TOKENS USADOS POR ESTE COMPONENTE</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { token: "--ds-color-primary", use: "background (primary)", color: ORANGE },
                { token: "--ds-color-secondary", use: "border (secondary)", color: PINK },
                { token: "--ds-radius-lg", use: "border-radius", color: PURPLE },
                { token: "--ds-spacing-component-md", use: "padding x/y", color: ORANGE },
              ].map(({ token, use, color }) => (
                <div key={token} className="rounded-lg border border-border p-3" style={{ background: `${color}06` }}>
                  <p className="text-xs font-mono font-bold mb-1" style={{ color }}>{token}</p>
                  <p className="text-xs text-muted-foreground/60">→ {use}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-mono text-muted-foreground/40 mt-3">Cada cambio en el token propaga automáticamente a todos los botones del sistema.</p>
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
  const [open, setOpen] = useState<number | null>(0);
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
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">PROCESO</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Design Process</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Cuatro fases que transforman el caos visual en un sistema coherente, mantenible y adoptado por el equipo completo.
        </p>

        <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/10 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold font-mono shrink-0" style={{ color: step.color }}>
                      {step.num}
                    </span>
                    <div className="w-4 h-px shrink-0" style={{ background: step.color }} />
                    <span className="font-semibold text-base">{step.title}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl text-muted-foreground/50 group-hover:text-foreground transition-colors shrink-0 ml-4"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1" style={{ borderTop: `1px solid ${step.color}20` }}>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground/70 border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mini roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 rounded-2xl border border-border p-6 md:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-muted-foreground/60">ROADMAP DEL SISTEMA</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { quarter: "Q1 · 2023", label: "Foundations", status: "done", items: ["Color tokens", "Tipografía", "Espaciado", "Grid 8px"] },
              { quarter: "Q2 · 2023", label: "Core Components", status: "done", items: ["Button, Input, Card", "Form patterns", "Storybook setup", "Accesibilidad base"] },
              { quarter: "Q3–Q4 · 2023", label: "Scale & Adoption", status: "done", items: ["Dark Mode tokens", "Multi-módulo sync", "Style Dictionary", "Workshops equipo"] },
              { quarter: "2024+", label: "Evolution", status: "ongoing", items: ["Mobile tokens", "Nuevos módulos", "Automated testing", "Changelog público"] },
            ].map((phase) => (
              <div
                key={phase.quarter}
                className="rounded-xl border border-border p-4"
                style={phase.status === "ongoing" ? { borderColor: `${ORANGE}40`, background: `${ORANGE}06` } : {}}
              >
                <p className="text-xs font-mono text-muted-foreground/50 mb-1">{phase.quarter}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: phase.status === "ongoing" ? ORANGE : "#16A34A" }}
                  />
                  <p className="text-xs font-bold">{phase.label}</p>
                </div>
                <ul className="space-y-1">
                  {phase.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
                      <span style={{ color: phase.status === "ongoing" ? ORANGE : "#16A34A" }}>
                        {phase.status === "ongoing" ? "›" : "✓"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
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
    { label: "4 módulos", detail: "un solo sistema visual" },
    { label: "Handoff", detail: "de 2 semanas a 3 días" },
    { label: "Dark Mode", detail: "activado con un token" },
    { label: "Gobernanza", detail: "versionado + changelog por release" },
    { label: "Onboarding devs", detail: "de 3 semanas a 3 días" },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-32">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">IMPACTO</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Results & Impact</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          2 años construyendo el sistema de diseño de Auditbrain — resultados medibles en eficiencia, consistencia y adopción.
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-16 mb-12 md:mb-16">
          <CircularProgress value={75} description="Reducción en tiempo de handoff — de 2 semanas a 3 días en Auditbrain" uid="m1" />
          <CircularProgress value={80} description="Menos reprocesos por inconsistencias en los 4 módulos del producto" uid="m2" />
          <CircularProgress value={90} description="Adopción del Design System por los equipos de producto de Auditbrain" uid="m3" />
        </div>

        <div className="rounded-2xl border border-border p-8">
          <h3 className="font-bold mb-6">Resultados Concretos</h3>
          <ul className="space-y-3">
            {outcomes.map((o) => (
              <li key={o.label} className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
                >
                  ✓
                </span>
                <span className="font-semibold text-sm">{o.label}</span>
                <span className="text-sm text-muted-foreground">— {o.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// STACK DE HERRAMIENTAS
// ─────────────────────────────────────────────
const DSStack = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const tools = [
    {
      name: "Figma",
      role: "Diseño & Tokens",
      color: ORANGE,
      desc: "Variables nativas para tokens primitivos y semánticos. Auto Layout para componentes pixel-perfect. Librería compartida como fuente de verdad para todo el equipo.",
      tags: ["Variables", "Components", "Auto Layout", "Prototyping"],
      icon: (
        <svg viewBox="0 0 38 57" className="w-6 h-6" fill="currentColor">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
        </svg>
      ),
    },
    {
      name: "Storybook",
      role: "Documentación viva",
      color: PINK,
      desc: "Cada componente documentado en aislamiento — variantes, estados, controles interactivos y guías de uso. El puente entre diseño y desarrollo sin fricción.",
      tags: ["Stories", "Controls", "A11y addon", "Docs"],
      icon: (
        <svg viewBox="0 0 64 64" className="w-6 h-6" fill="currentColor">
          <path d="M9.6 2.4L8 17.6l4.8 1.6V57.6L52.8 64l3.2-59.2L9.6 2.4zm26.4 44l-12.8-1.6V28l12.8 1.6V46.4zm0-22.4L23.2 22.4V12l12.8 1.6v10.4z"/>
        </svg>
      ),
    },
    {
      name: "Style Dictionary",
      role: "Pipeline de tokens",
      color: PURPLE,
      desc: "Transforma los tokens de Figma en variables CSS, JSON y cualquier formato que el equipo de desarrollo necesite. Un cambio en el token, todos los outputs se actualizan.",
      tags: ["CSS vars", "JSON", "Multi-platform", "Automation"],
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/>
          <path d="M7 12h4l2-4 4 8-2-4h-2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      role: "Versionado & Gobernanza",
      color: ORANGE,
      desc: "Versionado semántico (major.minor.patch), pull requests para propuestas de nuevos componentes, changelog automático y revisión de código antes de publicar al sistema.",
      tags: ["Semantic versioning", "PR reviews", "Changelog", "CI/CD"],
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: "Notion",
      role: "Documentación & Principios",
      color: PINK,
      desc: "Wiki del sistema de diseño: principios de diseño, guías de contribución, decisiones de arquitectura y roadmap de componentes. Accesible para todo el equipo.",
      tags: ["Wiki", "Principles", "Roadmap", "ADRs"],
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
        </svg>
      ),
    },
    {
      name: "Supernova",
      role: "DS Platform & Export",
      color: PURPLE,
      desc: "Plataforma integral para Design Systems: sincroniza con Figma, transforma tokens en código CSS/Swift/Kotlin y genera la documentación del sistema automáticamente — sin configuración manual.",
      tags: ["Token export", "Figma sync", "Docs generator", "Multi-platform"],
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="container-portfolio pb-20 md:pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">STACK</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Herramientas del Sistema</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Cada herramienta tiene un rol específico en el pipeline — desde el diseño del token hasta el componente en producción.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="p-6 rounded-xl border border-border hover:border-opacity-60 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${tool.color}15`, color: tool.color }}
                >
                  {tool.icon}
                </div>
                <div>
                  <p className="font-bold text-sm">{tool.name}</p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground/60">{tool.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.desc}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground/70 border border-border"
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
// BEFORE / AFTER
// ─────────────────────────────────────────────
const DSBeforeAfter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="container-portfolio pb-20 md:pb-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-muted-foreground/60">ANTES → DESPUÉS</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">El Impacto Visual</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          La diferencia entre un producto sin sistema y uno construido sobre tokens, componentes y gobernanza.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ANTES */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="rounded-2xl border-2 border-red-500/20 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 bg-red-500/5 border-b border-red-500/10">
              <span className="text-xs font-bold tracking-widest uppercase text-red-500">✕ Antes — Sin sistema</span>
              <span className="text-xs text-muted-foreground font-mono">v0 · sin tokens</span>
            </div>
            <div className="p-6 space-y-5">
              {/* Botones caóticos */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-3 font-mono">// 6 "botones primarios" distintos en el mismo producto</p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-1.5 text-xs text-white rounded" style={{ background: "#2563eb" }}>Guardar</button>
                  <button className="px-5 py-2 text-sm text-white rounded-full" style={{ background: "#16a34a" }}>Confirmar</button>
                  <button className="px-3 py-1 text-xs text-white rounded-lg font-bold" style={{ background: "#dc2626" }}>Submit</button>
                  <button className="px-4 py-2 text-xs text-white" style={{ background: "#7c3aed", borderRadius: 2 }}>Aceptar</button>
                  <button className="px-4 py-1.5 text-xs text-white rounded-md" style={{ background: "#0891b2" }}>OK</button>
                  <button className="px-5 py-2 text-sm text-white rounded-xl" style={{ background: "#ea580c" }}>Continuar</button>
                </div>
              </div>
              {/* Tipografía caótica */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-3 font-mono">// tipografía sin escala definida</p>
                <div className="space-y-1">
                  <p style={{ fontSize: 22, fontWeight: 900, color: "#1e293b" }}>Título de sección</p>
                  <p style={{ fontSize: 18, fontWeight: 400, color: "#374151" }}>Subtítulo del módulo</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#6b7280" }}>LABEL DE CAMPO</p>
                  <p style={{ fontSize: 15, fontWeight: 400, color: "#111827" }}>Texto de descripción del producto</p>
                </div>
              </div>
              {/* Cards caóticas */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-3 font-mono">// 3 estilos de tarjeta sin relación</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded" style={{ background: "#f0f9ff", border: "2px solid #0ea5e9" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#0369a1" }}>Card A</p>
                    <p style={{ fontSize: 10, color: "#64748b" }}>padding 12px</p>
                  </div>
                  <div className="p-2 rounded-2xl shadow-lg" style={{ background: "#fefce8", border: "1px dashed #ca8a04" }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#92400e" }}>Card B</p>
                    <p style={{ fontSize: 10, color: "#78716c" }}>padding 8px</p>
                  </div>
                  <div className="p-4 rounded-none" style={{ background: "#fdf4ff", border: "3px solid #a855f7" }}>
                    <p style={{ fontSize: 10, fontWeight: 800, color: "#7e22ce" }}>CARD C</p>
                    <p style={{ fontSize: 9, color: "#a1a1aa" }}>padding 16px</p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-red-500/10">
                <p className="text-xs text-red-500/70">⚠ 6+ devs · cada pantalla diferente · 0 reutilización · handoff = 2 semanas</p>
              </div>
            </div>
          </motion.div>

          {/* DESPUÉS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-2xl border-2 overflow-hidden"
            style={{ borderColor: `${ORANGE}40` }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ background: `${ORANGE}08`, borderColor: `${ORANGE}15` }}>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: ORANGE }}>✓ Después — Con sistema</span>
              <span className="text-xs text-muted-foreground font-mono">v2.3.0 · token-based</span>
            </div>
            <div className="p-6 space-y-5">
              {/* Botones sistema */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-3 font-mono">// 1 componente Button · 4 variantes · mismo token</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <button className="px-4 py-2 rounded-lg text-white text-xs font-medium" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}>Primary</button>
                  <button className="px-4 py-2 rounded-lg border text-xs font-medium border-border text-foreground/80">Secondary</button>
                  <button className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground">Ghost</button>
                  <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-medium">Destructive</button>
                </div>
                <p className="text-xs font-mono mt-2" style={{ color: ORANGE }}>--ds-radius: 8px · --ds-color-primary: #FF6B2B</p>
              </div>
              {/* Tipografía sistema */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-3 font-mono">// escala tipográfica con tokens</p>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <p className="text-xl font-bold">Título de sección</p>
                    <span className="text-xs font-mono text-muted-foreground/40">--ds-text-xl / 700</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-base font-semibold text-muted-foreground">Subtítulo del módulo</p>
                    <span className="text-xs font-mono text-muted-foreground/40">--ds-text-base / 600</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/60">Label de campo</p>
                    <span className="text-xs font-mono text-muted-foreground/40">--ds-text-xs / 500</span>
                  </div>
                </div>
              </div>
              {/* Cards sistema */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-3 font-mono">// 1 componente Card · 3 variantes · mismo spacing</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Base", "Featured", "Premium"].map((v, i) => (
                    <div key={v} className="p-3 rounded-lg border border-border" style={i === 2 ? { background: `linear-gradient(135deg, ${ORANGE}10, ${PURPLE}08)` } : {}}>
                      <div className="w-4 h-4 rounded mb-2" style={{ background: `linear-gradient(135deg, ${[ORANGE, PINK, PURPLE][i]}, ${[PINK, PURPLE, ORANGE][i]})` }} />
                      <p className="text-xs font-semibold">{v}</p>
                      <p className="text-xs font-mono text-muted-foreground/40 mt-0.5">p-3 · r-lg</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono mt-2" style={{ color: PURPLE }}>--ds-spacing-12 · --ds-radius-lg · reutilizable ✓</p>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: `${ORANGE}20` }}>
                <p className="text-xs" style={{ color: ORANGE }}>✓ 1 sistema · consistencia total · handoff = 2 días</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CALL TO ACTION
// ─────────────────────────────────────────────
const DSCallToAction = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="container-portfolio pb-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
        style={{
          background: `radial-gradient(ellipse at center, ${ORANGE}12, transparent 65%), radial-gradient(ellipse at top right, ${PURPLE}10, transparent 50%)`,
          backgroundImage: `radial-gradient(ellipse at center, ${ORANGE}12, transparent 65%), radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "auto, 28px 28px",
          border: `1px solid ${ORANGE}25`,
        }}
      >
        {/* Gradient line top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, ${PINK}, transparent)` }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: ORANGE }}
        >
          ¿TRABAJAMOS JUNTOS?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
        >
          ¿Listo para un sistema{" "}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            que escala?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
        >
          Desde la arquitectura de tokens hasta la adopción del equipo — construyo sistemas que perduran, escalan y eliminan la deuda de diseño.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
          >
            Hablemos de tu producto
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://www.behance.net/Zerausdesigner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-border hover:bg-muted/20 transition-colors"
          >
            Ver en Behance
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2">
              <path d="M4 12L12 4M12 4H7M12 4v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-border/50"
        >
          {[
            { label: "Figma", icon: "◈" },
            { label: "Storybook", icon: "⬡" },
            { label: "Tokens", icon: "▣" },
            { label: "WCAG AA", icon: "✓" },
            { label: "React", icon: "◯" },
          ].map((tool) => (
            <div key={tool.label} className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <span style={{ color: ORANGE }}>{tool.icon}</span>
              {tool.label}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
const DesignSystemPage = () => (
  <>
    <SEOHead
      title="Design System — Cristian Suarez · Zeraus DS"
      description="Caso de estudio: sistema de diseño construido desde cero para Auditbrain — arquitectura de tokens, librería de componentes, documentación viva y adopción en 4 módulos de producto."
      url="https://zerausds.com/designsystempro"
      keywords={[
        "Design System",
        "Design Tokens",
        "Figma Variables",
        "Atomic Design",
        "Storybook",
        "UI Lead",
        "Component Library",
        "UX Design",
        "Auditbrain",
        "Cristian Suarez",
      ]}
    />
    <main>
      <DSHero />
      <DSShowcase />
      <DSOverview />
      <DSChallenge />
      <DSBeforeAfter />
      <DSSolution />
      <DSFoundations />
      <DSComponents />
      <DSDocumentation />
      <DSStack />
      <DSProcess />
      <DSImpact />
      <DSCallToAction />
    </main>
  </>
);

export default DesignSystemPage;
