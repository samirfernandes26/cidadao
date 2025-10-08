import React from "react";
import type { Marcacao } from "@/models/marcacao";
import styles from "./styled.module.css";
import Section from "@/ui/section/section";
import InformacoesBasicas from "@/components/sections/InformacoesBasicas/InformacoesBasicas";
import UbsSolicitante from "@/components/sections/ubsSolicitante/ubsSolicitante";
import StatusMarcacao from "@/components/sections/statusMarcacao/statusMarcacao";
import PrestadorServico from "@/components/sections/prestadorServico/prestadorServico";
import Procedimentos from "@/components/sections/procedimentos/procedimentos";

export default function MarcacaoDetalhe({ marcacao }: { marcacao: Marcacao }) {
  return (
    <div className={styles.container}>
      <h1>Detalhes da Marcação: {marcacao.agendamento_id}</h1>

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
    </div>
  );
}
