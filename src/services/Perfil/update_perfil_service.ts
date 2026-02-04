"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Api_atualizar_perfil } from "@/utils/const/const";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import getApiCsrfTokemService from "../Auth/get_csrf_tokem_service";

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

  try {
    const csrfToken: string = String(await getApiCsrfTokemService()) ?? "";

    const allCookies: RequestCookie[] = cookieStore.getAll();
    const cookieHeader: string = allCookies
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const headers: Record<string, string> = {
      Accept: "application/json",
      Cookie: cookieHeader,
      "X-CSRF-TOKEN": csrfToken,
    };

    const { data } = await axios.post<IProfileUpdateResponse>(
      Api_atualizar_perfil,
      {
        senha_atual: payload.senhaAtual,
        email: payload.email,
        nova_senha: payload.novaSenha,
        confirmar_senha: payload.confirmarSenha,
      },
      {
        headers,
        withCredentials: true,
      },
    );

    return data as IProfileUpdateResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Falha ao alterar o perfil");
  }
}
