import type { RiscoLevel } from "@/models";

// Tokens utilitários
const t = {
  cardBase:
    "w-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow " +
    "hover:shadow-md focus-within:ring-2 focus-within:ring-blue-600",
  pad: "p-4 sm:p-5",
  row: "flex flex-row gap-3 items-start",
  icon:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full " +
    "border border-blue-200 text-blue-600",
  title: "truncate text-lg font-semibold text-gray-900",
  meta: "mt-2 text-sm text-gray-700",
  actionBtn:
    "inline-flex h-9 items-center justify-center rounded-lg border border-blue-200 " +
    "px-3 text-sm font-medium text-blue-700 hover:bg-blue-50 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-600",
  riskBadgeBase:
    "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
};

// Classes do componente
export const s = {
  article: `relative ${t.cardBase} ${t.pad}`,
  row: t.row,
  iconWrap: t.icon,
  header: "min-w-0 flex-1",
  headerTop:
    "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ",
  title: t.title,
  meta: t.meta,
  action: "mt-2 flex justify-end w-full sm:absolute sm:right-4 sm:bottom-4",
  btn: t.actionBtn,
  riskBadgeBase: t.riskBadgeBase,
} as const;

// Cores do badge por nível de risco
export const riskBadgeColors: Record<RiscoLevel, string> = {
  Baixo: "bg-emerald-100 text-emerald-800 ",
  Moderado: "bg-yellow-100 text-yellow-900 ",
  Alto: "bg-orange-100 text-orange-900 ",
  Crítico: "bg-red-100 text-red-800 ",
};
