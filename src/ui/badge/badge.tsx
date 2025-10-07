import React from "react";
import styles from "./styled.module.css";

export type BadgeVariant = "risco" | "status";

export default function Badge({
  variant,
  children,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
}) {
  const tone = variant === "risco" ? styles.badgeRisco : styles.badgeStatus;
  return <span className={`${styles.badge} ${tone}`}>{children}</span>;
}
