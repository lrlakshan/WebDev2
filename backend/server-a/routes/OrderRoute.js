const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/make-order', OrderController.addNewOrder);

module.exports = router;