import { Request, Response } from 'express';
import cartModel from '../models/cart';

const createCart = async (req: Request, res: Response) => {
  const newCart = new cartModel(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCart = async (req: Request, res: Response) => {
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCart = async (req: Request, res: Response) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCartByUser = async (req: Request, res: Response) => {
  try {
    const cart = await cartModel.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllCarts = async (_req: Request, res: Response) => {
  try {
    const carts = await cartModel.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
}

export {
  createCart,
  updateCart,
  deleteCart,
  getCartByUser,
  getAllCarts,
};
