"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Api_renovar_senha } from "@/utils/const/const";
import getApiCsrfTokemService from "./get_csrf_tokem_service";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface IResponse {
  status: string;
  message: string;
}

async function requiresPasswordChangeService(
  novaSenha: string,
  confirmarSenha: string,
): Promise<void | boolean> {
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

    const { data } = await axios.post<IResponse>(
      Api_renovar_senha,
      {
        nova_senha: novaSenha,
        confirmar_senha: confirmarSenha,
      },
      {
        headers,
        withCredentials: true,
      },
    );

    if (data.status === "success") {
      return true;
    } else {
      throw new Error("Erro ao alterar a senha: " + data.message);
    }
  } catch (error: unknown) {
    console.error(
      "Erro em requiresPasswordChangeService:",
      error,
      (error as Error).message || "Falha ao alterar a senha",
    );
    throw new Error((error as Error).message || "Falha ao alterar a senha");
  }
}

export default requiresPasswordChangeService;
