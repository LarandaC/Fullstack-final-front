import type { UserRole } from '@/lib/roles'

export type { UserRole }

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface AuthResponse {
  token: string
  user: User
}
