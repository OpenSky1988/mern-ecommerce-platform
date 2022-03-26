import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import { authorizedRequest } from '../../requestMethods';

import './style.less';

interface IFeaturedItem {
  description?: string;
  title: string;
  totalIncome: number;
  perc?: number | null;
}

const FeaturedItem: React.FC<IFeaturedItem> = ({
  description = '',
  title = '',
  totalIncome = '',
  perc = null,
}) => {
  const incomeDelta = perc < 0
    ? <DownOutlined className="featured__item__money__rate__icon _negative" />
    : <UpOutlined className="featured__item__money__rate__icon" />;

  return (
    <div className="featured__item">
      <span className="featured__item__title">{title}</span>
      <div className="featured__item__money">
        <span className="featured__item__money__total">{totalIncome} ₽</span>
        {perc != null && <span className="featured__item__money__rate">
          %{Math.floor(perc)}{' '}
          {incomeDelta}
        </span>}
      </div>
      <span className="featured__item__sub">{description}</span>
    </div>
  );
};

const FeaturedInfo: React.FC = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  const getIncome = async () => {
    try {
      const res = await authorizedRequest.get('orders/income');
      setIncome(res.data);
      setPerc((res.data[0].total * 100) / res.data[1].total - 100);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getIncome();
    })();
  }, []);

  return (
    <div className="featured">
      <FeaturedItem
        description="За последний месяц"
        title="Прибыль"
        totalIncome={income[1]?.total
          ? income[0]?.total - income[1]?.total
          : income[0]?.total
        }
        perc={perc}
      />
      <FeaturedItem
        description="За всё время"
        title="Продаж всего"
        totalIncome={income[0]?.total}
      />
    </div>
  );
};

export default FeaturedInfo;
