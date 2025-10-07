import React from "react";
import type { Marcacao } from "@/models/marcacao";
import styles from "./styled.module.css";
import { safeFormat } from "@/utils/safeFormat";
import { Field, Badge } from "@/ui/ui";

export default function InformacoesBasicas({
  marcacao,
}: {
  marcacao: Marcacao;
}) {
  const dataInclusao = safeFormat(marcacao.data_admissao);
  const dataAgendamento = marcacao.data_agendamento
    ? safeFormat(marcacao.data_agendamento)
    : null;

  return (
    <div className={styles.gridBasic}>
      <Field label="Data de Inclusão">
        <span className={styles.labeledValue}>{dataInclusao}</span>
      </Field>

      <Field label="Data do Agendamento">
        <span className={styles.labeledValue}>{dataAgendamento ?? "—"}</span>
      </Field>

      <Field label="Risco">
        <Badge variant="risco">{marcacao.classificacao_de_risco}</Badge>
      </Field>

      <Field label="Status">
        <Badge variant="status">{marcacao.status_marcacao}</Badge>
      </Field>

      <Field label="Posição na Fila">
        <span className={styles.labeledValue}>
          {marcacao.posicao_na_fila ?? "—"}
        </span>
      </Field>
    </div>
  );
}
