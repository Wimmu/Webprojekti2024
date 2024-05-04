import express from 'express';
import {body} from 'express-validator';

import {
  getAllUsers,
  getUser,
  getOrdersByUserId,
  postUser,
  putUser,
  deleteUser
} from '../controllers/user-controller.js';
import {authenticateToken, validationErrors} from "../../middlewares.js";

const userRouter = express.Router();

const validateUser = [
  body('username').trim().isLength({ min: 1 }).withMessage('Username must be at least 1 character long'),
  body('first_name').trim().isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters long'),
  body('last_name').trim().isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters long'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').escape(),
];

userRouter.route('/')
  .get(getAllUsers) //List all users
  .post(
    validateUser,
    validationErrors,
    postUser); //Add new user

userRouter.route('/:id/orders')
  .get(getOrdersByUserId) //List all users
// .post(postUser); //Add new user

userRouter.route('/:identifier')
  .get(getUser) //Find user by ID or username
  .put(putUser) //Modify user
  .delete(deleteUser); //Remove user

export default userRouter;
