# Fullstack Final — Frontend

Aplicación web para gestión de inventario. Construida con React, Vite y TypeScript, siguiendo arquitectura modular por features con separación de lógica y presentación.

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2.4 | UI |
| TypeScript | 6.0.2 | Tipado estático |
| Vite | 8.0.4 | Build tool + dev server |
| React Router | 7.14.0 | Navegación y rutas |
| TanStack Query | 5.96.2 | Estado del servidor (fetch, cache) |
| Zustand | 5.0.12 | Estado global (auth, tema) |
| React Hook Form | 7.72.1 | Manejo de formularios |
| Zod | 4.3.6 | Validación de esquemas |
| shadcn/ui + Radix UI | — | Componentes de UI |
| Tailwind CSS | 4.2.2 | Estilos utilitarios |
| Axios | 1.15.0 | Cliente HTTP |

## Requisitos previos

- Node.js 18+
- Backend corriendo en `http://localhost:3000`

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000/api
```

## Scripts

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Compilar para producción (tsc + vite build)
npm run preview   # Preview del build de producción
npm run lint      # Ejecutar ESLint
```

## Arquitectura

El proyecto usa **arquitectura modular por features**. Cada feature es autocontenida con sus propias páginas, componentes, hooks, servicios, tipos y esquemas.

```
src/
├── features/              # Módulos de negocio (cada uno autocontenido)
│   ├── auth/
│   ├── products/
│   ├── categories/
│   ├── movements/
│   └── users/
├── components/
│   ├── ui/                # Componentes primitivos (shadcn/Radix UI)
│   └── shared/            # Componentes reutilizables (DataTable, dialogs, etc.)
├── layouts/               # AppLayout, AuthLayout, sidebar, navegación
├── router/                # Rutas, guards de auth y de rol
├── lib/                   # axios, queryClient, utils, format, roles
└── store/                 # Estado global (Zustand)
```

### Estructura interna de cada feature

```
features/<nombre>/
├── pages/           # Componentes de página (enrutados)
├── components/      # Componentes específicos del feature
├── hooks/           # Lógica extraída en hooks (data fetching, form logic)
├── services/        # Llamadas a la API
├── types/           # Tipos TypeScript
└── schemas/         # Esquemas Zod (validación de formularios)
```

### Separación de responsabilidades

- **Páginas**: solo layout y composición, sin lógica directa
- **Hooks**: toda la lógica (mutations, form state, side effects)
- **Componentes**: UI pura, reciben props, no conocen la API
- **Services**: llamadas HTTP, sin transformaciones de negocio

## Módulos

### Autenticación

- Login con email y contraseña
- Token JWT almacenado en `localStorage` mediante Zustand persist
- Interceptor de Axios que adjunta el token a cada request
- Redirige a `/login` si el token es inválido o expirado

### Productos

- Listado paginado con búsqueda
- Vista de detalle con estado de stock (sin stock / bajo / normal / sobrestock)
- Barra de progreso de stock con marcador de mínimo
- Formulario de creación/edición por secciones (info, precios, inventario)
- Los campos de precio solo son visibles/editables según el rol del usuario

### Categorías

- CRUD completo desde un dialog inline
- Tabla con acciones de editar y eliminar

### Movimientos

**Lista:** historial de compras y bajas con filtros por tipo y estado. Los administradores ven un banner de alerta cuando hay bajas pendientes de aprobación.

**Compra (registro de entrada de stock):**
- Búsqueda de productos por SKU, código de barras o nombre
- Botón "Explorar" que abre un modal con la lista completa
- Lista de productos agregados con cantidad y precios opcionales
- El stock se actualiza al guardar

**Baja (registro de salida de stock):**
- Mismo buscador de productos
- Lista con cantidad, motivo (daño / vencimiento / descontinuado / otro) y detalle opcional
- Queda en estado **pendiente** hasta que el administrador la apruebe

**Aprobación de baja:**
- Solo visible para administradores
- Dialog de confirmación para aprobar o rechazar
- Al aprobar, el stock se descuenta en el backend

### Usuarios *(solo admin)*

- Listado de usuarios con rol
- Crear usuario con nombre, email, contraseña y rol
- Editar datos (la contraseña es opcional al editar)
- Eliminar usuario (con protección para no eliminar el último admin)

## Control de acceso

Las rutas están protegidas en tres niveles:

1. **`ProtectedRoute`** — requiere sesión activa
2. **`PublicRoute`** — redirige al home si ya hay sesión
3. **`RoleGuard`** — restringe rutas por rol (ej: `/users` solo admin)

El sidebar también filtra los ítems de navegación según el rol del usuario autenticado.

### Permisos por rol

| Sección | Admin | Supervisor | Financiero | Inventarista |
|---|:---:|:---:|:---:|:---:|
| Ver productos | ✓ | ✓ | ✓ | ✓ |
| Crear/editar producto | ✓ | ✓ | | |
| Ver/editar precios | ✓ | | ✓ | |
| Categorías | ✓ | ✓ | | ✓ |
| Registrar compra | ✓ | | ✓ | |
| Registrar baja | ✓ | ✓ | | |
| Aprobar/rechazar baja | ✓ | | | |
| Gestionar usuarios | ✓ | | | |

## Tema

La aplicación soporta modo claro y oscuro. El tema se persiste en `localStorage` y puede alternarse desde el sidebar. Los colores semánticos (`--color-green`, `--color-red`, `--color-yellow`, etc.) están definidos en `src/index.css` y se usan en toda la app para mantener consistencia entre temas.
