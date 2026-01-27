"user client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function withAuth(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  //TODO: Vefiricar token
  // if (!token) {
  //   const loginUrl = new URL("/auth/login", req.url);
  //   loginUrl.searchParams.set("next", req.nextUrl.pathname);
  //   return NextResponse.redirect(loginUrl);
  // }
}
