const mongoose = require('mongoose');
const { Schema } = mongoose;

// Enum for order status options
const OrderStatusEnum = ['ordered', 'received', 'inQueue', 'ready', 'failed'];

// Define the schema for an order
const orderSchema = new Schema({
  sandwichId: {
    type: String,
    required: true // Ensure that sandwichId is a required field
  },
  customerId: {
    type: String,
    required: true // Ensure that customerId is a required field
  },
  status: {
    type: String,
    enum: OrderStatusEnum, // Limiting the status to predefined values in OrderStatusEnum
    default: 'ordered' // Default status is 'ordered' if not provided
  }
});

// Create the Order model using the order schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
