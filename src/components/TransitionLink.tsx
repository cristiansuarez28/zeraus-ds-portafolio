import React, { useCallback, type ReactNode, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "./TransitionProvider";

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const TRANSITION_DURATION = 700; // ms – matches overlay enter time

const TransitionLink = ({ to, children, className = "", style, onClick }: TransitionLinkProps) => {
  const navigate = useNavigate();
  const { start, stop } = useTransition();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      onClick?.();
      start();
      setTimeout(() => {
        navigate(to);
        window.scrollTo({ top: 0, behavior: "instant" });
        // small delay to let exit animation start
        setTimeout(stop, 500);
      }, TRANSITION_DURATION);
    },
    [to, navigate, start, stop, onClick],
  );

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

export default TransitionLink;
