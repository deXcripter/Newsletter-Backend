import { getAllSubscribers, subscribe } from '../controllers/user-controller';
import { Router } from 'express';

const Route = Router();

Route.post('/', subscribe);
Route.get('/', getAllSubscribers);

export default Route;
