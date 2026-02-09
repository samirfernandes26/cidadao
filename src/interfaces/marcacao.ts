// Tipagens do domínio "Marcação" (VA-346 / VSW-2280)

// Utilitário para campos possivelmente nulos
export type Maybe<T> = T | null;

// --- Básicos ---
export type Endereco = {
  logradouro: string | null;
  tipo_logradouro?: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep?: string | null;
};

export type Contato = {
  telefone?: string | null;
  email?: string | null;
};

export type Instituicao = {
  nome: string | null;
  endereco: Maybe<Endereco>;
  contato: Maybe<Contato>;
};

export type ClassificacaoDeRisco =
  | "Alto"
  | "Intermediária"
  | "Não Aguda"
  | "Baixa"
  | (string & {}); // fallback

export type StatusMarcacao =
  | "Aguardando"
  | "Agendado"
  | "Cancelado"
  | "Finalizado"
  | (string & {}); // fallback

export type Procedimento = {
  marcacao_id: number;
  descricao: string;
};

export type Marcacao = {
  nome_card: string | null;
  agendamento_id: number;
  data_admissao: string; // ISO-8601 (UTC) vindo da API
  classificacao_de_risco: ClassificacaoDeRisco;
  status_marcacao: StatusMarcacao;
  data_agendamento: string | null; // pode vir null ou dd/MM/yyyy HH:mm
  ubs_solicitante: Maybe<Instituicao>;
  procedimentos: Procedimento[];
  posicao_na_fila: number | null;
  prestador_servico: Maybe<Instituicao>;
};

// --- Paginação padrão Laravel ---
export type ApiListResponse<T> = {
  data: T[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};
