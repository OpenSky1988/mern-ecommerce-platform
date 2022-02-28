import { Request, Response } from 'express';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import jwt from 'jsonwebtoken';

import userModel from '../models/user';

const registerUser = async (req: Request, res: Response) => {
  const newUser = new userModel({
    ...req.body,
    password: AES
      .encrypt(req.body.password, process.env.PASS_SECRET),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { password: reqPassword, email } = req.body;

    const user = await userModel.findOne({ email });
    !user && res.status(401).json('User not found');

    const storedPassword = AES
      .decrypt(user.password, process.env.PASS_SECRET)
      .toString(Utf8);

    storedPassword !== reqPassword &&
      res.status(401).json('Wrong password');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password, ...rest } = user._doc;

    res.status(200).json({ ...rest, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  registerUser,
  loginUser,
};
