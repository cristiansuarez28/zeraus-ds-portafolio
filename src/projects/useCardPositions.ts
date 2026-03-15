import { RefObject, useState, useLayoutEffect } from "react";

export type CardRect = {
  /** Centro X de la tarjeta relativo al contenedor section */
  centerX: number;
  /** Centro Y de la tarjeta relativo al contenedor section */
  centerY: number;
  width: number;
  height: number;
};

/**
 * useCardPositions
 * ────────────────────────────────────────────────────────────────────────────
 * Mide el centro de cada tarjeta relativo al contenedor section.
 * Útil para calcular las coordenadas destino de las piezas Z animadas.
 *
 * CÓMO AJUSTAR:
 *  · Los valores se actualizan automáticamente al hacer resize.
 *  · Pasa los mismos refs que usan los <article> de cada tarjeta.
 *  · centerX/centerY son relativas al borde top-left del containerRef.
 *
 * CÓMO RELACIONAR con piezas Z:
 *  positions[0] → destino de Z1 (primera tarjeta)
 *  positions[1] → destino de Z2 (segunda tarjeta)
 *  ... etc.
 */
export function useCardPositions(
  containerRef: RefObject<HTMLElement>,
  cardRefs: RefObject<HTMLElement>[]
): CardRect[] {
  const [positions, setPositions] = useState<CardRect[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;

      // getBoundingClientRect es viewport-relative en el momento de la llamada.
      // La diferencia entre container y card cancela el offset de scroll,
      // dando la posición relativa entre ambos — correcta en cualquier scroll.
      const containerRect = containerRef.current.getBoundingClientRect();

      const rects = cardRefs.map((ref) => {
        if (!ref.current) return { centerX: 0, centerY: 0, width: 0, height: 0 };
        const r = ref.current.getBoundingClientRect();
        return {
          centerX: r.left + r.width / 2 - containerRect.left,
          centerY: r.top + r.height / 2 - containerRect.top,
          width: r.width,
          height: r.height,
        };
      });

      setPositions(rects);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return positions;
}
