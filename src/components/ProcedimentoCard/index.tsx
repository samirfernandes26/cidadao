"use client";

import Link from "next/link";
import React from "react";
import type { Procedimento } from "@/models";
import { s, riskBadgeColors } from "./styled";

type Props = {
  data: Procedimento;
  detalhesHref?: string;
  onDetalhesClick?: () => void;
  className?: string;
};

export default function ProcedimentoCard({
  data,
  detalhesHref,
  onDetalhesClick,
  className = "",
}: Props) {
  const { titulo, risco, statusLinha1, posicao, hospital, profissional } = data;

  const RiskBadge = (
    <span className={`${s.riskBadgeBase} ${riskBadgeColors[risco]}`}>
      Risco: {risco}
    </span>
  );

  const DetalhesButton = detalhesHref ? (
    <Link href={detalhesHref} className={s.btn}>
      Detalhes
    </Link>
  ) : (
    <button type="button" onClick={onDetalhesClick} className={s.btn}>
      Detalhes
    </button>
  );

  return (
    <article className={`${s.article} ${className}`} aria-label={titulo}>
      <div className={s.row}>
        {/* ícone */}
        <div className={s.iconWrap}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
        <div className={s.header}>
          <div className={s.headerTop}>
            <h3 className={s.title}>{titulo}</h3>
            <div>{RiskBadge}</div>
          </div>

          <p className={s.meta}>
            {statusLinha1}
            {typeof posicao === "number" ? (
              <span> • Posição: {posicao}</span>
            ) : null}
          </p>
          <p className={s.meta}>{hospital}</p>
          <div className={s.action}>{DetalhesButton}</div>
        </div>
      </div>
    </article>
  );
}
