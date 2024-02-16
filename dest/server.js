"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// core
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
// third-parties & configs
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config.env') });
// server
const server = http_1.default.createServer(app_1.default);
// console.log(process.env.LOCAL_DATABASE!);
mongoose_1.default
    .connect(process.env.LOCAL_DATABASE)
    .then(() => console.log('DB connected'))
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
server.listen(process.env.PORT || 4040, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
