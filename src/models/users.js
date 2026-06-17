const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  regDate: {
    type: Date,
    default: new Date().toISOString() // dynamic timestamp for each new user
  }
});

module.exports = mongoose.model('User', userSchema);
