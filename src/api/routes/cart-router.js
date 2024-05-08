/**
 * Express router for handling cart-related API routes.
 *
 * @module cartRouter
 */

import express from 'express';
import {
  postOrder,
  getOrdersByUserId,
  postOrderItem,
  getAllOrders,
  putOrder
} from '../controllers/cart-controller.js';

const cartRouter = express.Router();

/**
 * Route for adding a new order or getting all orders.
 *
 * @name /
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {string} path - The URL path.
 * @param {function} middleware - The middleware function.
 * @returns {object} The Express router.
 */
cartRouter.route('/')
  .post(postOrder) // Add a new order
  .get(getAllOrders); // Get all orders

/**
 * Route for getting orders by user id.
 *
 * @name /:userId
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {string} path - The URL path.
 * @param {function} middleware - The middleware function.
 * @returns {object} The Express router.
 */
cartRouter.route('/:userId')
  .get(getOrdersByUserId); // Get orders by user id

/**
 * Route for adding a new order item or modifying an order.
 *
 * @name /:orderId/items
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {string} path - The URL path.
 * @param {function} middleware - The middleware function.
 * @returns {object} The Express router.
 */
cartRouter.route('/:orderId/items')
  .post(postOrderItem) // Add a new order item
  .put(putOrder); // Modify an order

export default cartRouter;
