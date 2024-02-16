import {
  getAllSubscribers,
  subscribe,
  unSubscribe,
} from '../controllers/user-controller';
import { Router } from 'express';

const Route = Router();

Route.get('/', getAllSubscribers);
Route.post('/', subscribe);
Route.patch('/', unSubscribe);

export default Route;
