import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Banner izquierdo */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-12 relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-foreground/5" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-16 left-1/4 w-64 h-64 rounded-full bg-primary-foreground/5" />

        {/* Logo / nombre */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground rounded-md flex items-center justify-center">
              <span className="text-primary font-bold text-sm">IN</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InventarioApp</span>
          </div>
        </div>

        {/* Texto central */}
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Gestión de inventario <br />
            <span className="text-primary-foreground/60">simple y eficiente</span>
          </h2>
          <p className="text-primary-foreground/60 text-base leading-relaxed max-w-sm">
            Controlá tus productos, stock y movimientos desde un solo lugar.
          </p>
        </div>

        {/* Stats decorativos */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="bg-primary-foreground/10 rounded-xl p-4">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-primary-foreground/60 text-sm">Control de stock</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-4">
            <p className="text-2xl font-bold">Real-time</p>
            <p className="text-primary-foreground/60 text-sm">Movimientos al instante</p>
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
