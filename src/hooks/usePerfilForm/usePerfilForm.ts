"use client";
import { useMemo, useState } from "react";
import { checkPassword, emailRegex, passwordIsValid } from "@/utils/validators";
import updatePerfilService from "@/services/perfil/update_perfil_service";

export function usePerfilForm() {
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorSenhaAtual, setErrorSenhaAtual] = useState("");
  const [ErrorNovaSenha, setErrorNovaSenha] = useState("");
  const [ErrorConfirmaSenha, setErrorConfirmaSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const passwordChecks = useMemo(
    () => checkPassword(novaSenha, confirmarSenha),
    [novaSenha, confirmarSenha]
  );

  async function submit() {
    setLoading(true);
    setErrorSenhaAtual("");
    setErrorNovaSenha("");
    setErrorConfirmaSenha("");
    setErrorEmail("");

    try {
      if (!senhaAtual) setErrorSenhaAtual("A senha atual é obrigatória.");

      if (email && !emailRegex.test(email)) setErrorEmail("E-mail inválido.");

      // regras cruzadas nova/confirmar
      if (novaSenha && !confirmarSenha)
        setErrorConfirmaSenha("A confirmação de senha é obrigatória.");
      if (confirmarSenha && !novaSenha)
        setErrorNovaSenha("A nova senha é obrigatória.");

      if (novaSenha || confirmarSenha) {
        if (!passwordIsValid(passwordChecks)) {
          setErrorNovaSenha(
            "A atualização de senha não cumpre todos os requisitos necessários."
          );
        }
      }

      // se há qualquer erro, não envia
      const hasErrors =
        [ErrorEmail, ErrorSenhaAtual, ErrorNovaSenha, ErrorConfirmaSenha].some(
          Boolean
        ) ||
        !senhaAtual ||
        (email && !emailRegex.test(email)) ||
        (novaSenha && !confirmarSenha) ||
        (confirmarSenha && !novaSenha) ||
        ((novaSenha || confirmarSenha) && !passwordIsValid(passwordChecks));
      if (hasErrors) return;

      const result = await updatePerfilService({
        senhaAtual,
        novaSenha,
        confirmarSenha,
        email,
      });

      console.log("Resultado da atualização do perfil:", result);
      return result;
    } finally {
      setLoading(false);
    }
  }

  return {
    // values
    email,
    senhaAtual,
    novaSenha,
    confirmarSenha,
    // setters
    setEmail,
    setSenhaAtual,
    setNovaSenha,
    setConfirmarSenha,
    // errors
    ErrorEmail,
    ErrorSenhaAtual,
    ErrorNovaSenha,
    ErrorConfirmaSenha,
    setErrorEmail,
    setErrorSenhaAtual,
    setErrorNovaSenha,
    setErrorConfirmaSenha,
    // derived
    passwordChecks,
    loading,
    // actions
    submit,
  } as const;
}
