// import bcrypt from 'bcrypt';
import {
  listMenuByDate,
  addMenu,
  listDailyMenu
} from "../models/dailymenu-model.js";
import {addItem} from "../models/menuitem-model.js";

const getMenuByDate = async (req, res) => {
  console.log('req.params', req.params)
  try {
    const menu = await listMenuByDate(req.params.date);
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu for date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const postMenu = async (req, res) => {
  console.log('req.body', req.body);
  const result = await addMenu(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'New menu added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getMenuByWeekAndRestaurant = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const restaurantId = req.query.restaurant_id;

    console.log('startDate', startDate);
    console.log('endDate', endDate);
    console.log('restaurantId', restaurantId);

    const menu = await listDailyMenu(startDate, endDate, restaurantId);

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {getMenuByDate, postMenu, getMenuByWeekAndRestaurant};
