"use server";

import { cookies } from "next/headers";
import axios from "axios";

interface UpdatePerfilParams {
  senhaAtual: string;
  novaSenha?: string;
  confirmarSenha?: string;
  email?: string;
}

export default async function updatePerfilService(
  data: UpdatePerfilParams
): Promise<boolean | null> {
  // if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "https://teste1.versasaude.com.br/api";

    const response = await axios.post(
      `${base}/cidadao/atualizar-perfil`,
      {
        senha_atual: data.senhaAtual,
        nova_senha: data.novaSenha,
        email: data.email,
        confirmar_senha: data.confirmarSenha,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error(
      "Erro em updatePerfilService:",
      error,
      (error as Error).message
    );

    throw new Error((error as Error).message || "Falha ao atualizar perfil");
  }
}
