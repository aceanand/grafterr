import { GradientButton } from "@/components/ui/GradientButton";
import styles from "./LandingSkeleton.module.css";

type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className={styles.errorBox}>
      <h2 className={styles.errorTitle}>Something went wrong</h2>
      <p className={styles.errorMsg}>{message}</p>
      <GradientButton onClick={onRetry}>Try again</GradientButton>
    </div>
  );
}
