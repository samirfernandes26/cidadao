export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PasswordChecks = {
  minLen: boolean;
  special: boolean;
  number: boolean;
  upper: boolean;
  lower: boolean;
  matches: boolean;
};

export function checkPassword(nova: string, confirm: string): PasswordChecks {
  return {
    minLen: nova.length >= 8,
    special: /[^A-Za-z0-9]/.test(nova),
    number: /[0-9]/.test(nova),
    upper: /[A-Z]/.test(nova),
    lower: /[a-z]/.test(nova),
    matches: nova.length > 0 && nova === confirm,
  };
}

export function passwordIsValid(c: PasswordChecks) {
  return c.minLen && c.special && c.number && c.upper && c.lower && c.matches;
}
