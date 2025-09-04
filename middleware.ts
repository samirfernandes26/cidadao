import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // só protege /dashboard (e filhos)
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // se já logado, impede voltar para /auth/login
  if (pathname === "/auth/login") {
    const token = req.cookies.get("auth_token")?.value;
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/auth/login"] };
