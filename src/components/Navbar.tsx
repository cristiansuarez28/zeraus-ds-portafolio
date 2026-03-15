import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import TransitionLink from "./TransitionLink";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { label: "Inicio",     to: "/" },
  { label: "Proyectos",  to: "/proyectos" },
  { label: "Sobre mí",   to: "/sobre-mi" },
  { label: "Contacto",   to: "/contacto" },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (window.scrollY > 10) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="container-portfolio flex items-center justify-between h-14">
          {/* Logo */}
          <TransitionLink
            to="/"
            className="text-heading-3 text-gradient font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Zeraus
          </TransitionLink>

          {/* Desktop links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.to}
                  to={link.to}
                  className="text-caption font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Hamburger — only on mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className="h-px bg-border" />
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Panel flotante */}
            <motion.div
              key="mob-panel"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[66px] left-4 right-4 z-40 md:hidden
                         bg-background/95 backdrop-blur-xl
                         border border-border
                         rounded-2xl shadow-2xl overflow-hidden"
            >
              <nav className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                  >
                    <TransitionLink
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center h-12 text-base font-medium
                                 text-foreground hover:text-primary
                                 border-b border-border/40 last:border-0
                                 transition-colors duration-200"
                    >
                      {link.label}
                    </TransitionLink>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
