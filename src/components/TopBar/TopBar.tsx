import React from "react";
import styles from "./style.module.css";
import Link from "next/link";

export const TopBar = ({ titulo }: { titulo: string }) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <h1 className="text-2xl font-bold #FFFF">{titulo}</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/perfil">Perfil</Link>
        <Link href="/marcacoes">Marcações</Link>
      </nav>
    </header>
  );
};
