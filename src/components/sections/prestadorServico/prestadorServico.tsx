import React from "react";
import type { Instituicao } from "@/models/marcacao";
import styles from "./styled.module.css";
import Field from "@/ui/field/field";
import Contacts from "@/components/contacts/contacts";
import Address from "@/components/address/address";

export default function PrestadorServico({
  prestador,
}: {
  prestador: Instituicao | null;
}) {
  if (!prestador) return <span className={styles.empty}>Não informado</span>;
  return (
    <div className={styles.gridTwo}>
      <Field label="Nome">
        <span className={styles.labeledValue}>{prestador?.nome}</span>
      </Field>

      <Field label="Contato">
        <Contacts contato={prestador?.contato ?? null} />
      </Field>

      <div className={styles.colSpan2}>
        <Field label="Endereço">
          <Address endereco={prestador?.endereco ?? null} />
        </Field>
      </div>
    </div>
  );
}
