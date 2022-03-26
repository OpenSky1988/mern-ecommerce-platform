import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Badge,
  Dropdown,
  Input,
  Menu,
} from 'antd';
import qs from 'qs';
import React, { ChangeEventHandler, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useSelector } from '../../store/hooks';
import eventEmitter from '../../utils/eventEmitter';

const { Search } = Input;
const { Item } = Menu;

import './style.less';

const Navbar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [search, setSearch] = useState(queryParams?.search as string);
  const quantity = useSelector(state => state.cart.quantity);
  const email = useSelector(state => state.user?.currentUser?.email);

  const onSearch = (search: string) => {
    if (!location.pathname.includes('/products')) {
      history.push({ pathname: '/products' });
    }

    history.push({
      search: `?${qs.stringify({ ...queryParams, search })}`,
    });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearch(e.target.value);

  const logout = () => eventEmitter.emit('logout');
  const onOrdersClick = () => history.push('/orders');

  const menu = (
    <Menu>
      <Item key="profile">Профиль</Item>
      <Item key="orders" onClick={onOrdersClick}>Заказы</Item>
      <Item key="logout" onClick={logout}>Выход</Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container__left">
          <Search
            allowClear={true}
            placeholder="Что для вас подобрать?"
            onChange={onChange}
            onSearch={onSearch}
            style={{ width: 240 }}
            value={search}
          />
        </div>
        <div className="navbar__container__center">
          <Link to="/">
            <h1 className="logo">LAMARKT</h1>
          </Link>
        </div>
        <div className="navbar__container__right">
          {email
            ? <Dropdown overlay={menu}>
              <div className="menu-item">{email}</div>
            </Dropdown>
            : <>
              <Link to="/register">
                <div className="menu-item">РЕГИСТРАЦИЯ</div>
              </Link>
              <Link to="/login">
                <div className="menu-item">ВХОД</div>
              </Link>
            </>}
          <Link to="/cart">
            <div className="menu-item">
              <Badge
                count={quantity}
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 0 1px #d9d9d9 inset',
                  color: '#999999',
                }}
              >
                <ShoppingCartOutlined
                  style={{ cursor: 'pointer', fontSize: 25 }}
                />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
