import React from 'react';

import { categories } from '../../data';
import CategoryItem from '../CategoryItem';

import './style.less';

const Categories: React.FC<{}> = () => (
  <div className="categories">
    {categories.map((item) => (
      <CategoryItem item={item} key={item.id} />
    ))}
  </div>
);

export default Categories;
