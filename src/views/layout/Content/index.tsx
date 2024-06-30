import React, { useEffect, useState, lazy, Component } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout, theme } from "antd";
import { getUserMenus } from "@/api/user";

const { Content } = Layout;

// 动态导入的文件路径
const modules = import.meta.glob("@/views/pages/*/index.tsx");
const components = Object.keys(modules).reduce<Record<string, any>>(
  (prev, cur) => {
    prev[cur.replace("/src/views/pages", "")] = modules[cur];
    return prev;
  },
  {}
) as any;

const DynamicContent = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [loading, setLoading] = useState(true);
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  // const [menus, setMenus] = useState([]);

  useEffect(() => {
    // 获取用户菜单
    getUserMenus().then((menus) => {
      // setMenus(menus);
      setLoading(false);
      // 转成路由
      const routes = menus.map((menu) => ({
        path: menu.path,
        element: lazy(components[menu.componentName]), // 动态导入组件
      }));
      // routerList.routes[0].children = routes
      setDynamicRoutes(routes);
    });
  }, []);

  if (loading) {
    return <div>Loading routes...</div>;
  }
  const { location } = props;
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Routes>
        {dynamicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(route.element)}
              </React.Suspense>
            }
          />
        ))}
      </Routes>
    </Content>
  );
};

export default DynamicContent;
