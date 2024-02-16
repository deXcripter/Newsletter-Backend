'use strict';
var __importDefault = (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getAllSubscribers = exports.subscribe = void 0;
const user_model_1 = __importDefault(require('../models/user-model'));
const appError_1 = __importDefault(require('../utils/appError'));
const subscribe = async (req, res, next) => {
    const { email } = req.body;
    if (!email)
        return next(new appError_1.default('Please enter your email', 401));
    const user = await user_model_1.default.create(email);
    res.status(200).json({ status: 'success', data: { user } });
};
exports.subscribe = subscribe;
const getAllSubscribers = async (req, res, next) => {
    const users = user_model_1.default.find();
    res.status(200).json({ status: 'success', data: { users } });
};
exports.getAllSubscribers = getAllSubscribers;
