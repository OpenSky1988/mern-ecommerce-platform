import {
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Drawer,
  PageHeader,
  Space,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';

import { deleteUser, getUsers, IUser } from 'src/store/apiActions/users';
import { useDispatch, useSelector } from 'src/store/hooks';
import UserForm from '../UserForm';

import './style.less';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [drawerUser, setDrawerUser] = useState<IUser>(null);
  const [addNew, setAddNew] = useState<boolean>(false);

  const onDrawerClose = () => {
    setDrawerUser(null);
    setAddNew(false);
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id: string) => deleteUser(id, dispatch);

  const renderUserCell = (_text: string, record: IUser) => (
    <Space>
      <Avatar
        icon={<UserOutlined />}
        src={`${process.env.API_PATH}users/image/${record?.img}`}
      />
      {record.username}
    </Space>
  );

  const renderActionsCell = (_text: string, record: IUser) => {
    const deleteUser = () => handleDelete(record?._id);
    const showDrawer = () => setDrawerUser(record);

    return (
      <Space>
        <a onClick={showDrawer} key={`a-${record?._id}`}>
          Редактировать
        </a>
        <DeleteOutlined
          className="user-list__delete"
          onClick={deleteUser}
        />
      </Space>
    )
  };

  const columns = [
    { dataIndex: '_id', key: '_id', title: 'ID' },
    {
      dataIndex: 'user',
      key: 'user',
      title: 'Пользователь',
      sorter: (a: IUser, b: IUser) => a.username.localeCompare(b.username),
      render: renderUserCell,
    },
    {
      dataIndex: 'email',
      key: 'email',
      title: 'E-mail',
      sorter: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
    },
    {
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      title: 'Админ',
      filters: [
        { text: 'Да', value: true },
        { text: 'Нет', value: false },
      ],
      onFilter: (filterValue: boolean, record: IUser) => record.isAdmin === filterValue,
      render: (value: boolean) => value ? 'Да' : 'Нет',
    },
    {
      dataIndex: 'transaction',
      key: 'transaction',
      title: 'Сумма Транзакций',
      sorter: (a: IUser, b: IUser) => a.transaction - b.transaction,
    },
    {
      dataIndex: 'action',
      key: 'action',
      title: 'Действия',
      render: renderActionsCell,
    },
  ];

  const addNewUser = () => setAddNew(true);

  return (
    <div className="user-list">
      <PageHeader
        title="Пользователи"
        extra={[ <Button key="create" onClick={addNewUser}>Создать</Button> ]}
      />
      <Table dataSource={users} columns={columns} />
      <Drawer
        onClose={onDrawerClose}
        placement="right"
        title={drawerUser?.username
          ? `Редактирование ${drawerUser?.username}`
          : 'Создание пользователя'
        }
        visible={!!(drawerUser?._id || addNew)}
        width={640}
      >
       {(drawerUser?._id || addNew) && <UserForm
          data={drawerUser}
          onDrawerClose={onDrawerClose}
          setDrawerUser={setDrawerUser}
        />}
      </Drawer>
    </div>
  );
};

export default UserList;
