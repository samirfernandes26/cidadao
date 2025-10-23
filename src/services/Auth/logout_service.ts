"use server";

import { cookies } from "next/headers";
import axios, { HttpStatusCode } from "axios";

export async function logoutService() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) throw new Error("Você não está autenticado");

  try {
    const base = "https://teste1.versasaude.com.br/api";

    const { status } = await axios.post(
      `${base}/cidadao/logout`,
      {},
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
    if (status === HttpStatusCode.Ok) {
      cookieStore.delete("auth_token");
      cookieStore.delete("XSRF-TOKEN");
      cookieStore.delete("versasus_session");

      return true;
    }
  } catch (error) {
    console.error("Erro ao fazer logout:", error);

    return false;
  }

  return false;
}
