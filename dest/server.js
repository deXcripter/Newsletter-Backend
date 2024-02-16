"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// core
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// third-parties & configs
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config.env') });
// server
const server = http_1.default.createServer(app_1.default);
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
