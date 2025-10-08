"use client";
import type { VersaUser } from "@/models/auth";

const KEY = "auth:user";

export function saveUserToSession(user: VersaUser) {
  sessionStorage.setItem(KEY, JSON.stringify(user));
}
export function readUserFromSession(): VersaUser | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as VersaUser;
  } catch {
    return null;
  }
}
export function clearUserFromSession() {
  sessionStorage.removeItem(KEY);
}
