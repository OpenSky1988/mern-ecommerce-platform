import { DeleteOutlined } from '@ant-design/icons';
import {
  Drawer,
  PageHeader,
  Space,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';

import { deleteOrder, getOrders, IOrder } from 'src/store/apiActions/orders';
import { useDispatch, useSelector } from 'src/store/hooks';
import OrderForm from '../OrderForm';
import OrderProducts from './OrderProducts';

import './style.less';

enum OrderStatuses {
  'pending' = 'В обработке',
  'not-paid' = 'Ожидает оплаты',
  'paid' = 'Оплачен',
  'shipped' = 'В доставке',
  'delivered' = 'Доставлен',
  'cancelled' = 'Отменён',
}

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [drawerOrder, setDrawerOrder] = useState<IOrder>({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const onDrawerClose = () => setDrawerOrder({});
  const handleDelete = (id: string) => deleteOrder(id, dispatch);
  const onTableRowExpand = (expanded: boolean, record: IOrder) => {
    const keys = [];
    if (expanded) keys.push(record._id);
    setExpandedRowKeys(keys);
  }

  const renderActionsCell = (_text: string, record: IOrder) => {
    const deleteOrder = () => handleDelete(record._id);
    const showDrawer = () => setDrawerOrder(record);

    return (
      <Space>
        <a onClick={showDrawer} key={`a-${record._id}`}>
          Редактировать
        </a>
        <DeleteOutlined
          className="order-list__delete"
          onClick={deleteOrder}
        />
      </Space>
    );
  };

  const columns = [
    { dataIndex: '_id', key: '_id', title: 'ID' },
    {
      dataIndex: 'amount',
      key: 'amount',
      title: 'Количество',
      sorter: (a: IOrder, b: IOrder) => a.amount - b.amount,
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Статус',
      filters: [
        { text: 'В обработке', value: 'pending'},
        { text: 'Ожидает оплаты', value: 'not-paid'},
        { text: 'Оплачен', value: 'paid'},
        { text: 'В доставке', value: 'shipped'},
        { text: 'Доставлен', value: 'delivered'},
        { text: 'Отменён', value: 'cancelled'},
      ],
      onFilter: (filterValue: string, record: IOrder) => record?.status === filterValue,
      render: (value: keyof typeof OrderStatuses) => <Tag color="geekblue">{OrderStatuses[value]}</Tag>,
    },
    {
      dataIndex: 'action',
      key: 'action',
      title: 'Действия',
      render: renderActionsCell,
    },
  ];

  return (
    <div className="order-list">
      <PageHeader title="Заказы" />
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        expandable={{
          expandedRowKeys,
          onExpand: onTableRowExpand,
          expandedRowRender: (record: IOrder) => <OrderProducts orderProducts={record.products} />,
        }}
      />
      <Drawer
        onClose={onDrawerClose}
        placement="right"
        title={`Редактирование ${drawerOrder?._id}`}
        visible={!!(drawerOrder?._id)}
        width={640}
      >
       {drawerOrder?._id && <OrderForm
          data={drawerOrder}
          onDrawerClose={onDrawerClose}
          setDrawerOrder={setDrawerOrder}
        />}
      </Drawer>
    </div>
  );
};

export default OrderList;
