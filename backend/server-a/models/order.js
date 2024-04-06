const mongoose = require('mongoose');
const { Schema } = mongoose;

// Enum for order status options
const OrderStatusEnum = ['ordered', 'received', 'inQueue', 'ready', 'failed'];

// Define the schema for an order
const orderSchema = new Schema({
  sandwichId: {
    type: Number,
    required: true // Ensure that sandwichId is a required field
  },
  status: {
    type: String,
    enum: OrderStatusEnum, // Limiting the status to predefined values in OrderStatusEnum
    default: 'inQueue' // Default status is 'inQueue' if not provided
  }
});

// Create the Order model using the order schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;