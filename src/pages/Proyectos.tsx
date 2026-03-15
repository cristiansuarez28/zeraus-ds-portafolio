import SEOHead from "@/components/SEOHead";
import ProjectsSection from "@/projects/ProjectsSection";

const Proyectos = () => (
  <div className="min-h-screen bg-background pt-14">
    <SEOHead
      title="Proyectos – Zeraus DS"
      description="Casos de estudio y proyectos de diseño de sistemas, UI y productos SaaS por Cristian Suarez."
      url="https://zerausds.com/proyectos"
      keywords={["design system projects", "ui case studies", "saas design", "portfolio"]}
    />
    <ProjectsSection />
  </div>
);

export default Proyectos;
