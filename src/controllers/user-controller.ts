import { RequestHandler } from 'express';
import User from '../models/user-model';
import { iBody } from '../utils/interface';
import appError from '../utils/appError';
import { schedule } from 'node-cron';

export const subscribe: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as iBody;
    if (!email) return next(new appError('Enter your email', 401));

    // subscribe a new user
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

export const unSubscribe: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as iBody;
    if (!email) return next(new appError('Please enter an email', 401));

    const user = await User.findOne({ email }).select('+active +inactiveSince');
    if (!user) return next(new appError('No user found with this email', 404));

    (user as any).active = false;
    (user as any).inactiveSince = new Date(Date.now());
    (user as any).save();

    console.log(user);

    res.status(200).send({ status: 'success', message: 'User unsubscribed' });
  } catch (err) {
    next(err);
  }
};

async function deleteUsersAutomatically() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const inactiveUsers = await User.find({
      inactiveSince: { $lt: thirtyDaysAgo },
    });

    await User.deleteMany({
      _id: { $in: inactiveUsers.map((user) => user._id) },
    });

    console.log(`${inactiveUsers} deleted`);
  } catch (err) {
    ('Error deleting user(s)');
  }
}

schedule('0 0 * * *', () => {
  console.log('processing inactive users to delete');
  deleteUsersAutomatically();
});
