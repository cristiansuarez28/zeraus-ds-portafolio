import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";

// ── Mismos colores que TransitionOverlay ─────────────────────────────────────
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

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase("exit"), 1000);
    const t2 = setTimeout(onComplete, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete, reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {phase !== undefined && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          style={{ willChange: "contents" }}
        >
          {/* Colour bands */}
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${bandColors.length}, 1fr)` }}>
            {bandColors.map((color, i) => (
              <motion.div
                key={i}
                style={{ backgroundColor: color, willChange: "transform" }}
                initial={{ y: 0 }}
                animate={
                  phase === "exit"
                    ? { y: "-100%", transition: { duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] } }
                    : {}
                }
              />
            ))}
          </div>

          {/* LETRA_Z.jpg — misma imagen que TransitionOverlay */}
          <AnimatePresence>
            {phase === "logo" && (
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 140, damping: 18 } }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(6px)", transition: { duration: 0.3 } }}
              >
                <img src="/LETRA_Z.jpg" alt="Zeraus DS" className="w-48 h-48 object-contain" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
