"use client";
import styles from "./style.module.css";

type Props = {
  back?: () => void;
  submitLabel?: string;
  submitting?: boolean;
};

export default function ActionsBar({
  back,
  submitLabel = "Salvar",
  submitting,
}: Props) {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.primaryBtn}
        onClick={back ?? (() => window.history.back())}
      >
        Voltar
      </button>
      <button
        type="submit"
        className={styles.primaryBtn}
        disabled={!!submitting}
      >
        {submitting ? "Salvando..." : submitLabel}
      </button>
    </div>
  );
}
