import { NextResponse, type NextRequest } from "next/server";

import { withAuth } from "@/middlewares/auth";
import { withValidCookie } from "@/middlewares/cookie_valid";

const middlewares = [withAuth];

export function middleware(request: NextRequest) {
  let response = NextResponse.next(); // Resposta inicial

  for (const mw of middlewares) {
    const result = mw(request); // Supondo que seus middlewares retornam NextResponse

    // Se o middleware retornar uma resposta que não seja .next() (como redirect ou rewrite),
    // pare o encadeamento e retorne essa resposta imediatamente.
    if (result && result !== NextResponse.next()) {
      return result;
    }
  }

  return response;
}

export const config = {
  // Regex de Negative Lookahead
  matcher: [
    /* * O Middleware será executado em TODAS as rotas, EXCETO aquelas que
     * começam com um dos padrões listados no (?! ... )
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|auth/login).*)",
  ],
};
