// src/app/marcacoes/[agendamentoId]/page.tsx

import MarcacaoDetalhe from "@/components/MarcacaoDetalhe";
import marcacoesMock from "@/app/marcacoes/marcacoes.mock";
import { notFound } from "next/navigation";

// ↑ se seu componente está em src/app/detalheMarcacao/index.tsx (default export)

// Se o mock estiver em src/mocks/marcacoes.mock.ts:
// (se ainda estiver dentro de listaMarcacoes, use: "@/app/listaMarcacoes/marcacoes.mock")

export default function Page({
  params,
}: {
  params: { agendamentoId: string };
}) {
  const { agendamentoId } = params;

  // Busca no mock a marcação correspondente ao id da URL
  const marcacao = marcacoesMock.data.find(
    (m) => String(m.agendamento_id) === String(agendamentoId)
  );

  if (!marcacao) return notFound();

  // CHAMADA AQUI: passa a marcacao para o seu componente
  return (
    <div className="min-h-[60vh] bg-slate-50">
      <MarcacaoDetalhe marcacao={marcacao} />
    </div>
  );
}
