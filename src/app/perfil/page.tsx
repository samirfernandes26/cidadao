"use client";

import { useState } from "react";
import styles from "./perfil.module.css";

export default function PerfilPage() {
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

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

  return (
    <main className={styles.pageFull}>
      <div className={styles.container}>
        <h1 className={styles.title}>Meu Perfil</h1>

        <form className={styles.form} noValidate>
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
                  type="email"
                  name="novoEmail"
                  defaultValue="usuario@email.com"
                  required
                  className={styles.input}
                />
              </label>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionPassword}`}>
            <h2 className={styles.sectionTitle}>Senha Atual</h2>

            <label className={styles.label}>
              <span className={styles.labelText}>Confirmar nova senha</span>
              <input
                name="current_password"
                type={showConf ? "text" : "password"}
                className={styles.input}
                placeholder="senha atual"
                autoComplete="current-password"
                minLength={8}
                required
                // value={}
                // onChange={(e) => {}}
              />
            </label>

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
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
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
                }}
              />
            </label>
          </section>

          <div className={styles.actions}>
            <button type="submit" className={styles.primaryBtn}>
              Atualizar Dados
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
