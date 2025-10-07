import React from "react";
import styles from "./styled.module.css";

type Props = { label: string; children: React.ReactNode; className?: string };
export default function Field({ label, children, className }: Props) {
  return (
    <div className={`${styles.labeled} ${className ?? ""}`}>
      <span className={styles.labeledLabel}>{label}</span>
      {children}
    </div>
  );
}
