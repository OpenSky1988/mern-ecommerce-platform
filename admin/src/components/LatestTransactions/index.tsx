import {
  Table,
  Tag,
} from 'antd';
import React from 'react';
import { IOrder } from 'src/types';
import { format } from 'timeago.js'

import './style.less';

interface ILatestTransactions {
  orders: IOrder[];
}

const LatestTransactions: React.FC<ILatestTransactions> = ({ orders }) => {
  const columns = [
    {
      dataIndex: 'userId',
      key: 'userId',
      title: 'Пользователь',
    },
    {
      dataIndex: 'createdAt',
      key: 'createdAt',
      title: 'Дата',
      render: (value: Date) => format(value),
    },
    {
      dataIndex: 'amount',
      key: 'amount',
      title: 'Сумма',
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Статус',
      render: (value: string) => <Tag color="geekblue">{value}</Tag>,
    },
  ];

  return (
    <div className="widget-sm">
      <span className="widget-sm__title">Последние Транзакции</span>
      <Table dataSource={orders} columns={columns} />
    </div>
  );
};

export default LatestTransactions;
