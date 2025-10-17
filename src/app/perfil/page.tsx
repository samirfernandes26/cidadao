"use client";

import { useState } from "react";
import styles from "./perfil.module.css";
import updatePerfilService from "@/services/perfil/update_perfil_service";

export default function PerfilPage() {
  // Apenas para feedback visual de senha
  const [novaSenha, setNovaSenha] = useState("");
  const [senhaFocus, setsenhaFocus] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");

  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorSenhaAtual, setErrorSenhaAtual] = useState("");
  const [ErrorNovaSenha, setErrorNovaSenha] = useState("");
  const [ErrorConfirmaSenha, setErrorConfirmaSenha] = useState("");

  const [loading, setLoading] = useState(false);

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
      ok: req.test(novaSenha),
    })),
    {
      label: "Senhas conferem",
      ok: novaSenha.length > 0 && novaSenha === confirmarSenha,
    },
  ];

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setErrorSenhaAtual("");
    setErrorNovaSenha("");
    setErrorConfirmaSenha("");
    setErrorEmail("");

    try {
      if (!senhaAtual) {
        setErrorSenhaAtual("A senha atual é obrigatória.");
      } else {
        if (!!email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setErrorEmail("E-mail inválido.");
          }
        }

        if (!!novaSenha && !confirmarSenha) {
          setConfirmarSenha("A confirmação de senha é obrigatória.");
        }

        if (!!confirmarSenha && !novaSenha) {
          setErrorNovaSenha("A nova senha é obrigatória.");
        }

        if (
          !validateNovaSenha(novaSenha, confirmarSenha) &&
          !!novaSenha &&
          !!confirmarSenha
        ) {
          setErrorNovaSenha(
            "A atualização de senha não cumpre todos os requisitos necessários."
          );
        }

        if (
          (!!confirmarSenha && !novaSenha) ||
          (!confirmarSenha && !!novaSenha)
        ) {
          setErrorNovaSenha(
            "Nova senha é obrigatória se confirmar senha for preenchida."
          );
        }

        const result = await updatePerfilService({
          senhaAtual,
          novaSenha,
          confirmarSenha,
          email,
        });

        console.log("Resultado da atualização do perfil:", result);
      }

      function validateNovaSenha(
        novaSenha: string,
        confirmaSenha: string
      ): boolean {
        if (!novaSenha) return true;
        if (
          novaSenha.length < 8 ||
          !/[^A-Za-z0-9]/.test(novaSenha) ||
          !/[0-9]/.test(novaSenha) ||
          !/[A-Z]/.test(novaSenha) ||
          !/[a-z]/.test(novaSenha) ||
          !confirmaSenha ||
          novaSenha !== confirmaSenha
        ) {
          return false;
        }
        return true;
      }

      debugger;
    } catch (error: any) {
      console.log(
        error?.message || "Erro ao atualizar dados. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.pageFull}>
      <div className={styles.container}>
        <h1 className={styles.title}>Meu Perfil</h1>

        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <section className={`${styles.section} ${styles.sectionProfile}`}>
            <h2 className={styles.sectionTitle}>Dados do Perfil</h2>

            <div className={styles.fieldGrid}>
              <div className={styles.label}>
                <span className={styles.labelText}>Nome</span>
                <span className={styles.staticField}>
                  Samir Fernandes de Lima Resende
                </span>
              </div>

              <label className={styles.label}>
                <span className={styles.labelText}>E-mail</span>
                <input
                  name="email"
                  type="email"
                  className={styles.input}
                  required={false}
                  placeholder="Informe aqui seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!!ErrorEmail && (
                  <span className={styles.labelError}>{ErrorEmail}</span>
                )}
              </label>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionPassword}`}>
            <h2 className={styles.sectionTitle}>Senha Atual</h2>

            <label className={styles.label}>
              <span className={styles.labelText}>Senha atual</span>
              <input
                name="senhaAtual"
                type="password"
                className={styles.input}
                placeholder="senha atual"
                autoComplete="current-password"
                minLength={8}
                required={true}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
              {!!ErrorSenhaAtual && (
                <span className={styles.labelError}>{ErrorSenhaAtual}</span>
              )}
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>Nova senha</span>
              <input
                name="novaSenha"
                type="password"
                className={styles.input}
                placeholder="Mínimo de 8 caracteres"
                autoComplete="new-password"
                minLength={8}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required={!!confirmarSenha}
                onFocus={() => setsenhaFocus(true)}
                onBlur={() => setsenhaFocus(false)}
              />
              {!!ErrorNovaSenha && (
                <span className={styles.labelError}>{ErrorNovaSenha}</span>
              )}
            </label>

            {(novaSenha.length > 0 || senhaFocus) && (
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
            )}

            <label className={styles.label}>
              <span className={styles.labelText}>Confirmar nova senha</span>
              <input
                name="confirmarSenha"
                type="password"
                className={styles.input}
                placeholder="Repita a nova senha"
                autoComplete="new-password"
                minLength={8}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required={!!novaSenha}
                onFocus={() => setsenhaFocus(true)}
                onBlur={() => setsenhaFocus(false)}
              />
              {!!ErrorConfirmaSenha && (
                <span className={styles.labelError}>{ErrorConfirmaSenha}</span>
              )}
            </label>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => window.history.back()}
            >
              Voltar
            </button>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Atualizar Dados"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
