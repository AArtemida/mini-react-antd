import { MockMethod } from 'vite-plugin-mock'

const getGoods = {
  url: '/mock/goods/list',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    const length = query.rows || 10
    const page = query.page || 1
    const start = (page - 1) * length
    let data = []
    const types = ['数码', '玩具']
    const status = ['已售出', '待上架']
    for (let i = 0; i < length; i++) {
      const id = start + i + 1
      data.push({
        key: id,
        id,
        name: '商品' + id,
        category: types[Math.round(Math.random())],
        sales: parseInt(Math.random() * 50),
        status: status[Math.round(Math.random())],
        tags: ['热门', '潮流']
      })
    }
    return {
      code: 200,
      data,
    }
  },
}

export default [getGoods] as MockMethod[]
