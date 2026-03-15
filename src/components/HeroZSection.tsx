import { useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * HeroZSection v4  — patrón Lokal
 * ─────────────────────────────────────────────────────────────────────────────
 *  FLUJO:
 *  ┌───────────────────────────────────────────────────────────┐
 *  │ INICIO  → Z armada (izq) + TEXTO COMPLETO visible (der)  │
 *  │ SCROLL  → piezas escalan, rotan, cambian de color         │
 *  │           texto queda fijo (no se mueve)                  │
 *  │ FIN     → piezas separadas, usuario llega a Projects      │
 *  └───────────────────────────────────────────────────────────┘
 *
 *  AJUSTES RÁPIDOS:
 *  · Escala final           → ANIM.zN.scale
 *  · Distancia de vuelo     → ANIM.zN.x / .y
 *  · Rotación               → ANIM.zN.rotate
 *  · Color final            → ANIM.zN.color
 *  · Suavidad del spring    → SP (stiffness / damping)
 *  · Duración del scroll    → min-h-[Xvh] en la section
 */

// ── Medidas naturales del diseño ensamblado ──────────────────────────────────
const Z_W = 264;
const Z_H = 228; // 70 + 87 + 71

// ── Posición de cada pieza en el contenedor Z ────────────────────────────────
// originX/Y controla desde qué punto "explota" la pieza (0–1)
const LAYOUT = {
  z1: { top: 0,   left: 0,   w: 264, h: 70,  ox: 0.5, oy: 1   }, // barra superior  → sube
  z2: { top: 70,  left: 0,   w: 265, h: 87,  ox: 0.5, oy: 0.5 }, // diagonal        → centro
  z3: { top: 157, left: 0,   w: 130, h: 71,  ox: 1,   oy: 0   }, // barra inf-izq   → baja-izq
  z4: { top: 157, left: 130, w: 136, h: 71,  ox: 0,   oy: 0   }, // barra inf-der   → baja-der
} as const;

// ── Targets al 50 % del scroll ───────────────────────────────────────────────
// Escala 2–3x + rotación suave + vuelo moderado (sin salir demasiado del viewport)
const ANIM = {
  z1: { x: -80,  y: -90,  scale: 2.8, rotate: -30, color: "#FDB100" }, // amber
  z2: { x:  95,  y: -55,  scale: 3.2, rotate:  18, color: "#FD5C05" }, // orange
  z3: { x: -70,  y:  100, scale: 2.4, rotate: -20, color: "#CB005B" }, // crimson
  z4: { x:  90,  y:  110, scale: 2.9, rotate:  24, color: "#6500AA" }, // purple
} as const;

// Spring: suavidad del movimiento al scrollear y al volver
const SP: { stiffness: number; damping: number; restDelta: number } =
  { stiffness: 50, damping: 16, restDelta: 0.001 };

// Spring rígido para móvil: menos cálculo, más directo
const SP_MOBILE: { stiffness: number; damping: number; restDelta: number } =
  { stiffness: 300, damping: 40, restDelta: 0.01 };

// Rango del scroll donde ocurre la animación de la Z
const RANGE: [number, number] = [0, 0.5];

// ── SVG pieces inline (stroke via CSS currentColor) ──────────────────────────
const Z1 = () => (
  <svg viewBox="0 0 264 70" fill="none" className="w-full h-full"
       role="img" aria-label="Pieza 1 — barra superior">
    <rect x="1" y="1" width="262" height="68"
      stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
  </svg>
);
const Z2 = () => (
  <svg viewBox="0 0 265 87" fill="none" className="w-full h-full"
       role="img" aria-label="Pieza 2 — diagonal">
    <path d="M132.799 1.00105L261.602 1.00014L129.704 86.0005L3.3441 86.0003Z"
      stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
  </svg>
);
const Z3 = () => (
  <svg viewBox="0 0 130 71" fill="none" className="w-full h-full"
       role="img" aria-label="Pieza 3 — barra inferior izquierda">
    <path d="M129 1V70H1V1H129Z"
      stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
  </svg>
);
const Z4 = () => (
  <svg viewBox="0 0 136 71" fill="none" className="w-full h-full"
       role="img" aria-label="Pieza 4 — barra inferior derecha">
    <rect x="1" y="1" width="134" height="69"
      stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const HeroZSection = () => {
  const sectionRef     = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const go             = !prefersReduced;

  // En móvil usamos spring más rígido y sin interpolación de color
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );
  const springCfg = isMobile ? SP_MOBILE : SP;

  // scrollYProgress: 0 cuando la sección entra, 1 cuando sale por arriba
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Transforms: escala + rotación + traslación + color por pieza ─────────
  // Todos los hooks llamados incondicionalmente (Rules of Hooks)

  // Z1 ─────────────────────────────────────────────────────────────────────
  const _z1x  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z1.x      : 0]);
  const _z1y  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z1.y      : 0]);
  const _z1sc = useTransform(scrollYProgress, RANGE, [1, go ? ANIM.z1.scale  : 1]);
  const _z1r  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z1.rotate : 0]);
  const  z1c  = useTransform(scrollYProgress, RANGE, ["#F75010", go && !isMobile ? ANIM.z1.color : "#F75010"]);
  const z1x = useSpring(_z1x, springCfg);  const z1y  = useSpring(_z1y,  springCfg);
  const z1sc= useSpring(_z1sc,springCfg);  const z1r  = useSpring(_z1r,  springCfg);

  // Z2 ─────────────────────────────────────────────────────────────────────
  const _z2x  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z2.x      : 0]);
  const _z2y  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z2.y      : 0]);
  const _z2sc = useTransform(scrollYProgress, RANGE, [1, go ? ANIM.z2.scale  : 1]);
  const _z2r  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z2.rotate : 0]);
  const  z2c  = useTransform(scrollYProgress, RANGE, ["#D00952", go && !isMobile ? ANIM.z2.color : "#D00952"]);
  const z2x = useSpring(_z2x, springCfg);  const z2y  = useSpring(_z2y,  springCfg);
  const z2sc= useSpring(_z2sc,springCfg);  const z2r  = useSpring(_z2r,  springCfg);

  // Z3 ─────────────────────────────────────────────────────────────────────
  const _z3x  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z3.x      : 0]);
  const _z3y  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z3.y      : 0]);
  const _z3sc = useTransform(scrollYProgress, RANGE, [1, go ? ANIM.z3.scale  : 1]);
  const _z3r  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z3.rotate : 0]);
  const  z3c  = useTransform(scrollYProgress, RANGE, ["#920087", go && !isMobile ? ANIM.z3.color : "#920087"]);
  const z3x = useSpring(_z3x, springCfg);  const z3y  = useSpring(_z3y,  springCfg);
  const z3sc= useSpring(_z3sc,springCfg);  const z3r  = useSpring(_z3r,  springCfg);

  // Z4 ─────────────────────────────────────────────────────────────────────
  const _z4x  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z4.x      : 0]);
  const _z4y  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z4.y      : 0]);
  const _z4sc = useTransform(scrollYProgress, RANGE, [1, go ? ANIM.z4.scale  : 1]);
  const _z4r  = useTransform(scrollYProgress, RANGE, [0, go ? ANIM.z4.rotate : 0]);
  const  z4c  = useTransform(scrollYProgress, RANGE, ["#6E00A3", go && !isMobile ? ANIM.z4.color : "#6E00A3"]);
  const z4x = useSpring(_z4x, springCfg);  const z4y  = useSpring(_z4y,  springCfg);
  const z4sc= useSpring(_z4sc,springCfg);  const z4r  = useSpring(_z4r,  springCfg);

  // Scroll indicator: desaparece al primer movimiento
  const scrollHint = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  const pct = (v: number, tot: number) => `${(v / tot) * 100}%`;

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-labelledby="hero-title"
      // Altura total de la sección → espacio de scroll disponible para la animación
      // 160vh = ~0.6 pantallas de scroll hasta que la Z termina de explotar
      // Sube a 200vh si quieres más recorrido, baja a 130vh para más rápido
      className="relative min-h-[130vh] sm:min-h-[150vh] md:min-h-[160vh] bg-background"
    >
      {/* ── Sticky frame: el layout se queda fijo mientras se hace scroll ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Halo decorativo */}
        <div aria-hidden="true"
          className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2
                          w-[900px] h-[900px] rounded-full
                          bg-primary/[0.055] blur-[160px]" />
        </div>

        {/* ── Grid de 2 columnas ─────────────────────────────────────────── */}
        <div className="relative h-full flex items-center">
          <div className="w-full max-w-6xl mx-auto px-5 md:px-10 lg:px-16 pt-16 lg:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-6 sm:gap-10 lg:gap-16 items-center">

              {/* ── COL IZQUIERDA: Z Assembly ─────────────────────────── */}
              <div className="flex justify-center lg:justify-start">
                {/*
                 * Contenedor con aspect-ratio fijo (264:228).
                 * overflow: visible → las piezas salen al explotar.
                 * El clip final lo hace el wrapper sticky (overflow-hidden arriba).
                 *
                 * Ajusta max-w para cambiar el tamaño de la Z en pantalla.
                 */}
                <div
                  className="relative w-full max-w-[180px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px]"
                  style={{ aspectRatio: `${Z_W} / ${Z_H}` }}
                >
                  {/* Z1 — barra superior */}
                  <motion.div
                    className="absolute will-change-transform"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      top: pct(LAYOUT.z1.top, Z_H), left: pct(LAYOUT.z1.left, Z_W),
                      width: pct(LAYOUT.z1.w, Z_W), height: pct(LAYOUT.z1.h, Z_H),
                      originX: LAYOUT.z1.ox, originY: LAYOUT.z1.oy,
                      x: z1x, y: z1y, scale: z1sc, rotate: z1r, color: z1c,
                    }}
                  ><Z1 /></motion.div>

                  {/* Z2 — diagonal */}
                  <motion.div
                    className="absolute will-change-transform"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      top: pct(LAYOUT.z2.top, Z_H), left: pct(LAYOUT.z2.left, Z_W),
                      width: pct(LAYOUT.z2.w, Z_W), height: pct(LAYOUT.z2.h, Z_H),
                      originX: LAYOUT.z2.ox, originY: LAYOUT.z2.oy,
                      x: z2x, y: z2y, scale: z2sc, rotate: z2r, color: z2c,
                    }}
                  ><Z2 /></motion.div>

                  {/* Z3 — barra inferior izquierda */}
                  <motion.div
                    className="absolute will-change-transform"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      top: pct(LAYOUT.z3.top, Z_H), left: pct(LAYOUT.z3.left, Z_W),
                      width: pct(LAYOUT.z3.w, Z_W), height: pct(LAYOUT.z3.h, Z_H),
                      originX: LAYOUT.z3.ox, originY: LAYOUT.z3.oy,
                      x: z3x, y: z3y, scale: z3sc, rotate: z3r, color: z3c,
                    }}
                  ><Z3 /></motion.div>

                  {/* Z4 — barra inferior derecha */}
                  <motion.div
                    className="absolute will-change-transform"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      top: pct(LAYOUT.z4.top, Z_H), left: pct(LAYOUT.z4.left, Z_W),
                      width: pct(LAYOUT.z4.w, Z_W), height: pct(LAYOUT.z4.h, Z_H),
                      originX: LAYOUT.z4.ox, originY: LAYOUT.z4.oy,
                      x: z4x, y: z4y, scale: z4sc, rotate: z4r, color: z4c,
                    }}
                  ><Z4 /></motion.div>
                </div>
              </div>

              {/* ── COL DERECHA: Texto — SIEMPRE VISIBLE DESDE EL INICIO ──── */}
              {/*
               * Todo el contenido de texto tiene su propia animación de entrada
               * basada en mount (initial/animate), NO en scroll.
               * El texto queda estático mientras las piezas se animan.
               */}
              <motion.div
                className="text-foreground lg:pl-4"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Nombre real — identificación inmediata */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3"
                >
                  Cristian Suárez · Design Systems Lead
                </motion.p>

                {/* Título principal */}
                <h1
                  id="hero-title"
                  className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
                  style={{
                    background: "linear-gradient(90deg, #F75010, #DB1E3F, #D00952, #920087, #6E00A3)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Zeraus DS
                </h1>

                {/* Tagline especialidad */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-foreground"
                >
                  Estrategia Visual · Producto Digital · Branding
                </motion.p>

                {/* Párrafos descriptivos */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 space-y-4 max-w-[90%] sm:max-w-prose"
                >
                  <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                    Llevo 5 años diseñando productos digitales — interfaces que la gente
                    entiende sin pensar, sistemas que los equipos pueden escalar sin caos
                    y experiencias que hacen que los usuarios vuelvan.
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex items-center gap-4 flex-wrap"
                >
                  <Link
                    to="/proyectos"
                    className="inline-flex items-center gap-2 px-6 h-11 rounded-full
                               bg-foreground text-background text-xs font-bold
                               uppercase tracking-[0.14em]
                               hover:bg-foreground/80 transition-colors duration-200"
                  >
                    Ver proyectos
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center text-sm font-semibold
                               text-muted-foreground hover:text-foreground
                               transition-colors duration-200 underline-offset-4
                               hover:underline"
                  >
                    Hablemos
                  </Link>
                </motion.div>

              </motion.div>

            </div>
          </div>
        </div>

        {/* ── Scroll indicator ───────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: scrollHint }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/25 font-medium">
            scroll
          </span>
          <motion.div
            className="w-px h-10 origin-top bg-gradient-to-b from-[#6500AA]/50 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroZSection;

// TODO — Paso 2 (patrón Lokal):
// Al llegar al final del scroll de esta sección (scrollYProgress → 1),
// las 4 piezas vuelan desde sus posiciones separadas hasta encajar como
// encabezados/decoración de los 4 project cards del grid de proyectos.
// Técnica sugerida: Framer Motion layoutId + AnimatePresence, o calcular
// las posiciones target con getBoundingClientRect() al montar ProjectCard.
