import styles from "./FloatingShape.module.css";

type Variant = "teal" | "coral";

type Props = {
  variant: Variant;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
};

export function FloatingShape({ variant, top, left, right, bottom, delay = 0 }: Props) {
  return (
    <div
      className={`${styles.shape} ${styles[variant]}`}
      style={{ top, left, right, bottom, animationDelay: `${delay}s` }}
    />
  );
}
