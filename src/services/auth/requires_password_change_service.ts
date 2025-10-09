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

    const responseCrsfToken = await axios.get(`${base}/sanctum/csrf-cookie`, {
      headers: {
        Cookie: `auth_token=${token.value}`,
      },
      withCredentials: true,
    });

    const setCookieHeader = responseCrsfToken.headers["set-cookie"];

    let csrfToken = null;
    let newSessionCookie = null;

    if (setCookieHeader) {
      setCookieHeader.forEach((cookieString: string) => {
        if (cookieString.startsWith("XSRF-TOKEN=")) {
          // O valor do XSRF-TOKEN vem URL-encoded e precisa ser decodificado e extraído
          // Ex: XSRF-TOKEN=...%3D; expires=...
          const tokenPart = cookieString.split(";")[0].split("=")[1];

          // Decodifica a string JSON base64
          try {
            csrfToken = decodeURIComponent(tokenPart);
          } catch (e) {
            console.error("Falha ao decodificar XSRF-TOKEN", e);
          }
        }
        if (cookieString.startsWith("versasus_session=")) {
          // Captura o novo cookie de sessão (se houver renovação)
          newSessionCookie = cookieString.split(";")[0];
        }
      });
    }

    if (!csrfToken) throw new Error("Falha ao obter o XSRF-TOKEN do backend.");

    const postCookies = [
      newSessionCookie,
      `XSRF-TOKEN=${responseCrsfToken.headers["X-Xsrf-Token"] || csrfToken}`,
    ].join("; ");

    console.log("Cookies para o POST:", postCookies);

    const response = await axios.post(
      `${base}/cidadao/renovar-senha`,
      {
        novaSenha,
        confirmarSenha,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token.value}`,
          Cookie: postCookies,
          "X-XSRF-TOKEN": csrfToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new Error(
        "Erro ao alterar a senha: " +
          (response.data?.message || response.statusText)
      );
    }
  } catch (error: any) {
    console.error(
      "Erro em requiresPasswordChangeService:",
      error,
      error?.response?.data
    );
    throw new Error(
      error?.response?.data?.message || "Falha ao alterar a senha"
    );
  }
}

export default requiresPasswordChangeService;
