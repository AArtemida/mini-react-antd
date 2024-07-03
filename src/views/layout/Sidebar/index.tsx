import React, { useState, useEffect, Children } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd';

import { useSelector } from 'react-redux'
import { selectLoading, selectMenus } from '@/store/reducers/menu'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout
const Sidebar : React.FC = ({ collapsed }) => {
  const [dynamicMenus, setDynamicMenus] = useState<Array<MenuItem>>([])

  const menus = useSelector(selectMenus)
  const loading = useSelector(selectLoading)

  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState<string[]>([''])

  const navigate = useNavigate()

  // 转菜单格式
  useEffect(() => {
    if (!loading && menus.length) {
      const d = menus.map(menu => ({
        key: menu.path,
        label: menu.title,
        icon: '',
        children: menu.children
      }))
      setDynamicMenus(d)
    }
  }, [loading])

  useEffect(() => {
    const currentPath = location.pathname
    const matchedMenu = dynamicMenus.find(item => item.key === currentPath)
    // 根据路径查找匹配的菜单项
    if (matchedMenu) {
      setSelectedKey([matchedMenu.key])
    }
  }, [location.pathname, dynamicMenus])

  // 点击跳转
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={selectedKey}
        items={dynamicMenus}
        onClick={onClick}
      />
    </Sider>
  )
}

export default Sidebar
