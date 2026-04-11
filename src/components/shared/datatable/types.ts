import type { ColumnDef, PaginationState } from '@tanstack/react-table'

/**
 * Respuesta paginada del servidor.
 * TData es el tipo del recurso que devuelve la API.
 */
export interface PaginatedResponse<TData> {
  data: TData[]
  total: number
  page: number
  limit: number
  pageCount: number
}

/**
 * Props mínimas que expone DataTable hacia afuera.
 * ISP: quien usa la tabla solo pasa lo que necesita.
 */
export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  pageCount: number
  pagination: PaginationState
  onPaginationChange: (pagination: PaginationState) => void
  isLoading?: boolean
  emptyMessage?: string
}
