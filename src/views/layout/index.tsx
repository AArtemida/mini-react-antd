import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import DynamicContent from './Content'
import Sidebar from './Sidebar'

const { Header } = Layout;

const CommonLayout = () => {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          /> */}
        </Header>
        <DynamicContent></DynamicContent>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;