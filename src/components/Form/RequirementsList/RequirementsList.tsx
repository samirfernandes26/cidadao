"use client";
import styles from "./style.module.css";
import { PasswordChecks } from "@/utils/validators";

type Props = {
  checks: PasswordChecks;
  visible?: boolean;
};

export default function RequirementsList({ checks, visible }: Props) {
  if (!visible) return null;
  const items: { label: string; ok: boolean }[] = [
    { label: "Mínimo de 8 caracteres", ok: checks.minLen },
    { label: "Pelo menos 1 símbolo especial", ok: checks.special },
    { label: "Pelo menos 1 número", ok: checks.number },
    { label: "Pelo menos 1 letra maiúscula", ok: checks.upper },
    { label: "Pelo menos 1 letra minúscula", ok: checks.lower },
    { label: "Senhas conferem", ok: checks.matches },
  ];
  return (
    <ul className={styles.hints} style={{ marginBottom: 8 }}>
      {items.map((req, idx) => (
        <li key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: req.ok ? "#2ecc40" : "#ff4136",
              border: "1px solid #ccc",
              marginRight: 6,
            }}
            aria-label={
              req.ok ? "Requisito atendido" : "Requisito não atendido"
            }
          />
          {req.label}
        </li>
      ))}
    </ul>
  );
}
