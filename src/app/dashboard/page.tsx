// src/app/dashboard/page.tsx
import ProcedimentoCard from "@/components/ProcedimentoCard";
import type { Procedimento } from "@/models";

const dados: Procedimento[] = [
  {
    id: "1",
    titulo: "Cirurgia de Catarata",
    risco: "Moderado",
    statusLinha1: "Em fila",
    posicao: 12,
    hospital: "Hospital Municipal",
    profissional: "Dr. João da Silva",
  },
  {
    id: "2",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "3",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "4",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "5",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "6",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "7",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "8",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "9",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "10",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "11",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
  {
    id: "12",
    titulo: "Exame de Ressonância",
    risco: "Baixo",
    statusLinha1: "Agendado",
    hospital: "Clínica São Lucas",
  },
];

export default function Dashboard() {
  return (
    <main className="p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-bold">Minhas solicitações</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2">
        {dados.map((item) => (
          <ProcedimentoCard
            key={item.id}
            data={item}
            detalhesHref={`/solicitacoes/${item.id}`}
          />
        ))}
      </div>
    </main>
  );
}
