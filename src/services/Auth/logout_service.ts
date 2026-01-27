"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { Api_logout } from "@/utils/const/const";

export async function logoutService(): Promise<void | { message: string }> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("versasaude_session");
  const xsrfCookie = cookieStore.get("XSRF-TOKEN");

  try {
    if (!sessionCookie || !xsrfCookie) {
      throw new Error("Você não está autenticado ou sua sessão expirou.");
    }

    const finalCookieHeader = `versasaude_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfCookie.value}`;

    const response = await fetch(Api_logout, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Cookie: finalCookieHeader,
        "X-XSRF-TOKEN": xsrfCookie.value,
      },
    });

    if (
      response.status === HttpStatusCode.Ok ||
      response.status === HttpStatusCode.NoContent ||
      response.status === 204
    ) {
      const data = await response
        .json()
        .catch(() => ({ message: "Logout realizado com sucesso." }));

      return data;
    }
  } catch (error: unknown) {
    console.error("Erro no serviço de logout:", (error as Error).message);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Falha ao fazer logout");
  } finally {
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });
  }
}
