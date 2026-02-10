"user client";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function withAuth(req: NextRequest) {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();
  const authToken = allCookies.find(
    (c) => c.name === "versasus_session",
  )?.value;

  //TODO: Vefiricar token
  if (!authToken) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}
