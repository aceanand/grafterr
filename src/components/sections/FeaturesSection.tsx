import { useEffect, useRef, useState } from "react";
import { GradientText } from "@/components/ui/GradientText";
import { FloatingShape } from "@/components/ui/FloatingShape";
import { Carousel } from "@/components/ui/AppCarousel";
import type { Content } from "@/services/api";
import styles from "./FeaturesSection.module.css";

type Props = { features: Content["featuresSection"] };

export function FeaturesSection({ features }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className={styles.section}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Teal circle — left of header */}
      <div className={styles.shapeLeft}>
        <FloatingShape variant="teal" />
      </div>

      {/* Coral rectangle — right of header */}
      <div className={styles.shapeRight}>
        <FloatingShape variant="coral" delay={1} />
      </div>

      <div className={styles.header}>
        <h2 className={styles.headline}>
          {features.title}{" "}
          <GradientText>{features.titleAccent}</GradientText>{" "}
          {features.titleSuffix}
        </h2>
        <p className={styles.subtitle}>{features.subtitle}</p>
        <div className={styles.divider} />
      </div>

      <Carousel
        items={features.products}
        showArrows={features.carousel.showArrows}
      />
    </section>
  );
}
