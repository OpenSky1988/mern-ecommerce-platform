import { Button, Form, Input, Select } from 'antd';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { auth } from '../../store/apiActions/login';
import { useDispatch, useSelector } from '../../store/hooks';

import './style.less';

const { Item } = Form;
const { Password } = Input;
const { Option } = Select;

interface ILoginForm {
  username: string;
  password: string;
}

const Register = () => {
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
    await auth.register(dispatch, values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle={true}>
      <Select style={{ width: 70 }} defaultValue="+7">
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <h1 className="register_title">РЕГИСТРАЦИЯ</h1>
      <Form
        name="register_form"
        className="register_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Item
          name="email"
          label="E-mail"
          rules={[
            { type: 'email', message: 'Неправильный формат' },
            { required: true, message: 'Пожалуйста введите свой E-mail!' },
          ]}
        >
          <Input />
        </Item>

        <Item
          name="username"
          label="Имя пользователя"
          rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя', whitespace: true }]}
        >
          <Input />
        </Item>

        <Item
          name="firstName"
          label="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите имя', whitespace: true }]}
        >
          <Input />
        </Item>

        <Item
          name="secondName"
          label="Фамилия"
          rules={[{ required: true, message: 'Пожалуйста, введите фамилию', whitespace: true }]}
        >
          <Input />
        </Item>

        <Item
          name="phone"
          label="Телефон"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Item>

        <Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
          hasFeedback={true}
        >
          <Password />
        </Item>

        <Item
          name="confirm"
          label="Повторите пароль"
          dependencies={['password']}
          hasFeedback={true}
          rules={[
            { required: true, message: 'Пожалуйста, повторите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Введённые вами пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Password />
        </Item>

        <Item>
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            Зарегистрироваться
          </Button>
        </Item>
        <Link to="/login">
          Войти
        </Link>
      </Form>
    </>
  );
};

export default Register;
