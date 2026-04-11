import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'
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

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ token, user }) => {
      setAuth(token, user)
      toast.success(`Bienvenido, ${user.name}`)
      navigate('/')
    },
    onError: () => {
      toast.error('Credenciales inválidas')
    },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Bienvenido de nuevo</h1>
        <p className="text-muted-foreground text-sm">Ingresá tus credenciales para continuar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="flex flex-col gap-4">
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


          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground text-sm text-center">
        ¿No tenés cuenta?{' '}
        <Link to="/register" className="text-foreground font-medium underline underline-offset-4">
          Registrate
        </Link>
      </p>
    </div>
  )
}
