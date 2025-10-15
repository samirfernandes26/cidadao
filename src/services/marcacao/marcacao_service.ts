"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Marcacao } from "@/models/marcacao";

export default async function getMarcacoesService(): Promise<Marcacao[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "https://teste1.versasaude.com.br/api";

    const response = await axios.get(`${base}/cidadao/marcacoes`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      return [];
    }

    return response.data.data as Marcacao[];
  } catch (error: any) {
    console.error("Erro em getMarcacoesService:", error, error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Falha ao obter marcações"
    );
  }
}
