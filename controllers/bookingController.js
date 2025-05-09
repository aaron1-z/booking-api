// controllers/bookingController.js
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const { bookActivitySchema } = require('../validators/bookingValidators');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private (User must be logged in)
const bookActivity = async (req, res) => {
  const { error } = bookActivitySchema.validate(req.body);
   if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { activityId } = req.body;
  const userId = req.user._id; // From authMiddleware

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Optional: Check if already booked
    const existingBooking = await Booking.findOne({ user: userId, activity: activityId });
    if (existingBooking) {
      return res.status(400).json({ message: 'Activity already booked by this user' });
    }

    const booking = new Booking({
      user: userId,
      activity: activityId,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);

  } catch (err) {
    console.error(err);
    // Check for specific Mongoose cast error for invalid ObjectId format
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Activity ID format' });
    }
    res.status(500).json({ message: 'Server error during booking' });
  }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate({
        path: 'activity',
        select: 'id title description location date time' // Specify fields from Activity
    });

    // The spec asks for "list of all activities booked", so let's return the activity details
    const bookedActivities = bookings.map(booking => booking.activity);

    res.json(bookedActivities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching bookings' });
  }
};

module.exports = {
  bookActivity,
  getMyBookings,
};