import express from 'express';
import morgan from 'morgan';
import userRoute from './routes/user-route';
import globalErrorHandler from './controllers/error-controller';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRoute);
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ status: 'success', message: 'this route does not exist' });
});
app.use(globalErrorHandler);

export default app;
