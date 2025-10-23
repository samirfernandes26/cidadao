import React from "react";
import { useRouter } from "next/navigation";
import type { Marcacao } from "@/interfaces/marcacao";
import styles from "./styled.module.css";
import Section from "../Sections/PerfilSection/perfilSection";
import InformacoesBasicas from "../Sections/InformacoesBasicas/InformacoesBasicas";
import Procedimentos from "../Sections/Procedimentos/procedimentos";
import UbsSolicitante from "../Sections/UbsSolicitante/ubsSolicitante";
import StatusMarcacao from "../Sections/StatusMarcacao/statusMarcacao";
import PrestadorServico from "../Sections/PrestadorServico/prestadorServico";

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
