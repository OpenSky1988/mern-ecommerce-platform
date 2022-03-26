import { Request, Response } from 'express';
import orderModel from '../models/order';

const createOrder = async (req: Request, res: Response) => {
  const newOrder = new orderModel(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMontlyIncome = async (req: Request, res: Response) => {
  const productId = req.query.pid;
  const today = new Date();
  const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId
            ? { products: { $elemMatch: { productId } } }
            : {}
          ),
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$totalPrice',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMontlyIncome,
  getOrder,
  getOrdersByUser,
  updateOrder,
};
