// src/app/dashboard/page.tsx
import ProcedimentoCard from "@/components/ProcedimentoCardCss";
import type { Marcacao } from "@/models/marcacao";
import marcacoesMock from "./marcacoes.mock";

// seu tipo atual do card
import type { Procedimento } from "@/models";

// helper só para exibir datas bonitinhas
function formatPtBR(input?: string | null) {
  if (!input) return null;
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

// adapta Marcacao -> Procedimento (shape do seu card)
function toCardData(m: Marcacao): Procedimento {
  let statusLinha1: string = m.status_marcacao;

  if (m.status_marcacao === "Aguardando" && m.posicao_na_fila != null) {
    statusLinha1 = "";
  } else if (m.status_marcacao === "Agendado" && m.data_agendamento) {
    statusLinha1 = `Agendado para ${formatPtBR(m.data_agendamento)}`;
  }

  return {
    id: String(m.agendamento_id),
    titulo: m.procedimentos?.[0]?.descricao ?? "Procedimento",
    risco: m.classificacao_de_risco as unknown as Procedimento["risco"], // converte para RiscoLevel
    statusLinha1,
    posicao: m.posicao_na_fila ?? undefined,
    hospital: m.prestador_servico?.nome ?? m.ubs_solicitante?.nome ?? "—",
    profissional: undefined,
  };
}

export default async function Dashboard() {
  // mock local (sem chamada http)
  const { data } = marcacoesMock;

  // mapeia para o formato do card
  const cards: Procedimento[] = data.map(toCardData);

  return (
    <main className="p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-bold">Minhas marcações</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2">
        {data.map((m: Marcacao) => (
          <ProcedimentoCard
            key={m.agendamento_id}
            data={toCardData(m)}
            // rota de detalhe que fizemos: /marcacoes/[agendamentoId]
            detalhesHref={`/marcacoes/${m.agendamento_id}`}
          />
        ))}
      </div>
    </main>
  );
}
