"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const app = (0, express_1.default)();
app.use('api/v1/users', user_route_1.default);
app.all('*', (req, res, next) => {
    res
        .status(404)
        .json({ status: 'success', message: 'this route does not exist' });
});
exports.default = app;
