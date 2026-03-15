import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container-portfolio flex flex-col md:flex-row items-center justify-between gap-4">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-caption text-muted-foreground"
      >
        © {new Date().getFullYear()} Zeraus. Todos los derechos reservados.
      </motion.p>
      <div className="flex items-center gap-6">
        {[
          { label: "LinkedIn",  href: "https://www.linkedin.com/in/cristiansuarez32/" },
          { label: "Instagram", href: "https://www.instagram.com/zerauscris?igsh=dHE2em5rcWhoZnYz&utm_source=qr" },
          { label: "Behance",   href: "https://www.behance.net/Zerausdesigner" },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
             aria-label={`Visitar ${label} de Zeraus DS`}
             className="text-caption text-muted-foreground hover:text-primary transition-colors duration-200">
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
