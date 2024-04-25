// import bcrypt from 'bcrypt';
import {
  findUserById,
  listAllUsers,
  ordersByUserId,
  modifyUser
} from "../models/user-model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await ordersByUserId(req.params.id);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const putUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);
    if (!user) {
      return res.sendStatus(404).json({ error: `No user found with id ${userId}` });
    }

    const result = await modifyUser(req.body, userId);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error modifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {getAllUsers, getUserById, getOrdersByUserId, putUser};
