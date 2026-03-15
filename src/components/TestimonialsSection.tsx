/**
 * TestimonialsSection — carrusel infinito de testimonios
 * ────────────────────────────────────────────────────────
 * Dos filas moviéndose en sentidos opuestos.
 * Se pausa al hacer hover. Respeta prefers-reduced-motion.
 * Soporta modo claro y oscuro automáticamente.
 */

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ── Datos ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "Tuve la oportunidad de trabajar con Cris desde distintas áreas de la organización. Destaca por su capacidad para convertir necesidades del negocio en soluciones visuales claras y funcionales. Es un profesional creativo, colaborativo y muy comprometido con la calidad de su trabajo.",
    name: "Alexandra Grisales Duque",
    role: "Especialista Derecho Digital · SaaS",
    color: "#F75010",
  },
  {
    quote:
      "Cristian es innovador en sus propuestas, ha contribuido de forma positiva y muy relevante en nuestros procesos de mejoras y nuevos desarrollos en nuestro software de auditoría. Es orientado a las necesidades de nuestros clientes. Súper recomendado!!",
    name: "Karem Camargo Ramírez",
    role: "Contador Público · Auditor",
    color: "#DB1E3F",
  },
  {
    quote:
      "Tiene una gran técnica como profesor, su fuerte está en Figma, un programa con el cual tod@s los Diseñadores UX UI estamos involucrados a fondo. Súper recomendado si quieres avanzar con Diseñador.",
    name: "Martha Liliana Torres Prieto",
    role: "Diseñadora UX UI",
    color: "#D00952",
  },
  {
    quote:
      "Cristian es una persona súper activa! Siempre dispuesto a ayudar. Trabajar con él es espectacular, ya que siempre te incentiva a hacer cosas y pensar de manera diferente.",
    name: "Francina Demattei",
    role: "Abogada · ART",
    color: "#920087",
  },
  {
    quote:
      "Excelente diseñador UX, organizado, un gran maestro y profesional, una buena persona. Aprendí y sigo aprendiendo de él.",
    name: "Alejandra Espinosa Jiménez",
    role: "Apoyo PMO · Asistente Administrativa",
    color: "#6E00A3",
  },
  {
    quote:
      "Cristian es un excelente compañero, dedicado a los detalles, a indagar cada parte, dispuesto a debatir e investigar las razones que llevan a un cambio, siempre dispuesto a construir un buen proyecto.",
    name: "Karen Sánchez",
    role: "UX Design · Promptitude.io",
    color: "#FDB100",
  },
  {
    quote:
      "Un gran profesional con unas capacidades de liderazgo y altruismo, sin duda un gran formador, siempre ayudando a los demás en lo posible, además de innovar en su día a día.",
    name: "Cesar Cardona",
    role: "Universidad Pedagógica Nacional",
    color: "#F75010",
  },
  {
    quote:
      "Aprendí mucho en el transcurso de temas vistos y fuera de eso, como persona, excelente profesional, amigo y persona.",
    name: "Christian David Santa Aldana",
    role: "Design System · UI-UX Designer",
    color: "#D00952",
  },
  {
    quote:
      "Un excelente profesional y diseñador UX UI, gran colega y compañero!!",
    name: "Andrea Pérez Álvarez",
    role: "UX UI Designer · Product Designer",
    color: "#920087",
  },
  {
    quote:
      "Excelente compañero de equipo.",
    name: "Christian Sotelo",
    role: "UXC UI Designer · Figma | Ps | Ai",
    color: "#6E00A3",
  },
];

// Dividir en dos filas
const ROW_A = TESTIMONIALS.slice(0, 3).concat(TESTIMONIALS.slice(0, 3)); // duplicados para loop
const ROW_B = TESTIMONIALS.slice(3, 6).concat(TESTIMONIALS.slice(3, 6));

// ── Card ──────────────────────────────────────────────────────────────────────
const TestimonialCard = ({ quote, name, role, color }: (typeof TESTIMONIALS)[number]) => {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div
      className="w-72 sm:w-80 shrink-0 rounded-2xl border border-border
                 bg-card p-6 flex flex-col gap-4
                 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Comilla decorativa */}
      <svg
        viewBox="0 0 32 24" fill="none"
        className="w-7 h-5 shrink-0"
        style={{ color: `${color}66` }}
        aria-hidden="true"
      >
        <path
          d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 7.2 10.4H12V24H0ZM20 24V14.4C20 6.4 24.8 1.6 34.4 0L36 2.4C30.4 3.6 27.6 6.4 27.2 10.4H32V24H20Z"
          fill="currentColor"
        />
      </svg>

      {/* Texto */}
      <p className="text-sm text-foreground/75 leading-relaxed flex-1">
        {quote}
      </p>

      {/* Autor */}
      <div className="pt-3 border-t border-border flex items-center gap-3">
        {/* Avatar de iniciales */}
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center
                     text-[10px] font-bold text-white"
          style={{ background: color }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
        </div>
      </div>
    </div>
  );
};

// ── Fila de carrusel ──────────────────────────────────────────────────────────
const CarouselRow = ({
  items,
  direction = "left",
  duration = 32,
}: {
  items: typeof ROW_A;
  direction?: "left" | "right";
  duration?: number;
}) => {
  const reduced = useReducedMotion();
  const from = direction === "left" ? "0%" : "-50%";
  const to   = direction === "left" ? "-50%" : "0%";

  return (
    <div className="overflow-hidden group">
      <motion.div
        className="flex gap-4"
        style={{ width: "max-content" }}
        animate={reduced ? {} : { x: [from, to] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        // Pausa al hover sobre la fila
        whileHover={reduced ? {} : { animationPlayState: "paused" } as never}
      >
        {items.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </motion.div>
    </div>
  );
};

// ── Sección principal ─────────────────────────────────────────────────────────
const TestimonialsSection = () => (
  <section
    role="region"
    aria-labelledby="testimonials-title"
    className="py-16 sm:py-20 bg-secondary overflow-hidden"
  >
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 sm:mb-14 px-5 md:px-10 lg:px-16 max-w-6xl mx-auto"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 mb-2">
        Testimonios
      </p>
      <h2
        id="testimonials-title"
        className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
      >
        Lo que dicen de mí
      </h2>
    </motion.div>

    {/* Carruseles con fade en los bordes */}
    <div className="relative space-y-4">
      {/* Gradiente borde izquierdo */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10
                   bg-gradient-to-r from-secondary to-transparent"
        aria-hidden="true"
      />
      {/* Gradiente borde derecho */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10
                   bg-gradient-to-l from-secondary to-transparent"
        aria-hidden="true"
      />

      {/* Fila A — izquierda */}
      <CarouselRow items={ROW_A} direction="left" duration={36} />

      {/* Fila B — derecha (sentido opuesto) */}
      <CarouselRow items={ROW_B} direction="right" duration={42} />
    </div>
  </section>
);

export default TestimonialsSection;
