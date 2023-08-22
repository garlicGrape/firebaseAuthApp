const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const adminSchema = new mongoose.Schema({
  _id: { type: String}, // Use UUID as the _id
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groupCode: { type: String, required: true },
  role: { type: String, required: true}
  // ... other admin-specific fields
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
