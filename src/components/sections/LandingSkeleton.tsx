import { Skeleton } from "@/components/ui/AppSkeleton";
import styles from "./LandingSkeleton.module.css";

export function LandingSkeleton() {
  return (
    <div className={styles.wrap}>
      {/* Hero skeleton */}
      <div className={styles.heroSkeleton}>
        <Skeleton width={260} height={40} radius={8} />
        <Skeleton width={340} height={40} radius={8} />
        <Skeleton width={380} height={16} radius={6} />
        <Skeleton width={320} height={16} radius={6} />
        <Skeleton width={140} height={46} radius={999} />
      </div>

      {/* Feature cards skeleton */}
      <div className={styles.cards}>
        <Skeleton height={320} radius={16} />
        <Skeleton height={320} radius={16} />
        <Skeleton height={320} radius={16} />
      </div>
    </div>
  );
}
