import React from "react";
import type { Procedimento } from "@/interfaces/marcacao";
import styles from "./styled.module.css";

export default function Procedimentos({ itens }: { itens: Procedimento[] }) {
  if (!itens?.length)
    return <span className={styles.empty}>Nenhum procedimento cadastrado</span>;
  return (
    <ul>
      {itens.map((procedimento) => (
        <li key={procedimento.marcacao_id} className={styles.labeledValue}>
          {procedimento.descricao}
        </li>
      ))}
    </ul>
  );
}
