"use client";
import { usePerfilForm } from "@/hooks/usePerfilForm/usePerfilForm";
import styles from "./perfil.module.css";
import Section from "@/components/Sections/PerfilSection/perfilSection";
import InputField from "@/components/Form/InputField/inputField";
import PasswordField from "@/components/Form/PasswordField/passwordField";
import ActionsBar from "@/components/ActionsBar/perfinalActionsBar";

export default function PerfilPage() {
  const {
    email,
    senhaAtual,
    novaSenha,
    confirmarSenha,
    setEmail,
    setSenhaAtual,
    setNovaSenha,
    setConfirmarSenha,
    ErrorEmail,
    ErrorSenhaAtual,
    ErrorNovaSenha,
    ErrorConfirmaSenha,
    passwordChecks,
    loading,
    submit,
  } = usePerfilForm();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit();
  }

  return (
    <main className={styles.pageFull}>
      <div className={styles.container}>
        <h1 className={styles.title}>Meu Perfil</h1>
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <Section title="Dados do Perfil" className={styles.sectionProfile}>
            <div className={styles.fieldGrid}>
              <div className={styles.label}>
                <span className={styles.labelText}>Nome</span>
                <span className={styles.staticField}>
                  Samir Fernandes de Lima Resende
                </span>
              </div>

              <InputField
                name="email"
                type="email"
                label="E-mail"
                placeholder="Informe aqui seu e-mail"
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                error={ErrorEmail}
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
            />
          </Section>

          <ActionsBar submitting={loading} submitLabel="Atualizar Dados" />
        </form>
      </div>
    </main>
  );
}
