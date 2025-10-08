/** Usuário retornado no login da Versa */
export type VersaUser = {
  cidadao_id: number;
  nome: string;
  cpf: string;
  cns: string;
  email: string;
};

export type VersaLoginRaw = {
  message: string;
  user: VersaUser;
  token: string;
  requires_password_change: boolean | 0 | 1;
  expires_at: string;
};

export type AuthSession = {
  token: string;
  user: VersaUser;
  requiresPasswordChange: boolean;
  expiresAt: Date;
};

/** Converte o payload bruto em uma sessão normalizada */
export function normalizeLoginResponse(raw: VersaLoginRaw): AuthSession {
  const requires =
    typeof raw.requires_password_change === "boolean"
      ? raw.requires_password_change
      : raw.requires_password_change === 1;

  return {
    token: raw.token,
    user: raw.user,
    requiresPasswordChange: requires,
    expiresAt: new Date(raw.expires_at),
  };
}
