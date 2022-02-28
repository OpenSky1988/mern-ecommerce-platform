import { Request, Response } from 'express';
import Grid from 'gridfs-stream';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

import MongoDB from '../db';
import productModel from '../models/product';

let gridFS: Grid.Grid;
let gridfsBucket: GridFSBucket;

enum UserResponse {
  asc = 1,
  desc = -1,
}

MongoDB.on('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(MongoDB.db, {
    bucketName: 'photos',
  })
  gridFS = Grid(MongoDB.db, mongoose.mongo);
  gridFS.collection('photos');
});

const createProduct = async (req: Request, res: Response) => {
  const newProduct = new productModel(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const {
    category,
    sort,
    color,
    size,
    search,
    new: queryNew,
  } = req.query;

  try {
    let products;

    if (queryNew) {
      products = await productModel.find().sort({ createdAt: -1 }).limit(1);
    } else {
      products = await productModel.find({
        ...(category && {categories: { $in: [category] }}),
        ...(search && {title: { $regex: search }}),
        ...(color && {color: { $in: [color] }}),
        ...(size && {size: { $in: [size] }}),
      }).sort({ price: UserResponse[sort as string] });
    }

    res.status(200).json(products);
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
  createProduct,
  deleteImage,
  deleteProduct,
  getAllImages,
  getAllProducts,
  getImage,
  getProduct,
  updateProduct,
  uploadImage,
};
