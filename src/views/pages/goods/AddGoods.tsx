import React, { useState } from 'react'
import {
  Modal,
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd'

type SizeType = Parameters<typeof Form>[0]['size']

const AddGoods: React.FC = ({ isOpen, closeModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      handleCancel()
    }, 1000)
  }

  const handleCancel = () => {
    closeModal(false)
  }

  return (
    <Modal
      title="添加商品"
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ width: '100%', marginBottom: '40px' }}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '名称不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="分类"
          rules={[{ required: true, message: '分类不能为空' }]}
        >
          <Select>
            <Select.Option value="1">数码</Select.Option>
            <Select.Option value="2">玩具</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="label" label="标签">
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddGoods
