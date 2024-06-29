import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/index.less'

// antd
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import { Provider } from "react-redux";
import store from "./store"

const themeConfig = {
  token: {
    colorPrimary: '#6DBEB5',
    borderRadius: 6,
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ConfigProvider locale={zhCN} theme={themeConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)
