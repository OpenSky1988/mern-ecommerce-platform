import {
  Button,
  Checkbox,
  Form,
  FormItemProps,
  Input
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { authorizedRequest } from 'src/requestMethods';
import { auth } from 'src/store/apiActions/login';
import { getUsers, IUser, updateUser } from 'src/store/apiActions/users';
import { useDispatch } from 'src/store/hooks';
import generatePassword from 'src/utils/generatePassword';
import UploadImage from './UploadImage';

const { Item } = Form;

const formConfig: FormItemProps[] = [
  {
    label: 'E-mail',
    name: 'email',
    rules: [
      { type: 'email', message: 'E-mail адрес представлен в некорректном формате.' },
      { required: true, message: 'Необходимо указать E-mail!' },
    ],
  },
  {
    label: 'Телефон',
    name: 'phone',
    rules: [{ required: true, message: 'Пожалуйста, введите ваш номер телефона' }],
  },
];

interface IUserForm {
  data?: IUser;
  onDrawerClose: () => void;
  setDrawerUser: (user: IUser) => void;
}

const getfileListItem = (name: string) => ({
  uid: '-1',
  name,
  url: `${process.env.API_PATH}users/image/${name}`,
});

const UserForm: React.FC<IUserForm> = ({
  data = {},
  onDrawerClose,
  setDrawerUser,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const password = useRef(generatePassword());

  const [defaultFileList, setDefaultFileList] = useState([ ...(data?.img ? [ getfileListItem(data?.img) ] : []) ]);

  useEffect(() => {
    (async () => {
      const user = data?._id && await authorizedRequest.get(`/users/find/${data?._id}`);
      setDrawerUser(user?.data as IUser || {});
    })();
  }, [data?._id]);

  useEffect(() => setDefaultFileList([
    ...(data?.img
      ? [ getfileListItem(data?.img) ]
      : []
    )
  ]), [data?.img]);

  const onFinish = (user: IUser) => {
    data?._id
      ? updateUser({ ...data, ...user }, dispatch)
      : auth.register(dispatch, {
        ...data,
        ...user,
        password: password.current,
      });

    onDrawerClose();
    setDefaultFileList([]);
    getUsers(dispatch);
  };

  return (
    <>
      <Form
        colon={false}
        form={form}
        initialValues={data}
        labelAlign="left"
        labelCol={{ span: 4 }}
        name="userForm"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
      >
        <UploadImage
          data={data}
          defaultFileList={defaultFileList}
          setDrawerUser={setDrawerUser}
        />
        {formConfig?.map((item) => {
          return (
            <Item {...item} key={item.name as string}>
              <Input />
            </Item>
          );
        })}
        <Item
          label="Админ"
          name="isAdmin"
          valuePropName="checked"
        >
          <Checkbox />
        </Item>
        {data?._id ? null : `Copy this password: ${password.current}`}
        <Item
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Button htmlType="submit">Применить</Button>
        </Item>
      </Form>
    </>
  );
};

export default UserForm;
