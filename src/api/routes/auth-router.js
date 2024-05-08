import express from 'express';
import {
  getMe,
  postLogin,
  initiatePasswordReset,
  getResetPassword,
  postResetPassword,
} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares.js';


const authRouter = express.Router();

authRouter.route('/login').post(postLogin);

authRouter.route('/me').get(authenticateToken, getMe);

authRouter.route('/forgot-password')
  .post(initiatePasswordReset);

authRouter.route('/reset-password/:user_id/:token')
  .get(getResetPassword)
  .post(postResetPassword);

export default authRouter;
