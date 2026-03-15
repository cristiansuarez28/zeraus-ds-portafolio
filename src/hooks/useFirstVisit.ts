import { useState, useEffect } from "react";

const KEY = "zeraus_visited";

/**
 * Returns true only on the first visit of the session.
 * After the preloader finishes, call `markVisited()`.
 */
export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) !== "1";
    } catch {
      return true;
    }
  });

  const markVisited = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setIsFirstVisit(false);
  };

  return { isFirstVisit, markVisited };
}
