import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, theme, Dropdown, Space, Avatar } from 'antd'
import type { MenuProps } from 'antd'

const { Header } = Layout

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

const CommonHeader: React.FC = ({ changeCollapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

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
          <Dropdown menu={{ items }} trigger={['click']}>
            <Space>
              username
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}
export default CommonHeader
