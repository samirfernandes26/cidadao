import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return (
    <div className="p-8 space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        Token presente? <b>{token ? "Sim ✅" : "Não ❌"}</b>
      </p>
      <p className="text-sm text-gray-500">
        * Em produção, use este token para chamar a API do Versa.
      </p>
    </div>
  );
}
