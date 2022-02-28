import {
  Button,
  Col,
  Descriptions,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IProduct } from '../../components/Product';
import { publicRequest } from '../../requestMethods';
import { useDispatch } from '../../store/hooks';
import { addProduct } from '../../store/slices/cart';

import './style.less';

const { Text } = Typography;
const { Item } = Descriptions;

interface IParams {
  id: string;
}

const Product = () => {
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<IProduct>({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  // ToDo: Add manual selection for color, quantity and size
  const handleClick = () => {
    dispatch(addProduct({ ...product, color: product.color[0], quantity: 1, size: product.size[0] }));
  };

  return (
    <Row className="product__container" justify="space-around">
      <Col
        className="product__container__image"
        lg={10} md={10} sm={24} xl={10}
      >
        {product.img?.[0] && <img src={`${process.env.API_PATH}products/image/${product.img?.[0]}`} />}
      </Col>
      <Col
        className="product__container__info"
        lg={14} md={14} sm={24} xl={14}
      >
        <Descriptions title={product.title} column={1}>
          <Item key="price" label="Цена" className="product__container__info__description">
            <Text
              className={`${product.sale_price ? '_sale' : '_regular'}`}
              delete={!!product.sale_price}
              type="secondary"
            >
              {product.price} ₽
            </Text>
            {product.sale_price
              ? <Text style={{ marginLeft: 15 }}>{product.sale_price} ₽</Text>
              : null
            }
          </Item>
          <Item key="desc" label="Описание">
            {product.desc}
          </Item>
          <Item key="button" label="">
            <Button type="primary" onClick={handleClick}>
              В корзину
            </Button>
          </Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default Product;
