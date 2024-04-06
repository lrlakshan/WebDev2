const OrderSchema = require("../models/order");

// Add a new order
const addNewOrder = async (req, res, next) => {
  try {
    const { sandwichId, status } = req.body;

    // Creating a new order instance
    const order = new OrderSchema({
      sandwichId,
      status,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get specific order by order id
const getOrderByID = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderSchema.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addNewOrder, getAllOrders, getOrderByID }; // Exporting controller functions for use in routes
