import React, { useEffect, useState, lazy, Component, Children } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout, theme } from 'antd'
import { getUserMenus } from '@/api/user'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenus, selectLoading, selectMenus } from '@/store/reducers/menu'

import PageTitle from '@/components/PageTitle'
import NotFound from '@/views/error/404'

const { Content } = Layout

// 动态导入的文件路径
const modules = import.meta.glob('@/views/pages/**/index.tsx')
const components = Object.keys(modules).reduce<Record<string, any>>(
  (prev, cur) => {
    prev[cur.replace('/src/views/pages', '')] = modules[cur]
    return prev
  },
  {}
) as any

const DynamicContent: React.FC = props => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // const [loading, setLoading] = useState(true)
  const [dynamicRoutes, setDynamicRoutes] = useState([])

  const dispatch = useDispatch()
  const menus = useSelector(selectMenus)
  const loading = useSelector(selectLoading)
  const contentSytle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    overflowY: 'auto',
  }
  useEffect(() => {
    // 获取用户菜单
    dispatch(fetchMenus())
  }, [dispatch])

  useEffect(() => {
    if (!loading && menus.length) {
      const routes = handleMenus(menus)

      setDynamicRoutes(routes)
    }
  }, [loading])

  // 转换数据
  const handleMenus = menus => {
    return menus?.map(menu => ({
      title: menu.title,
      path: menu.path.replace('/', ''),
      element: lazy(components[menu.componentName]), // 动态导入组件
      children: handleMenus(menu.children),
    }))
  }

  if (loading) {
    return (
      <Content style={contentSytle}>
        <div>Loading routes...</div>
      </Content>
    )
  }
  const { location } = props

  // 生成路由
  function generateRoutes(routes) {
    return routes.map((route, index) => (
      <Route
        key={index + route.path}
        path={route.path}
        element={
          <PageTitle title={route.title}>
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(route.element)}
            </React.Suspense>
          </PageTitle>
        }
      >
        {route.children && route.children.length ? (
          <React.Fragment>{generateRoutes(route.children)}</React.Fragment>
        ) : null}
      </Route>
    ))
  }

  return (
    <Content style={contentSytle}>
      <Routes>
        {generateRoutes(dynamicRoutes)}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Content>
  )
}

export default DynamicContent
