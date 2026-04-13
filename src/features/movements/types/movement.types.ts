export const MOVEMENT_TYPES = ['compra', 'baja'] as const
export type MovementType = (typeof MOVEMENT_TYPES)[number]

export const MOVEMENT_STATUSES = ['pendiente', 'aprobado', 'rechazado'] as const
export type MovementStatus = (typeof MOVEMENT_STATUSES)[number]

export const BAJA_REASONS = ['daño', 'vencimiento', 'descontinuado', 'otro'] as const
export type BajaReason = (typeof BAJA_REASONS)[number]

export const BAJA_REASON_LABELS: Record<BajaReason, string> = {
  'daño': 'Daño',
  'vencimiento': 'Vencimiento',
  'descontinuado': 'Descontinuado',
  'otro': 'Otro',
}

export interface MovementItemPopulated {
  product: { _id: string; name: string; sku: string; unit: string }
  quantity: number
  purchasePrice?: number
  salePrice?: number
  reason?: BajaReason
  reasonDetail?: string
}

export interface MovementUser {
  _id: string
  name: string
  email: string
}

export interface Movement {
  _id: string
  type: MovementType
  items: MovementItemPopulated[]
  status: MovementStatus
  notes?: string
  supplier?: string
  createdBy: MovementUser
  approvedBy?: MovementUser
  approvedAt?: string
  date: string
  createdAt: string
  updatedAt: string
}

export interface CreateCompraItemPayload {
  product: string
  quantity: number
  purchasePrice?: number
  salePrice?: number
}

export interface CreateBajaItemPayload {
  product: string
  quantity: number
  reason: BajaReason
  reasonDetail?: string
}

export interface CreateCompraPayload {
  items: CreateCompraItemPayload[]
  supplier?: string
  notes?: string
  date?: string
}

export interface CreateBajaPayload {
  items: CreateBajaItemPayload[]
  notes?: string
  date?: string
}
