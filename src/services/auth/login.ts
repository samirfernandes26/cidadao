// src/services/auth/login.ts
import type { VersaLoginRaw, AuthSession } from "@/models/auth";
import { normalizeLoginResponse } from "@/models/auth";

export async function versaLoginTyped(
  login: string,
  password: string
): Promise<AuthSession> {
  const base = process.env.VERSA_API_BASE_URL!;
  const res = await fetch(`${base.replace(/\/$/, "")}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) {
    // trate 400/401/422 etc como quiser
    throw new Error(`Login failed: ${res.status}`);
  }

  const raw = (await res.json()) as VersaLoginRaw;
  return normalizeLoginResponse(raw);
}
