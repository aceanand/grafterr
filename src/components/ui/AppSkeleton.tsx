import styles from "./AppSkeleton.module.css";

type Props = {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
};

export function Skeleton({ width, height = 16, radius, className = "" }: Props) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: width ?? "100%",
        height,
        borderRadius: radius,
      }}
    />
  );
}
