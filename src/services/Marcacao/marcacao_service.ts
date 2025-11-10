"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Marcacao } from "@/interfaces/marcacao";

export default async function getMarcacoesService(): Promise<Marcacao[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "http://desenvolvimento.versasaude.local/api";

    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ');
    const xsrf = cookieStore.get('XSRF-TOKEN')?.value;

    const headers: Record<string, string> = {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    };

    if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;
    if (token?.value) headers['Authorization'] = `Bearer ${token.value}`;

    const response = await axios.get(`${base}/cidadao/marcacoes`, {
      headers,
      withCredentials: true,
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      return [];
    }

    return response.data.data as Marcacao[];
  } catch (error: unknown) {
    console.error(
      "Erro em getMarcacoesService:",
      error,
      (error as Error).message
    );
    throw new Error((error as Error).message || "Falha ao obter marcações");
  }
}
