import promisePool from '../../utils/database.js';

const listAllItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM menuitem');
    return rows;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

const addItem = async (item, image) => {
  console.log('item:', item)
  console.log('image:', image)

  const {name, price, description, allergen, category} = item;
  const sql = `INSERT INTO menuitem (name, price, description, allergen, category, image)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, price, description, allergen.join(', '), category, image.filename].map(
    (arvo) => {
      if (arvo === undefined) {
        return null;
      } else {
        return arvo;
      }
    }
  );

  console.log('params', params);
  const rows = await promisePool.execute(sql, params);
  // console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {menuitem_id: rows[0].insertId};
};

const removeItem = async (name) => {
  try {
    const [id_rows] = await promisePool.execute('SELECT menuitem_id FROM menuitem WHERE name = ?', [name]);

    if (id_rows.length === 0) {
      console.log('Menu item not found');
      return false;
    }

    const menuitem_id = id_rows[0].menuitem_id;

    const [orderitemrows] = await promisePool.execute('DELETE FROM orderitem WHERE menuitem_id = ?', [menuitem_id]);
    console.log('Deleted order items:', orderitemrows.affectedRows);

    const [rows] = await promisePool.execute('DELETE FROM menuitem WHERE menuitem_id = ?', [menuitem_id]);
    console.log('Deleted menu item:', rows.affectedRows);

    if (rows.affectedRows === 0) {
      console.log('Menu item not found');
      return false;
    }

    return { message: 'success' };

  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};


export {
  listAllItems,
  removeItem,
  addItem
};
