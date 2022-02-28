import {
  Button,
  Form,
  Select
} from 'antd';
import React, { useEffect } from 'react';

import { authorizedRequest } from 'src/requestMethods';
import { getOrders, IOrder, updateOrder } from 'src/store/apiActions/orders';
import { useDispatch } from 'src/store/hooks';


const { Item } = Form;
const { Option } = Select;

interface IUserForm {
  data?: IOrder;
  onDrawerClose: () => void;
  setDrawerOrder: (user: IOrder) => void;
}

const OrderForm: React.FC<IUserForm> = ({
  data = {},
  onDrawerClose,
  setDrawerOrder,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const order = await authorizedRequest.get(`/orders/find/${data?._id}`);
      setDrawerOrder(order?.data as IOrder || {});
    })();
  }, [data?._id]);

  const onFinish = (order: IOrder) => {
    updateOrder({ ...data, ...order }, dispatch);

    onDrawerClose();
    getOrders(dispatch);
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
        <Item
          label="Статус"
          name="status"
          rules={[{ required: true, message: 'Необходимо задать статус' }]}
          key="status"
        >
          <Select placeholder="Please select a country">
            <Option value="pending">В обработке</Option>
            <Option value="not-paid">Ожидает оплаты</Option>
            <Option value="paid">Оплачен</Option>
            <Option value="shipped">В доставке</Option>
            <Option value="delivered">Доставлен</Option>
            <Option value="cancelled">Отменён</Option>
          </Select>
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

export default OrderForm;
