import express from 'express';
import {
  postOrder,
  getOrdersByUserId,
  postOrderItem,
} from '../controllers/cart-controller.js';

const cartRouter = express.Router();

cartRouter.route('/')
  .post(postOrder); //Add a new order

cartRouter.route('/:userId')
  .get(getOrdersByUserId); //Get orders by user id

cartRouter.route('/:orderId/items')
  .post(postOrderItem); //Add a new order item

export default cartRouter;
