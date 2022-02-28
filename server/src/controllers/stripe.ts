import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

const performTransaction = (req: Request, res: Response) => {
  const { amount, tokenId } = req.body;

  stripe.charges.create({
    amount,
    currency: 'usd',
    source: tokenId,
  })
    .then(stripeRes => res.status(200).json(stripeRes))
    .catch(stripeErr => res.status(500).json(stripeErr));
};

export {
  performTransaction,
};
