export interface Movement {
  _id: string
  type: 'entrada' | 'salida'
  quantity: number
  product: {
    _id: string
    name: string
    sku: string
    category: string
  }
  user: {
    _id: string
    name: string
    email: string
  }
  supplier?: string
  reason?: string
  date: string
  createdAt: string
}

export interface CreateMovementPayload {
  type: 'entrada' | 'salida'
  quantity: number
  product: string
  supplier?: string
  reason?: string
  date?: string
}
