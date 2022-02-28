import React from 'react';
import { Link } from 'react-router-dom';

import './style.less';

interface ICategoryItem {
  cat: string;
  img: string;
  title: string;
}

interface CategoryItemProps {
  item: ICategoryItem;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => (
  <div className="category-item">
    <Link to={`/products?category=${item.cat}`} >
      <img className="category-item__image" src={item.img} />
      <div className="category-item__info">
        <h1>{item.title}</h1>
        <button>ПОКАЗАТЬ</button>
      </div>
    </Link>
  </div>
);

export default CategoryItem;
