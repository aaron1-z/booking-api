// models/Activity.js
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: { // Storing time as a string for simplicity (e.g., "10:00 AM")
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);