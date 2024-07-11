import React, { useState } from 'react'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import './index.less'

const StatisticCard: Reacr.FC = () => {
  const [types, setTypes] = useState([
    {
      label: '销售额',
      value: 61688,
      icon: <UploadOutlined />,
    },
    {
      label: '订单数',
      value: 1120,
      icon: <VideoCameraOutlined />,
    },
    {
      label: '售出数',
      value: 282000,
      icon: <VideoCameraOutlined />,
    },
    {
      label: '会员数',
      value: 45016,
      icon: <UserOutlined />,
    },
  ])
  return (
    <section className="top">
      {types.map(item => (
        <div className="top-card flex align-Center justify-around" key={item.label}>
          <div>{item.icon}</div>
          <div className="top-card__content">
            <p className="top-card__val">{item.value}</p>
            <p className="top-card__label">{item.label}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default StatisticCard
