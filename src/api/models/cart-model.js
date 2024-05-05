import promisePool from '../../utils/database.js';

const addOrder = async (userId, totalCost, date, status) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO `order` (user_id, total_cost, date, status) VALUES (?, ?, ?, ?)',
      [userId, totalCost, date, status]
    );
    return rows;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

const getOrdersByUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM `order` WHERE user_id = ?',
      [userId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const addOrderItem = async (menuitemId, orderId, quantity) => {
  //console.log(menuitemId, orderId, quantity);
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO orderitem (menuitem_id, order_id, quantity) VALUES (?, ?, ?)',
      [menuitemId, orderId, quantity]
    );
    return rows;
  } catch (error) {
    console.error('Error adding order item:', error);
    throw error;
  }
};

export { getOrdersByUser, addOrderItem, addOrder };
