import {
  Button,
  Checkbox,
  Form,
  FormItemProps,
  Input,
  Select
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import Chart from 'src/components/Chart';
import { authorizedRequest } from 'src/requestMethods';
import { IProduct, product } from 'src/store/apiActions/products';
import { useDispatch } from 'src/store/hooks';
import UploadImage from './UploadImage';

const { Item } = Form;
const { Option } = Select;

const categories = [
  { title: 'Джинсы', value: 'jeans' },
  { title: 'Пальто', value: 'coat' },
  { title: 'Нижнее бельё', value: 'underwear' },
  { title: 'Аксесуары', value: 'accesoires' },
  { title: 'Обувь', value: 'shoes' },
  { title: 'Куртки', value: 'jackets' },
  { title: 'Другое', value: 'things' },
];
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

const formConfig: FormItemProps[] = [
  {
    label: 'Название',
    name: 'title',
    rules: [
      { required: true, message: 'Необходимо указать название.' },
      { pattern: /^[a-zA-Z0-9А-Яа-я\s]+$/, message: 'Название может содержать только цифры и буквы.' },
    ],
  },
  {
    label: 'Описание',
    name: 'desc',
  },
  {
    label: 'Цена',
    name: 'price',
    rules: [
      { required: true, message: 'Необходимо указать цену.' },
    ],
  }
];

type TFilterItem = { title: any; value: string };
interface IProductForm {
  data?: IProduct;
  onDrawerClose: () => void;
  setDrawerProduct: (user: IProduct) => void;
}

export interface IIncome {
  _id: number;
  total: number;
}

const getfileListItem = (name: string) => ({
  uid: '-1',
  name,
  url: `${process.env.API_PATH}products/image/${name}`,
});

const ProductForm: React.FC<IProductForm> = ({
  data = {},
  onDrawerClose,
  setDrawerProduct,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [pStats, setPStats] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([
    ...(data?.img
      ? data?.img.map((img) => getfileListItem(img))
      : []
    )
  ]);

  const MONTHS = useMemo(() => [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec',
  ], []);

  useEffect(() => {
    if (data?._id) (async () => {
      try {
        const res = data?._id && await authorizedRequest.get(`orders/income?pid=${data?._id}`);
        const list = res.data.sort((a: IIncome, b: IIncome) => a?._id - b?._id);

        list.map((item: IIncome) => setPStats((prev) => [
          ...prev,
          {
            name: MONTHS[item?._id - 1],
            Sales: item?.total,
          },
        ]));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [data?._id, MONTHS]);

  useEffect(() => {
    if (data?._id) (async () => {
      const product = data?._id && await authorizedRequest.get(`/products/find/${data?._id}`);
      setDrawerProduct(product?.data as IProduct || {});
    })();
  }, [data?._id]);

  useEffect(() => setDefaultFileList([
    ...(data?.img
      ? data?.img.map((img) => getfileListItem(img))
      : []
    )
  ]), [data?.img]);

  const onFinish = (user: IProduct) => {
    data?._id
      ? product.update(data?._id, { ...data, ...user }, dispatch)
      : product.add({ ...data, ...user }, dispatch);

    onDrawerClose();
    setDefaultFileList([]);
    product.getList(dispatch);
  };

  return (
    <>
      <Form
        colon={false}
        form={form}
        initialValues={data}
        labelAlign="left"
        labelCol={{ span: 4 }}
        name="userForm"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
      >
        <UploadImage
          data={data}
          defaultFileList={defaultFileList}
          setDrawerProduct={setDrawerProduct}
        />
        {data?._id && <Chart
            data={pStats}
            title="Динамика продаж"
          />
        }
        {formConfig?.map((item) => {
          return (
            <Item {...item} key={item.name as string}>
              <Input />
            </Item>
          );
        })}
        <Item label="Размер" name="size" rules={[{
          required: true,
          message: 'Необходимо выбрать размер.'
        }]}>
          <Select
            mode="multiple"
            placeholder="Выберите размер"
          >
            {sizes.map((item: TFilterItem) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Цвет" name="color" rules={[{
          required: true,
          message: 'Необходимо выбрать цвет.'
        }]}>
          <Select
            mode="multiple"
            placeholder="Выберите цвет"
          >
            {colors.map((item: TFilterItem) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Категории" name="categories" rules={[{
          required: true,
          message: 'Необходимо выбрать категорию.'
        }]}>
          <Select
            mode="multiple"
            placeholder="Выберите категорию"
          >
            {categories.map((item: TFilterItem) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Наличие"
          name="inStock"
          valuePropName="checked"
        >
          <Checkbox name="inStock" />
        </Item>
        <Item
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Button htmlType="submit">Применить</Button>
        </Item>
      </Form>
    </>
  );
};

export default ProductForm;

