"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'a user must have an email'],
        unique: [true, 'email already taken'],
        validate: validator_1.default.isEmail,
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
    this.find({ active: { $ne: false } });
    next();
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
