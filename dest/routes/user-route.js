"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user-controller");
const express_1 = require("express");
const Route = (0, express_1.Router)();
Route.post('/', user_controller_1.subscribe);
Route.get('/', user_controller_1.getAllSubscribers);
exports.default = Route;
