const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router();

// POST endpoint to add a new order
router.post('/order', OrderController.addNewOrder);

// GET endpoint to retrieve all orders
router.get('/order', OrderController.getAllOrders);

// GET endpoint to retrieve a single order by ID
router.get('/order/:orderId', OrderController.getOrderByID);

// GET endpoint to retrieve all orders of a specific user
router.get('/order/:customerId', OrderController.getOrdersByCustomer);

module.exports = router;