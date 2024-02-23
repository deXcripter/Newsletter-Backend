// core
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// third-parties & configs
import app from './app';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// server
const server = http.createServer(app);

mongoose
  .connect(process.env.DATABASE!)
  .then(() => {
    console.log('DB connected');

    // run the server if connected
    server.listen(process.env.PORT || 4040, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
