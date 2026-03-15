import SEOHead from "@/components/SEOHead";
import HeroZSection from "@/components/HeroZSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/projects/ProjectsSection";
import AboutTabsSection from "@/components/AboutTabsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

/* ── Page ── */
const Index = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Zeraus DS – Design Systems Lead & Estrategia Visual"
      description="Portafolio de Cristian Suarez – Lead de Design System especializado en UI, SaaS y productos digitales. Diseño interfaces claras, escalables y con intención."
      url="https://zerausds.com/"
    />

    {/* ── Hero: Z modular + scroll animation ── */}
    <HeroZSection />

    {/* ── Projects: prueba del trabajo primero ── */}
    <ProjectsSection />

    {/* ── Separador de marca ── */}
    <div className="container-portfolio" aria-hidden="true">
      <div className="flex h-[3px] w-full overflow-hidden rounded-full">
        <div className="flex-[2]"  style={{ background: "#FDB100" }} />
        <div className="flex-[3]"  style={{ background: "#F75010" }} />
        <div className="flex-[3]"  style={{ background: "#D00952" }} />
        <div className="flex-[2]"  style={{ background: "#6E00A3" }} />
      </div>
    </div>

    {/* ── Services: qué ofrezco, después de ver el trabajo ── */}
    <ServicesSection />

{/* ── About ── */}
    <AboutTabsSection />

    {/* ── Testimonios reales ── */}
    <TestimonialsSection />

    {/* ── Contact ── */}
    <ContactSection />
  </div>
);

export default Index;
