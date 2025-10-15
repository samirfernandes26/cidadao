import React from "react";
import type { Endereco } from "@/models/marcacao";
import styles from "./styled.module.css";

export default function Address({ endereco }: { endereco: Endereco | null }) {
  if (!endereco) return <span className={styles.empty}>Não disponível</span>;
  const { logradouro, numero, complemento, bairro, cidade, estado, cep } =
    endereco;
  const parts = [
    [logradouro].filter(Boolean).join(" "),
    numero && `Nº: ${numero}`,
    complemento,
    bairro && `BAIRRO: ${bairro}`,
    cidade && estado ? `CIDADE: ${cidade} - ${estado}` : cidade || estado,
    cep,
  ].filter(Boolean);
  return <div className={styles.address}>{parts.join("\n")}</div>;
}
