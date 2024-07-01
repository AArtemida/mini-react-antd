import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/views/layout'
import LoginPage from '@/views/login'
import NotFound from '@/views/error/404'
import ProtectedRoute from './ProtectedRoute'
import PageTitle from '@/components/PageTitle'

// const routerList = createBrowserRouter([
//   {
//     path: "/login",
//     name: "login",
//     Component: lazy(() => import("@/views/login")),
//     meta: {
//       title: "登录",
//     },
//   },
//   {
//     path: "*",
//     Component: lazy(() => import("@/views/error/404")),
//     meta: {
//       title: "404",
//     },
//   },
// ])

const DynamicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PageTitle title="登录">
            <LoginPage />
          </PageTitle>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/404"
        element={
          <PageTitle title="NotFound">
            <NotFound />
          </PageTitle>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default DynamicRoutes
