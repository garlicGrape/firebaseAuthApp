const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: { type: String, required: false, unique: true },
  firstname: { type: String, required: false},
  lastname: { type: String, required: false},
  groupCode: { type: String, required: false },
  role: { type: String, required: false}
  // ... other user-specific fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
