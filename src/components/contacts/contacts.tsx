import React from "react";
import type { Contato } from "@/models/marcacao";
import styles from "./styled.module.css";

export default function Contacts({ contato }: { contato: Contato | null }) {
  if (!contato || (!contato.telefone && !contato.email))
    return <span className={styles.empty}>Não disponível</span>;
  return (
    <div className={styles.contacts}>
      {contato.telefone && <span>{contato.telefone}</span>}
      {contato.email && <span>{contato.email}</span>}
    </div>
  );
}
