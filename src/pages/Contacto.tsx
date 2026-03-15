import SEOHead from "@/components/SEOHead";
import ContactSection from "@/components/ContactSection";

const Contacto = () => (
  <div className="min-h-screen bg-background pt-24">
    <SEOHead
      title="Contacto – Zeraus DS"
      description="¿Tienes un proyecto en mente? Hablemos. Contacta a Cristian Suarez para proyectos de Design System, UI y productos digitales."
      url="https://zerausds.com/contacto"
      keywords={["contactar diseñador", "contratar ui designer", "diseño de sistemas", "freelance designer"]}
    />
    <ContactSection />
  </div>
);

export default Contacto;
