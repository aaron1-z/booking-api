// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity',
  },
}, { timestamps: true });

// Optional: Prevent duplicate bookings by the same user for the same activity
// BookingSchema.index({ user: 1, activity: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);