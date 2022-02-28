import { Select, SelectProps } from 'antd';
import qs from 'qs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import NewsLetter from '../../components/Newsletter';
import PageHeader from '../../components/PageHeader';
import Products from '../../components/Products';

import './style.less';

const { Option } = Select;

type TFilterItem = { title: any; value: string };
type TFilterDropdown = {
  items: TFilterItem[];
  name: string;
  onChange: any;
} & SelectProps;

const FilterDropdown: React.FC<TFilterDropdown> = ({
  items,
  name,
  onChange,
  ...props
}) => {
  const handleChange = onChange(name);

  return (
    <Select onChange={handleChange} {...props}>
      {items.map((item: TFilterItem) => (
        <Option
          key={item.value}
          value={item.value}
        >
          {item.title}
        </Option>
      ))}
    </Select>
  );
};

const ProductList = () => {
  const history = useHistory();
  const filters = qs.parse(location.search, { ignoreQueryPrefix: true });

  const colors = [
    { title: 'Белый', value: 'white' },
    { title: 'Чёрный', value: 'black' },
    { title: 'Красный', value: 'red' },
    { title: 'Синий', value: 'blue' },
    { title: 'Жёлтый', value: 'yellow' },
    { title: 'Зелёный', value: 'green' },
  ];
  const sizes = [
    { title: 'XS', value: 'XS' },
    { title: 'S', value: 'S' },
    { title: 'M', value: 'M' },
    { title: 'L', value: 'L' },
    { title: 'XL', value: 'XL' },
  ];
  const sorts = [
    { title: 'По умолчанию', value: 'none' },
    { title: 'Возрастание', value: 'asc' },
    { title: 'Убывание', value: 'desc' },
  ];

  const handleFilters = (name: string) => (value: any) => {
    history.push({
      search: `?${qs.stringify({ ...filters, [name]: value })}`,
    });
  };

  return (
    <div className="product-list">
      <PageHeader title={filters?.category} />
      <div className="product-list__filter-section">
        <div className="filter">
          <FilterDropdown
            defaultValue="none"
            items={sorts}
            name="sort"
            showSearch={true}
            placeholder="Сортировка"
            onChange={handleFilters}
            value={filters?.sort}
          />
          <FilterDropdown
            items={colors}
            name="color"
            showSearch={true}
            placeholder="Цвет"
            onChange={handleFilters}
            value={filters?.color}
          />
          <FilterDropdown
            items={sizes}
            name="size"
            showSearch={true}
            placeholder="Размер"
            onChange={handleFilters}
            value={filters?.size}
          />
        </div>
      </div>
      <Products />
      <NewsLetter />
    </div>
  );
};

export default ProductList;
