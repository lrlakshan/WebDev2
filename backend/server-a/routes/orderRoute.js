const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router();
const { authenticateAdmin, authenticateCustomer, authenticateBoth } = require('../middleware/authMiddleware');

// POST endpoint to add a new order
router.post('/order',authenticateCustomer, OrderController.addNewOrder);

// GET endpoint to retrieve all orders
router.get('/order', authenticateAdmin, OrderController.getAllOrders);

// GET endpoint to retrieve a single order by ID
router.get('/order/:orderId', authenticateBoth, OrderController.getOrderByID);

// GET endpoint to retrieve all orders of a specific user
router.get('/order/customer/:customerId', authenticateCustomer, OrderController.getOrdersByCustomer);

module.exports = router;