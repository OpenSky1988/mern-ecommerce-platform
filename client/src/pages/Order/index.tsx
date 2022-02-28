import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import { IProduct } from '../../components/Product';
import { authorizedRequest, publicRequest } from '../../requestMethods';

interface ICartProduct {
  _id: string;
  quantity: number;
}

interface IProductProps {
  productData?: ICartProduct;
}

const Product: React.FC<IProductProps> = ({ productData }) => {
  const [product, setProduct] = useState<IProduct>({});

  useEffect(() => {
    (async () => {
      const res = await publicRequest.get(`/products/find/${productData?._id}`);

      setProduct({
        ...res.data,
        quantity: productData?.quantity,
      });
    })();
  }, []);

  return (
    <div className="info__product" key={`product_${product?._id}`}>
      <div className="info__product__detail">
        <img className="info__product__detail__image" src={`${process.env.API_PATH}users/image/${product?.img?.[0]}`} />
        <div className="info__product__detail__details">
          <span>
            <b>Продукт:</b> {product?.title}
          </span>
          <span>
            <b>Описание:</b> {product?.desc}
          </span>
          <span>
            <b>Количество:</b> {product?.quantity}
          </span>
          <div
            className="info__product__detail__details__product"
            style={{ backgroundColor: product?.color?.[0] }}
          />
          <span>
            <b>Размер:</b> {product?.size}
          </span>
        </div>
      </div>
      <div className="info__product__price__container">
        <div className="info__product__price">
          {product?.price * product?.quantity} ₽
        </div>
      </div>
    </div>
  );
};

interface IParams {
  id: string;
}

interface IOrder {
  _id?: number;
  products?: ICartProduct[];
}

const Order = () => {
  const { id } = useParams<IParams>();
  const [order, setOrder] = useState<IOrder>({});

  useEffect(() => {
    (async () => {
      const res = await authorizedRequest.get(`/orders/find/${id}`);

      setOrder(res.data);
    })();
  }, []);

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__content">
          <div className="cart__content__info">
            <PageHeader title={`Заказ № ${order?._id}`} />
            {order?.products && Object.values(order.products)
              .map(product => <Product key={product._id} productData={product} />)
            }
            <hr className="horizontal-line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
