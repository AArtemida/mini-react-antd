import React from 'react'
import { useAuth } from '@/hooks/useAuth'

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value) {
  const { user } = useAuth()
  if (value && value instanceof Array && value.length > 0) {
    // 当前角色
    const role = user?.role
    // 有权限的角色
    const permissionRoles = value
    const super_admin = 'super'

    const hasRole = super_admin === role || permissionRoles.includes(role)

    if (!hasRole) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`)
    return false
  }
}
interface IProps {
  permissions: string[]
  children: React.ReactNode[]
}
// 权限组件(控制按钮权限)
const AuthWrapper: React.FC<IProps> = ({ permissions, children }) => {
  return (<>{checkRole(permissions) && children}</>)
}

export default AuthWrapper
