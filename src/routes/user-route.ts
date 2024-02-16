import { getAllSubscribers, subscribe } from '../controllers/user-controller';
import { Router } from 'express';

const Route = Router();

Route.get('/', getAllSubscribers);
Route.post('/', subscribe);

export default Route;
