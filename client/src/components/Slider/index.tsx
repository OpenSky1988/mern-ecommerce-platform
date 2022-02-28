import { Carousel } from 'antd';
import React from 'react';

import { sliderItems } from '../../data';

import './style.less';

const Slider: React.FC = () => {
  return (
      <Carousel autoplay={true} style={{ height: '100vh', width: '100%' }}>
        {sliderItems.map((item) => (
          <div key={item.id}>
            <div
              className="slide"
              style={{ backgroundColor: `#${item.bg}` }}
              key={item.id}
            >
              <div className="slide__image-container">
                <img src={item.img} />
              </div>
              <div className="slide__info">
                <h1>{item.title}</h1>
                <p>{item.desc}</p>
                <button>ПОКАЗАТЬ</button>
              </div>
            </div>
          </div>
        ))}
      </ Carousel>
  );
};

export default Slider;
