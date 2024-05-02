import promisePool from '../../utils/database.js';

const listAllRestaurants = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM restaurant');
    return rows;
  } catch (error) {
    console.error('Error fetching all restaurants:', error);
    throw error;
  }
};

export {
  listAllRestaurants,
};
