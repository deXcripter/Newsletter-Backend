// core
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// third-parties & configs
import app from './app';
import appError from './utils/appError';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// server
const server = http.createServer(app);

// console.log(process.env.LOCAL_DATABASE!);

mongoose
  .connect(process.env.LOCAL_DATABASE!)
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

server.listen(process.env.PORT || 4040, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
