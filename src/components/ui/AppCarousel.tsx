import { useCallback, useEffect, useRef, useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import type { Product } from "@/services/api";
import { ProductCard } from "./ProductCard";
import styles from "./AppCarousel.module.css";

type Props = {
  items: Product[];
  showArrows?: boolean;
};

export function Carousel({ items, showArrows = true }: Props) {
  const [perView, setPerView] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  // Responsive perView
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Measure actual rendered slide width + gap for pixel-accurate translation
  const measureSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.children[0] as HTMLElement | undefined;
    const secondSlide = track.children[1] as HTMLElement | undefined;
    if (!firstSlide) return;
    if (secondSlide) {
      // distance from start of slide 0 to start of slide 1 = slide width + gap
      setSlideWidth(secondSlide.offsetLeft - firstSlide.offsetLeft);
    } else {
      setSlideWidth(firstSlide.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureSlide();
    window.addEventListener("resize", measureSlide);
    return () => window.removeEventListener("resize", measureSlide);
  }, [measureSlide, perView]);

  const maxIndex = Math.max(0, items.length - perView);
  const { index, next, prev, onTouchStart, onTouchEnd } = useCarousel(maxIndex + 1);

  const translate = slideWidth
    ? `translate3d(${-index * slideWidth}px, 0, 0)`
    : "translate3d(0, 0, 0)";

  return (
    <div className={styles.root}>
      <div
        className={styles.viewport}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Product carousel"
      >
        <div
          ref={trackRef}
          className={styles.track}
          style={{ transform: translate }}
        >
          {items.map((item) => (
            <div key={item.id} className={styles.slide}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
