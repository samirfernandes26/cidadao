import { NextResponse, type NextRequest } from "next/server";

// o middleware.ts estava causando um loop de login infinito.

// Ele estava em conflito direto com o seu AuthContext.tsx:

// O middleware.ts roda no servidor do Next.js.

// O seu login (o AuthContext.tsx) funciona no navegador (cliente) e usa o sessionStorage.

// O servidor não consegue ler o sessionStorage do navegador.

// Resultado: Após o login, o AuthContext te enviava para /test-api. 
// O middleware.ts (no servidor) interceptava isso, não via o sessionStorage, 
// achava que você não estava logado e mandava de volta para /auth/login, causando o loop.

const middlewares: ((request: NextRequest) => NextResponse)[] = []; 

export function middleware(request: NextRequest) {
  const response = NextResponse.next(); 

  for (const mw of middlewares) {
    const result = mw(request); 

    if (result && result !== NextResponse.next()) {
      return result;
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|auth/login).*)",
  ],
};