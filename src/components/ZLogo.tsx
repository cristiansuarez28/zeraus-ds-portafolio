import { motion, type Variants } from "framer-motion";

interface ZLogoProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Placeholder "Z" logo for Zeraus.
 * Replace the <text> with an <image> or inline SVG path when ready.
 */
const ZLogo = ({ size = 80, color = "#FFFFFF", className = "", animate = true }: ZLogoProps) => {
  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? { variants: logoVariants, initial: "hidden", animate: "visible", exit: "exit" }
    : {};

  return (
    <Wrapper {...(wrapperProps as any)} className={`flex items-center justify-center ${className}`} style={{ willChange: "transform, opacity, filter" }}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Zeraus logo">
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={color}
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="700"
          fontSize="52"
          letterSpacing="-2"
        >
          Z
        </text>
      </svg>
    </Wrapper>
  );
};

export default ZLogo;
