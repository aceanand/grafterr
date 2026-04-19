import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel(totalSlides: number) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(totalSlides - 1, i)),
    [totalSlides],
  );

  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [clamp]);
  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [clamp]);
  const goTo = useCallback((i: number) => setIndex(clamp(i)), [clamp]);

  // Reset if totalSlides shrinks below current index
  useEffect(() => {
    if (index > totalSlides - 1) setIndex(Math.max(0, totalSlides - 1));
  }, [totalSlides, index]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next();
        else prev();
      }
      touchStartX.current = null;
    },
    [next, prev],
  );

  return { index, next, prev, goTo, onTouchStart, onTouchEnd };
}
