import request from '@/utils/request'

export const getHotProduct = params => {
  return request.get('/mock/getHotProduct', {
    params,
  })
}

export const getUserFeed = params => {
  return request.get('/mock/getUserFeed', {
    params,
  })
}

export const getWeekStat = params => {
  return request.get('/mock/getWeekStat', {
    params,
  })
}