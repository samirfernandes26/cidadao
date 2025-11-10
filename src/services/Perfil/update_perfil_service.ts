"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios"; 

const API_BASE_URL = "http://desenvolvimento.versasaude.local";
const UPDATE_PROFILE_ROUTE = `${API_BASE_URL}/api/cidadao/atualizar-perfil`;
const FRONTEND_ORIGIN = "http://desenvolvimento.versasaude.local"; 

export interface IProfileUpdatePayload {
  senha_atual: string;
  email?: string | null;
  nova_senha?: string | null;
  confirmar_senha?: string | null;
}

export interface IProfileUpdateResponse {
  status: 'success' | 'error';
  message: string;
  user?: any; 
  errors?: Record<string, string[]>; 
}

export async function updateProfileService(
  payload: IProfileUpdatePayload
): Promise<IProfileUpdateResponse> {
  console.log("--- SERVIÇO DE ATUALIZAR PERFIL (fetch) INICIADO ---");
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  const xsrfCookie = cookieStore.get("XSRF-TOKEN");
  
  if (!sessionCookie || !xsrfCookie) {
    console.error("Erro ao Atualizar Perfil: Cookie de sessão ou XSRF não encontrado.");
    throw new Error("Você não está autenticado ou sua sessão expirou.");
  }
  
  console.log("Atualizar Perfil: Cookies de sessão e XSRF encontrados.");
  
  try {
    const finalCookieHeader = `versasaude_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfCookie.value}`;
    
    const response = await fetch(UPDATE_PROFILE_ROUTE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': finalCookieHeader, 
          'X-XSRF-TOKEN': xsrfCookie.value,
          'Origin': FRONTEND_ORIGIN,
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === HttpStatusCode.UnprocessableEntity) { // 422
            console.warn("Erro 422 (Validação)", data);
            const errorMessages = Object.values(data.errors || {}).flat().join(' ');
            throw new Error(errorMessages || data.message || "Erro de validação (422)");
        }
        
        if (response.status === 419) { // 419
            console.error("Erro 419 (Token Mismatch)", data);
            throw new Error("Erro de sessão (419). O token CSRF não correspondeu.");
        }
        
        throw new Error(data.message || "Erro desconhecido na API");
    }

    console.log("Atualizar Perfil: Perfil alterado com sucesso.");
    return data as IProfileUpdateResponse;
    
  } catch (error: unknown) {
    console.error("Erro no serviço 'Atualizar Perfil':", (error as Error).message);
    if (error instanceof Error) {
        throw error; 
    }
    throw new Error("Falha ao alterar o perfil");
  }
}