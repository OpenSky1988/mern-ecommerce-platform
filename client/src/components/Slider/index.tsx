import { Carousel } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { sliderItems } from '../../data';

import './style.less';

const Slider: React.FC = () => (
  <Carousel autoplay={true} style={{ height: '100vh', width: '100%' }}>
    {sliderItems.map((item) => (
      <Link key={item.id} to={`/products?category=${item.cat}`} >
        <div>
          <div
            className="slide"
            style={{ backgroundColor: `#${item.bg}` }}
            key={item.id}
          >
            <div
              className="slide__image-container"
              style={{
                backgroundImage: `url("${item.img}")`,
              }}
            />
            <div className="slide__info">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
              <button>ПОКАЗАТЬ</button>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </ Carousel>
);

export default Slider;
