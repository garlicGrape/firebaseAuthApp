const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID as the _id
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groupCode: { type: String, required: true },
  // ... other user-specific fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
