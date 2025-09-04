"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { s } from "./styled";

export default function LoginIndex() {
  const router = useRouter();
  const params = useSearchParams();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const usuario = String(form.get("usuario") || "");
    const senha = String(form.get("senha") || "");

    try {
      const rest = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      if (rest.ok) {
        const to = "/dashboard";
        router.push(to);
        return;
      }

      if (rest.status === 401) {
        setErr("Credenciais inválidas. Tente novamente.");
      } else {
        setErr("Ocorreu um erro. Por favor, tente novamente mais tarde.");
      }
    } catch {
      setErr("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={s.page}>
      <div className={s.card}>
        <div className={s.iconWrap} aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8a7 7 0 0 0-14 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={s.title}>Portal do Cidadão</h1>
        <p className={s.subtitle}>Acesse sua conta para continuar.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            name="usuario"
            type="text"
            placeholder="Digite seu usuário ou CNS"
            autoComplete="username"
            required
            className={s.input}
          />
          <div>
            <input
              name="senha"
              type={showPass ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              className={s.input}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className={s.showBtn}
            >
              {showPass ? "Ocultar senha" : "Mostrar senha"}
            </button>
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <div className="flex items-center justify-end">
            <Link href="#" className={s.forgot}>
              Esqueceu sua senha?
            </Link>
          </div>

          <button type="submit" className={s.submit} disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>

        {/* 
        <iframe
          className={s.iframeVideo}
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        ></iframe> */}
      </div>
    </main>
  );
}
