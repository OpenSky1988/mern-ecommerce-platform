import {
  LaptopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import './style.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface ISideBarItem {
  title: string;
  key: string;
  icon?: React.ReactNode;
  to?: string;
  items?: ISideBarItem[];
}

const sideBarConfig = [
  {
    title: 'Дэшборд',
    key: 'dashboard',
    icon: <UserOutlined />,
    items: [
      {
        title: 'Домашняя',
        key: 'home',
        to: '/dashboard/home',
      },
    ],
  },
  {
    title: 'Категории',
    key: 'categories',
    icon: <LaptopOutlined />,
    items: [
      {
        title: 'Пользователи',
        key: 'users',
        to: '/categories/users',
      },
      {
        title: 'Товары',
        key: 'products',
        to: '/categories/products',
      },
      {
        title: 'Заказы',
        key: 'orders',
        to: '/categories/orders',
      },
    ],
  }
];

const renderMenuItem: React.FC<ISideBarItem> = ({ icon = <></>, items, key, title, to = '' }) => (
  items
    ? (
      <SubMenu key={key} icon={icon} title={title}>
        {items.map(renderMenuItem)}
      </SubMenu>
    )
    : (
      <Menu.Item key={key}>
        <Link to={to} className="link">
          {title}
        </Link>
      </Menu.Item>
    )
);

const SideBar: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter((pathPart) => pathPart !== '');

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultOpenKeys={[pathParts[0]] || ['dashboard']}
        defaultSelectedKeys={[pathParts[1]] || ['home']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {sideBarConfig.map(renderMenuItem)}
      </Menu>
    </Sider>
  );
};

export default SideBar;
