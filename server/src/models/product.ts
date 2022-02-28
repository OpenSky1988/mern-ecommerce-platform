import mongoose, { Document, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    categories: { type: Array },
    color: { type: Array },
    desc: { type: String, required: true },
    img: { type: Array },
    inStock: { type: Boolean, default: true },
    price: { type: Number, required: true },
    sale_price: { type: Number, default: 0 },
    size: { type: Array },
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Product', ProductSchema);

export default productModel;
