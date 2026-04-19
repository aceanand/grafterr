import type { Product } from "@/services/api";
import styles from "./ProductCard.module.css";

type Props = {
  item: Product;
};

export function ProductCard({ item }: Props) {
  return (
    <div className={styles.wrapper}>
      {/* Title is ABOVE the image card — matches Figma */}
      <span className={styles.title}>{item.title}</span>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={item.image}
          alt={item.title}
          loading="lazy"
          width={800}
          height={600}
        />
      </div>
    </div>
  );
}
