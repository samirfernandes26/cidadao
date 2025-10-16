import * as Yup from "yup";

export const updatePerfilValidators = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório."),
  senhaAtual: Yup.string()
    .required("A senha atual é obrigatória.")
    .min(8, "Mínimo de 8 caracteres.")
    .matches(/[^A-Za-z0-9]/, "Pelo menos 1 símbolo especial.")
    .matches(/[0-9]/, "Pelo menos 1 número.")
    .matches(/[A-Z]/, "Pelo menos 1 letra maiúscula.")
    .matches(/[a-z]/, "Pelo menos 1 letra minúscula."),
  novaSenha: Yup.string()
    .required("A nova senha é obrigatória.")
    .test(
      "senhaRequisitos",
      "A nova senha deve ter no mínimo 8 caracteres, 1 símbolo especial, 1 número, 1 letra maiúscula e 1 minúscula.",
      (value) => {
        if (!value) return false;
        return (
          value.length >= 8 &&
          /[^A-Za-z0-9]/.test(value) &&
          /[0-9]/.test(value) &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value)
        );
      }
    ),
  confirmarSenha: Yup.string()
    .required("Confirmação de senha é obrigatória.")
    .oneOf([Yup.ref("novaSenha")], "As senhas não coincidem"),
});
