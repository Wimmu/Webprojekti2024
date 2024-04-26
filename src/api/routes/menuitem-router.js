import express from 'express';
import multer from 'multer';

import {
  getAllItems,
  getCategoryList,
  deleteItemByName,
  postItem
} from '../controllers/menuitem-controller.js';

const itemRouter = express.Router();
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

    console.log("file in storage", file)

    const filename = `${prefix}-${suffix}.${extension}`;

    cb(null, filename);

    console.log("filename", filename)
  },
});

const upload = multer({
  dest: 'uploads/',
  storage,
});

itemRouter.route('/')
  .get(getAllItems) //List all items
  .post(upload.single('image'), postItem); //Add a new item

itemRouter.route('/category')
  .get(getCategoryList) //List all categories

itemRouter.route('/:name')
  .delete(deleteItemByName) //Delete item by name

export default itemRouter;
