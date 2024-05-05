import {
  addOrder,
  getOrdersByUser,
  addOrderItem,
} from "../models/cart-model.js";

const postOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { totalCost, status } = req.body;
    const date = new Date(); // or get it from req.body if it's provided
    const order = await addOrder(userId, totalCost, date, status);

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
    const result = await addOrderItem(req.body.menuitemId, req.body.orderId, req.body.quantity);
    if (result.insertId) {
      res.status(201);
      res.json({message: 'New order item added.', result});
    } else {
      res.sendStatus(400);
    }
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
