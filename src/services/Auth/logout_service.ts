"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Api_logout, Api_marcacoes } from "@/utils/const/const";
import getApiCsrfTokemService from "./get_csrf_tokem_service";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface IResponse {
  message: string;
}

export async function logoutService(): Promise<void | { message: string }> {
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
      Api_logout,
      {},
      {
        headers,
        withCredentials: true,
      },
    );

    return data;
  } catch (error: unknown) {
    console.error("Erro no serviço de logout:", (error as Error).message);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Falha ao fazer logout");
  }
}
