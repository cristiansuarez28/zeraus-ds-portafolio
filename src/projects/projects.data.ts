import imgDesignSystem   from "@/assets/projects/design-system.jpg";
import imgMcdKiosko      from "@/assets/projects/mcd-kiosko.jpg";
import imgMcdKioskoDia   from "@/assets/projects/mcd-kiosko Dia.jpg";
import imgFinappel       from "@/assets/projects/finappel.jpg";
import imgFinappelDia    from "@/assets/projects/finappel dia.jpg";
import imgSlyfox         from "@/assets/projects/slyfox.jpg";
import imgSlyfoxDia      from "@/assets/projects/slyfox dia.jpg";

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  impact: string[];
  behance: string;
  tags: string[];
  image: string;
  imageDia?: string;
};

export const projects: Project[] = [
  {
    id: "design-system",
    title: "Design System DS – Construido desde la práctica",
    summary:
      "Un sistema de diseño creado desde la realidad del día a día: escalable, limpio y pensado para que los equipos diseñen y desarrollen sin fricción.",
    description:
      "Un Design System no es solo una librería de componentes bonitos — es la columna vertebral de cualquier producto SaaS que quiera crecer sin caos. Este sistema fue construido desde la práctica real: cada componente responde a una necesidad concreta del producto, con tokens bien definidos, documentación clara y handoff sin fricción.",
    problem:
      "¿Cuánto tiempo pierde un equipo rediseñando el mismo botón en 5 pantallas distintas? ¿Cuántos reprocesos genera que desarrollo interprete diferente cada entrega? Sin un sistema, cada sprint acumula deuda de diseño que tarde o temprano frena el crecimiento.",
    impact: [
      "Reducción drástica de reprocesos — un componente aprobado se usa en toda la app",
      "Onboarding más rápido para nuevos diseñadores y desarrolladores",
      "Consistencia visual garantizada sin depender de la memoria de nadie",
      "Escalabilidad real: sumar nuevas funciones sin romper lo que ya existe",
      "Ahorro de tiempo estimado del 40% en entregas de UI nuevas",
    ],
    behance:
      "https://www.behance.net/gallery/238316689/Design-System-DS-Construido-desde-la-practica",
    tags: ["Design System", "UI", "Componentes", "SaaS"],
    image: imgDesignSystem,
  },
  {
    id: "mcd-kiosko",
    title: "McDonald's Kiosko",
    summary:
      "Una propuesta visual más fluida, simple y directa para mejorar la experiencia en kioskos de autoservicio. Interfaz más amable y navegación más rápida.",
    description:
      "Los kioskos de autoservicio son el punto de mayor conversión en una tienda física — pero también el mayor punto de abandono cuando la experiencia es confusa. Esta propuesta rediseña el flujo completo priorizando velocidad, claridad y una nueva capa de publicidad contextual que genera expectativa y aumenta el ticket promedio.",
    problem:
      "Cualquier tipo de usuario — adultos mayores, niños, turistas — debe poder hacer su pedido de forma autónoma y rápida. El diseño anterior tenía demasiada fricción visual y perdía oportunidades clave de venta cruzada durante el proceso de compra.",
    impact: [
      "Interfaz intuitiva accesible para cualquier perfil de usuario, sin curva de aprendizaje",
      "Publicidad contextual integrada al flujo — el cliente ve promociones mientras compra",
      "Gancho comercial visual que incentiva agregar más items al pedido",
      "Reducción del tiempo de pedido mediante navegación directa y clara",
      "Mayor conversión al eliminar puntos de confusión en el flujo de compra",
    ],
    behance: "https://www.behance.net/gallery/200501949/Mcdonals-Kiosko",
    tags: ["UI/UX", "Interacción", "Retail", "Autoservicio"],
    image: imgMcdKiosko,
    imageDia: imgMcdKioskoDia,
  },
  {
    id: "finapp",
    title: "Finapp – Tu asistente financiero personal",
    summary:
      "Una app de ahorros pensada para que jóvenes y cualquier usuario controle sus ingresos, egresos y reciba recomendaciones inteligentes sobre sus hábitos de gasto.",
    description:
      "Finapp nació con una premisa clara: que manejar el dinero no tiene que ser complicado ni aburrido. Es un asistente financiero personal que te muestra exactamente en qué estás gastando más, te ayuda a identificar patrones y te da recomendaciones concretas para mejorar tu salud financiera — sin tecnicismos y con una interfaz que cualquiera puede usar.",
    problem:
      "La mayoría de apps financieras están pensadas para expertos. Los jóvenes y usuarios sin cultura financiera abandonan estas herramientas porque se sienten perdidos. El reto era hacer algo poderoso pero tan simple que se sintiera como chatear con un amigo que sabe de dinero.",
    impact: [
      "Control total de ingresos y egresos en una sola vista clara",
      "Categorización automática del gasto para identificar dónde va el dinero",
      "Recomendaciones personalizadas basadas en patrones reales del usuario",
      "Diseño inclusivo: accesible para cualquier edad y nivel de conocimiento financiero",
      "Visualizaciones que convierten datos complejos en decisiones simples",
    ],
    behance: "https://www.behance.net/gallery/174061689/Finappel",
    tags: ["UI", "Mobile", "Finanzas", "Asistente IA"],
    image: imgFinappel,
    imageDia: imgFinappelDia,
  },
  {
    id: "slyfox",
    title: "SlyFox – Branding & Experiencia Digital",
    summary:
      "Identidad fresca con mucha personalidad. Diseño versátil y moderno, preparado para vivir en digital.",
    description:
      "SlyFox es más que branding — es una experiencia digital completa construida para escalar. Páginas a la medida, arquitectura limpia y un sistema visual que funciona igual de bien en modo claro que en modo oscuro. Cada decisión de diseño fue tomada pensando en la accesibilidad visual, la coherencia de marca y la capacidad del producto de crecer sin perder identidad.",
    problem:
      "Muchos proyectos de branding se ven bien en una presentación pero colapsan cuando llegan al mundo digital: colores que no funcionan en pantalla, tipografías ilegibles en oscuro, estructuras que no escalan. SlyFox necesitaba una identidad que fuera sólida desde el día uno en cualquier contexto.",
    impact: [
      "Páginas a la medida con arquitectura escalable lista para crecer",
      "Modo oscuro y modo claro implementados para máxima comodidad visual",
      "Buenas prácticas de accesibilidad y contraste para todos los usuarios",
      "Sistema visual coherente que mantiene la identidad en cualquier plataforma",
      "Base técnica sólida que permite añadir nuevas secciones sin romper el diseño",
    ],
    behance:
      "https://www.behance.net/gallery/235720399/Branding-para-SlyFox-Experiencia-Digital",
    tags: ["Branding", "Identidad", "Dark/Light Mode", "Escalable"],
    image: imgSlyfox,
    imageDia: imgSlyfoxDia,
  },
];
