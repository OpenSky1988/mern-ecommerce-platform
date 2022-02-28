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
