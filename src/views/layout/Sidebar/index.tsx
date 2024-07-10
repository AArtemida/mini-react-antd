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
  const [openKeys, setOpenKeys] = useState<string[]>([''])

  const navigate = useNavigate()

  // 转菜单格式
  useEffect(() => {
    if (!loading && menus.length) {
      const d = handleMenuData(menus)
      setDynamicMenus(d)
    }
  }, [loading])

  // 处理菜单（嵌套路径）
  const handleMenuData = (menus, parentPath = '') => {
    return menus?.map(menu => {
      let newPath = parentPath + menu.path
      return {
        key: newPath,
        label: menu.title,
        icon: '',
        children: handleMenuData(menu.children, newPath)
      }
    })
  }

  useEffect(() => {
    const currentPath = location.pathname
    const ranks = currentPath.split('/')
    // 根据路径查找匹配的菜单项
    setSelectedKey([currentPath])
    setOpenKeys(['/other'])
  }, [location.pathname, dynamicMenus])

  // 点击跳转
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-vertical" >
        管理系统
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={selectedKey}
        defaultOpenKeys={openKeys}
        items={dynamicMenus}
        onClick={onClick}
      />
    </Sider>
  )
}

export default Sidebar
