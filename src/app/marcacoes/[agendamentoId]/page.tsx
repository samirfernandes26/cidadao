// src/app/marcacoes/[agendamentoId]/page.tsx
import { notFound } from "next/navigation";
import MarcacaoDetalhe from "@/app/detalheMarcao"; // seu componente visual (default export)
import marcacoesMock from "@/app/listaMarcaoes/marcacoes.mock";

export default function Page({
  params,
}: {
  params: { agendamentoId: string };
}) {
  const { agendamentoId } = params;

  const marcacao = marcacoesMock.data.find(
    (m) => String(m.agendamento_id) === String(agendamentoId)
  );

  if (!marcacao) return notFound();

  return (
    <div className="min-h-[60vh] bg-slate-50">
      <MarcacaoDetalhe marcacao={marcacao} />
    </div>
  );
}
