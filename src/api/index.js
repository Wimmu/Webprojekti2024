import express from 'express';
import userRouter from './routes/user-router.js';
import itemRouter from './routes/menuitem-router.js';
import authRouter from './routes/auth-router.js';


const router = express.Router();

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/auth', authRouter);

export default router;
