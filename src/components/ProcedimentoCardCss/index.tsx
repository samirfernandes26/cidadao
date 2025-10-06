"use client";

import Link from "next/link";
import React from "react";
import type { Procedimento } from "@/models";
import styles from "./ProcedimentoCardCss.module.css";

type Props = {
  data: Procedimento;
  detalhesHref?: string;
  onDetalhesClick?: () => void;
  className?: string;
};

const riskClassMap: Record<Procedimento["risco"], string> = {
  Baixo: styles.riskBaixo,
  Moderado: styles.riskModerado,
  Alto: styles.riskAlto,
  Crítico: styles.riskCritico,
};

export default function ProcedimentoCardCss({
  data,
  detalhesHref,
  onDetalhesClick,
  className = "",
}: Props) {
  const { titulo, risco, statusLinha1, posicao, hospital, profissional } = data;

  const RiskBadge = (
    <span className={`${styles.riskBadgeBase} ${riskClassMap[risco]}`}>
      Risco: {risco}
    </span>
  );

  const DetalhesButton = detalhesHref ? (
    <Link
      href={detalhesHref}
      className={styles.btn}
      aria-label={`Ver detalhes de ${titulo}`}
    >
      Detalhes
    </Link>
  ) : (
    <button
      type="button"
      onClick={onDetalhesClick}
      className={styles.btn}
      aria-label={`Ver detalhes de ${titulo}`}
    >
      Detalhes
    </button>
  );

  return (
    <article className={`${styles.article} ${className}`} aria-label={titulo}>
      <div className={styles.row}>
        {/* ícone */}
        <div className={styles.iconWrap} aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="M5 8v5a4 4 0 0 0 8 0V6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="17"
              cy="5"
              r="2"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* conteúdo */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h3 className={styles.title} title={titulo}>
              {titulo}
            </h3>
            <div className={styles.badgeWrap}>{RiskBadge}</div>
          </div>

          <p className={styles.meta}>
            {statusLinha1}
            {typeof posicao === "number" ? (
              <span> • Posição: {posicao}</span>
            ) : null}
          </p>
          <p className={styles.meta}>
            {hospital}
            {profissional ? (
              <>
                <br />
                {profissional}
              </>
            ) : null}
          </p>
        </div>

        {/* ação */}
        <div className={styles.action}>{DetalhesButton}</div>
      </div>
    </article>
  );
}
