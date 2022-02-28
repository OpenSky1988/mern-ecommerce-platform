import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Space,
  Table,
} from 'antd';
import React from 'react';
import { IUser } from 'src/store/apiActions/users';

import './style.less';

interface INewUsers {
  users: IUser[];
}

const NewUsers: React.FC<INewUsers> = ({ users }) => {
  const renderUserCell = (_text: string, record: IUser) => (
    <Space>
      <Avatar
        icon={<UserOutlined />}
        src={`${process.env.API_PATH}users/image/${record?.img}`}
      />
      {record._id}
    </Space>
  );

  const columns = [
    {
      dataIndex: 'user',
      key: 'user',
      title: 'Пользователь',
      render: renderUserCell,
    },
    { dataIndex: 'email', key: 'email', title: 'E-mail' },
    {
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      title: 'Админ',
      render: (value: boolean) => value ? 'Да' : 'Нет',
    },
  ];

  return (
    <div className="widget-sm">
      <span className="widget-sm__title">Новые Пользователи</span>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default NewUsers;
