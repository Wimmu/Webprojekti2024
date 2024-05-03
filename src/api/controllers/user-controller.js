import bcrypt from 'bcrypt';
import {
  findUserById,
  userByUsername,
  createUser,
  listAllUsers,
  ordersByUserId,
  modifyUser,
  removeUser,
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

const getUserbyUsername = async (req, res) => {
  try {
    const user = await userByUsername(req.params.username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

const postUser = async (req, res) => {
  try {
    const { username, password, first_name, last_name, address, email, phone, avatar } = req.body;

    const avatarValue = avatar || 'avatar4.jpg';

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
      role: 'customer',
      username,
      password: hashedPassword,
      first_name,
      last_name,
      address,
      email,
      phone,
      avatar: avatarValue};

    console.log('user', user);
    const result = await createUser(user);
    if (result) {
      res.json(result);
      console.log('New user added:', result);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error });
  }
}

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

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);
    if (!user) {
      return res.sendStatus(404).json({ error: `No user found with id ${userId}` });
    }

    const result = await removeUser(userId);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {getAllUsers, getUserById, getUserbyUsername, getOrdersByUserId, postUser, putUser, deleteUser};
