"use client";

import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { usePathname } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let title = "Cidadão"; // Título Padrão
  if (pathname.includes("/perfil")) {
    title = "Meu Perfil";
  } else if (pathname.includes("/marcacoes")) {
    title = "Minhas Marcações";
  }

  return (
    <>
      <TopBar titulo={title} marcacao={false} perfil={true} />
      {children}
    </>
  );
}
