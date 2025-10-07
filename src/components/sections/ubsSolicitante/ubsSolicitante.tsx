import React from "react";
import type { Instituicao } from "@/models/marcacao";
import Field from "@/ui/field/field";
import Contacts from "@/components/contacts/contacts";
import Address from "@/components/address/address";
import styles from "./styled.module.css";

export default function UbsSolicitante({ ubs }: { ubs: Instituicao | null }) {
  if (!ubs) return <span className={styles.empty}>—</span>;
  return (
    <div className={styles.gridTwo}>
      <Field label="Nome">
        <span className={styles.labeledValue}>{ubs?.nome ?? "—"}</span>
      </Field>

      <Field label="Contato">
        <Contacts contato={ubs?.contato ?? null} />
      </Field>

      <div className={styles.colSpan2}>
        <Field label="Endereço">
          <Address endereco={ubs?.endereco ?? null} />
        </Field>
      </div>
    </div>
  );
}
