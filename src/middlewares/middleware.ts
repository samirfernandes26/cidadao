import type { NextRequest } from "next/server";
import { authMiddleware, config as authConfig } from "./auth";

export function middleware(req: NextRequest) {
  return authMiddleware(req);
}
export const config = authConfig;
