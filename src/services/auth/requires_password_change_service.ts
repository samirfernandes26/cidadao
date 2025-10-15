"use server";

import { cookies } from "next/headers";
import axios, { HttpStatusCode } from "axios";

async function requiresPasswordChangeService(
  novaSenha: string,
  confirmarSenha: string
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token"); // ajuste para "token" se necessário

  if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "https://teste1.versasaude.com.br/api";

    const response = await axios.post(
      `${base}/cidadao/renovar-senha`,
      {
        nova_senha: novaSenha,
        confirmar_senha: confirmarSenha,
      },
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

    if (response.status === HttpStatusCode.Ok) {
      return true;
    } else {
      throw new Error(
        "Erro ao alterar a senha: " +
          (response.data?.message || response.statusText)
      );
    }
  } catch (error: unknown) {
    console.error(
      "Erro em requiresPasswordChangeService:",
      error,
      (error as Error).message || "Falha ao alterar a senha"
    );
    throw new Error((error as Error).message || "Falha ao alterar a senha");
  }
}

export default requiresPasswordChangeService;
