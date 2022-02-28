import mongoose, { Document, Schema } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    img: { type: String },
    isAdmin: {
      default: false,
      type: Boolean,
    },
    password: { type: String, required: true },
    firstName: { type: String, default: '' },
    secondName: { type: String, default: '' },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', UserSchema);

export default userModel;
