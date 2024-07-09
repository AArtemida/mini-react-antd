import request from '@/utils/request'

export const getGoodsList = params => {
  return request.get('/mock/goods/list', {
    params,
  })
}