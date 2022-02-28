import React from 'react';

import Categories from '../../components/Categories';
import NewsLetter from '../../components/Newsletter';
import Products from '../../components/Products';
import Slider from '../../components/Slider';

const Home: React.FC<{}> = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
      <NewsLetter/>
    </div>
  );
};

export default Home;
