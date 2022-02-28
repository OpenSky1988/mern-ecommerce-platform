import express from 'express';
import {
  deleteImage,
  deleteUser,
  getAllUsers,
  getAllImages,
  getImage,
  getUser,
  getUserStats,
  uploadImage,
  updateUser,
} from '../controllers/user';
import upload from '../middlewares/upload';
import {
  withAdminAuth,
  withUserAuth,
} from '../utils/verifyToken';

const userRouter = express.Router();

userRouter.put('/:id', withUserAuth, updateUser);
userRouter.delete('/:id', withUserAuth, deleteUser);
userRouter.get('/find/:id', withAdminAuth, getUser);
userRouter.get('/', withAdminAuth, getAllUsers);
userRouter.get('/stats', withAdminAuth, getUserStats);

userRouter.post('/image/upload', withAdminAuth, upload.single('file'), uploadImage);
userRouter.get('/image/', withAdminAuth, getAllImages);
userRouter.get('/image/:filename', getImage);
userRouter.delete('/image/:filename', withAdminAuth, deleteImage);

export default userRouter;
