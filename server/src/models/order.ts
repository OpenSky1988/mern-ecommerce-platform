import mongoose, { Document, Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    products: [
      {
        quantity: {
          default: 1,
          type: Number,
        },
        productId: {
          type: String,
        },
      },
    ],
    status: { type: String, default: 'pending' },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Order', OrderSchema);

export default orderModel;
