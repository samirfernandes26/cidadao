"user client";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function withAuth(req: NextRequest) {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();
  const csrfToken = allCookies.find(
    (c) => c.name === "versasaude_session",
  )?.value;

  //TODO: Vefiricar token
  if (!csrfToken) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}
