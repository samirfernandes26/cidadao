import * as Yup from "yup";

export const updatePerfilValidators = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório."),
  senhaAtual: Yup.string().required("A senha atual é obrigatória."),
  novaSenha: Yup.string()
    .test(
      "senhaRequisitos",
      "A nova senha deve ter no mínimo 8 caracteres, 1 símbolo especial, 1 número, 1 letra maiúscula e 1 minúscula.",
      (value) => {
        if (!value) return true;
        return (
          value.length >= 8 &&
          /[^A-Za-z0-9]/.test(value) &&
          /[0-9]/.test(value) &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value)
        );
      }
    )
    .when("confirmarSenha", {
      is: (val: string) => !!val,
      then: (schema) =>
        schema.required(
          "A nova senha é obrigatória se confirmar senha for preenchida."
        ),
      otherwise: (schema) => schema.optional(),
    }),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("novaSenha")], "As senhas não coincidem")
    .when("novaSenha", {
      is: (val: string) => !!val,
      then: (schema) =>
        schema.required(
          "Confirmação de senha é obrigatória se nova senha for preenchida."
        ),
      otherwise: (schema) => schema.optional(),
    }),
});
