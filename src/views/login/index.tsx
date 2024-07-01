import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormProps } from 'antd'
import { Form, Input, Button, message, Spin } from 'antd'
import { login, getUserInfo } from '@/api/user'

import loginBg from '@/assets/images/login_bg.jpg'
import './index.less'

const Login: React.FC = () => {
  return (
    // <DocumentTitle title={"用户登录"}>
    <div className="login-container flex space-between">
      <div className="login-content">
        <div className="login-form">
          <div className="title">
            <h2>用户登录</h2>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="login-img flex_1">
        <img src={loginBg} alt="login img" />
      </div>
    </div>
    // </DocumentTitle>
  )
}

const LoginForm: React.FC = props => {
  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }
  type LayoutType = Parameters<typeof Form>[0]['layout']

  const { form } = props

  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = (username, password) => {
    // 登录-获取用户信息
    // setLoading(true)
    login({ username, password })
      .then(res => {
        message.success('登录成功')
        handleUserInfo(res.data?.token)
        // 跳转
        navigate('/')
      })
      .catch(error => {
        setLoading(false)
        message.error(error)
      })
  }

  // 获取用户信息
  const handleUserInfo = (token: string) => {
    getUserInfo(token)
      .then(data => {})
      .catch(error => {
        message.error(error)
      })
  }

  const getMenus = () => {}

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    const { username, password } = values
    handleLogin(username, password)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      name="basic"
      layout="vertical"
      size="large"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button className="login-btn" type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
