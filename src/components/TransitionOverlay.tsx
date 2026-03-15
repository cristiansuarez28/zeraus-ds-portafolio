import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "./TransitionProvider";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";

const bandColors = [
  "#FFCE5B",
  "#FDB100",
  "#FD5C05",
  "#CB005B",
  "#6500AA",
  "#082280",
  "#6500AA",
  "#CB005B",
];

const TransitionOverlay = () => {
  const { isActive } = useTransition();
  const reduced = useReducedMotionPref();

  if (reduced) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="transition-overlay"
          className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
        >
          {/* Bands enter from bottom */}
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${bandColors.length}, 1fr)` }}>
            {bandColors.map((color, i) => (
              <motion.div
                key={i}
                style={{ backgroundColor: color, willChange: "transform" }}
                initial={{ y: "100%" }}
                animate={{ y: 0, transition: { duration: 0.45, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ y: "-100%", transition: { duration: 0.45, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] } }}
              />
            ))}
          </div>
          {/* Z logo in center */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, type: "spring", stiffness: 150, damping: 18 } }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.2 } }}
          >
            <img src="/LETRA_Z.jpg" alt="Z" className="w-48 h-48 object-contain" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
