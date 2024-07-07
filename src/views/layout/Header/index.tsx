import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, theme, Dropdown, Space, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { useAuth } from '@/hooks/useAuth'

const { Header } = Layout

const CommonHeader: React.FC = ({ changeCollapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const items: MenuProps['items'] = [
    {
      key: 'userinfo',
      label: '用户中心',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ]
  const { onLogout, user  } = useAuth()

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch(key) {
      case 'userinfo':
        navigate('/userinfo')
        break
      case 'logout':
        toLogout()
        break
    }
  };

  const toLogout = async () => {
    setLoading(true)
    await onLogout({}, () => {
      setLoading(false)
      // 跳转
      navigate('/login', { replace: true })
    })
  }

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const changeStatus = () => {
    setCollapsed(!collapsed)
    changeCollapsed(!collapsed)
  }
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={changeStatus}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />

        <div className="fr mr20">
          <Avatar icon={<UserOutlined />} className="mr10"/>
          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <Space style={{cursor: 'pointer'}}>
              <span>{user?.username}</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}
export default CommonHeader
