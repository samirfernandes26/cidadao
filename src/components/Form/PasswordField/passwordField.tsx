"use client";
import { InputHTMLAttributes, useState } from "react";
import styles from "./style.module.css";
import { checkPassword, PasswordChecks } from "@/utils/validators";
import RequirementsList from "../RequirementsList/RequirementsList";

type Props = {
  label: string;
  name: string;
  value: string;
  confirmValue?: string;
  onChange: (v: string) => void;
  error?: string;
  showChecklistAgainst?: string; // compara com confirmar ou nova
  requiredIf?: boolean;
  visibilityValidators?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "name"
>;

export default function PasswordField({
  label,
  name,
  value,
  confirmValue = "",
  onChange,
  error,
  showChecklistAgainst,
  requiredIf,
  visibilityValidators,
  ...rest
}: Props) {
  const [focus, setFocus] = useState(false);
  const id = rest.id ?? name;
  const checks: PasswordChecks = checkPassword(
    showChecklistAgainst === "confirm"
      ? value
      : showChecklistAgainst
        ? showChecklistAgainst
        : value,
    showChecklistAgainst === "confirm" ? confirmValue : confirmValue
  );

  return (
    <label className={styles.label} htmlFor={id}>
      <span className={styles.labelText}>{label}</span>
      <input
        id={id}
        name={name}
        type="password"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="new-password"
        minLength={8}
        required={!!requiredIf}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${id}-error`} className={styles.labelError} role="alert">
          {error}
        </span>
      )}
      {visibilityValidators != false && (
        <RequirementsList checks={checks} visible={focus || value.length > 0} />
      )}
    </label>
  );
}
