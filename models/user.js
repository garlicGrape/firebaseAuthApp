const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID as the _id
  email: { type: String, required: false, unique: true },
  firstname: { type: String, required: false},
  lastname: { type: String, required: false},
  groupCode: { type: String, required: false },
  // ... other user-specific fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
