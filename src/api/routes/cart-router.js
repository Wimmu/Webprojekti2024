import express from 'express';
import {
  postOrder,
  getOrdersByUserId,
  postOrderItem,
  getAllOrders,
  putOrder
} from '../controllers/cart-controller.js';

const cartRouter = express.Router();

cartRouter.route('/')
  .post(postOrder)//Add a new order
  .get(getAllOrders); //Get all orders

cartRouter.route('/:userId')
  .get(getOrdersByUserId); //Get orders by user id

cartRouter.route('/:orderId/items')
  .post(postOrderItem) //Add a new order item
  .put(putOrder); //Modify an order

export default cartRouter;
