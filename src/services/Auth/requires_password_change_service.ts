"use server";

import { cookies } from "next/headers";
import axios, { HttpStatusCode } from "axios";
import { Api_renovar_senha } from "@/utils/const/const";

async function requiresPasswordChangeService(
  novaSenha: string,
  confirmarSenha: string,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token"); // ajuste para "token" se necessário

  if (!token) throw new Error("Você não está autenticado");

  try {
    const response = await axios.post(
      Api_renovar_senha,
      {
        nova_senha: novaSenha,
        confirmar_senha: confirmarSenha,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    if (response.status === HttpStatusCode.Ok) {
      return true;
    } else {
      throw new Error(
        "Erro ao alterar a senha: " +
          (response.data?.message || response.statusText),
      );
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
