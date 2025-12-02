"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { updateProfileService } from "@/services/perfil/update_perfil_service";
import styles from "./atualizar_perfil.module.css";

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

export default function AtualizarPerfilPage() {
  const router = useRouter();
  const [showAtual, setShowAtual] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrMsg(null);
    setOkMsg(null);

    if (!senhaAtual) {
      setErrMsg("A senha atual é obrigatória.");

      return;
    }

    if (!email && !novaSenha) {
      setErrMsg("Você deve fornecer um novo e-mail ou uma nova senha.");

      return;
    }

    if (novaSenha && novaSenha !== confirmaSenha) {
      setErrMsg("A confirmação da nova senha não confere.");

      return;
    }

    setLoading(true);

    try {
      const result = await updateProfileService({
        senha_atual: senhaAtual,
        email: email || null,
        nova_senha: novaSenha || null,
        confirmar_senha: confirmaSenha || null,
      });

      if (result.status === 'success') {
        setOkMsg(result.message || "Perfil atualizado com sucesso!");

        (e.target as HTMLFormElement).reset();
        
        setSenhaAtual("");
        setEmail("");
        setNovaSenha("");
        setConfirmaSenha("");
      } else {
         setErrMsg(result.message || "Não foi possível atualizar o perfil.");
      }
    } catch (error: unknown) {
      setErrMsg(
        (error as Error)?.message ||
          "Erro ao atualizar o perfil. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap} aria-hidden>
          {}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4H12L14 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4Z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              d="M17 17l-1.09 -1.09"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Atualizar Perfil</h1>
        <p className={styles.subtitle}>
          Altere seu e-mail ou senha. Para sua segurança, informe sua senha atual.
        </p>

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          {}
          <label className={styles.label}>
            <span className={styles.labelText}>Senha Atual</span>
            <input
              name="senha_atual"
              type={showAtual ? "text" : "password"}
              className={styles.input}
              placeholder="Sua senha atual"
              autoComplete="current-password"
              required
              value={senhaAtual}
              onChange={(e) => {
                setSenhaAtual(e.target.value);
                setErrMsg(null);
                setOkMsg(null);
              }}
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowAtual((v) => !v)}
              aria-label={showAtual ? "Ocultar senha" : "Mostrar senha"}
            >
              {showAtual ? (
                <EyeOffIcon className={styles.eye} />
              ) : (
                <EyeIcon className={styles.eye} />
              )}
            </button>
          </label>
          
          <hr className={styles.divider} />
          
          <p className={styles.subtitle} style={{fontSize: '0.9rem', textAlign: 'left', marginTop: 0}}>
            Informe o novo e-mail ou a nova senha:
          </p>

          {}
          <label className={styles.label}>
            <span className={styles.labelText}>Novo E-mail (Opcional)</span>
            <input
              name="email"
              type="email"
              className={styles.input}
              placeholder="exemplo@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrMsg(null);
                setOkMsg(null);
              }}
            />
          </label>

          {}
          <label className={styles.label}>
            <span className={styles.labelText}>Nova Senha (Opcional)</span>
            <input
              name="nova_senha"
              type={showNew ? "text" : "password"}
              className={styles.input}
              placeholder="Mínimo de 8 caracteres"
              autoComplete="new-password"
              minLength={8}
              value={novaSenha}
              onChange={(e) => {
                setNovaSenha(e.target.value);
                setErrMsg(null);
                setOkMsg(null);
              }}
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowNew((v) => !v)}
              aria-label={showNew ? "Ocultar senha" : "Mostrar senha"}
            >
              {showNew ? (
                <EyeOffIcon className={styles.eye} />
              ) : (
                <EyeIcon className={styles.eye} />
              )}
            </button>
          </label>

          {}
          <label className={styles.label}>
            <span className={styles.labelText}>Confirmar Nova Senha</span>
            <input
              name="confirmar_senha"
              type={showConf ? "text" : "password"}
              className={styles.input}
              placeholder="Repita a nova senha"
              autoComplete="new-password"
              minLength={8}
              value={confirmaSenha}
              onChange={(e) => {
                setConfirmaSenha(e.target.value);
                setErrMsg(null);
                setOkMsg(null);
              }}
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowConf((v) => !v)}
              aria-label={showConf ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConf ? (
                <EyeOffIcon className={styles.eye} />
              ) : (
                <EyeIcon className={styles.eye} />
              )}
            </button>
          </label>

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
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>

        <button 
          type="button" 
          className={styles.submit}
          style={{ marginTop: '10px', backgroundColor: '#6c757d', opacity: 0.8 }}
          onClick={() => router.back()}
        >
          Voltar
        </button>
      </div>
    </main>
  );
}