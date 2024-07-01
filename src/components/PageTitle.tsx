import React from 'react'

const PageTitle : React.FC = ({ title, children }) => {
  document.title = title || "Vite"
  return children
}

export default PageTitle
