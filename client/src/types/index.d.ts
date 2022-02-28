export interface IOrderProduct {
  quantity: number;
  productId: string;
}

export interface IOrder {
  _id?: string;
  userId?: string;
  status?: string;
  amount?: number;
  products?: IOrderProduct[];
}

export interface IUser {
  _id?: string;
  email?: string;
  img?: string;
  isAdmin?: boolean;
  password?: string;
  transaction?: number;
  username?: string;
}
