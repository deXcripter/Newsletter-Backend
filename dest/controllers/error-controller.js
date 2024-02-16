"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
// -- HANDLE DEVELOPMENT ERRORS HERE
const handleDevelopmentErrors = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
// -- HANDLE PRODUCTION ERRORS HERE
const handleOperationalErrors = (err, req, res) => {
    console.log('handling operational error 🐈‍⬛`');
    // console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
};
const handleError11000 = (err, req, res) => {
    const key = Object.keys(err.keyValue);
    const message = `${key} is already subscribed`;
    return new appError_1.default(message, 400);
};
const handleValidationError = (err, req, res) => {
    const lastString = err.message.split(':').at(2);
    const final = lastString.split(',').at(0);
    return new appError_1.default(final, 400);
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    if (process.env.NODE_ENV === 'development') {
        handleDevelopmentErrors(err, req, res);
    }
    if (process.env.NODE_ENV === 'production') {
        if (err.code === 11000)
            err = handleError11000(err, req, res);
        if (err.name === 'ValidationError')
            err = handleValidationError(err, req, res);
        err.isOperational && handleOperationalErrors(err, req, res);
    }
};
exports.default = globalErrorHandler;
