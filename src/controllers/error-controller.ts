import { NextFunction, Request, Response } from 'express';
import { iError } from '../utils/interface';
import appError from '../utils/appError';

// -- HANDLE DEVELOPMENT ERRORS HERE
const handleDevelopmentErrors = (err: iError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// -- HANDLE PRODUCTION ERRORS HERE
const handleOperationalErrors = (err: iError, req: Request, res: Response) => {
  console.log('handling operational error 🐈‍⬛`');
  // console.log(err);
  return res.status(err.statusCode).json({ message: err.message });
};

const handleError11000 = (err: iError, req: Request, res: Response) => {
  const key = Object.keys(err.keyValue!);
  const message: string = `${key} is already in use. Please choose another`;
  return new appError(message, 400);
};

const handleValidationError = (err: iError, req: Request, res: Response) => {
  const lastString = err.message.split(':').at(2);
  const final = lastString!.split(',').at(0);

  return new appError(final!, 400);
};

const globalErrorHandler = (
  err: iError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    handleDevelopmentErrors(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') {
    if (err.code === 11000) err = handleError11000(err, req, res);
    if (err.name === 'ValidationError')
      err = handleValidationError(err, req, res);

    err.isOperational && handleOperationalErrors(err, req, res);
  }
};

export default globalErrorHandler;
