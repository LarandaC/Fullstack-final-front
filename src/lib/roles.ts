export const ROLES = {
  ADMIN: "admin",
  SUPERVISOR: "supervisor",
  INVENTARISTA: "inventarista",
  FINANCIERO: "financiero",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  supervisor: "Supervisor",
  inventarista: "Inventarista",
  financiero: "Financiero",
};
