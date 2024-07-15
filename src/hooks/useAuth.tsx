import { useState, createContext, useContext, useMemo, useCallback } from 'react'
import { useSessionStorage } from './useSessionStorage'
import { login, logout, getUserInfo } from '@/api/user'
import { message } from 'antd'

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  onLogin: () => {},
  onLogout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage('user', null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const onLogin = useCallback(async (data, cb) => {
    try {
      const res = await login(data)
      setUser(res.data || {})
      setIsAuthenticated(true)
      message.success('登录成功')
      cb && cb()
    } catch (error) {
      console.error('Login failed:', error)
      message.error(error)
    }
  }, [])

  // 登出
  const onLogout = useCallback(async (data, cb) => {
    try {
      const res = await logout(data)
      setUser(null)
      setIsAuthenticated(false)
      window.localStorage.setItem('persist:root', null)
      cb && cb()
    } catch (error) {
      console.error('logout failed:', error)
      message.error(error)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: null,
      onLogin,
      onLogout,
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
