import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user');
    return rows;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?', [id]);
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

const ordersByUserId = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM `order` WHERE user_id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE user SET ? WHERE user_id = ?`, [user, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {
  listAllUsers,
  findUserById,
  ordersByUserId,
  modifyUser
};
