import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入mock.ts文件
import mockModule from './mock'

export function setupProdMockServer() {
  createProdMockServer([...mockModule])
}
