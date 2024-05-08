import {
  listAllItems,
  addItem,
  categoryList,
  allergenList,
  removeItem,
  listOrderItems,
  modifyItem
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
  const result = await addItem(req.body, req.file);
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

const getAllergenList = async (req, res) => {
  try {
    const allergens = await allergenList();
    res.json(allergens);
  } catch (error) {
    console.error('Error fetching allergens:', error);
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

const getOrderItemsByOrderId = async (req, res) => {
  try {
    const items = await listOrderItems(req.params.id);
    res.json(items);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const putItem = async (req, res) => {
  try {
    const item = await modifyItem(req.body, req.params.name, req.file);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error modifying item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

export {
  getAllItems,
  deleteItemByName,
  postItem,
  getCategoryList,
  getAllergenList,
  getOrderItemsByOrderId,
  putItem
};
