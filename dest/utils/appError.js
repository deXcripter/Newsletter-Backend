"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.message = message;
    }
}
exports.default = appError;
