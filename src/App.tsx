import { useState, useCallback } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransitionProvider } from "@/components/TransitionProvider";
import TransitionOverlay from "@/components/TransitionOverlay";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useFirstVisit } from "@/hooks/useFirstVisit";
import Index from "./pages/Index";
import Proyectos from "./pages/Proyectos";
import SobreMi from "./pages/SobreMi";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

const AppContent = () => {
  const { markVisited } = useFirstVisit();
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    markVisited();
  }, [markVisited]);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <TransitionOverlay />
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TransitionProvider>
            <AppContent />
          </TransitionProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
