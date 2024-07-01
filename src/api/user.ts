import request from '@/utils/request'

export const login = params => {
  return request.get('/mock/login', {
    params,
  })
}

export const logout = params => {
  return request.get('/mock/logout')
}

export const getUserInfo = params => {
  return request.get('/mock/user/info', {
    params,
  })
}

export const getUserMenus = params => {
  return request.get('/mock/user/menus', {
    params,
  })
}
