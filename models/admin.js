const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const adminSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID as the _id
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // ... other admin-specific fields
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
