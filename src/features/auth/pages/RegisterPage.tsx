import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { registerSchema, type RegisterFormValues } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

export default function RegisterPage() {
  const navigate = useNavigate()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: 'operario' },
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => navigate('/login'),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Crear cuenta</h1>
        <p className="text-muted-foreground text-sm">Completá los datos para registrarte</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="usuario@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-md">
              Error al registrar usuario
            </p>
          )}

          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? 'Registrando...' : 'Crear cuenta'}
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground text-sm text-center">
        ¿Ya tenés cuenta?{' '}
        <Link to="/login" className="text-foreground font-medium underline underline-offset-4">
          Ingresá
        </Link>
      </p>
    </div>
  )
}
