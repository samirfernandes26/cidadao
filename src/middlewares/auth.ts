import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// rotas protegidas
export const matcher = ["/listaMarcacoes", "/marcacoes/:path*"];

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = { matcher };
