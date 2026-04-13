import { useCallback, useMemo, useState } from 'react'
import { UserPlus } from 'lucide-react'
import { DataTable } from '@/components/shared/datatable'
import { Button } from '@/components/ui/button'
import { useUsers } from '../hooks/useUsers'
import { createUserColumns } from '../columns/user.columns'
import { UserFormDialog } from '../components/UserFormDialog'
import { DeleteUserDialog } from '../components/DeleteUserDialog'
import type { User } from '../types/user.types'

export default function UsersPage() {
  const { data: users, isFetching } = useUsers()

  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<User | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)

  const handleEdit = useCallback((user: User) => {
    setEditTarget(user)
    setFormOpen(true)
  }, [])

  const handleDelete = useCallback((user: User) => {
    setDeleteTarget(user)
  }, [])

  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open)
    if (!open) setEditTarget(undefined)
  }

  const columns = useMemo(
    () =>
      createUserColumns(handleEdit, handleDelete, {
        canEdit: true,
        canDelete: true,
      }),
    [handleEdit, handleDelete],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestioná los usuarios y sus roles en el sistema.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <UserPlus size={16} />
          Nuevo usuario
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users ?? []}
        pageCount={1}
        pagination={{ pageIndex: 0, pageSize: 50 }}
        onPaginationChange={() => {}}
        isLoading={isFetching}
        emptyMessage="No hay usuarios registrados."
      />

      <UserFormDialog
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        user={editTarget}
      />

      <DeleteUserDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        user={deleteTarget}
      />
    </div>
  )
}
