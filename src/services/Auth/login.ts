"use server";

import { cookies } from "next/headers";
import axios, { HttpStatusCode } from "axios";

import { User } from "@/interfaces/auth";
import { Api_login } from "@/utils/const/const";

interface LoginResponse {
  token: string;
  message: string;
  requires_password_change: boolean;
  expires_at: string; // ISO 8601
  user: User;
}

export interface IResponse {
  type: "success" | "error";
  message: string;
  user?: User;
  requiresPasswordChange?: boolean;
}

async function login(login: string, password: string): Promise<IResponse> {
  try {
    const { data, headers } = await axios.post<LoginResponse>(Api_login, {
      login,
      password,
    });

    const successData = data as LoginResponse;

    const setCookieHeaders = headers["set-cookie"] || [];

    const cookieStore = await cookies();

    if (setCookieHeaders.length > 0) {
      for (const cookieString of setCookieHeaders) {
        const [cookieValue] = cookieString.split(";");
        const [name, value] = cookieValue.split("=");
        cookieStore.set(name, value);
      }
    }

    return {
      type: "success",
      message: successData.message,
      user: successData.user,
      requiresPasswordChange: successData.requires_password_change,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (
        status === HttpStatusCode.UnprocessableEntity ||
        status === HttpStatusCode.Unauthorized ||
        status === HttpStatusCode.Forbidden
      ) {
        return {
          type: "error",
          message: "Credenciais inválidas. Tente novamente.",
        };
      }
    }

    return {
      type: "error",
      message: `Ops - Não foi possível entrar agora. Pode tentar novamente em alguns instantes?`,
    };
  }
}

export { login };
