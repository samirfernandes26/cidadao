"use client";

import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { logoutService } from "@/services/Auth/logout_service";
import { useRouter } from "next/navigation";

interface TopBarProps {
  titulo: string;
}

export const TopBar = ({ titulo }: TopBarProps) => {
  const router = useRouter();

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

  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <h1 className={styles.title}>{titulo}</h1>
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        <Link href="/perfil" className={styles.navLink}>
          Perfil
        </Link>
        <Link href="/marcacoes" className={styles.navLink}>
          Marcações
        </Link>
        <button onClick={handleLogout} className={styles.navButton}>
          Sair
        </button>
      </nav>
    </header>
  );
};
