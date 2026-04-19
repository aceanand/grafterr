import { useCallback, useEffect, useState } from "react";
import { GradientText } from "@/components/ui/GradientText";
import { GradientButton } from "@/components/ui/GradientButton";
import { FloatingShape } from "@/components/ui/FloatingShape";
import type { Content } from "@/services/api";
import styles from "./HeroSection.module.css";

type Props = { hero: Content["hero"] };

export function HeroSection({ hero }: Props) {
  const [visible, setVisible] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleCta = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(hero.cta.href);
    target?.scrollIntoView({ behavior: "smooth" });
  }, [hero.cta.href]);

  return (
    <section
      className={styles.hero}
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      {/* Teal circle — left */}
      <div className={styles.shapeLeft}>
        <FloatingShape variant="teal" />
      </div>

      {/* Coral rectangle — right */}
      <div className={styles.shapeRight}>
        <FloatingShape variant="coral" delay={0.8} />
      </div>

      {/* "Looking for a new" */}
      <h1 className={styles.eyebrow}>{hero.eyebrow}</h1>

      {/* "technology provider?" — full gradient */}
      <h2 className={styles.headline}>
        <GradientText>{hero.headlineGradient}</GradientText>
      </h2>

      {/* Subheadline with "success stories" bolded */}
      <p
        className={styles.sub}
        dangerouslySetInnerHTML={{
          __html: hero.subheadline.replace(
            "success stories",
            "<strong>success stories</strong>",
          ),
        }}
      />

      <div className={styles.cta}>
        <GradientButton as="a" href={hero.cta.href} onClick={handleCta}>
          {hero.cta.label}
        </GradientButton>
      </div>
    </section>
  );
}
