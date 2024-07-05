import { MockMethod } from 'vite-plugin-mock'

const getHotProduct = {
  url: '/mock/getHotProduct',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    const time = query.selectTime || 0
    const num = 10**time
    let data = []
    for (let i = 0; i < 6; i++) {
      data.push({
        title: '商品' + (i + 1),
        category: '数码',
        sales: parseInt(Math.random() * 50 + num),
      })
    }
    return {
      code: 200,
      data,
    }
  },
}

const getUserFeed = {
  url: '/mock/getUserFeed',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    return {
      code: 200,
      data: [
        { name: '咨询', value: 225 },
        { name: '下单', value: 139 },
        { name: '退换', value: 54 },
        { name: '投诉', value: 8 },
        { name: '其他', value: 162 },
      ]
    }
  },
}

const getWeekStat = {
  url: '/mock/getWeekStat',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    return {
      code: 200,
      data: [
        { name: '周日', value: 34 },
        { name: '周一', value:  139 },
        { name: '周二', value: 225 },
        { name: '周三', value: 68 },
        { name: '周四', value: 35 },
        { name: '周五', value: 162 },
        { name: '周六', value: 53 },
      ]
    }
  },
}

export default [getHotProduct, getUserFeed, getWeekStat] as MockMethod[]
