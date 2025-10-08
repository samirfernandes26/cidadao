"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.css";

// ⬇️ importa o contexto/hook de auth
import { useAuth } from "@/hooks/auth";

export default function LoginIndex() {
  const router = useRouter();
  const params = useSearchParams();
  const { login, user } = useAuth(); // ⬅️ vai salvar o user no sessionStorage + estado

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!!user?.cidadao_id) {
      const next = params.get("next") || "/marcacoes";
      router.push(next);
    }
  }, [user]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const usuario = String(form.get("usuario") || "");
    const senha = String(form.get("senha") || "");

    try {
      const response = await login(usuario, senha);

      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ usuario, senha }),
      // });
      // if (res.ok) {
      //   // espera que a rota /api/login retorne { ok: true, user: { ... } }
      //   const body = (await res.json()) as { ok: true; user: VersaUser };
      //   // login(body.user); // ⬅️ guarda no sessionStorage e atualiza contexto
      // const next = params.get("next") || "/listaMarcacoes";
      // router.push(next);
      // return;
      // }
      // setErr(
      //   res.status === 401
      //     ? "Credenciais inválidas. Tente novamente."
      //     : "Ocorreu um erro. Por favor, tente novamente mais tarde."
      // );
    } catch {
      setErr("Ocorreu um erro. Por favor, tente novamente mais tarde.");
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

          <div className={styles.forgotRow}>
            <Link href="#" className={styles.forgot}>
              Esqueceu sua senha?
            </Link>
          </div>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
