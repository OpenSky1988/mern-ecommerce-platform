import express, { Request, Response } from 'express';
import colors from 'colors/safe';
import cors from 'cors';
require('dotenv').config();

import MongoDB from './db';
import authRouter from './routes/auth';
import cartRouter from './routes/cart';
import orderRouter from './routes/order';
import productRouter from './routes/product';
import stripeRouter from './routes/stripe';
import userRouter from './routes/user';

const app = express();

const apiConfig = {
  apiPort: process.env.PORT || 8070,
  apiRoot: '/api',
};

// ToDo: Replace process.env.LOCAL_... with process.env.PUBLIC_... in production
const corsConfig = {
  origin: [
    process.env.LOCAL_ADMIN_URL,
    process.env.LOCAL_SHOP_URL,
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(express.json());

MongoDB.on('error', console.error.bind(console, 'MongoDB connection error'));

app.get('/', (_req: Request, res: Response) => {
  res.send('Connection successfull. Homesite server is online.');
});

app.use(`${apiConfig.apiRoot}/auth`, authRouter);
app.use(`${apiConfig.apiRoot}/users`, userRouter);
app.use(`${apiConfig.apiRoot}/products`, productRouter);
app.use(`${apiConfig.apiRoot}/carts`, cartRouter);
app.use(`${apiConfig.apiRoot}/orders`, orderRouter);
app.use(`${apiConfig.apiRoot}/checkout`, stripeRouter);

app.listen(apiConfig.apiPort, () => {
  console.log(`\n${colors.green('Server running on port')} ${apiConfig.apiPort}`);
});
