"use client";
import { usePerfilForm } from "@/hooks/usePerfilForm/usePerfilForm";
import { useAuth } from "@/hooks/auth";
import styles from "./perfil.module.css";
import Section from "@/components/Sections/PerfilSection/perfilSection";
import InputField from "@/components/Form/InputField/inputField";
import PasswordField from "@/components/Form/PasswordField/passwordField";
import ActionsBar from "@/components/ActionsBar/perfinalActionsBar";
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const {
    email,
    senhaAtual,
    novaSenha,
    confirmarSenha,
    setEmail,
    setSenhaAtual,
    setNovaSenha,
    setConfirmarSenha,
    setErrorEmail,
    setErrorSenhaAtual,
    setErrorNovaSenha,
    setErrorConfirmaSenha,
    ErrorEmail,
    ErrorSenhaAtual,
    ErrorNovaSenha,
    ErrorConfirmaSenha,
    passwordChecks,
    loading,
    submit,
  } = usePerfilForm();

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user?.email, setEmail]);

  function handleCancelEdit() {
    setIsEditing(false);
    setEmail(user?.email ?? "");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setErrorEmail("");
    setErrorSenhaAtual("");
    setErrorNovaSenha("");
    setErrorConfirmaSenha("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEditing) return;
    const result = await submit();
    if (result?.status === "success") {
      setIsEditing(false);
    }
  }

  return (
    <main className={styles.pageFull}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Meu Perfil</h1>
          <button
            type="button"
            className={styles.editToggleBtn}
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            aria-pressed={isEditing}
          >
            {isEditing ? "Edição habilitada" : "Habilitar edição"}
          </button>
        </div>
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <Section title="Dados do Perfil" className={styles.sectionProfile}>
            <div className={styles.fieldGrid}>
              <div className={styles.label}>
                <span className={styles.labelText}>Nome: </span>
                <span className={styles.staticField}>{user?.nome || "—"}</span>
              </div>

              <InputField
                name="email"
                type="email"
                label="E-mail"
                placeholder="Informe aqui seu e-mail"
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                error={ErrorEmail}
                disabled={!isEditing}
              />
            </div>
          </Section>

          <Section title="Senha Atual" className={styles.sectionPassword}>
            <InputField
              name="senhaAtual"
              type="password"
              label="Senha atual"
              placeholder="senha atual"
              autoComplete="current-password"
              minLength={8}
              required
              value={senhaAtual}
              onChange={(e) =>
                setSenhaAtual((e.target as HTMLInputElement).value)
              }
              error={ErrorSenhaAtual}
              disabled={!isEditing}
            />

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
              disabled={!isEditing}
              visibilityValidators={isEditing}
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
              disabled={!isEditing}
              visibilityValidators={isEditing}
            />
          </Section>

          <ActionsBar
            submitting={loading}
            submitLabel="Atualizar Dados"
            submitDisabled={!isEditing}
            backLabel={isEditing ? "Cancelar edição" : "Voltar"}
            backVariant={isEditing ? "danger" : "primary"}
            back={isEditing ? handleCancelEdit : undefined}
            backDisabled={loading}
          />
        </form>
      </div>
    </main>
  );
}
