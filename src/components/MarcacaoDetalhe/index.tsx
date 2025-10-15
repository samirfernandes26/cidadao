import React from "react";
import { useRouter } from "next/navigation";
import type { Marcacao } from "@/models/marcacao";
import styles from "./styled.module.css";
import Section from "@/ui/section/section";
import InformacoesBasicas from "@/components/sections/InformacoesBasicas/InformacoesBasicas";
import UbsSolicitante from "@/components/sections/ubsSolicitante/ubsSolicitante";
import StatusMarcacao from "@/components/sections/statusMarcacao/statusMarcacao";
import PrestadorServico from "@/components/sections/prestadorServico/prestadorServico";
import Procedimentos from "@/components/sections/procedimentos/procedimentos";

export default function MarcacaoDetalhe({ marcacao }: { marcacao: Marcacao }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <button
          type="button"
          className={styles.btnVoltarTopo}
          onClick={() => {
            router.back();
          }}
          aria-label="Voltar"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 19.5L8.25 12l7.5-7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className={styles.titulo}>
          Detalhes da Marcação:{" "}
          <span className={styles.id}>{marcacao.agendamento_id}</span>
        </h1>
      </div>

      <Section title="Informações Básicas">
        <InformacoesBasicas marcacao={marcacao} />
      </Section>

      <Section title="Procedimentos">
        <Procedimentos itens={marcacao.procedimentos} />
      </Section>

      <Section title="UBS Solicitante">
        <UbsSolicitante ubs={marcacao.ubs_solicitante ?? null} />
      </Section>

      <Section title="Status da Marcação">
        <StatusMarcacao
          status={marcacao.status_marcacao}
          posicao={marcacao.posicao_na_fila}
        />
      </Section>

      <Section title="Prestador de Serviço">
        <PrestadorServico prestador={marcacao.prestador_servico ?? null} />
      </Section>

      {/* Botão de voltar centralizado no final */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <button
          type="button"
          className={styles.btnVoltarBottom}
          onClick={() => {
            router.back();
          }}
          aria-label="Voltar para lista"
        >
          Voltar para lista
        </button>
      </div>
    </div>
  );
}
