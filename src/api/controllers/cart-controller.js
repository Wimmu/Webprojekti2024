import {
  addOrder,
  getOrdersByUser,
  addOrderItem,
} from "../models/cart-model.js";

const postOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { totalCost, status , restaurantId} = req.body;
    const date = new Date(); // or get it from req.body if it's provided
    const order = await addOrder(userId, restaurantId, totalCost, date, status);
    //console.log(order);

    // Send the order ID along with the response
    res.status(201).json({ orderId: order.insertId });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const postOrderItem = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { menuitem_id, quantity } = req.body;

    // Check that all required properties are defined
    if (!menuitem_id || !quantity || !orderId) {
      res.status(400).json({ error: 'Missing required order item data' });
      return;
    }

    // Process the order item data and save it to the database
    await addOrderItem(menuitem_id, orderId, quantity);

    res.status(201).json({ message: 'Order item added successfully' });
  } catch (error) {
    console.error('Error adding order item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export {
  postOrder,
  getOrdersByUserId,
  postOrderItem,
};
