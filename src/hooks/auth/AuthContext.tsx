"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// import {
//   readUserFromSession,
//   saveUserToSession,
//   clearUserFromSession,
// } from "@/utils/browserSession";

import { login as doLogin } from "@/services/Auth/login";

import type { User } from "@/interfaces/auth";

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
    const { type, user, requiresPasswordChange } = await doLogin(
      login,
      password
    );

    if (type === "success") {
      sessionStorage.setItem("user_info", JSON.stringify(user));
      sessionStorage.setItem(
        "requires_password_change",
        requiresPasswordChange ? "true" : "false"
      );

      setRequiresPasswordChange(!!requiresPasswordChange);
      setUser(user!);
      setStatus("authenticated");
    }
  }

  const logout = async () => {
    // TODO: chamar serviço de logout
  };

  const value = useMemo(
    () => ({ status, user, login, logout, requiresPasswordChange }),
    [status, user, requiresPasswordChange]
  );

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user_info");
    const requiresPasswordChange = sessionStorage.getItem(
      "requires_password_change"
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
