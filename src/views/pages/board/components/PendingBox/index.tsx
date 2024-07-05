import {
  WalletOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  TransactionOutlined,
} from '@ant-design/icons'
import { Card } from 'antd'

const PendingBox: React.FC = () => {
  const pendingTypes = [
    {
      label: '待付款',
      icon: <WalletOutlined />,
      value: 15,
    },
    {
      label: '待发货',
      icon: <ShoppingCartOutlined />,
      value: 32,
    },
    {
      label: '待收货',
      icon: <GiftOutlined />,
      value: 83,
    },
    {
      label: '退换货',
      icon: <TransactionOutlined />,
      value: 5,
    },
  ]
  return (
    <Card title="待处理" className="mb20">
      <div className="pending-box">
        {pendingTypes.map(item => (
          <div className="pending-item" key={item.label}>
            <div>
              {item.icon}
              <p className="pending-item__label">{item.label}</p>
            </div>
            <p className="pending-item__value">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default PendingBox
