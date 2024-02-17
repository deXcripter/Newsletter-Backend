"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.unSubscribe = exports.getAllSubscribers = exports.subscribe = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const appError_1 = __importDefault(require("../utils/appError"));
const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return next(new appError_1.default('Enter your email', 401));
        // const existing = await User.findOne({ email }).select('+active');
        // console.log(await User.findOne({ email }));
        // if (existing) {
        //   existing.active = true;
        //   await existing.save();
        //   return res.status(201).json({
        //     status: 'success',
        //     message: 'User resubscribed',
        //     data: { existing },
        //   });
        // }
        // subscribe a new user
        const body = {
            email,
        };
        const user = await user_model_1.default.create(body);
        return res
            .status(201)
            .json({ status: 'success', message: 'Email added', data: { user } });
    }
    catch (err) {
        next(err);
    }
};
exports.subscribe = subscribe;
const getAllSubscribers = async (req, res, next) => {
    try {
        const users = await user_model_1.default.find();
        res.status(200).json({ status: 'success', data: { users } });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllSubscribers = getAllSubscribers;
const unSubscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return next(new appError_1.default('Please enter an email', 401));
        const user = await user_model_1.default.findOne({ email }).select('+active');
        if (!user)
            return next(new appError_1.default('No user found with this email', 404));
        user.active = false;
        user.save();
        res.status(200).send({ status: 'success', message: 'user unsubscribed' });
    }
    catch (err) {
        next(err);
    }
};
exports.unSubscribe = unSubscribe;
const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return next(new appError_1.default('Please enter an email', 401));
        await user_model_1.default.findOneAndDelete({ email });
        res.status(204).json({ status: 'success', message: 'user deleted' });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
