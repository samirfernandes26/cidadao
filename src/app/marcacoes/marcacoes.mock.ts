// src/mocks/marcacoes.mock.ts
import type {
  ApiListResponse,
  Marcacao,
  Instituicao,
  Endereco,
  Contato,
} from "@/models/marcacao";

const endereco = (partial: Partial<Endereco> = {}): Endereco => ({
  logradouro: partial.logradouro ?? "RUA SEM NOME",
  tipo_logradouro: partial.tipo_logradouro ?? "RUA",
  numero: partial.numero ?? "S/N",
  complemento: partial.complemento ?? null,
  bairro: partial.bairro ?? "CENTRO",
  cidade: partial.cidade ?? "CARATINGA",
  estado: partial.estado ?? "MG",
  cep: partial.cep ?? null,
});

const contato = (partial: Partial<Contato> = {}): Contato => ({
  telefone: partial.telefone ?? "(33) 90000-0000",
  email: partial.email ?? "CONTATO@EXEMPLO.COM.BR",
});

const instituicao = (partial: Partial<Instituicao> = {}): Instituicao => ({
  nome: partial.nome ?? "UBS CENTRAL",
  endereco: partial.endereco ?? endereco({}),
  contato: partial.contato ?? contato({}),
});

export const marcacoesMock: ApiListResponse<Marcacao> = {
  data: [
    {
      agendamento_id: 1001,
      data_admissao: "2025-02-01T08:30:00.000000Z",
      classificacao_de_risco: "Intermediária",
      status_marcacao: "Aguardando",
      data_agendamento: null,
      ubs_solicitante: instituicao({
        nome: "UBS CENTRAL",
        endereco: endereco({
          logradouro: "RUA PRINCIPAL",
          numero: "100",
        }),
        contato: contato({
          telefone: "(33) 99999-1111",
          email: "UBSCENTRAL@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [{ marcacao_id: 5001, descricao: "EXAME DE SANGUE" }],
      posicao_na_fila: 3,
      prestador_servico: null,
    },
    {
      agendamento_id: 1002,
      data_admissao: "2025-02-02T10:00:00.000000Z",
      classificacao_de_risco: "Baixa",
      status_marcacao: "Agendado",
      data_agendamento: "2025-03-05T09:00:00.000000Z",
      ubs_solicitante: instituicao({
        nome: "ESF SANTA CLARA",
        endereco: endereco({
          tipo_logradouro: "AVENIDA",
          logradouro: "AVENIDA DAS FLORES",
          numero: "250",
          bairro: "SANTA CLARA",
        }),
        contato: contato({
          telefone: "(33) 98888-2222",
          email: "SANTACLARA@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [
        { marcacao_id: 5002, descricao: "ULTRASSONOGRAFIA ABDOMINAL" },
      ],
      posicao_na_fila: null,
      prestador_servico: instituicao({
        nome: "CLÍNICA IMAGEM DIAGNÓSTICOS",
        endereco: endereco({
          tipo_logradouro: "AVENIDA",
          logradouro: "AV. SETE DE SETEMBRO",
          numero: "321",
          cidade: "MURIAÉ",
        }),
        contato: contato({
          telefone: "(33) 97777-3333",
          email: "CONTATO@IMAGEMDIAGNOSTICOS.COM.BR",
        }),
      }),
    },
    {
      agendamento_id: 1003,
      data_admissao: "2025-02-03T09:15:00.000000Z",
      classificacao_de_risco: "Alto",
      status_marcacao: "Aguardando",
      data_agendamento: null,
      ubs_solicitante: instituicao({
        nome: "UBS VILA NOVA",
        endereco: endereco({
          logradouro: "RUA DA SAÚDE",
          numero: "45",
          bairro: "VILA NOVA",
        }),
        contato: contato({
          telefone: "(33) 96666-4444",
          email: "VILANOVA@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [{ marcacao_id: 5003, descricao: "RAIO-X DE TÓRAX" }],
      posicao_na_fila: 1,
      prestador_servico: instituicao({
        nome: "HOSPITAL MUNICIPAL",
        endereco: endereco({
          logradouro: "RUA PRINCIPAL",
          numero: "1",
        }),
        contato: contato({
          telefone: "(33) 95555-5555",
          email: "CONTATO@HOSPITALMUNICIPAL.COM.BR",
        }),
      }),
    },
    {
      agendamento_id: 1004,
      data_admissao: "2025-01-29T14:00:00.000000Z",
      classificacao_de_risco: "Não Aguda",
      status_marcacao: "Finalizado",
      data_agendamento: "2025-01-31T14:30:00.000000Z",
      ubs_solicitante: instituicao({
        nome: "ESF BOM JESUS",
        endereco: endereco({
          logradouro: "RUA 7 DE SETEMBRO",
          numero: "80",
          bairro: "BOM JESUS",
        }),
        contato: contato({
          telefone: "(33) 94444-5555",
          email: "BOMJESUS@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [
        { marcacao_id: 5004, descricao: "CONSULTA CLÍNICA GERAL" },
      ],
      posicao_na_fila: null,
      prestador_servico: null,
    },
    {
      agendamento_id: 1005,
      data_admissao: "2025-02-01T13:30:00.000000Z",
      classificacao_de_risco: "Intermediária",
      status_marcacao: "Cancelado",
      data_agendamento: null,
      ubs_solicitante: instituicao({
        nome: "UBS SANTO ANTÔNIO",
        endereco: endereco({
          logradouro: "RUA DA PRAÇA",
          numero: "200",
          bairro: "SANTO ANTÔNIO",
        }),
        contato: contato({
          telefone: "(33) 93333-6666",
          email: "SANTOANTONIO@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [
        { marcacao_id: 5005, descricao: "CONSULTA DE PEDIATRIA" },
      ],
      posicao_na_fila: null,
      prestador_servico: null,
    },
    {
      agendamento_id: 1006,
      data_admissao: "2025-02-04T07:45:00.000000Z",
      classificacao_de_risco: "Baixa",
      status_marcacao: "Aguardando",
      data_agendamento: null,
      ubs_solicitante: instituicao({
        nome: "ESF NOVO HORIZONTE",
        endereco: endereco({
          logradouro: "RUA DO SOL",
          numero: "321",
          bairro: "NOVO HORIZONTE",
        }),
        contato: contato({
          telefone: "(33) 92222-7777",
          email: "NOVOHORIZONTE@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [{ marcacao_id: 5006, descricao: "EXAME DE URINA" }],
      posicao_na_fila: 7,
      prestador_servico: null,
    },
    {
      agendamento_id: 1007,
      data_admissao: "2025-02-05T09:30:00.000000Z",
      classificacao_de_risco: "Alto",
      status_marcacao: "Agendado",
      data_agendamento: "2025-02-20T08:00:00.000000Z",
      ubs_solicitante: instituicao({
        nome: "UBS SANTA RITA",
        endereco: endereco({
          tipo_logradouro: "AVENIDA",
          logradouro: "AV. BRASIL",
          numero: "55",
          bairro: "SANTA RITA",
        }),
        contato: contato({
          telefone: "(33) 91111-8888",
          email: "SANTARITA@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [
        { marcacao_id: 5007, descricao: "TOMOGRAFIA COMPUTADORIZADA" },
      ],
      posicao_na_fila: null,
      prestador_servico: instituicao({
        nome: "CLÍNICA IMAGEM PLUS",
        endereco: endereco({
          logradouro: "RUA XV DE NOVEMBRO",
          numero: "99",
          cidade: "MURIAÉ",
        }),
        contato: contato({
          telefone: "(33) 90000-9999",
          email: "CONTATO@IMAGEMPLUS.COM.BR",
        }),
      }),
    },
    {
      agendamento_id: 1008,
      data_admissao: "2025-01-27T16:00:00.000000Z",
      classificacao_de_risco: "Não Aguda",
      status_marcacao: "Finalizado",
      data_agendamento: "2025-01-29T15:00:00.000000Z",
      ubs_solicitante: instituicao({
        nome: "ESF BELA VISTA",
        endereco: endereco({
          logradouro: "RUA BELO HORIZONTE",
          numero: "400",
          bairro: "BELA VISTA",
        }),
        contato: contato({
          telefone: "(33) 98888-1234",
          email: "BELAVISTA@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [
        { marcacao_id: 5008, descricao: "CONSULTA DE CLÍNICO GERAL" },
      ],
      posicao_na_fila: null,
      prestador_servico: null,
    },
    {
      agendamento_id: 1009,
      data_admissao: "2025-02-06T11:15:00.000000Z",
      classificacao_de_risco: "Intermediária",
      status_marcacao: "Aguardando",
      data_agendamento: null,
      ubs_solicitante: instituicao({
        nome: "UBS NOSSA SENHORA",
        endereco: endereco({
          tipo_logradouro: "AVENIDA",
          logradouro: "AV. DAS PALMEIRAS",
          numero: "15",
          bairro: "NOSSA SENHORA",
        }),
        contato: contato({
          telefone: "(33) 98888-4321",
          email: "NOSSASENHORA@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [{ marcacao_id: 5009, descricao: "ELETROCARDIOGRAMA" }],
      posicao_na_fila: 10,
      prestador_servico: null,
    },
    {
      agendamento_id: 1010,
      data_admissao: "2025-02-07T08:00:00.000000Z",
      classificacao_de_risco: "Baixa",
      status_marcacao: "Agendado",
      data_agendamento: "2025-02-28T10:00:00.000000Z",
      ubs_solicitante: instituicao({
        nome: "UBS PLANALTO",
        endereco: endereco({
          logradouro: "RUA DAS LARANJEIRAS",
          numero: "12",
          bairro: "PLANALTO",
        }),
        contato: contato({
          telefone: "(33) 98888-6789",
          email: "PLANALTO@EXEMPLO.COM.BR",
        }),
      }),
      procedimentos: [{ marcacao_id: 5010, descricao: "CONSULTA DE NUTRIÇÃO" }],
      posicao_na_fila: null,
      prestador_servico: instituicao({
        nome: "CLÍNICA SAÚDE INTEGRADA",
        endereco: endereco({
          logradouro: "RUA SÃO PAULO",
          numero: "77",
          cidade: "MURIAÉ",
        }),
        contato: contato({
          telefone: "(33) 98888-2468",
          email: "CONTATO@SAUDEINTEGRADA.COM.BR",
        }),
      }),
    },
  ],
  links: {
    first: "https://teste.versasaude.com.br/api/cidadao/marcacoes?page=1",
    last: "https://teste.versasaude.com.br/api/cidadao/marcacoes?page=1",
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 15,
    to: 10,
    total: 10,
    path: "https://teste.versasaude.com.br/api/cidadao/marcacoes",
    links: [],
  },
};

export default marcacoesMock;
