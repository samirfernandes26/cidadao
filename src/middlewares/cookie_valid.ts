import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function withValidCookie(req: NextRequest) {
  const cookie = req.cookies.get("auth_token");
  if (!cookie) {
    // Redireciona para a página de login se o cookie não existir
  } else {
    // Verificar a validade do cookie (exemplo simples, ajustar conforme necessário)
  }
  return NextResponse.next();
}
