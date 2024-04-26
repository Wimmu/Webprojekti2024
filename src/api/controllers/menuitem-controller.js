import {
  listAllItems,
  addItem,
  categoryList,
  removeItem
} from "../models/menuitem-model.js";

const getAllItems = async (req, res) => {
  try {
    const users = await listAllItems();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const postItem = async (req, res) => {
  // console.log('postCat', req.body);
  console.log("req", req)
  console.log("file", req.file)

  const result = await addItem(req.body, req.file);
  console.log('result', result);
  if (result.menuitem_id) {
    res.status(201);
    res.json({message: 'New item added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getCategoryList = async (req, res) => {
  try {
    const categories = await categoryList();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteItemByName = async (req, res) => {
  try {
    const result = await removeItem(req.params.name);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  getAllItems,
  deleteItemByName,
  postItem,
  getCategoryList,
};
