import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import AppLayout from '@/layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleGuard from './RoleGuard'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ProductsPage from '@/features/products/pages/ProductsPage'
import ProductFormPage from '@/features/products/pages/ProductFormPage'
import ProductDetailsPage from '@/features/products/pages/ProductDetailsPage'
import MovementsPage from '@/features/movements/pages/MovementsPage'
import CompraFormPage from '@/features/movements/pages/CompraFormPage'
import BajaFormPage from '@/features/movements/pages/BajaFormPage'
import CategoriesPage from '@/features/categories/pages/CategoriesPage'
import UsersPage from '@/features/users/pages/UsersPage'
import { ROLES } from '@/lib/roles'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="/products" replace /> },
          { path: '/products', element: <ProductsPage /> },
          { path: '/products/:id', element: <ProductDetailsPage /> },
          { path: '/categories', element: <CategoriesPage /> },
          { path: '/movements', element: <MovementsPage /> },

          // Compra: admin + financiero
          {
            element: <RoleGuard roles={[ROLES.ADMIN, ROLES.FINANCIERO]} />,
            children: [
              { path: '/movements/compra/new', element: <CompraFormPage /> },
            ],
          },

          // Baja: admin + supervisor
          {
            element: <RoleGuard roles={[ROLES.ADMIN, ROLES.SUPERVISOR]} />,
            children: [
              { path: '/movements/baja/new', element: <BajaFormPage /> },
            ],
          },

          // Solo admin puede gestionar usuarios
          {
            element: <RoleGuard roles={[ROLES.ADMIN]} />,
            children: [
              { path: '/users', element: <UsersPage /> },
            ],
          },

          // Solo admin y supervisor pueden crear productos
          {
            element: <RoleGuard roles={[ROLES.ADMIN, ROLES.SUPERVISOR]} />,
            children: [
              { path: '/products/new', element: <ProductFormPage /> },
            ],
          },

          // Admin, supervisor y financiero pueden editar
          {
            element: (
              <RoleGuard
                roles={[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.FINANCIERO]}
              />
            ),
            children: [
              { path: '/products/:id/edit', element: <ProductFormPage /> },
            ],
          },
        ],
      },
    ],
  },
])
