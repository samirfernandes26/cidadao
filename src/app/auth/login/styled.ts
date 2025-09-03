// src/app/auth/login/styled.ts

// Tokens reutilizáveis
const t = {
  ring: "focus:outline-none focus:ring-2 focus:ring-blue-600",
  linkBlue: "font-medium text-blue-600 hover:underline ",
  btnBase: "rounded-xl px-4 font-medium shadow",
  btnPrimary: "bg-blue-600 text-white hover:bg-blue-700",
  inputBase:
    "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none",
  cardShadow: "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]",
} as const;

type Classes = Readonly<Record<string, string>>;

export const s: Classes = {
  // Altura fluida no mobile, padding responde ao breakpoint
  page: "min-h-dvh grid place-items-center bg-gray-50 p-4 sm:p-6",

  // Largura fluida: até 92vw, com teto que cresce (28rem → 32rem → 36rem)
  // Padding responde ao breakpoint
  iframeVideo:
    `w-full  ` +
    `h-[180px] sm:h-[220px] md:h-[300px] lg:h-[400px] ` +
    `rounded-2xl bg-black  ${t.cardShadow}`,

  card:
    `w-full max-w-[min(92vw,28rem)] sm:max-w-[min(92vw,32rem)] lg:max-w-[min(92vw,40rem)] ` +
    `rounded-2xl bg-white p-4 sm:p-6 md:p-8 ${t.cardShadow}`,

  // Ícone cresce conforme a tela
  iconWrap:
    "mx-auto mb-6 grid h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 place-items-center rounded-full border-2 border-blue-600 text-blue-600",

  // Título e subtítulo responsivos
  title: "text-center text-xl sm:text-2xl font-bold text-gray-900",
  subtitle: "mt-1 text-center text-gray-500 text-sm sm:text-base",

  input: `${t.inputBase} ${t.ring}`,

  showBtn: "mt-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700",
  forgot: `text-sm ${t.linkBlue}`,

  // Botão cresce em altura nos breakpoints
  submit: `mt-1 w-full ${t.btnBase} ${t.btnPrimary} ${t.ring} py-2.5 sm:py-3 mb-4`,

  signup: "mt-6 text-center text-xs sm:text-sm text-gray-600",
  signupLink: t.linkBlue,
} as const;
