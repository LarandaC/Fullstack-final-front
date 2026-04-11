import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import AppLayout from '@/layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ProductsPage from '@/features/products/pages/ProductsPage'
import ProductFormPage from '@/features/products/pages/ProductFormPage'
import ProductDetailsPage from '@/features/products/pages/ProductDetailsPage'
import MovementsPage from '@/features/movements/pages/MovementsPage'
import CategoriesPage from '@/features/categories/pages/CategoriesPage'

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
          { path: '/products/new', element: <ProductFormPage /> },
          { path: '/products/:id', element: <ProductDetailsPage /> },
          { path: '/products/:id/edit', element: <ProductFormPage /> },
          { path: '/categories', element: <CategoriesPage /> },
          { path: '/movements', element: <MovementsPage /> },
        ],
      },
    ],
  },
])
