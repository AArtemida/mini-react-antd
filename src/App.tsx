import React from 'react';  
import ReactDOM from 'react-dom';  
import { BrowserRouter } from 'react-router-dom';  
import DynamicRoutes from '@/router'

const App: React.FC = () => {
  return (
    <BrowserRouter>  
      <DynamicRoutes />  
    </BrowserRouter>  
  )
}
export default App