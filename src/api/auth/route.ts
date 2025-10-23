import { IError } from "@/interfaces/IError";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { usuario, senha } = await req.json();
    if (!usuario || !senha) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    // return res;
  } catch (error: unknown) {
    const status = (error as IError)?.status === 401 ? 401 : 500;
    const errorMessage =
      status === 401 ? "INVALID_CREDENTIALS" : "SERVER_ERROR";
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
