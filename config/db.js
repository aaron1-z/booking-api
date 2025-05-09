// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Ensures .env is loaded here too if not already

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, // Deprecated
      // useUnifiedTopology: true, // Deprecated
      // No need for these options with Mongoose 6+ and modern drivers
    });
    console.log('MongoDB Connected...'); // This should appear if successful
  } catch (err) {
    console.error(err.message); // This is where "bad auth" might be logged
    // The line below this error will be where your "bad auth" message is from
    console.error("Full error object:", err); // Log the full error object
    process.exit(1);
  }
};

module.exports = connectDB;