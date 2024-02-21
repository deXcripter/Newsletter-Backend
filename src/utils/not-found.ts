import Express, { RequestHandler } from 'express';

export const NotFound: RequestHandler = async (req, res, next) => {
  res
    .status(404)
    .json({ status: 'success', message: 'this route does not exist' });
};
