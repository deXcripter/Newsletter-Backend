import mongoose from 'mongoose';
import validator from 'validator';
import { iUserModel } from '../utils/interface';
import { throws } from 'assert';

const userSchema = new mongoose.Schema<iUserModel>({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'a user must have an email'],
    unique: [true, 'email already taken'],
    validate: validator.isEmail,
    trim: true,
    lowercase: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre(/^find/, function (next) {
  (this as any).find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
