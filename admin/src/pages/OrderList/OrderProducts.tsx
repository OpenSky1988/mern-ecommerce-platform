import { FileImageOutlined } from '@ant-design/icons';
import {
  Avatar,
  Space,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { authorizedRequest } from 'src/requestMethods';

import { IProduct } from 'src/store/apiActions/products';

interface IOrderProducts {
  orderProducts: any[];
}

const OrderProducts: React.FC<IOrderProducts> = ({ orderProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await Promise.all(orderProducts.map(async (orderProduct): Promise<IProduct> => {
        const result = await authorizedRequest.get(`/products/find/${orderProduct?.productId}`);

        return ({
          ...result?.data,
          quantity: orderProduct?.quantity,
        });
      }));

      setProducts(products);
    })();
  }, []);

  const renderProductCell = (_text: string, record: IProduct) => (
    <Space>
      <Avatar
        icon={<FileImageOutlined />}
        src={`${process.env.API_PATH}products/image/${record?.img[0]}`}
      />
      {record?.title}
    </Space>
  );

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    {
      title: 'Продукт',
      dataIndex: 'product',
      key: 'product',
      sorter: (a: IProduct, b: IProduct) => a?.title.localeCompare(b?.title),
      render: renderProductCell,
    },
    {
      title: 'Наличие',
      dataIndex: 'inStock',
      key: 'inStock',
      filters: [
        { text: 'Есть', value: true },
        { text: 'Нет', value: false },
      ],
      onFilter: (filterValue: boolean, record: IProduct) => record?.inStock === filterValue,
      render: (value: boolean) => value ? 'Есть' : 'Нет',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: IProduct, b: IProduct) => a?.price - b?.price,
    },
    { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
  ];

  return (
    <Table dataSource={products} columns={columns} />
  );
};

export default OrderProducts;
