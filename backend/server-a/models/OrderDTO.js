const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderStatusEnum = ['ordered', 'received', 'inQueue', 'ready', 'failed'];

const orderSchema = new Schema({
  sandwichId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: OrderStatusEnum,
    default: 'pending'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
