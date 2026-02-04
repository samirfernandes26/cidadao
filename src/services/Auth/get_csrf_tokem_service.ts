"use server";

import { cookies } from "next/headers";
import axios from "axios";

import { Api_csrf_token } from "@/utils/const/const";

interface IResponse {
  message: string;
  csrf_token: string;
}

export default async function getApiCsrfTokemService(): Promise<String> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");

  const headers: Record<string, string> = {
    Accept: "application/json",
    Cookie: cookieHeader,
  };

  const { data } = await axios.get<IResponse>(Api_csrf_token, {
    headers,
    withCredentials: true,
  });

  cookieStore.set("csrf_token", data.csrf_token);
  return data.csrf_token ?? "";
}
