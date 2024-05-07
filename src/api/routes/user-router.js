import express from 'express';
import {body} from 'express-validator';
import {authenticateToken, validationErrors} from "../../middlewares.js";
import multer from "multer";

import {
  getAllUsers,
  getUser,
  getOrdersByUserId,
  postUser,
  putUser,
  deleteUser
} from '../controllers/user-controller.js';

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const originalFilename = file.originalname.split('.')[0].toLowerCase();
    const prefix = `${originalFilename}-${file.fieldname}`;

    let extension = 'jpg';

    if (file.mimetype === 'image/png') {
      extension = 'png';
    }

    //console.log("FILE IN STORAGE", file)

    const filename = `${prefix}-${suffix}.${extension}`;

    cb(null, filename);

    //console.log("filename", filename)
  },
});

const upload = multer({
  dest: 'uploads/',
  storage,
});


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
  .put(authenticateToken, upload.single('avatar'), putUser) //Modify user
  .delete(deleteUser); //Remove user

export default userRouter;
