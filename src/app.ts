import express from 'express';
import userRoute from './routes/user-route';

const app = express();

app.use('api/v1/users', userRoute);
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ status: 'success', message: 'this route does not exist' });
});

export default app;
