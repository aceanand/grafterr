import styles from "./GradientText.module.css";

type Props = { children: React.ReactNode };

export function GradientText({ children }: Props) {
  return <span className={styles.text}>{children}</span>;
}
