const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for an User
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  }
});

// Create the user model using the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
