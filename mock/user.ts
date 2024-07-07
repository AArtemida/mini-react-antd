import { MockMethod } from 'vite-plugin-mock'

const login = {
  url: '/mock/login',
  method: 'get',
  // timeout: 5000, // 超时时间
  statusCode: 200,
  response: ({ query }) => {
    // 返回的结果集
    const n = query.username
    const role = n.startsWith('admin') ? 'admin' : 'user'
    return {
      code: 200,
      data: {
        username: n,
        token: Math.random().toString(36).substring(2),
        role,
      },
    }
  },
}

const logout = {
  url: '/mock/logout',
  method: 'get',
  statusCode: 200,
  response: () => {
    return {
      code: 200,
      data: true,
    }
  },
}


const getUserInfo = {
  url: '/mock/user/info',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    return {
      code: 200,
      data: {
        gender: Math.round(Math.random()),
        dept: '研发部',
        position: '客户端开发',
      },
    }
  },
}

const getUserMenus = {
  url: '/mock/user/menus',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    return {
      code: 200,
      data: [
        {
          path: '/',
          componentName: '/board/index.tsx',
          title: '首页',
        },
        {
          path: '/example',
          componentName: '/example/index.tsx',
          title: '示例',
        },
        {
          path: '/page1',
          componentName: '/page1/index.tsx',
          title: 'page1',
        },
        {
          path: '/userinfo',
          componentName: '/userInfo/index.tsx',
          title: '个人中心',
        },
      ],
    }
  },
}

export default [login, logout, getUserMenus, getUserInfo] as MockMethod[]
