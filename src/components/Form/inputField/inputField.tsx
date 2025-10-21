"use client";
import { InputHTMLAttributes } from "react";
import styles from "./style.module.css";

type Props = {
  label: string;
  error?: string;
  name: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export default function InputField({ label, error, name, ...rest }: Props) {
  const id = rest.id ?? name;
  const invalid = !!error;
  return (
    <label className={styles.label} htmlFor={id}>
      <span className={styles.labelText}>{label}</span>
      <input
        id={id}
        name={name}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={styles.input}
        {...rest}
      />
      {invalid && (
        <span id={`${id}-error`} className={styles.labelError} role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
