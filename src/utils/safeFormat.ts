export function safeFormat(input: string) {
  try {
    const d = new Date(input);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    }
    return input;
  } catch {
    return input;
  }
}
