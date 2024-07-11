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

// 菜单权限由接口控制
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
          path: '/goods',
          componentName: '/goods/index.tsx',
          title: '商品',
        },
        {
          path: '/other',
          componentName: '/other/index.tsx',
          title: '嵌套',
          children: [
            {
              path: '/page1',
              componentName: '/other/page1/index.tsx',
              title: '按钮权限',
            },
            {
              path: '/page2',
              componentName: '/other/page2/index.tsx',
              title: 'Page2',
              children: [
                {
                  path: '/page3',
                  componentName: '/other/page2/page3/index.tsx',
                  title: 'Page3',
                },
              ],
            },
          ],
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

const uploadUserImg = {
  url: '/mock/user/upload',
  method: 'post',
  response: () => {
    return {
      code: 200,
      message: '上传成功',
      data: {
        url: '/uploads/1.jpg',
      },
    }
  },
}
export default [
  login,
  logout,
  getUserMenus,
  getUserInfo,
  uploadUserImg,
] as MockMethod[]
