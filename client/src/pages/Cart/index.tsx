import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { IProduct } from '../../components/Product';
import { authorizedRequest } from '../../requestMethods';
import { useSelector } from '../../store/hooks';
import { addProduct, clearCart, removeProduct } from '../../store/slices/cart';

import './style.less';

const { TextArea } = Input;

const Product: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = () => dispatch(addProduct(product));
  const handleRemove = () => dispatch(removeProduct(product));

  return (
    <div className="info__product" key={`product_${product._id}`}>
      <div className="info__product__detail">
        <img className="info__product__detail__image" src={`${process.env.API_PATH}users/image/${product.img[0]}`} />
        <div className="info__product__detail__details">
          <span>
            <b>Продукт:</b> {product.title}
          </span>
          <span>
            <b>Описание:</b> {product.desc}
          </span>
          <div
            className="info__product__detail__details__product"
            style={{ backgroundColor: product.color[0] }}
          />
          <span>
            <b>Размер:</b> {product.size}
          </span>
        </div>
      </div>
      <div className="info__product__price__container">
        <div className="info__product__amount">
          <Button
            icon={<MinusOutlined />}
            type="link"
            onClick={handleRemove}
          />
          <div className="info__product__amount__value">
            {product.quantity}
          </div>
          <Button
            icon={<PlusOutlined />}
            type="link"
            onClick={handleAdd}
          />
        </div>
        <div className="info__product__price">
          {product.price * product.quantity} ₽
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [address, setAddress] = useState('');

  const postOrder = async () => {
    try {
      if (address && cart.quantity > 0) {
        const res = await authorizedRequest.post('/orders/', {
          address: {
            location: address,
            user: user.currentUser,
          },
          amount: cart.quantity,
          products: Object.values(cart.products),
          status: 'pending',
          userId: user.currentUser._id,
        });
        dispatch(clearCart());
        history.push('/', {
          response: res.data,
          cart,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddressChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setAddress(e.target.value);

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__content">
          <div className="cart__content__info">
            {Object.values(cart.products).map(product => <Product key={product._id} product={product} />)}
            <TextArea
              onChange={handleAddressChange}
              placeholder="Адрес (Страна, регион, город, улица, дом, квартира, индекс)"
              value={address}
            />
            <hr className="horizontal-line" />
          </div>
          <div className="cart__content__summary">
            <h1 className="cart__content__summary__title">ВАША КОРЗИНА</h1>
            <div className="cart__content__summary__item">
              <span>{`Товары (${cart.quantity})`}</span>
              <span>{cart.total} ₽</span>
            </div>
            <div className="cart__content__summary__item _total">
              <span>Общая стоимость</span>
              <span>{cart.total} ₽</span>
            </div>
            <button onClick={postOrder}>ОСТАВИТЬ ЗАКАЗ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
