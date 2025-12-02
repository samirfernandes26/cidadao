"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { User } from "@/interfaces/auth";

interface LoginResponse {
  message: string;
  requires_password_change: boolean;
  user: User;
}

export interface IResponse {
  type: "success" | "error";
  message: string;
  user?: User;
  requiresPasswordChange?: boolean;
}

async function login(login: string, password: string): Promise<IResponse> {
  const base = "http://desenvolvimento.versasaude.local/api";

  try {
    const response = await fetch(`${base}/cidadao/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === HttpStatusCode.UnprocessableEntity) {
        return {
          type: "error",
          message: data.error || "Credenciais inválidas. Tente novamente.",
        };
      }
      throw new Error(data.error || data.message || "Erro na resposta da API");
    }

    const successData = data as LoginResponse;

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders.length > 0) {
      const cookieStore = await cookies();

      for (const cookieString of setCookieHeaders) {
        const parts = cookieString.split(";").map((p) => p.trim());

        const [name, value] = parts[0].split("=");

        const options: any = { path: "/" };

        for (const part of parts.slice(1)) {
          const [rawKey, ...rawVal] = part.split("=");
          const key = rawKey.toLowerCase().trim();
          const val = rawVal.join("=").trim();

          switch (key) {
            case "expires":
              options.expires = new Date(val);
              break;

            case "max-age":
              options.maxAge = parseInt(val, 10);
              break;

            case "samesite":
              const s = val.toLowerCase();
              if (["lax", "strict", "none"].includes(s)) {
                options.sameSite = s;
              }
              break;

            case "secure":
              options.secure = true;
              break;

            case "httponly":
              options.httpOnly = true;
              break;
          }
        }

        cookieStore.set(name.trim(), value.trim(), options);
      }
    }

    return {
      type: "success",
      message: successData.message,
      user: successData.user,
      requiresPasswordChange: successData.requires_password_change,
    };
  } catch (err) {
    return {
      type: "error",
      message:
        err instanceof Error
          ? err.message
          : "Ocorreu um erro. Por favor, tente novamente mais tarde.",
    };
  }
}

export { login };
