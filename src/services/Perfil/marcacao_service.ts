"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios"; 

const API_BASE_URL = "http://desenvolvimento.versasaude.local";
const MARCACOES_ROUTE = `${API_BASE_URL}/api/cidadao/marcacoes`;
const FRONTEND_ORIGIN = "http://desenvolvimento.versasaude.local"; 

interface Endereco {
  logradouro: string;
  tipo_logradouro: string;
  numero: string | null;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface Contato {
  telefone: string | null;
  email: string | null;
}

interface UbsOuPrestador {
  nome: string;
  endereco: Endereco | null;
  contato: Contato | null;
}

interface Procedimento {
  marcacao_id: number;
  descricao: string;
}

export interface Marcacao {
  nome_card: string; 
  agendamento_id: number;
  data_admissao: string | null;
  classificacao_de_risco: string | null;
  status_marcacao: string | null;
  data_agendamento: string | null; 
  ubs_solicitante: UbsOuPrestador;
  procedimentos: Procedimento[];
  posicao_na_fila: number | null;
  prestador_servico: UbsOuPrestador | null;
}

export async function testGetMarcacoes(): Promise<Marcacao[]> {
  console.log("--- SERVIÇO DE 'MINHAS MARCAÇÕES' (fetch) INICIADO ---");
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  
  if (!sessionCookie) {
    console.error("Erro em Minhas Marcações: Cookie de sessão não encontrado.");
    throw new Error("Você não está autenticado ou sua sessão expirou.");
  }
  
  console.log("Minhas Marcações: Cookie de sessão encontrado.");

  try {
    const finalCookieHeader = `versasaude_session=${sessionCookie.value}`;

    const response = await fetch(MARCACOES_ROUTE, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cookie': finalCookieHeader, 
          'Origin': FRONTEND_ORIGIN,
        },
        cache: 'no-store', 
    });

    const data = await response.json();

    if (!response.ok) {
       console.error(`Erro ao buscar marcações: ${response.status}`, data);
       throw new Error(data.message || `Erro ${response.status}`);
    }

    console.log("Minhas Marcações: Dados recebidos com sucesso.");

    return data.data as Marcacao[]; 
    
  } catch (error: unknown) {
    console.error("Erro no serviço de 'Minhas Marcações':", (error as Error).message);
    if (error instanceof Error) {
        throw error; 
    }
    throw new Error("Falha ao buscar dados de marcações");
  }
}