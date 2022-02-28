/* global document */
/* global window */

import { Layout } from 'antd';
import React from 'react';

import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const { Content } = Layout;

const MainLayout: React.FC = ({ children }) => (
  <Layout>
    <TopBar />
    <Layout>
      <SideBar />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default MainLayout;
