"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { User as CidadaoAuthUser } from "@/models/auth";

const API_BASE_URL = "http://desenvolvimento.versasaude.local";
const PERFIL_ROUTE = `${API_BASE_URL}/api/cidadao/meu-perfil`;
const FRONTEND_ORIGIN = "http://desenvolvimento.versasaude.local"; 

export async function testGetPerfil(): Promise<CidadaoAuthUser> {
  console.log("--- SERVIÇO DE 'MEU PERFIL' (fetch) INICIADO ---");
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  
  if (!sessionCookie) {
    console.error("Erro em Meu Perfil: Cookie de sessão não encontrado.");
    throw new Error("Você não está autenticado ou sua sessão expirou.");
  }
  
  console.log("Meu Perfil: Cookie de sessão encontrado.");

  try {
    const finalCookieHeader = `versasaude_session=${sessionCookie.value}`;

    const response = await fetch(PERFIL_ROUTE, {
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
       console.error(`Erro ao buscar perfil: ${response.status}`, data);
       throw new Error(data.message || `Erro ${response.status}`);
    }

    console.log("Meu Perfil: Dados recebidos com sucesso.");
    
    return data as CidadaoAuthUser; 
    
  } catch (error: unknown) {
    console.error("Erro no serviço de 'Meu Perfil':", (error as Error).message);
    if (error instanceof Error) {
        throw error; 
    }
    throw new Error("Falha ao buscar dados do perfil");
  }
}