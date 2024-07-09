import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Button, Popconfirm, message } from 'antd'
import type { TableProps, PopconfirmProps } from 'antd'
import { getGoodsList } from '@/api/goods'

interface DataType {
  key: number
  id: number
  name: string
  category: string
  sort: number
  sales: number
  status: string
  tags: string[]
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: '排序',
    key: 'sort',
    dataIndex: 'sort',
  },
  {
    title: '销量',
    key: 'sales',
    dataIndex: 'sales',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>查看</a>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
    width: 200,
  },
]

const TableList: React.FC = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const showAdd = () => {}

  const handleDelete: PopconfirmProps['onConfirm'] = e => {
    console.log(e)
    message.success('删除成功')
  }

  useEffect(() => {
    getGoodsList().then(res => {
      setData(res.data || [])
    })
  }, [])

  return (
    <div>
      <section className="mb20">
        <Button className="mr20" type="primary" onClick={showAdd}>
          添加商品
        </Button>

        <Popconfirm
          title="删除提示"
          description="确认删除选中商品吗？"
          onConfirm={handleDelete}
        >
          <Button danger disabled={!hasSelected}>
            删除
          </Button>
        </Popconfirm>
      </section>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}

export default TableList
