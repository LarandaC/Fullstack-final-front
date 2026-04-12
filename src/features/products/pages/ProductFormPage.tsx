import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useProduct } from '../hooks/useProduct'
import { ProductForm } from '../components/ProductForm'

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const { data: product, isLoading, isError } = useProduct(id)

  if (isEditing && isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (isEditing && isError) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">No se pudo cargar el producto.</p>
        <Button variant="outline" onClick={() => navigate('/products')}>
          Volver
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl items-center mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/products')}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEditing ? 'Editar producto' : 'Nuevo producto'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEditing
              ? 'Modificá los datos del producto.'
              : 'Completá los datos para agregar un producto al catálogo.'}
          </p>
        </div>
      </div>

      <ProductForm product={product} />
    </div>
  )
}
