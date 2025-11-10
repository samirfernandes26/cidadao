"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios"; 

const API_BASE_URL = "http://desenvolvimento.versasaude.local";
const RENOVAR_SENHA_ROUTE = `${API_BASE_URL}/api/cidadao/renovar-senha`;
const FRONTEND_ORIGIN = "http://desenvolvimento.versasaude.local"; 

export default async function requiresPasswordChangeService(
  novaSenha: string,
  confirmarSenha: string
) {
  console.log("--- SERVIÇO DE RENOVAR SENHA (fetch) INICIADO ---");
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  const xsrfCookie = cookieStore.get("XSRF-TOKEN");
  
  if (!sessionCookie || !xsrfCookie) {
    console.error("Erro ao renovar Senha: Cookie de sessão ou XSRF não encontrado.");
    throw new Error("Você não está autenticado ou sua sessão expirou.");
  }
  
  console.log("Renovar Senha: Cookies de sessão e XSRF encontrados.");
  console.log(">>> RENOVAR (XSRF): Valor lido do cookieStore:", xsrfCookie.value);

  try {
    console.log(`Renovar Senha: Enviando formulário para: ${RENOVAR_SENHA_ROUTE}`);

    const finalCookieHeader = `versasaude_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfCookie.value}`;
    
    console.log(">>> RENOVAR (HEADER X-XSRF-TOKEN): Valor enviado:", xsrfCookie.value);

    const response = await fetch(RENOVAR_SENHA_ROUTE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': finalCookieHeader, 
          'X-XSRF-TOKEN': xsrfCookie.value,
          'Origin': FRONTEND_ORIGIN,
        },
        body: JSON.stringify({
          nova_senha: novaSenha,          
          confirmar_senha: confirmarSenha,
        })
    });

    if (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.NoContent) {
      console.log("Renovar Senha: Senha alterada com sucesso.");

      return true;
    }

    const errorData = await response.json().catch(() => ({})); 

    if (response.status === HttpStatusCode.Unauthorized) { // 401
       console.error("Erro 401 (Não autenticado)", errorData);
       throw new Error("Não autenticado. Verifique o 'Origin' e os cookies.");

    } else if (response.status === 419) {
      console.error("Erro 419 (Token Mismatch)", errorData);
      throw new Error("Erro de sessão (419). O token CSRF não correspondeu.");
    
    } else if (response.status === HttpStatusCode.UnprocessableEntity) {
      console.warn("Erro 422 (Validação)", errorData);
      throw new Error(errorData.errors || "Erro de validação (422)");

    } else {
       console.error(`Erro inesperado: ${response.status}`, errorData);
       throw new Error("Erro ao alterar a senha: " + response.statusText);
    }
    
  } catch (error: unknown) {
    console.error("Erro ao 'enviar' o formulário:", (error as Error).message);
    if (error instanceof Error) {
        throw error; 
    }

    throw new Error("Falha ao alterar a senha");
  }
}