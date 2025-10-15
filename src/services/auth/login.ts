"use server";

import { cookies } from "next/headers";
import axios, { HttpStatusCode } from "axios";

import { User } from "@/models/auth";

interface LoginResponse {
  token: string;
  message: string;
  requires_password_change: boolean;
  expires_at: string; // ISO 8601
  user: User;
}

interface IResponse {
  type: "success" | "error";
  message: string;
  user?: User;
  requiresPasswordChange?: boolean;
}

async function login(login: string, password: string): Promise<IResponse> {
  const base = "https://teste1.versasaude.com.br/api";

  try {
    const { data, headers } = await axios.post<LoginResponse>(
      `${base}/cidadao/login`,
      {
        login,
        password,
      }
    );

    const cookieStore = await cookies();

    headers["set-cookie"]?.forEach((cookieString) => {
      const parts = cookieString.split(";");
      const [name, value] = parts[0].split("=");

      console.log(name, value);
      cookieStore.set(name, value);
    });

    cookieStore.set("auth_token", data.token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(data.expires_at),
    });

    return {
      type: "success",
      message: data.message,
      user: data.user,
      requiresPasswordChange: data.requires_password_change,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.status == HttpStatusCode.UnprocessableEntity) {
        alert("Credenciais inválidas. Tente novamente.");
      }

      return {
        type: "error",
        message: "Usuário e/ou senha inválidos.",
      };
    }

    return {
      type: "error",
      message: "Ocorreu um erro. Por favor, tente novamente mais tarde.",
    };
  }
}

export { login };
