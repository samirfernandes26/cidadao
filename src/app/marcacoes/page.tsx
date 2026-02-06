"use client";
// src/app/dashboard/page.tsx
import ProcedimentoCard from "@/components/ProcedimentoCardCss";

import type { Marcacao } from "@/interfaces/marcacao";

import type { Procedimento } from "@/interfaces";
import getMarcacoesService from "@/services/Marcacao/marcacao_service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar/TopBar";

function salvarMarcacaoSession(marcacao: Marcacao) {
  if (typeof window === "undefined" || !marcacao?.agendamento_id) return;
  try {
    sessionStorage.setItem(
      `marcacao-${marcacao.agendamento_id}`,
      JSON.stringify(marcacao),
    );
  } catch (error: unknown) {
    console.error("Erro ao salvar marcação no sessionStorage:", error);
  }
}

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

export default function Dashboard() {
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getMarcacoesService()
      .then((result) => {
        if (isMounted) {
          setMarcacoes(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Erro ao buscar marcações");
          setMarcacoes([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <TopBar titulo="Marcações" />
      <main className="p-4 sm:p-6">
        {loading && <p>Carregando marcações...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && marcacoes.length === 0 && (
          <div className="min-h-[40vh] flex items-center justify-center px-4">
            <p className="text-center text-slate-600 text-sm sm:text-base">
              Você não tem nenhuma marcação para você atualmente.
            </p>
          </div>
        )}
        {marcacoes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2">
            {marcacoes.map((m: Marcacao) => (
              <ProcedimentoCard
                key={m.agendamento_id}
                data={toCardData(m)}
                onDetalhesClick={() => {
                  salvarMarcacaoSession(m);
                  router.push(`/marcacoes/${m.agendamento_id}`);
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
