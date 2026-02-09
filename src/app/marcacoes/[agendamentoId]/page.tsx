"use client";
import MarcacaoDetalhe from "@/components/MarcacaoDetalhe";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const agendamentoId = params?.agendamentoId;
  const [marcacao, setMarcacao] = useState(null);

  useEffect(() => {
    if (!agendamentoId) return;
    const data = sessionStorage.getItem(`marcacao-${agendamentoId}`);
    if (data) {
      setMarcacao(JSON.parse(data));
    } else {
      router.replace("/marcacoes");
    }
  }, [agendamentoId, router]);

  if (!marcacao) return <div>Carregando...</div>;

  return (
    <>
      <TopBar
        titulo="Detalhes da marcação"
        action={{
          label: "Voltar",
          href: "/marcacoes",
          icon: "back",
          iconOnly: true,
          position: "left",
        }}
      />
      <div className="min-h-[60vh] bg-slate-50">
        <MarcacaoDetalhe marcacao={marcacao} />
      </div>
    </>
  );
}
