import express from 'express';
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getAllImages,
  getAllProducts,
  getImage,
  getProduct,
  updateProduct,
  uploadImage,
} from '../controllers/product';
import upload from '../middlewares/upload';
import {
  withAdminAuth,
} from '../utils/verifyToken';

const productRouter = express.Router();

productRouter.post('/', withAdminAuth, createProduct);
productRouter.put('/:id', withAdminAuth, updateProduct);
productRouter.delete('/:id', withAdminAuth, deleteProduct);
productRouter.get('/find/:id', getProduct);
productRouter.get('/', getAllProducts);

productRouter.post('/image/upload', withAdminAuth, upload.single('file'), uploadImage);
productRouter.get('/image/', withAdminAuth, getAllImages);
productRouter.get('/image/:filename', getImage);
productRouter.delete('/image/:filename', withAdminAuth, deleteImage);

export default productRouter;
