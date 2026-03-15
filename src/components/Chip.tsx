import { type ReactNode } from "react";

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-secondary text-caption text-muted-foreground font-medium border border-transparent hover:border-primary/40 transition-colors duration-200">
    {children}
  </span>
);

export default Chip;
