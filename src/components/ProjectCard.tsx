import { motion } from "framer-motion";
import Chip from "./Chip";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const ProjectCard = ({ title, description, tags, index }: ProjectCardProps) => (
  <motion.article
    custom={index}
    variants={cardVariant}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    whileHover={{ y: -5, transition: { duration: 0.25 } }}
    className="group relative rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
  >
    <h3 className="text-heading-3">{title}</h3>
    <p className="mt-3 text-body-lg text-muted-foreground">{description}</p>
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Chip key={tag}>{tag}</Chip>
      ))}
    </div>
  </motion.article>
);

export default ProjectCard;
