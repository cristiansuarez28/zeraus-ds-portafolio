import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface TransitionCtx {
  isActive: boolean;
  start: () => void;
  stop: () => void;
}

const TransitionContext = createContext<TransitionCtx>({
  isActive: false,
  start: () => {},
  stop: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const start = useCallback(() => setIsActive(true), []);
  const stop = useCallback(() => setIsActive(false), []);

  return (
    <TransitionContext.Provider value={{ isActive, start, stop }}>
      {children}
    </TransitionContext.Provider>
  );
};
