import React from "react";
import styles from "./styles.module.css";

type Props = { title: string; children: React.ReactNode };
export default function Section({ title, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>{title}</div>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
