import { Request, Response } from 'express';
import AES from 'crypto-js/aes';
import Grid from 'gridfs-stream';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

import MongoDB from '../db';
import userModel from '../models/user';
import orderModel from '../models/order';

let gridFS: Grid.Grid;
let gridfsBucket: GridFSBucket;

MongoDB.on('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(MongoDB.db, {
    bucketName: 'photos',
  })
  gridFS = Grid(MongoDB.db, mongoose.mongo);
  gridFS.collection('photos');
});

const getUserTransactions = async (users) => {
  const usersWithTransactions = await Promise.all(users.map(async (user): Promise<number> => {
    const result = await orderModel.aggregate([
      {
        $match: { userId: user._id.toString() },
      },
      {
        $group: {
          _id: '$userId',
          transaction: { $sum: '$amount' },
        },
      },
    ]);

    return ({
      ...user._doc,
      transaction: result?.[0]?.transaction || 0,
    });
  }));

  return usersWithTransactions;
};

const updateUser = async (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const query = req.query.new;
  try {
    const users = query
      ? await userModel.find().sort({ _id: -1 }).limit(5)
      : await userModel.find();

    const usersWithTransactions = await getUserTransactions(users);

    res.status(200).json(usersWithTransactions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserStats = async (_req: Request, res: Response) => {
  const today = new Date();
  const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));

  try {
    const data = await userModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const uploadImage = async (req, res) => {
  if (req.file === undefined) {
    return res.send('File is not selected');
  }

  console.log(req.file)
  return res.send(req.file.filename);
};

const getAllImages = async (_req, res) => {
  try {
    const files = await gridFS.files.find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }

    return res.json(files);
  } catch (error) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

const getImage = async (req, res) => {
  try {
    const file = await gridFS.files.findOne({ filename: req.params.filename });

    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'Image not found' });
    }

    if (['image/jpeg', 'image/png'].includes(file.contentType)) {
      const downloadStream = gridfsBucket.openDownloadStream(file._id);
      downloadStream.pipe(res);
    } else {
      res.status(404).json({ err: 'File is not an image' });
    }
  } catch (error) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const result = await gridFS.files.findOneAndDelete({ filename: req.params.filename });

    if (result.ok === 1) {
      res.send(result?.value);
    } else {
      res.send('Image not found');
    }
  } catch (error) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

export {
  deleteImage,
  deleteUser,
  getAllImages,
  getAllUsers,
  getImage,
  getUser,
  getUserStats,
  uploadImage,
  updateUser,
};
