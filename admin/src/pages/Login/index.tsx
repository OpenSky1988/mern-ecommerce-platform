import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { auth } from '../../store/apiActions/login';
import { useDispatch, useSelector } from '../../store/hooks';

import './style.less';



interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAuthorizedAsAdmin = useSelector((state) => state.user?.currentUser?.isAdmin);

  useEffect(() => {
    if (isAuthorizedAsAdmin) {
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
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите E-mail' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
        Или <a href="">зарегистрироваться!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
