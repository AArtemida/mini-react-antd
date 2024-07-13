import React, { useState, useEffect } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectHistoryList, addTabView } from '@/store/reducers/tags'
import { selectSideMenus } from '@/store/reducers/menu'
import { findFromArray } from '@/utils'

import DynamicContent from './Content'
import Sidebar from './Sidebar'
import Header from './Header'
import TagsView from './TagsView'

const CommonLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const updateCollapsed = val => {
    setCollapsed(val)
  }


  const location = useLocation()
  const dispatch = useDispatch()
  const historyList = useSelector(selectHistoryList)
  const menus = useSelector(selectSideMenus)
  const path = location.pathname

  useEffect(() => {
    addTags()
  }, [path, menus])


  function addTags() {
    if (!historyList.includes(path)) {
      let curMenu = findFromArray(menus, path)
      if(curMenu) {
        dispatch(addTabView({
          path,
          title: curMenu.label
        }))
      }
    }
  }

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header changeCollapsed={updateCollapsed}></Header>
        <TagsView></TagsView>
        <DynamicContent></DynamicContent>
      </Layout>
    </Layout>
  )
}

export default CommonLayout
