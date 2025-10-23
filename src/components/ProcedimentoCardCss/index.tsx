"use client";

import Link from "next/link";
import React from "react";
import type { Procedimento } from "@/interfaces";
import styles from "./ProcedimentoCardCss.module.css";

type Props = {
  data: Procedimento;
  detalhesHref?: string; // quando vier, o card inteiro vira Link
  onDetalhesClick?: () => void;
  className?: string;
};

// Mapeia rótulo de risco -> classe CSS do módulo
const riskClassByLabel: Record<string, string> = {
  Baixo: styles.riskBaixo,
  Moderado: styles.riskModerado,
  Alto: styles.riskAlto,
  Crítico: styles.riskCritico,

  // Se vierem rótulos do backend diferentes, caem em estilos próximos:
  Intermediária: styles.riskModerado,
  "Não Aguda": styles.riskBaixo,
};

export default function ProcedimentoCard({
  data,
  detalhesHref,
  onDetalhesClick,
  className = "",
}: Props) {
  const { titulo, risco, statusLinha1, posicao, hospital } = data;

  const riskTone = riskClassByLabel[risco] ?? styles.riskModerado;

  const RiskBadge = (
    <span className={styles.riskBadgeBase}>
      <span style={{ color: "#222", fontWeight: 800 }}>C.R.:</span>{" "}
      <span className={riskTone}>{risco}</span>
    </span>
  );

  const CardInner = (
    <div className={styles.row}>
      {/* Ícone */}
      <div className={styles.iconWrap}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 8v5a4 4 0 0 0 8 0V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="17" cy="5" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Conteúdo */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h3 className={styles.title}>{titulo}</h3>
          <div className={styles.badgeWrap}>{RiskBadge}</div>
        </div>

        <p className={styles.meta}>
          {statusLinha1}
          {typeof posicao === "number" ? (
            <span> Posição na fila: {posicao}</span>
          ) : null}
        </p>

        <p className={styles.meta}>{hospital}</p>

        {/* Botão apenas quando NÃO houver href (fallback) */}
        {!detalhesHref && (
          <div className={styles.action}>
            <button
              type="button"
              onClick={onDetalhesClick}
              className={styles.btn}
            >
              Detalhes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Quando houver href, o card inteiro vira <Link/>

  if (detalhesHref) {
    return (
      <Link
        href={detalhesHref}
        className={`${styles.article} ${styles.clickable} ${className}`}
        aria-label={titulo}
        onClick={onDetalhesClick}
      >
        {CardInner}
      </Link>
    );
  }

  if (onDetalhesClick) {
    return (
      <article
        className={`${styles.article} ${styles.clickable} ${className}`}
        aria-label={titulo}
        onClick={onDetalhesClick}
        style={{ cursor: "pointer" }}
      >
        {CardInner}
      </article>
    );
  }

  // Sem href, mantém <article/>
  return (
    <article className={`${styles.article} ${className}`} aria-label={titulo}>
      {CardInner}
    </article>
  );
}
