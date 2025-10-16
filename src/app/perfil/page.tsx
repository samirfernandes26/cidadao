"use client";

import { useState } from "react";
import styles from "./perfil.module.css";
import updatePerfilService from "@/services/perfil/update_perfil_service";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePerfilValidators } from "@/validators/update_perfil_validators";

import { InputControl } from "@/components/Form/inputControl/index";

type PerfilForm = {
  email: string;
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
};

export default function PerfilPage() {
  // Apenas para feedback visual de senha
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PerfilForm>({
    resolver: yupResolver(updatePerfilValidators),
    reValidateMode: "onChange",
    defaultValues: {
      email: "usuario@email.com",
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    },
  });

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
      ok: novaSenha.length > 0 && novaSenha === confirmaSenha,
    },
  ];

  async function onSubmit(data: any) {
    setErrMsg(null);
    setOkMsg(null);
    setLoading(true);
    try {
      await updatePerfilService(data);
      setOkMsg("Dados atualizados com sucesso!");
    } catch (error: any) {
      setErrMsg(error?.message || "Erro ao atualizar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.pageFull}>
      <div className={styles.container}>
        <h1 className={styles.title}>Meu Perfil</h1>

        <form
          className={styles.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
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
                <InputControl<PerfilForm>
                  control={control}
                  name="email"
                  type="email"
                  className={styles.input}
                  required
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </label>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionPassword}`}>
            <h2 className={styles.sectionTitle}>Senha Atual</h2>

            <label className={styles.label}>
              <span className={styles.labelText}>Senha atual</span>
              <InputControl<PerfilForm>
                control={control}
                name="senhaAtual"
                type="password"
                className={styles.input}
                placeholder="senha atual"
                autoComplete="current-password"
                minLength={8}
                required
              />
              {errors.senhaAtual && (
                <span className={styles.error}>
                  {errors.senhaAtual.message}
                </span>
              )}
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>Nova senha</span>
              <InputControl<PerfilForm>
                control={control}
                name="novaSenha"
                type="password"
                className={styles.input}
                placeholder="Mínimo de 8 caracteres"
                autoComplete="new-password"
                minLength={8}
              />
              {errors.novaSenha && (
                <span className={styles.error}>{errors.novaSenha.message}</span>
              )}
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
              <InputControl<PerfilForm>
                control={control}
                name="confirmarSenha"
                type="password"
                className={styles.input}
                placeholder="Repita a nova senha"
                autoComplete="new-password"
                minLength={8}
              />
              {errors.confirmarSenha && (
                <span className={styles.error}>
                  {errors.confirmarSenha.message}
                </span>
              )}
            </label>
          </section>

          <div className={styles.actions}>
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
