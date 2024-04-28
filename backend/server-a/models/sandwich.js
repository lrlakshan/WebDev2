const mongoose = require('mongoose');
const { Schema } = mongoose;

const toppingSchema = new Schema({
  name: String
});

const sandwichSchema = new Schema({
  name: String,
  toppings: [toppingSchema],
  breadType: String
});

const Sandwich = mongoose.model('Sandwich', sandwichSchema);

module.exports = Sandwich;
