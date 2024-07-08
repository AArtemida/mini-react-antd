import React, { useState, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Radio, Upload, Avatar, Card, message } from 'antd'
import type { FormProps } from 'antd'
import { getUserInfo } from '@/api/user'
import { useAuth } from '@/hooks/useAuth'
import './index.less'

const { TextArea } = Input

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

type FieldType = {
  username: string
  gender?: number
  dept: string
  position?: string
  phone?: string
  email?: string
}

const FormDisabledDemo: React.FC = () => {
  const [info, setInfo] = useState<FieldType>(null)
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  const buttonItemLayout = {
    wrapperCol: { offset: 4, span: 14 },
  }
  const { user } = useAuth()
  const [form] = Form.useForm()
  // 获取用户信息
  const handleUserInfo = async () => {
    let res = await getUserInfo()
    const d = res.data || null
    setInfo(d)

    form.setFieldsValue({
      username: user?.username,
      ...d,
    })
  }

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    message.success('操作成功')
  }

  useEffect(() => {
    handleUserInfo()
  }, [])

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, margin: '20px auto' }}
        onFinish={onFinish}
      >
        <Form.Item label="姓名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={0}> 男 </Radio>
            <Radio value={1}> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="部门" name="dept">
          <Input />
        </Form.Item>
        <Form.Item label="岗位" name="position">
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const UserAvatar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()
  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const uploadButton = (
    <button className="up-btn" type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  )

  return (
    <Upload
      name="avatar"
      action="/mock/user/upload"
      listType="picture-circle"
      className="avatar-uploader"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      maxCount={1}
      showUploadList={false}
    >
      <Avatar
        className="avatar"
        src={imageUrl}
        alt="avatar"
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
      >
        U
      </Avatar>
      {uploadButton}
    </Upload>
  )
}

const UserInfo: React.FC = () => {
  const uname = 'UserName'
  return (
    <div>
      <section
        className="basic-info flex align-Center justify-Center"
        style={{ marginTop: '50px' }}
      >
        <UserAvatar></UserAvatar>
      </section>
      <section className="form-info">
        <FormDisabledDemo />
      </section>
    </div>
  )
}

export default UserInfo
