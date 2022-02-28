import {
  DeleteOutlined,
  FileImageOutlined,
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

import { IProduct, product } from 'src/store/apiActions/products';
import { useDispatch, useSelector } from 'src/store/hooks';
import ProductForm from '../ProductForm';

import './style.less';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [drawerProduct, setDrawerProduct] = useState<IProduct>({});
  const [addNew, setAddNew] = useState<boolean>(false);

  const onDrawerClose = () => {
    setDrawerProduct(null);
    setAddNew(false);
  };

  useEffect(() => {
    product.getList(dispatch);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    product.delete(id, dispatch);
  };

  const renderProductCell = (_text: string, record: IProduct) => (
    <Space>
      <Avatar
        icon={<FileImageOutlined />}
        src={`${process.env.API_PATH}products/image/${record?.img[0]}`}
      />
      {record.title}
    </Space>
  );

  const renderActionCell = (_text: string, record: IProduct) => {
    const deleteProduct = () => handleDelete(record?._id);
    const showDrawer = () => setDrawerProduct(record);

    return (
      <Space>
        <a onClick={showDrawer} key={`a-${record?._id}`}>
          Редактировать
        </a>
        <DeleteOutlined
          className="product-list__delete"
          onClick={deleteProduct}
        />
      </Space>
    );
  };

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    {
      title: 'Продукт',
      dataIndex: 'product',
      key: 'product',
      sorter: (a: IProduct, b: IProduct) => a.title.localeCompare(b.title),
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
      onFilter: (filterValue: boolean, record: IProduct) => record.inStock === filterValue,
      render: (value: boolean) => value ? 'Есть' : 'Нет',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: IProduct, b: IProduct) => a.price - b.price,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: renderActionCell,
    },
  ];

  const addNewProduct = () => setAddNew(true);

  return (
    <div className="product-list">
      <PageHeader
        title="Товары"
        extra={[ <Button key="create" onClick={addNewProduct}>Создать</Button> ]}
      />
      <Table dataSource={products} columns={columns} />
      <Drawer
        onClose={onDrawerClose}
        placement="right"
        title={drawerProduct?.title
          ? `Редактирование ${drawerProduct?.title}`
          : 'Создание товара'
        }
        visible={!!(drawerProduct?._id || addNew)}
        width={640}
      >
        {(drawerProduct?._id || addNew) && <ProductForm
          data={drawerProduct}
          onDrawerClose={onDrawerClose}
          setDrawerProduct={setDrawerProduct}
        />}
      </Drawer>
    </div>
  );
};

export default ProductList;
