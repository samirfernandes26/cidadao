"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { Api_atualizar_perfil, Api_url } from "@/utils/const/const";

export interface IProfileUpdatePayload {
  senhaAtual: string;
  novaSenha?: string;
  confirmarSenha?: string;
  email?: string;
}

export interface IProfileUpdateResponse {
  status: "success" | "error";
  message: string;
  user?: any;
  errors?: Record<string, string[]>;
}

export async function updateProfileService(
  payload: IProfileUpdatePayload,
): Promise<IProfileUpdateResponse> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  const xsrfCookie = cookieStore.get("XSRF-TOKEN");

  if (!sessionCookie || !xsrfCookie) {
    throw new Error("Você não está autenticado ou sua sessão expirou.");
  }

  try {
    const finalCookieHeader = `versasaude_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfCookie.value}`;

    const response = await fetch(Api_atualizar_perfil, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: finalCookieHeader,
        "X-XSRF-TOKEN": xsrfCookie.value,
        Origin: Api_url,
      },
      body: JSON.stringify({
        senha_atual: payload.senhaAtual,
        nova_senha: payload.novaSenha,
        email: payload.email,
        confirmar_senha: payload.confirmarSenha,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === HttpStatusCode.UnprocessableEntity) {
        const errorMessages = Object.values(data.errors || {})
          .flat()
          .join(" ");
        throw new Error(
          errorMessages || data.message || "Erro de validação (422)",
        );
      }

      if (response.status === 419) {
        throw new Error("Erro de sessão (419). O token CSRF não correspondeu.");
      }

      throw new Error(data.message || "Erro desconhecido na API");
    }

    return data as IProfileUpdateResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Falha ao alterar o perfil");
  }
}
