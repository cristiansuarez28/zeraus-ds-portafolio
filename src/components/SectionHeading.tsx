import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading = ({ title, subtitle, center = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={center ? "text-center" : ""}
  >
    <h2 className="text-heading-2">{title}</h2>
    {subtitle && <p className="mt-4 text-body-lg text-muted-foreground max-w-lg">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
