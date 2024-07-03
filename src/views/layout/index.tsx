import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import DynamicContent from './Content'
import Sidebar from './Sidebar'
import Header from './Header'

const CommonLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const updateCollapsed = val => {
    setCollapsed(val)
  }
  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header changeCollapsed={updateCollapsed}></Header>
        <DynamicContent></DynamicContent>
      </Layout>
    </Layout>
  )
}

export default CommonLayout
