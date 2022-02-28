import {
  BellOutlined,
  GlobalOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { useSelector } from 'src/store/hooks';
import eventEmitter from 'src/utils/eventEmitter';

const { Header } = Layout;
const { Item } = Menu;

import './style.less';

const logout = () => eventEmitter.emit('logout');

const menu = (
  <Menu>
    <Item key="profile">Профиль</Item>
    <Item key="logout" onClick={logout}>Выход</Item>
  </Menu>
);

const TopBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Header className="header">
      <span className="logo">Admin</span>
      <Menu mode="horizontal">
        <Item key="1">
          <Badge count={2}>
            <BellOutlined />
          </Badge>
        </Item>
        <Item key="2">
          <Badge count={2}>
            <GlobalOutlined />
          </Badge>
        </Item>
        <Item key="3">
          <SettingOutlined />
        </Item>
        <Item key="4">
          <Dropdown overlay={menu}>
            <Avatar
              icon={<UserOutlined />}
              src={`${process.env.API_PATH}users/image/${currentUser?.img}`}
            />
          </Dropdown>
        </Item>
      </Menu>
    </Header>
  );
};

export default TopBar;
