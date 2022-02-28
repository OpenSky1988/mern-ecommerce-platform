import express from 'express';
import {
  performTransaction,
} from '../controllers/stripe';

const stripeRouter = express.Router();

stripeRouter.post('/payment', performTransaction);

export default stripeRouter;
