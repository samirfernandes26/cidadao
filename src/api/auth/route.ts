import { NextResponse } from "next/server";
import { versaLoginTyped } from "@/services/auth/login";

export async function POST(req: Request) {
  try {
    const { usuario, senha } = await req.json();
    if (!usuario || !senha) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const session = await versaLoginTyped(usuario, senha);

    const res = NextResponse.json({
      ok: true,
      user: session.user,
      expiresAt: session.expiresAt.toISOString(),
    });

    res.cookies.set("auth_token", session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.max(0, Math.floor((+session.expiresAt - Date.now()) / 1000)),
    });

    return res;
  } catch (err: any) {
    const status = err?.status === 401 ? 401 : 500;
    const error = status === 401 ? "INVALID_CREDENTIALS" : "SERVER_ERROR";
    return NextResponse.json({ error }, { status });
  }
}
