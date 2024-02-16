import { RequestHandler } from 'express';
import User from '../models/user-model';
import { iBody } from '../utils/interface';
import appError from '../utils/appError';

export const subscribe: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as iBody;
    if (!email) return next(new appError('Enter your email', 401));

    const body = {
      email,
    };

    const user = await User.create(body);

    return res
      .status(201)
      .json({ status: 'success', message: 'Email added', data: { user } });
  } catch (err) {
    next(err);
  }
};

export const getAllSubscribers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', data: { users } });
  } catch (err) {
    next(err);
  }
};
