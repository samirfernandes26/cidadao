"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { VersaUser } from "@/models/auth";
import {
  readUserFromSession,
  saveUserToSession,
  clearUserFromSession,
} from "@/utils/browserSession";

type Status = "loading" | "authenticated" | "unauthenticated";

type AuthContextType = {
  status: Status;
  user: VersaUser | null;
  login: (user: VersaUser) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<VersaUser | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      if (res.ok) {
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
        setUser(null);
        clearUserFromSession();
      }
    } catch {
      setStatus("unauthenticated");
      setUser(null);
      clearUserFromSession();
    }
  };

  useEffect(() => {
    setUser(readUserFromSession());
    refresh();
  }, []);

  const login = (u: VersaUser) => {
    saveUserToSession(u);
    setUser(u);
    setStatus("authenticated");
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    clearUserFromSession();
    setUser(null);
    setStatus("unauthenticated");
  };

  const value = useMemo(
    () => ({ status, user, login, logout, refresh }),
    [status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
