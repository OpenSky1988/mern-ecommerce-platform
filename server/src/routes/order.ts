import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMontlyIncome,
  getOrder,
  getOrdersByUser,
  updateOrder,
} from '../controllers/order';
import {
  verifyToken,
  withAdminAuth,
  withUserAuth,
} from '../utils/verifyToken';

const orderRouter = express.Router();

orderRouter.post('/', verifyToken, createOrder);
orderRouter.put('/:id', withAdminAuth, updateOrder);
orderRouter.delete('/:id', withAdminAuth, deleteOrder);
orderRouter.get('/user/:userId', withUserAuth, getOrdersByUser);
orderRouter.get('/find/:id', withUserAuth, getOrder);
orderRouter.get('/', withAdminAuth, getAllOrders);
orderRouter.get('/income', withAdminAuth, getMontlyIncome);

export default orderRouter;
