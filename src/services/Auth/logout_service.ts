"use server";

import { cookies } from "next/headers";
import axios, { HttpStatusCode } from "axios";

const API_BASE_URL = "http://desenvolvimento.versasaude.local";
const LOGOUT_ROUTE = `${API_BASE_URL}/api/cidadao/logout`;
const FRONTEND_ORIGIN = "http://desenvolvimento.versasaude.local";

export async function logoutService() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "http://desenvolvimento.versasaude.local/api";

    const { status } = await axios.post(
      `${base}/cidadao/logout`,
      {},
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token.value}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    
    if (status === HttpStatusCode.Ok) {
      cookieStore.delete("auth_token");
      cookieStore.delete("XSRF-TOKEN");
      cookieStore.delete("versasaude_session");

      return true;
    }
  } catch (error) {
    console.error("Erro ao fazer logout:", error);

    return false;
  }

  return false;
}

export async function testLogout(): Promise<{ message: string }> {
  console.log("--- SERVIÇO DE LOGOUT (fetch) INICIADO ---");
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  const xsrfCookie = cookieStore.get("XSRF-TOKEN");
  
  if (!sessionCookie || !xsrfCookie) {
    console.error("Erro no Logout: Cookie de sessão ou XSRF não encontrado.");
    
    throw new Error("Você não está autenticado ou sua sessão expirou.");
  }
  
  console.log("Logout: Cookies de sessão e XSRF encontrados.");
  console.log(">>> LOGOUT (HEADER X-XSRF-TOKEN): Valor enviado:", xsrfCookie.value);

  try {
    const finalCookieHeader = `versasaude_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfCookie.value}`;

    const response = await fetch(LOGOUT_ROUTE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': finalCookieHeader, 
          'X-XSRF-TOKEN': xsrfCookie.value,
          'Origin': FRONTEND_ORIGIN,
        }
    });

    cookieStore.delete('versasaude_session');
    cookieStore.delete('XSRF-TOKEN');
    
    if (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.NoContent || response.status === 204) {
      console.log("Logout: Deslogado com sucesso.");
      const data = await response.json().catch(() => ({ message: 'Logout realizado com sucesso.' }));

      return data;
    }
    
    const errorData = await response.json().catch(() => ({})); 

    if (response.status === 419) { 
      console.error("Erro 419 (Token Mismatch)", errorData);

      throw new Error("Erro de sessão (419). O token CSRF não correspondeu.");
    } else {
       console.error(`Erro inesperado no logout: ${response.status}`, errorData);
       throw new Error("Erro ao fazer logout: " + (errorData.message || response.statusText));
    }
    
  } catch (error: unknown) {
    console.error("Erro no serviço de logout:", (error as Error).message);
    
    if (error instanceof Error) {
        throw error; 
    }

    throw new Error("Falha ao fazer logout");
  }
}