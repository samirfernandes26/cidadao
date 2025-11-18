"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";

const API_BASE_URL = "http://desenvolvimento.versasaude.local";
const RENOVAR_SENHA_ROUTE = `${API_BASE_URL}/api/cidadao/renovar-senha`;

export default async function requiresPasswordChangeService(
  novaSenha: string,
  confirmarSenha: string
) {
  const cookieStore = await cookies();

  const session = cookieStore.get("versasaude_session");
  const xsrf = cookieStore.get("XSRF-TOKEN");

  if (!session || !xsrf)
    throw new Error("Você não está autenticado ou sua sessão expirou.");

  try {
    const cookieHeader = `versasaude_session=${session.value}; XSRF-TOKEN=${xsrf.value}`;

    const response = await fetch(RENOVAR_SENHA_ROUTE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        "X-XSRF-TOKEN": xsrf.value,
        Origin: API_BASE_URL,
      },
      body: JSON.stringify({
        nova_senha: novaSenha,
        confirmar_senha: confirmarSenha,
      }),
    });

    // Sucesso
    if (
      [HttpStatusCode.Ok, HttpStatusCode.NoContent].includes(response.status)
    ) {
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, errorData };
    }

    // Tenta ler o JSON, mas não quebra se não for JSON
  } catch (error: any) {
    const status = error?.status;
    const errorData = error?.errorData ?? {};

    // switch (status) {
    //   case HttpStatusCode.Unauthorized:
    //     throw new Error("Não autenticado. Verifique o 'Origin' e os cookies.");

    //   case 419:
    //     throw new Error("Erro de sessão. O token CSRF não correspondeu.");

    //   case HttpStatusCode.UnprocessableEntity:
    //     throw new Error(errorData.errors || "Erro de validação");

    //   default:
    //     // Se for erro de rede, DNS, CORS, etc.
    //     if (!status) {
    //       console.error("Erro inesperado de rede:", error);
    //       throw new Error("Falha ao enviar a requisição");
    //     }

    throw new Error("Erro ao alterar a senha: " + status);
    // }
  }
}
