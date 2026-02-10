"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.css";

// ⬇️ importa o contexto/hook de auth
import { useAuth } from "@/hooks/auth";

export default function LoginIndex() {
  const router = useRouter();
  const params = useSearchParams();
  const { login, status, requiresPasswordChange } = useAuth(); // ⬅️ vai salvar o user no sessionStorage + estado

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (requiresPasswordChange) {
      router.replace("/auth/atualizar-senha");
      return;
    }
    const next = params.get("next") || "/marcacoes";
    router.replace(next);
  }, [status, requiresPasswordChange, router, params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const usuario = String(form.get("usuario") || "");
    const senha = String(form.get("senha") || "");

    try {
      await login(usuario, senha);
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErr(error.message);
      } else {
        setErr("Ocorreu um erro. Por favor, tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap} aria-hidden>
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

        <h1 className={styles.title}>Portal do Cidadão</h1>
        <p className={styles.subtitle}>Acesse sua conta para continuar.</p>

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <label className={styles.label}>
            <span className={styles.labelText}>Usuário ou CNS</span>
            <input
              name="usuario"
              type="text"
              placeholder="Digite seu usuário ou CNS"
              autoComplete="username"
              required
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>Senha</span>
            <input
              name="senha"
              type={showPass ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className={styles.showBtn}
            >
              {showPass ? "Ocultar senha" : "Mostrar senha"}
            </button>
          </label>

          {err && <p className={styles.error}>{err}</p>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
