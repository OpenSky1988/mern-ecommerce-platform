import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { authorizedRequest } from '../../requestMethods';
import { useSelector } from '../../store/hooks';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const res = await authorizedRequest.get(`/orders/user/${user.currentUser._id}`);

      setOrders(res.data);
    })();
  }, []);

  return (
    <>
      <PageHeader title="Заказы" />
      {orders.map((order) => (
        <Link key={order?._id} to={`/order/${order?._id}`}>
          <Card style={{ width: 300 }}>
            <p>{`Order ID: ${order?._id}`}</p>
            <p>{`Amount: ${order?.amount}`}</p>
          </Card>
        </Link>
      ))}
    </>
  )

};

export default OrderList;
