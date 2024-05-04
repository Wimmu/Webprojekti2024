// import bcrypt from 'bcrypt';
import {
  listAllRestaurants,
} from "../models/restaurant-model.js";

const getAllRestaurants = async (req, res) => {
  try {
    const restaurant = await listAllRestaurants();
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {getAllRestaurants};
