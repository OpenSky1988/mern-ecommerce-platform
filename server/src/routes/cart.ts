import express from 'express';
import {
  verifyToken,
  withAdminAuth,
  withUserAuth,
} from '../utils/verifyToken';
import {
  createCart,
  updateCart,
  deleteCart,
  getCartByUser,
  getAllCarts,
} from '../controllers/cart';

const cartRouter = express.Router();

cartRouter.post('/', verifyToken, createCart);
cartRouter.put('/:id', withUserAuth, updateCart);
cartRouter.delete('/:id', withUserAuth, deleteCart);
cartRouter.get('/find/:userId', withUserAuth, getCartByUser);
cartRouter.get('/', withAdminAuth, getAllCarts);

export default cartRouter;
