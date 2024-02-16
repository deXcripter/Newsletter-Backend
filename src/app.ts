import express from 'express';
import morgan from 'morgan';
import userRoute from './routes/user-route';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRoute);
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ status: 'success', message: 'this route does not exist' });
});

export default app;
