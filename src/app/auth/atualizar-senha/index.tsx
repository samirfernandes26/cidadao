"use client";

import { useEffect, useState } from "react";
import requiresPasswordChangeService from "@/services/auth/requires_password_change_service";
import { useRouter } from "next/navigation";

import styles from "./atualizar_senha.module.css";
import { useAuth } from "@/hooks/auth";
import RequirementsList from "@/components/Form/requirementsList/RequirementsList";
import PasswordField from "@/components/Form/passwordField/passwordField";
import { usePerfilForm } from "@/hooks/usePerfilForm/usePerfilForm";

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
  const {
    novaSenha,
    confirmarSenha,
    setNovaSenha,
    setConfirmarSenha,
    ErrorNovaSenha,
    ErrorConfirmaSenha,
    loading,
    submitUpdatePassword,
  } = usePerfilForm();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitUpdatePassword();
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
          <PasswordField
            name="novaSenha"
            label="Nova senha"
            value={novaSenha}
            confirmValue={confirmarSenha}
            onChange={setNovaSenha}
            requiredIf={!!confirmarSenha}
            error={ErrorNovaSenha}
            showChecklistAgainst="confirm"
            placeholder="Mínimo de 8 caracteres"
          />

          <PasswordField
            name="confirmarSenha"
            label="Confirmar nova senha"
            value={confirmarSenha}
            confirmValue={novaSenha}
            onChange={setConfirmarSenha}
            requiredIf={!!novaSenha}
            error={ErrorConfirmaSenha}
            placeholder="Repita a nova senha"
            visibilityValidators={false}
          />

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </main>
  );
}
