"use server";

import { cookies } from "next/headers";
import axios from "axios";

interface UpdatePerfilParams {
  senhaAtual: string;
  novaSenha?: string;
  confirmarSenha?: string;
  email?: string;
}

export default async function updatePerfilService(data: UpdatePerfilParams) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "https://teste1.versasaude.com.br/api";

    const response = await axios.post(
      `${base}/cidadao/atualizar-perfil`,
      {
        nova_senha: data.novaSenha,
        confirmar_senha: data.confirmarSenha,
        senha_atual: data.senhaAtual,
        "e-mail": data.email,
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

    if (!response.data || !Array.isArray(response.data.data)) {
      return [];
    }
  } catch (error: unknown) {
    console.error(
      "Erro em getMarcacoesService:",
      error,
      (error as Error).message
    );
    throw new Error((error as Error).message || "Falha ao obter marcações");
  }
}
