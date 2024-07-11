import React, { useState, useEffect } from 'react'
import type { RadioChangeEvent, TableProps } from 'antd'
import { Space, Table, Tag, Card, Radio } from 'antd'
import { getHotProduct } from '@/api/board'

interface ProductModel {
  title: string
  category: string
  sales: number
}

const ProduceList: React.FC = () => {
  const [products, setProducts] = useState<Array<ProductModel>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectTime, setSelectTime] = useState<number | null>(0)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '分类',
      key: 'category',
      dataIndex: 'category',
      render: (_, { category }) => (
        <Tag key={category}>{category.toUpperCase()}</Tag>
      ),
    },
    {
      title: '销售量',
      dataIndex: 'sales',
      key: 'sales',
      width: 150,
    },
  ]

  const queryList = () => {
    getHotProduct({
      selectTime,
    }).then(res => {
      setLoading(false)
      setProducts(res.data || [])
    })
  }
  useEffect(() => {
    queryList()
  }, [selectTime])

  const changeSelectTime = (v: number) => {
    setSelectTime(v)
  }

  return (
    <Card
      title="热销商品"
      extra={<TimeRadio changeTime={changeSelectTime} />}
      className="flex_1"
    >
      <Table
        columns={columns}
        dataSource={products}
        pagination={{ hideOnSinglePage: true }}
        rowKey={row => row.title}
      />
    </Card>
  )
}

const TimeRadio: Reacr.FC = ({ changeTime }) => {
  const timeTypes: string[] = ['周', '月', '年']
  const defaultVal = 0
  const onChange = (e: RadioChangeEvent) => {
    const v = e.target.value
    changeTime(v)
  }
  return (
    <Radio.Group
      onChange={onChange}
      defaultValue={defaultVal}
      optionType="button"
      buttonStyle="solid"
    >
      {timeTypes.map((item, index) => (
        <Radio.Button value={index} key={item + index}>
          {item}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}

export default ProduceList
