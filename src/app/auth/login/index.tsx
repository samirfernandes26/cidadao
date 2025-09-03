"use client";

import { useState } from "react";
import Link from "next/link";
import { s } from "./styled";

export default function LoginIndex() {
  const [showPass, setShowPass] = useState(false);
  const [usuarioError, setUsuarioError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const usuario = String(f.get("usuario") || "");
    const senha = String(f.get("senha") || "");
    let erro = false;
    if (!usuario) {
      setUsuarioError("Por favor, preencha o campo de usuário ou CNS.");
      erro = true;
    } else {
      setUsuarioError("");
    }
    if (!senha) {
      setSenhaError("Por favor, preencha o campo de senha.");
      erro = true;
    } else {
      setSenhaError("");
    }
    if (erro) return;
    console.log({
      usuario,
      senha,
    });
  }

  return (
    <main className={s.page}>
      <div className={s.card}>
        <div className={s.iconWrap} aria-hidden>
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

        <h1 className={s.title}>Portal do Cidadão</h1>
        <p className={s.subtitle}>Acesse sua conta para continuar.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            name="usuario"
            type="text"
            placeholder="Digite seu usuário ou CNS"
            autoComplete="username"
            className={s.input}
            aria-invalid={!!usuarioError}
          />
          {usuarioError && (
            <div style={{ color: "#e67e22", fontSize: 12, marginTop: 1 }}>
              {usuarioError}
            </div>
          )}
          <div>
            <input
              name="senha"
              type={showPass ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              className={s.input}
              aria-invalid={!!senhaError}
              // minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className={s.showBtn}
            >
              {showPass ? "Ocultar senha" : "Mostrar senha"}
            </button>
            {senhaError && (
              <div style={{ color: "#e67e22", fontSize: 12, marginTop: 1 }}>
                {senhaError}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <Link href="#" className={s.forgot}>
              Esqueceu sua senha?
            </Link>
          </div>

          <button type="submit" className={s.submit}>
            Login
          </button>
        </form>
        {/* 
        <iframe
          className={s.iframeVideo}
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        ></iframe> */}
      </div>
    </main>
  );
}
