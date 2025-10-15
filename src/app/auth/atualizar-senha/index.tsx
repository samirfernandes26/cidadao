"use client";

import { useEffect, useState } from "react";
import requiresPasswordChangeService from "@/services/auth/requires_password_change_service";
import { useRouter } from "next/navigation";

import styles from "./atualizar_senha.module.css";
import { useAuth } from "@/hooks/auth";

/* ===== Ícones (SVG inline) ===== */
function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 3l18 18M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 3-3c0-.5-.1-1-.3-1.4M7.1 7.6C4.7 9 3 12 3 12s3.5 7 10 7c2.1 0 3.9-.6 5.4-1.5M16.5 7.5C15.2 6.9 13.7 6 13 6c-6.5 0-10 6-10 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AtualizarSenhaPage() {
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const { requiresPasswordChange } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requiresPasswordChange === false) {
      router.push("/marcacoes");
    }
  }, [requiresPasswordChange, router]);

  // Requisitos de senha
  const requisitos = [
    {
      label: "Mínimo de 8 caracteres",
      test: (s: string) => s.length >= 8,
    },
    {
      label: "Pelo menos 1 símbolo especial",
      test: (s: string) => /[^A-Za-z0-9]/.test(s),
    },
    {
      label: "Pelo menos 1 número",
      test: (s: string) => /[0-9]/.test(s),
    },
    {
      label: "Pelo menos 1 letra maiúscula",
      test: (s: string) => /[A-Z]/.test(s),
    },
    {
      label: "Pelo menos 1 letra minúscula",
      test: (s: string) => /[a-z]/.test(s),
    },
  ];

  const requisitosVisuais = [
    ...requisitos.map((req) => ({
      label: req.label,
      ok: req.test(senha),
    })),
    {
      label: "Senhas conferem",
      ok: senha.length > 0 && senha === confirmaSenha,
    },
  ];

  function validate(newPass: string, conf: string) {
    for (const req of requisitos) {
      if (!req.test(newPass)) return `A senha não atende: ${req.label}`;
    }
    if (newPass !== conf) return "A confirmação deve ser igual à nova senha.";
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrMsg(null);
    setOkMsg(null);

    const fd = new FormData(e.currentTarget);
    const new_password = String(fd.get("new_password") || "");
    const confirm_password = String(fd.get("confirm_password") || "");

    const v = validate(new_password, confirm_password);
    if (v) {
      setErrMsg(v);
      return;
    }

    setLoading(true);
    try {
      const result = await requiresPasswordChangeService(
        new_password,
        confirm_password
      );
      if (result === true) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("requires_password_change", "false");
        }
        router.push("/marcacoes");
        return;
      }
      setOkMsg("Senha atualizada com sucesso!");
      (e.target as HTMLFormElement).reset();
    } catch (error: unknown) {
      setErrMsg(
        (error as Error)?.message ||
          "Não foi possível atualizar a senha. Tente novamente."
      );
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
              d="M6 10V8a6 6 0 1 1 12 0v2m-9 6h6m-9 0a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3m-12 0V10h12v6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Atualizar Senha</h1>
        <p className={styles.subtitle}>
          Defina uma nova senha para continuar usando o Portal do Cidadão.
        </p>

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <label className={styles.label}>
            <span className={styles.labelText}>Nova senha</span>
            <input
              name="new_password"
              type={showNew ? "text" : "password"}
              className={styles.input}
              placeholder="Mínimo de 8 caracteres"
              autoComplete="new-password"
              minLength={8}
              required
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErrMsg(null);
              }}
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowNew((v) => !v)}
              aria-label={showNew ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showNew}
              title={showNew ? "Ocultar senha" : "Mostrar senha"}
            >
              {showNew ? (
                <EyeOffIcon className={styles.eye} />
              ) : (
                <EyeIcon className={styles.eye} />
              )}
            </button>
          </label>

          <ul className={styles.hints} style={{ marginBottom: 8 }}>
            {requisitosVisuais.map((req, idx) => (
              <li
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: req.ok ? "#2ecc40" : "#ff4136",
                    border: "1px solid #ccc",
                    marginRight: 6,
                  }}
                  aria-label={
                    req.ok ? "Requisito atendido" : "Requisito não atendido"
                  }
                />
                {req.label}
              </li>
            ))}
          </ul>

          <label className={styles.label}>
            <span className={styles.labelText}>Confirmar nova senha</span>
            <input
              name="confirm_password"
              type={showConf ? "text" : "password"}
              className={styles.input}
              placeholder="Repita a nova senha"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmaSenha}
              onChange={(e) => {
                setConfirmaSenha(e.target.value);
                setErrMsg(null);
              }}
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowConf((v) => !v)}
              aria-label={showConf ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showConf}
              title={showConf ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConf ? (
                <EyeOffIcon className={styles.eye} />
              ) : (
                <EyeIcon className={styles.eye} />
              )}
            </button>
          </label>

          <ul className={styles.hints}>
            <li>Evite usar dados pessoais (ex.: datas, nomes)</li>
          </ul>

          {errMsg && (
            <p className={styles.error} aria-live="assertive">
              {errMsg}
            </p>
          )}
          {okMsg && (
            <p className={styles.success} aria-live="polite">
              {okMsg}
            </p>
          )}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </main>
  );
}
