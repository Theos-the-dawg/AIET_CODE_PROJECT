
const mongoose = require('mongoose');
let date = new Date
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
    default: date.toISOString()
  }
});

module.exports = mongoose.model('User', userSchema);
