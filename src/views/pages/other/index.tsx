import React from 'react'
import { Outlet } from 'react-router-dom'

const NestedPage: React.FC = () => {
  return (
    <div>
      <Outlet /> 
    </div>
  )
}

export default NestedPage
