import { Layout, Row } from 'antd';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { publicRequest } from '../../requestMethods';
import Product from '../Product';

import './style.less';

const Products: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const filters = qs.parse(location.search, { ignoreQueryPrefix: true });

    (async () => {
      try {
        const res = await publicRequest.get(`/products?${qs.stringify(filters)}`);

        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [location.search]);

  return (
    <Layout className="product-list">
      <Row gutter={[24, 24]} justify="center">
        {products
          .map((item) => <Product item={item} key={item._id} />)
        }
      </Row>
    </Layout>
  );
};

export default Products;
