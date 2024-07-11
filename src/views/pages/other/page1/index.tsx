import React, { useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Radio, Alert, Button } from 'antd'
import AuthWapper from '@/components/AuthWapper'
import { useAuth } from '@/hooks/useAuth'

const Page1: React.FC = () => {
  const { onLogin  } = useAuth() 
  const [curRole, setCurRole] = useState('user')
  const options = [
    { label: 'admin', value: 'admin' },
    { label: 'user', value: 'user' },
  ]
  const changeRole = ({ target: { value } }: RadioChangeEvent) => {
    setCurRole(value)
    handleLogin(value)
  }

  const handleLogin = async (username) => {
    await onLogin({ username, password: username })
  }
  return (
    <div>
      <h4>按钮权限</h4>
      <div class="switch-box mb20">
        <span className="mr10">切换登录角色 :</span>
        <Radio.Group
          options={options}
          onChange={changeRole}
          value={curRole}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <Alert
        className="mb20"
        message="切换登录角色后可查看按钮变化"
        type="warning"
      />

      <div class="btns">
        <AuthWapper permissions={['admin']}>
          <Button type="primary" className="mr10">
            仅admin可见的按钮
          </Button>
        </AuthWapper>

        <Button className="mr10">普通按钮（都可见）</Button>
        
        <AuthWapper permissions={['user']}>
          <Button type="dashed">仅User可见的按钮</Button>
        </AuthWapper>
      </div>
    </div>
  )
}

export default Page1
