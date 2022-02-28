import React from 'react';

import './style.less';

const Deal: React.FC<{}> = () => {
  const deal = {
    message: 'Весенняя оттепель! Бесплатная доставка на заказы свыше 1500₽',
    img: '',
    backgroundColor: '#EB7168',
    color: 'white',
  };

  return (
    <div className="deal" style={deal}>
      {deal.message}
    </div>
  );
};

export default Deal;
