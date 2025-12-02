"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutService } from "@/services/Auth/logout_service";
import styles from "./style.module.css";

interface TopBarProps {
  titulo: string;
  marcacao: boolean;
  perfil: boolean;
}

export const TopBar = ({ titulo, marcacao, perfil }: TopBarProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  async function handleLogout() {
    try {
      const response = await logoutService();
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
      if (response) {
        router.replace("/auth/login");
      } else {
        alert("Erro ao sair. Tente novamente.");
      }
    } catch (error: unknown) {
      alert("Erro ao sair. Tente novamente. " + (error as Error)?.message);
    }
  }

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!open) return;
      if (menuRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.topbar}>
      {/* Título */}
      <div className={styles.logo}>
        <h1 className={styles.title}>{titulo}</h1>
      </div>

      {/* Navegação (desktop) */}
      <nav className={styles.nav} aria-label="Principal">
        <Link href="/perfil" className={styles.navLink}>
          Perfil
        </Link>
        <Link href="/marcacoes" className={styles.navLink}>
          Marcações
        </Link>
        <button onClick={handleLogout} className={styles.navButton}>
          Sair da conta
        </button>
      </nav>

      {/* Botão sanduíche (só mobile) */}
      <button
        ref={btnRef}
        type="button"
        className={styles.menuBtn}
        aria-label="Abrir menu"
        aria-haspopup="menu"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <BurgerIcon />}
      </button>

      {/* Menu dropdown (mobile) */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="menu"
        aria-hidden={!open}
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
      >
        {perfil == true && (
          <Link
            href="/perfil"
            role="menuitem"
            className={styles.mobileItem}
            onClick={() => setOpen(false)}
          >
            Perfil
          </Link>
        )}
        {marcacao == true && (
          <Link
            href="/marcacoes"
            role="menuitem"
            className={styles.mobileItem}
            onClick={() => setOpen(false)}
          >
            Marcações
          </Link>
        )}
        <button
          role="menuitem"
          className={`${styles.mobileItem} ${styles.mobileDanger}`}
          onClick={() => {
            setOpen(false);
            handleLogout();
          }}
        >
          Sair da conta
        </button>
      </div>
    </header>
  );
};

/* ====== Ícones (SVG inline) ====== */
function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
