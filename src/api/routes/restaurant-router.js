import express from 'express';

import {
  getAllRestaurants,
} from '../controllers/restaurant-controller.js';

const restaurantRouter = express.Router();

restaurantRouter.route('/')
  .get(getAllRestaurants) // Get all restaurants

restaurantRouter.route('/:id')

export default restaurantRouter;
