import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { projects } from "./projects.data";
import { useCardPositions } from "./useCardPositions";

/**
 * ProjectsSection
 * ─────────────────────────────────────────────────────────────────────────────
 * CARDS: usan whileInView (100% opacas una vez en pantalla — sin scroll-gate).
 * PIEZAS Z: decoración animada que viaja desde esquinas hacia cada card.
 *           Son overlay puro: pointer-events none, no afectan legibilidad.
 *
 * CÓMO AJUSTAR TRAYECTORIAS de las piezas:
 *   Edita PIECE_START (posición inicial) y los targets en AnimPiece (escala final).
 *
 * CÓMO RELACIONAR pieza ↔ tarjeta:
 *   pieces[0] (oro)    → projects[0]
 *   pieces[1] (verde)  → projects[1]
 *   pieces[2] (rosa)   → projects[2]
 *   pieces[3] (índigo) → projects[3]
 */

const PIECE_COLORS = ["#F59E0B", "#10B981", "#F43F5E", "#818CF8"] as const;

// Posiciones de inicio (esquinas de la sección, como venían del Hero)
const PIECE_START = [
  { x: "-8%",  y: "-5%",  scale: 2.4, rotate: -28 }, // Z1 top-left
  { x:  "65%", y: "-4%",  scale: 2.8, rotate:  16 }, // Z2 top-right
  { x: "-9%",  y:  "38%", scale: 2.0, rotate: -18 }, // Z3 mid-left
  { x:  "67%", y:  "40%", scale: 2.5, rotate:  22 }, // Z4 mid-right
] as const;

// SVG pieces inline
const ZPieces = [
  () => (
    <svg viewBox="0 0 264 70" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="1" y="1" width="262" height="68"
        stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 265 87" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M132.799 1.00105L261.602 1.00014L129.704 86.0005L3.3441 86.0003Z"
        stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 130 71" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M129 1V70H1V1H129Z"
        stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 136 71" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="1" y="1" width="134" height="69"
        stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  ),
];

// ── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps {
  project: (typeof projects)[number] | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ModalProps) => {
  useEffect(() => {
    if (!project) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [project, onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden="true" />

          {/* ── Panel ──
               Móvil   : bottom sheet, sube desde abajo, ocupa hasta 85dvh
               Tablet+ : centrado, max-w-xl, hasta 88dvh
          */}
          <motion.div key="panel"
            role="dialog" aria-modal="true" aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3
                       sm:inset-0
                       z-50
                       flex items-end sm:items-center justify-center
                       sm:p-6
                       pointer-events-none"
          >
            <div
              className="pointer-events-auto
                         w-full sm:max-w-xl
                         rounded-3xl overflow-hidden
                         bg-card border border-border
                         shadow-2xl shadow-black/30
                         flex flex-col
                         max-h-[82dvh] sm:max-h-[88dvh]"
            >

              {/* ── Imagen — desktop y tablet, oculta en móvil ── */}
              <div className="hidden sm:block w-full shrink-0 overflow-hidden"
                   style={{ aspectRatio: "16/7" }}>
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover" />
              </div>

              {/* ── Botón cerrar ── */}
              <button onClick={onClose} aria-label="Cerrar modal"
                className="absolute top-4 right-4 z-10
                           w-8 h-8 flex items-center justify-center
                           rounded-full bg-background/80 backdrop-blur-sm border border-border
                           text-muted-foreground hover:text-foreground
                           hover:bg-secondary transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* ── Contenido scrollable ── */}
              <div className="flex-1 overflow-y-auto overscroll-contain
                              p-6 sm:p-8 space-y-5">

                {/* Imagen pequeña en móvil — dentro del scroll */}
                <div className="sm:hidden w-full overflow-hidden rounded-xl"
                     style={{ aspectRatio: "16/8" }}>
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover" />
                </div>

                {/* Título */}
                <h3 id="modal-title"
                  className="text-lg sm:text-xl font-bold tracking-tight
                             text-foreground pr-8 leading-snug">
                  {project.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* El reto */}
                <div className="rounded-xl bg-secondary border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]
                                text-primary/70 mb-2">
                    El reto
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Impacto */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]
                                text-primary/70 mb-3">
                    Impacto generado
                  </p>
                  <ul className="space-y-2.5">
                    {project.impact.map((item, i) => (
                      <li key={i}
                        className="flex items-start gap-2.5 text-sm
                                   text-foreground/80 leading-snug">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/10
                                         flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5"
                               aria-hidden="true">
                            <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {project.tags.map(tag => (
                    <span key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium
                                 bg-secondary text-foreground/70 border border-border">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* ── CTA fijo al fondo — siempre visible ──
                   Separado del scroll para que jamás se pierda de vista.
                   En móvil ocupa todo el ancho; en desktop se centra.
              ── */}
              <div className="shrink-0 px-6 pb-6 pt-4 sm:px-8 sm:pb-8
                              border-t border-border bg-card">
                <a
                  href={project.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver caso completo de ${project.title} en Behance`}
                  className="flex items-center justify-center gap-2.5
                             w-full h-12 sm:h-13 rounded-2xl
                             text-white font-semibold text-sm
                             transition-all duration-300
                             hover:opacity-90 hover:scale-[1.01]
                             hover:shadow-xl
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-primary focus-visible:ring-offset-2
                             focus-visible:ring-offset-background"
                  style={{
                    background:
                      "linear-gradient(90deg, #F75010, #DB1E3F, #D00952, #920087, #6E00A3)",
                    boxShadow: "0 4px 24px 0 rgba(247,80,16,0.25)",
                  }}
                >
                  {/* Icono Behance */}
                  <svg
                    viewBox="0 0 24 24" fill="currentColor"
                    className="w-4 h-4 shrink-0" aria-hidden="true"
                  >
                    <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.482.102.894.276 1.241.508.344.235.612.549.804.939.189.387.286.864.286 1.408 0 .604-.135 1.107-.404 1.509-.271.401-.67.736-1.195 1.001.718.207 1.254.566 1.607 1.082.352.512.529 1.13.529 1.851 0 .595-.115 1.112-.35 1.551-.232.437-.551.797-.956 1.076-.406.281-.876.49-1.409.625-.532.139-1.09.206-1.67.206H1V5.698h6.799zm-.339 5.002c.468 0 .85-.107 1.146-.325.295-.218.441-.569.441-1.056 0-.27-.047-.494-.145-.672-.096-.176-.227-.316-.393-.417-.165-.101-.354-.171-.572-.213-.217-.039-.441-.057-.674-.057H3.652v2.74h3.808zm.175 5.231c.262 0 .509-.026.742-.08.232-.056.437-.141.614-.263.178-.12.32-.28.428-.482.105-.2.158-.449.158-.756 0-.6-.166-1.035-.504-1.304-.337-.27-.784-.404-1.345-.404H3.652v3.289h3.983zm7.641-5.926c.38-.397.918-.594 1.613-.594.434 0 .809.095 1.124.285.315.191.572.437.77.741.199.305.34.647.426 1.024.085.38.128.759.128 1.14H14.32c.054.608.255 1.049.603 1.322.348.273.773.41 1.278.41.394 0 .733-.094 1.019-.28.285-.185.473-.37.562-.553h2.162c-.342 1.053-.868 1.817-1.58 2.289-.711.471-1.566.706-2.565.706-.697 0-1.327-.11-1.889-.331-.562-.221-1.039-.535-1.428-.943-.388-.408-.688-.898-.897-1.47-.208-.575-.313-1.21-.313-1.907 0-.679.107-1.305.322-1.876.214-.571.519-1.062.915-1.473.395-.41.871-.733 1.424-.966.556-.232 1.168-.348 1.839-.348.75 0 1.415.143 1.993.429.577.285 1.06.672 1.447 1.159.387.488.671 1.05.85 1.685.18.636.248 1.305.207 2.007h-6.484c.025-.608.215-1.082.57-1.426zm2.972-4.39h-4.229v1.369h4.229V5.615z" />
                  </svg>
                  Ver caso completo en Behance
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0"
                       aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── Card — usa whileInView, SIEMPRE opaco cuando está en pantalla ─────────────
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

interface CardProps {
  project: (typeof projects)[number];
  index: number;
  cardRef: React.RefObject<HTMLElement>;
  onOpenModal: (p: (typeof projects)[number]) => void;
}

const ProjectCard = ({ project, index, cardRef, onOpenModal }: CardProps) => (
  <motion.article
    ref={cardRef as React.RefObject<HTMLDivElement>}
    custom={index}
    variants={cardVariant}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5, transition: { duration: 0.22 } }}
    className="group relative flex flex-col rounded-2xl border border-border
               bg-card overflow-hidden cursor-pointer
               hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
               transition-colors duration-300"
    role="button"
    tabIndex={0}
    aria-label={`Abrir proyecto ${project.title}`}
    onClick={() => onOpenModal(project)}
    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenModal(project); } }}
  >
    {/* Cover image */}
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-105"
        loading="lazy"
      />
      {/* Dot de color sobre la imagen */}
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-80"
        style={{ background: PIECE_COLORS[index] }} aria-hidden="true" />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6">
      <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
        {project.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium
                       bg-secondary text-foreground/70 border border-border">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-border">
        <button
          aria-label={`Ver proyecto ${project.title}`}
          onClick={e => { e.stopPropagation(); onOpenModal(project); }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary
                     hover:gap-2.5 transition-all duration-200
                     focus-visible:outline-none focus-visible:underline">
          Ver proyecto
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </motion.article>
);

// ── Pieza Z decorativa — overlay puro, no afecta legibilidad ────────────────
interface PieceProps {
  index: number;
  sectionRef: React.RefObject<HTMLElement>;
  targetX: number;
  targetY: number;
}

const AnimPiece = ({ index, sectionRef, targetX, targetY }: PieceProps) => {
  const PieceSvg = ZPieces[index];
  const color    = PIECE_COLORS[index];
  const start    = PIECE_START[index];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const sp = { stiffness: 40, damping: 14 };

  // Viaje: de posición CSS inicial → centro del card destino
  const rawX = useTransform(scrollYProgress, [0, 0.7], [0, targetX]);
  const rawY = useTransform(scrollYProgress, [0, 0.7], [0, targetY]);
  const rawSc = useTransform(scrollYProgress, [0, 0.7], [start.scale, 0.22]);
  const rawRot = useTransform(scrollYProgress, [0, 0.7],
    [start.rotate, index % 2 === 0 ? -5 : 5]);
  // Fade in al entrar a la sección, fade out al llegar al card
  const rawOp = useTransform(scrollYProgress, [0, 0.12, 0.55, 0.85], [0, 0.9, 0.9, 0]);

  const x   = useSpring(rawX,   sp);
  const y   = useSpring(rawY,   sp);
  const sc  = useSpring(rawSc,  sp);
  const rot = useSpring(rawRot, sp);

  return (
    <motion.div
      className="absolute will-change-transform pointer-events-none"
      aria-hidden="true"
      style={{
        left:   start.x,
        top:    start.y,
        width:  "100px",
        height: index === 1 ? "34px" : "28px",
        color,
        x, y, scale: sc, rotate: rot, opacity: rawOp,
        originX: 0.5, originY: 0.5,
        // Piezas detrás de las cards
        zIndex: 0,
      }}
    >
      <PieceSvg />
    </motion.div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────
const ProjectsSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const closeModal = useCallback(() => setActiveProject(null), []);

  // Refs para medir posición de cada card
  const card0 = useRef<HTMLElement>(null);
  const card1 = useRef<HTMLElement>(null);
  const card2 = useRef<HTMLElement>(null);
  const card3 = useRef<HTMLElement>(null);
  const cardRefs = [card0, card1, card2, card3];

  const cardPositions = useCardPositions(sectionRef, cardRefs);

  // Calcula offset en px desde la posición CSS inicial de cada pieza
  // hasta el centro de su tarjeta destino
  const getTargetOffset = (i: number) => {
    if (!cardPositions[i] || !sectionRef.current) return { tx: 0, ty: 0 };
    const sW = sectionRef.current.offsetWidth;
    const sH = sectionRef.current.offsetHeight;
    const startXpx = (parseFloat(PIECE_START[i].x) / 100) * sW;
    const startYpx = (parseFloat(PIECE_START[i].y) / 100) * sH;
    return {
      tx: cardPositions[i].centerX - startXpx - 50,  // -50 = mitad ancho pieza
      ty: cardPositions[i].centerY - startYpx - 14,  // -14 = mitad alto pieza
    };
  };

  const offsets = [0, 1, 2, 3].map(getTargetOffset);

  return (
    <>
      <ProjectModal project={activeProject} onClose={closeModal} />

      <section
        ref={sectionRef}
        role="region"
        aria-labelledby="projects-title"
        className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
      >
        {/* Piezas Z decorativas — detrás de todo, solo se muestran cuando
            cardPositions está listo y el usuario no prefiere reducir movimiento */}
        {!prefersReduced && cardPositions.length === 4 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[0, 1, 2, 3].map(i => (
              <AnimPiece
                key={i}
                index={i}
                sectionRef={sectionRef}
                targetX={offsets[i].tx}
                targetY={offsets[i].ty}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-10 lg:px-16">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <h2 id="projects-title"
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Proyectos
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
              Una selección de trabajos que reflejan mi enfoque en diseño de interfaces,
              sistemas de diseño y experiencias digitales.
            </p>
          </motion.div>

          {/* Grid — cards siempre completamente opacas al entrar en viewport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                cardRef={cardRefs[i]}
                onOpenModal={setActiveProject}
              />
            ))}
          </div>

          {/* Ver más proyectos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 flex justify-center"
          >
            <a
              href="https://www.behance.net/Zerausdesigner"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver más proyectos en Behance de Zeraus Designer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full
                         border border-primary/40 text-foreground text-sm font-medium
                         transition-all duration-300
                         hover:border-primary hover:text-primary hover:scale-[1.02]
                         hover:shadow-lg hover:shadow-primary/10
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-primary focus-visible:ring-offset-2
                         focus-visible:ring-offset-background"
            >
              Ver más proyectos
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default ProjectsSection;

// TODO: optimizar trayectorias con measurements del Hero para continuidad 1:1
// (coordenadas globales) y añadir modal con imágenes exportadas desde Behance.
