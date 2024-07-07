import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import DynamicRoutes from '@/router'
import { AuthProvider } from '@/hooks/useAuth'
// import { App } from 'antd'

const MyApp: React.FC = () => {
  return (
    // <App>
    <AuthProvider>
      <BrowserRouter>
        <DynamicRoutes />
      </BrowserRouter>
    </AuthProvider>
    // </App>
  )
}
export default MyApp
