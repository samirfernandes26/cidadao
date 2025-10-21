"use client";
import { PropsWithChildren } from "react";
import styles from "./style.module.css";

type Props = PropsWithChildren<{
  title: string;
  className?: string;
}>;

export default function Section({ title, className, children }: Props) {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}
