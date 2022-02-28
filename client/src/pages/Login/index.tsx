import { Button, Form, Input } from 'antd';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { auth } from '../../store/apiActions/login';
import { useDispatch, useSelector } from '../../store/hooks';

import './style.less';

const { Item } = Form;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAuthorized = useSelector((state) => state.user?.currentUser?.email);

  useEffect(() => {
    if (isAuthorized) {
      const params = qs.parse(location.search) as { redirect: string };

      if (params.redirect) {
        history.push(params.redirect);
      } else {
        history.push('/');
      }
    }
  });

  const onFinish = async (values: ILoginForm) => {
    const { email, password } = values;
    await auth.login(dispatch, { email, password });
  };

  return (
    <>
      <h1 className="signin_title">ВХОД</h1>
      <Form
        name="normal_login"
        className="login__container__form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Item
          name="email"
          rules={[
            { type: 'email', message: 'Неправильный формат' },
            { required: true, message: 'Пожалуйста введите свой E-mail!' },
          ]}
        >
          <Input
            placeholder="e-mail"
            size="large"
          />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
        >
          <Input
            type="password"
            placeholder="пароль"
            size="large"
          />
        </Item>

        <Item>
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            ВОЙТИ
          </Button>
        </Item>
        <Link to="/register">
          ЗАРЕГИСТРИРОВАТЬСЯ
        </Link>
      </Form>
    </>
  );
};

export default Login;
