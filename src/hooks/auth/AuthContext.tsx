"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { login as doLogin, IResponse } from "@/services/Auth/login";

import type { User } from "@/interfaces/auth";
import { logoutService } from "@/services/Auth/logout_service";

type Status = "loading" | "authenticated" | "unauthenticated";

type AuthContextType = {
  status: Status;
  user?: User;
  requiresPasswordChange?: boolean;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User>({} as User);
  const [requiresPasswordChange, setRequiresPasswordChange] =
    useState<boolean>(false);

  async function login(login: string, password: string) {
    sessionStorage.removeItem("user_info");
    sessionStorage.removeItem("requires_password_change");

    const result: IResponse = await doLogin(login, password);

    if (result.type === "success") {
      sessionStorage.setItem("user_info", JSON.stringify(result.user));
      sessionStorage.setItem(
        "requires_password_change",
        result.requiresPasswordChange ? "true" : "false",
      );

      setRequiresPasswordChange(!!result.requiresPasswordChange);
      setUser(result.user!);
      setStatus("authenticated");
      return;
    }

    setStatus("unauthenticated");
    throw new Error(result.message);
  }

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error(
        "Falha ao deslogar da API, limpando sessão local mesmo assim.",
        error,
      );
    } finally {
      sessionStorage.removeItem("user_info");
      sessionStorage.removeItem("requires_password_change");
      setUser({} as User);
      setRequiresPasswordChange(false);

      (await cookieStore.getAll()).forEach((cookie) => {
        if (cookie.name) {
          cookieStore.delete(cookie.name);
        }
      });

      setStatus("unauthenticated");
    }
  };

  const value = useMemo(
    () => ({ status, user, login, logout, requiresPasswordChange }),
    [status, user, requiresPasswordChange],
  );

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user_info");
    const requiresPasswordChange = sessionStorage.getItem(
      "requires_password_change",
    );

    if (!!userInfo) {
      setUser(JSON.parse(userInfo));
      setStatus("authenticated");
      setRequiresPasswordChange(requiresPasswordChange === "true");
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      if (requiresPasswordChange) {
        router.push("/auth/atualizar-senha");
      }
    }
  }, [status, requiresPasswordChange, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
