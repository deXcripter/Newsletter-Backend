import express from 'express';
import morgan from 'morgan';
import userRoute from './routes/user-route';
import globalErrorHandler from './controllers/error-controller';
import helmet from 'helmet';
import { NotFound } from './utils/not-found';

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRoute);
app.all('*', NotFound);
app.use(globalErrorHandler);

export default app;
