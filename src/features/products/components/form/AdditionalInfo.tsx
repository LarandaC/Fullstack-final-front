import { useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, X } from 'lucide-react'
import type { ProductFormValues } from '../../schemas/product.schema'

interface AdditionalInfoProps {
  form: UseFormReturn<ProductFormValues>
}

export function AdditionalInfo({ form }: AdditionalInfoProps) {
  const imageValue = form.watch('image')
  const [preview, setPreview] = useState<string>(
    typeof imageValue === 'string' ? imageValue : ''
  )

  useEffect(() => {
    if (typeof imageValue === 'string') {
      setPreview(imageValue)
    } else if (!imageValue) {
      setPreview('')
    }
  }, [imageValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('image', file, { shouldValidate: true })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    form.setValue('image', undefined, { shouldValidate: true })
    setPreview('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Imagen del producto</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Imagen (opcional)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Haz clic para cargar una imagen</span>
                      <span className="text-xs text-muted-foreground">
                        JPG, PNG, WebP - Máximo 5MB
                      </span>
                    </label>
                  </div>

                  {preview && (
                    <div className="relative w-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-muted-foreground mt-2">
                        {imageValue instanceof File ? imageValue.name : 'Imagen cargada'}
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
