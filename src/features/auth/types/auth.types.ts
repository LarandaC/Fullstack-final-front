export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'operario'
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role?: 'admin' | 'operario'
}

export interface AuthResponse {
  token: string
  user: User
}
