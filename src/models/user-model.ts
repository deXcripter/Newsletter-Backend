import mongoose from 'mongoose';
import validator from 'validator';
import { iUserModel } from '../utils/interface';

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
});

const User = mongoose.model('User', userSchema);

export default User;
