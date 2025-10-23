import React from "react";
import styles from "./styled.module.css";
import Field from "@/ui/Field/field";
import Badge from "@/ui/Badge/badge";

export default function StatusMarcacao({
  status,
  posicao,
}: {
  status: string;
  posicao: number | null;
}) {
  return (
    <div className={styles.gridStatus}>
      <Field label="Status">
        <Badge variant="status">{status}</Badge>
      </Field>
      <Field label="Posição na Fila">
        <span className={styles.labeledValue}>{posicao ?? "—"}</span>
      </Field>
    </div>
  );
}
