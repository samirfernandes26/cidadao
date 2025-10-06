import React from "react";
import type { Marcacao, Endereco, Contato } from "@/models/marcacao";
import styles from "./styled.module.css";

type Props = {
  marcacao: Marcacao; // você vai passar a marcação inteira por parâmetro
};

export default function MarcacaoDetalhe({ marcacao }: Props) {
  const dataInclusao = safeFormat(marcacao.data_admissao);
  const dataAgendamento = marcacao.data_agendamento
    ? safeFormat(marcacao.data_agendamento)
    : null;

  return (
    <div className={styles.container}>
      <h1>Detalhes da Marcação</h1>
      <p>Agendamento ID: {marcacao.agendamento_id}</p>

      {/* Informações Básicas */}
      <Section title="Informações Básicas">
        <Labeled label="Data de Inclusão">
          <span className={styles.labeledValue}>{dataInclusao}</span>
        </Labeled>

        <Labeled label="Data do Agendamento">
          <span className={styles.labeledValue}>{dataAgendamento ?? "—"}</span>
        </Labeled>

        <Labeled label="Risco">
          <Badge type="risco">{marcacao.classificacao_de_risco}</Badge>
        </Labeled>

        <Labeled label="Status">
          <Badge type="status">{marcacao.status_marcacao}</Badge>
        </Labeled>

        <Labeled label="Posição na Fila">
          <span className={styles.labeledValue}>
            {marcacao.posicao_na_fila ?? "—"}
          </span>
        </Labeled>
      </Section>

      {/* UBS Solicitante */}
      <Section title="UBS Solicitante">
        <Labeled label="Nome">
          <span className={styles.labeledValue}>
            {marcacao.ubs_solicitante?.nome ?? "—"}
          </span>
        </Labeled>

        <Labeled label="Endereço">
          <AddressView endereco={marcacao.ubs_solicitante?.endereco ?? null} />
        </Labeled>

        <Labeled label="Contato">
          <ContactsView contato={marcacao.ubs_solicitante?.contato ?? null} />
        </Labeled>
      </Section>

      {/* Prestador de Serviço */}
      <Section title="Prestador de Serviço">
        {marcacao.prestador_servico ? (
          <>
            <Labeled label="Nome">
              <span className={styles.labeledValue}>
                {marcacao.prestador_servico?.nome}
              </span>
            </Labeled>

            <Labeled label="Endereço">
              <AddressView
                endereco={marcacao.prestador_servico?.endereco ?? null}
              />
            </Labeled>

            <Labeled label="Contato">
              <ContactsView
                contato={marcacao.prestador_servico?.contato ?? null}
              />
            </Labeled>
          </>
        ) : (
          <span className={styles.empty}>Não informado</span>
        )}
      </Section>

      {/* Procedimentos */}
      <Section title="Procedimentos">
        {marcacao.procedimentos?.length ? (
          <ul>
            {marcacao.procedimentos.map((p) => (
              <li key={p.marcacao_id} className={styles.labeledValue}>
                {p.descricao}
              </li>
            ))}
          </ul>
        ) : (
          <span className={styles.empty}>Nenhum procedimento cadastrado</span>
        )}
      </Section>
    </div>
  );
}

/* ================= helpers visuais (usam apenas classes CSS) ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>{title}</div>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.labeled}>
      <span className={styles.labeledLabel}>{label}</span>
      {children}
    </div>
  );
}

function Badge({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "risco" | "status";
}) {
  const tone = type === "risco" ? styles.badgeRisco : styles.badgeStatus;
  return <span className={`${styles.badge} ${tone}`}>{children}</span>;
}

function AddressView({ endereco }: { endereco: Endereco | null }) {
  if (!endereco) return <span className={styles.empty}>Não disponível</span>;
  const { logradouro, numero, complemento, bairro, cidade, estado, cep } =
    endereco;
  const parts = [
    [logradouro].filter(Boolean).join(" "),
    numero,
    complemento,
    bairro,
    cidade && estado ? `${cidade} - ${estado}` : cidade || estado,
    cep,
  ].filter(Boolean);
  return <div className={styles.address}>{parts.join("\n")}</div>;
}

function ContactsView({ contato }: { contato: Contato | null }) {
  if (!contato || (!contato.telefone && !contato.email))
    return <span className={styles.empty}>Não disponível</span>;
  return (
    <div className={styles.contacts}>
      {contato.telefone && <span>{contato.telefone}</span>}
      {contato.email && <span>{contato.email}</span>}
    </div>
  );
}

/* ============ utils ============ */
function safeFormat(input: string) {
  // tenta formatar ISO-8601 e strings comuns; se falhar, retorna como veio
  try {
    const d = new Date(input);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    }
    return input;
  } catch {
    return input;
  }
}
