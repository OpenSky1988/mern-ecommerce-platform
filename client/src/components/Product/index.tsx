import {
  Button,
  Card,
  Col,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Text } = Typography;

import './style.less';

export interface IProduct {
  _id?: string;
  categories?: string[];
  color?: string[];
  desc?: string;
  img?: string[];
  inStock?: boolean;
  price?: number;
  sale_price?: number;
  size?: string[];
  title?: string;
  quantity?: number;
}

interface IProductProps {
  item: IProduct;
}

const Product: React.FC<IProductProps> = ({ item }) => {
  const { _id, img, price, sale_price, title } = item;

  return (
    <Link to={`/product/${_id}`}>
      <Col xl={6} lg={6} md={6} sm={12} xs={24} className="centered-col">
        <Card
          hoverable={true}
          cover={
            img[0] ? <img alt="example" src={`${process.env.API_PATH}products/image/${img[0]}`} /> : null
          }
          style={{ width: 282 }}
        >
          <Row>
            <Text style={{ textAlign: 'center' }} strong={true}>{title}</Text>
            {sale_price ? <Button style={{ marginLeft: 10 }}>Sale!</Button> : null}
          </Row>
          <Row>
            <Text type="secondary" delete={!!sale_price}>{`${price} ₽`}</Text>
            {sale_price ? <Text style={{ marginLeft: 15 }}>{`${sale_price} ₽`}</Text> : null}
          </Row>
        </Card>
      </Col>
    </Link>
  );
};

export default Product;
