import promisePool from '../../utils/database.js';

const listMenuByDate = async (thisDate) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM dailymenu WHERE day = ?', [thisDate]);
    return rows;
  } catch (error) {
    console.error('Error fetching menu for ', thisDate, '. ', error);
    throw error;
  }
};

const addMenu = async (menu) => {
  const { day, restaurant_id, food_items } = menu;

  const existingMenu = await listMenuByDate(day);

  if (existingMenu.length > 0) {
    console.log('Menu already exists, updating');
    const menuId = existingMenu[0].lunch_id;
    const sql = `UPDATE dailymenu SET food_items = ? WHERE lunch_id = ?`;
    const params = [food_items, menuId];
    console.log('params', params);
    const [rows] = await promisePool.execute(sql, params);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { menuitem_id: menuId };
  } else {
    console.log('Menu does not exist, adding new menu');
    const sql = `INSERT INTO dailymenu (day, restaurant_id, food_items) VALUES (?, ?, ?)`;
    const params = [day, restaurant_id, food_items];
    console.log('params', params);
    const [rows] = await promisePool.execute(sql, params);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { menuitem_id: rows.insertId };
  }
};

const listDailyMenu = async (startDate, endDate, restaurantId) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM dailymenu WHERE day BETWEEN ? AND ? AND restaurant_id = ?', [startDate, endDate, restaurantId]);
    return rows;
  } catch (error) {
    console.error('Error fetching menu for ', startDate, ' - ', endDate, '. ', error);
    throw error;
  }
}

export {
  listMenuByDate,
  addMenu,
  listDailyMenu
};
