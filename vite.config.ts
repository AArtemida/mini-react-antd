import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

const isDev = process.env.NODE_ENV === 'development'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    isDev && viteMockServe({
      mockPath: './mock',
      watchFiles: isDev,
      localEnabled: isDev,
      prodEnabled: !isDev,
      supportTs: true,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
    }),
  ],
  server: {
    hmr: true,
    proxy: {
      [process.env.VITE_APP_BASE_API]: {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VITE_APP_BASE_API]: '',
        },
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/styles/var.less";',
      },
    },
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
})
