import SEOHead from "@/components/SEOHead";
import AboutTabsSection from "@/components/AboutTabsSection";

const SobreMi = () => (
  <div className="min-h-screen bg-background pt-14">
    <SEOHead
      title="Sobre mí – Zeraus DS"
      description="Cristian Suarez – Lead de Design System con +5 años diseñando productos SaaS. Conoce mi perfil, enfoque y herramientas."
      url="https://zerausds.com/sobre-mi"
      keywords={["cristian suarez designer", "design system lead", "ui designer colombia", "saas designer"]}
    />
    <AboutTabsSection />
  </div>
);

export default SobreMi;
