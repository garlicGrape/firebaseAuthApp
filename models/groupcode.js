const mongoose = require('mongoose');


const groupCodeSchema = new mongoose.Schema({
  groupCode: { type: Number, required: true },
  role: { type: String, required: false}
  // ... other user-specific fields
});

const Groupcode = mongoose.model('Groupcode', groupCodeSchema);

module.exports = Groupcode;
