// controllers/activityController.js
const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching activities' });
  }
};

// @desc    Create an activity (For testing/seeding - not required by spec but useful)
// @route   POST /api/activities
// @access  Public (or make it admin protected later)
const createActivity = async (req, res) => {
    const { title, description, location, date, time } = req.body;

    // Basic validation
    if (!title || !description || !location || !date || !time) {
        return res.status(400).json({ message: 'Please provide all required fields for activity' });
    }

    try {
        const activity = new Activity({
            title,
            description,
            location,
            date,
            time
        });
        const createdActivity = await activity.save();
        res.status(201).json(createdActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error creating activity' });
    }
};


module.exports = {
  getAllActivities,
  createActivity // Export if you want to use it for seeding
};