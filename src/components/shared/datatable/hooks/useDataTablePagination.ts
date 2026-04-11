import { useState } from 'react'
import type { PaginationState } from '@tanstack/react-table'

interface Options {
  initialPageSize?: number
}

/**
 * Encapsula el estado de paginación server-side para usar con DataTable.
 *
 * Uso:
 *   const { pagination, onPaginationChange } = useDataTablePagination()
 *   // pasar directamente a <DataTable pagination={...} onPaginationChange={...} />
 */
export function useDataTablePagination({ initialPageSize = 10 }: Options = {}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  return {
    pagination,
    onPaginationChange: setPagination,
  }
}
