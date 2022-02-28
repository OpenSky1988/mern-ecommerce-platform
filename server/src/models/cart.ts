import mongoose, { Document, Schema } from 'mongoose';

const CartSchema = new Schema({
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
  userId: { type: String, required: true },
}, {
  timestamps: true,
});

const cartModel = mongoose.model('Cart', CartSchema); 

export default cartModel;
