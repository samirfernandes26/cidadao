"use server";

import { cookies } from "next/headers";
import { HttpStatusCode } from "axios"; 
import { User } from "@/interfaces/auth"; 

interface LoginResponse {
  message: string;
  requires_password_change: boolean;
  user: User;
}

export interface IResponse {
  type: "success" | "error";
  message: string;
  user?: User;
  requiresPasswordChange?: boolean;
}

async function login(login: string, password: string): Promise<IResponse> {
  console.log("--- SERVIÇO DE LOGIN (fetch) INICIADO ---");

  const base = "http://desenvolvimento.versasaude.local/api";

  try {
    console.log("Login: Chamando API em", `${base}/cidadao/login`);

    const response = await fetch(`${base}/cidadao/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
      cache: 'no-store', 
    });
    
    const data = await response.json();

    if (!response.ok) {
        console.error("Login: API retornou erro", response.status, data);
        if (response.status === HttpStatusCode.UnprocessableEntity) {
            return {
                type: "error",
                message: data.error || "Credenciais inválidas. Tente novamente.",
            };
        }
        throw new Error(data.error || data.message || "Erro na resposta da API");
    }
    
    const successData = data as LoginResponse;
    console.log("Login: API respondeu com sucesso.");
    
    const setCookieHeaders = response.headers.getSetCookie();
    
    if (setCookieHeaders.length > 0) {
      const cookieStore = await cookies();
      
      console.log("Login: Repassando cookies do backend para o browser...");

      setCookieHeaders.forEach((cookieString) => {
        const parts = cookieString.split(';').map(part => part.trim());
        const [nameValue] = parts[0].split('=');
        const name = nameValue.trim();
        const value = parts[0].substring(name.length + 1).trim();

        const options: any = {};
        
        parts.slice(1).forEach(part => {
          const [key, ...val] = part.split('=');
          const lowerKey = key.trim().toLowerCase();
          const valStr = val.join('=');

          if (lowerKey === 'expires') options.expires = new Date(valStr);
          if (lowerKey === 'max-age') options.maxAge = parseInt(valStr, 10);
          
          if (lowerKey === 'samesite') {
             const s = valStr.toLowerCase();

             if (s === 'lax' || s === 'strict' || s === 'none') {
               options.sameSite = s;
             }
          }

          if (lowerKey === 'secure') options.secure = true;
          if (lowerKey === 'httponly') options.httpOnly = true;
        });

        options.path = '/';

        console.log(`Login: Definindo cookie [${name}] no browser (Domain: localhost, Path: /)`);
        cookieStore.set(name, value, options);
      });
      
    } else {
      console.warn("Login: O backend não retornou headers 'Set-Cookie'.");
    }
    
    console.log("--- SERVIÇO DE LOGIN (fetch) CONCLUÍDO ---");

    return {
      type: "success",
      message: successData.message,
      user: successData.user,
      requiresPasswordChange: successData.requires_password_change, 
    };

  } catch (err) {
    console.error("Login (Erro Catastrófico):", err);
    return {
      type: "error",
      message: (err instanceof Error) ? err.message : "Ocorreu um erro. Por favor, tente novamente mais tarde.",
    };
  }
}

export { login };