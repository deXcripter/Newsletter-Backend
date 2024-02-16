// core
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';

// third-parties & configs
import app from './app';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// server
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
