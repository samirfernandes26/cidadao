"use client";
import styles from "./style.module.css";

type Props = {
  back?: () => void;
  backLabel?: string;
  backVariant?: "primary" | "danger";
  backDisabled?: boolean;
  submitLabel?: string;
  submitting?: boolean;
  submitDisabled?: boolean;
};

export default function ActionsBar({
  back,
  backLabel = "Voltar",
  backVariant = "primary",
  backDisabled,
  submitLabel = "Salvar",
  submitting,
  submitDisabled,
}: Props) {
  const backClassName =
    backVariant === "danger"
      ? `${styles.primaryBtn} ${styles.dangerBtn}`
      : styles.primaryBtn;

  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={backClassName}
        onClick={back ?? (() => window.history.back())}
        disabled={!!backDisabled}
      >
        {backLabel}
      </button>
      <button
        type="submit"
        className={styles.primaryBtn}
        disabled={!!submitting || !!submitDisabled}
      >
        {submitting ? "Salvando..." : submitLabel}
      </button>
    </div>
  );
}
