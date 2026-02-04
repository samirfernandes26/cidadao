"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Marcacao } from "@/interfaces/marcacao";
import { Api_marcacoes } from "@/utils/const/const";
import getApiCsrfTokemService from "../Auth/get_csrf_tokem_service";

interface IResponse {
  success: boolean;
  message: string;
  data: {
    marcacoes: Marcacao[];
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
}

export default async function getMarcacoesService(): Promise<Marcacao[]> {
  const cookieStore = await cookies();

  try {
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const headers: Record<string, string> = {
      Accept: "application/json",
      Cookie: cookieHeader,
    };

    const { data } = await axios.get<IResponse>(Api_marcacoes, {
      headers,
      withCredentials: true,
    });

    const {
      data: { marcacoes },
    } = data;

    return marcacoes ?? [];
  } catch (error: unknown) {
    console.error(
      "Erro em getMarcacoesService:",
      error,
      (error as Error).message,
    );
    throw new Error((error as Error).message || "Falha ao obter marcações");
  }
}
