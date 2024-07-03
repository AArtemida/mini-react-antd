import React from 'react';  
import ReactDOM from 'react-dom';  
import { BrowserRouter } from 'react-router-dom';  
import DynamicRoutes from '@/router'
// import { App } from 'antd'

const MyApp: React.FC = () => {
  return (
    // <App>
      <BrowserRouter>  
        <DynamicRoutes />  
      </BrowserRouter>
    // </App>
  )
}
export default MyApp