import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // sessionStorage  Sempre apaga ao fechar o navegador

  // localStorage Sempre persiste mesmo que o navegador seja fechado

  // set get

  // String, boolean, number

  // ['usuario', 'senha'];

  // {
  //   teste: 'valor',
  //   outro: 123,
  //   ativo: true
  // }

  // JSON.stringify();

  // JSON.parse();

  // Criar hooks para context de autenticação, validando cookie e também session/local storage

  // Criar middlware para proteger rotas

  try {
    const { usuario, senha } = await req.json();

    if (!usuario || !senha) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const url = `${process.env.VERSA_API_BASE_URL}/auth/login`;
    const payload = { login: usuario, password: senha };
    debugger;
    // chamada à API externa
    const versa = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // credenciais inválidas
    if ([400, 401, 422].includes(versa.status)) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    // outros erros na API
    if (!versa.ok) {
      const raw = await versa.text();
      console.error("[/api/login] Versa error:", versa.status, raw);
      return NextResponse.json({ error: "SERVER_ERROR" }, { status: 502 });
    }

    // lê o corpo (espera token)
    const data = await versa.json();
    const token: string | undefined =
      data?.token ?? data?.access_token ?? data?.jwt;
    if (!token) {
      console.error("[/api/login] token não encontrado no JSON:", data);
      return NextResponse.json({ error: "NO_TOKEN" }, { status: 502 });
    }

    // set cookie HttpOnly
    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8h
    });
    return res;
  } catch (e) {
    console.error("[/api/login] error:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
