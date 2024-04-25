import express from 'express';
import multer from 'multer';

import {
  getAllItems,
  deleteItemByName,
  postItem
} from '../controllers/menuitem-controller.js';

const itemRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'IMG/ruokakuvat/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });


itemRouter.route('/')
  .get(getAllItems) //List all items
  .post(upload.single('image'), postItem); //Add a new item

itemRouter.route('/:name')
  .delete(deleteItemByName) //Delete item by name

export default itemRouter;
