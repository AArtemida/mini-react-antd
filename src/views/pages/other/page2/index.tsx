import React from 'react'
import { Outlet } from 'react-router-dom'

const Page2: React.FC = () => {
  return (
    <div>
      <p>This is Page2</p>
      <Outlet />
    </div>
  )
}

export default Page2
