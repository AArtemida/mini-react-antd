import React from 'react'
import { ApiFilled } from '@ant-design/icons'
import { Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const ErrorPage404: React.FC = () => {
  const navigate = useNavigate()
  const reBack = () => {
    navigate('/')
  }
  return (
    <Card style={{width: '56vw', margin: '12% auto'}}>
      <div
        className="flex align-Center justify-Center"
        style={{ height: '45vh' }}
      >
        <ApiFilled style={{ fontSize: '8rem', marginRight: '10%' }} />
        <section>
          <h1>404</h1>
          <p>找不到页面......</p>
          <Button type="primary" onClick={reBack}>
            返回首页
          </Button>
        </section>
      </div>
    </Card>
  )
}

export default ErrorPage404
