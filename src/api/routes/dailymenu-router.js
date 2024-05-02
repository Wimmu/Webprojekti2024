import express from 'express';

import {
  getMenuByDate,
  postMenu,
  getMenuByWeekAndRestaurant
} from '../controllers/dailymenu-controller.js';

const menuRouter = express.Router();

menuRouter.route('/')
  .post(postMenu) // Add a new dailymenu
  .get(getMenuByWeekAndRestaurant);

menuRouter.route('/:date')
  .get(getMenuByDate) // Get dailymenu by date

export default menuRouter;
