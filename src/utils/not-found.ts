import Express, { RequestHandler } from 'express';

const NotFound: RequestHandler = async (req, res, next) => {
  res
    .status(404)
    .json({ status: 'success', message: 'this route does not exist' });
};

export default NotFound;
